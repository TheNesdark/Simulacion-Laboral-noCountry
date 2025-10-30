package com.salud.portalcitas.service.cita;

import com.salud.portalcitas.dto.cita.CitaRequest;
import com.salud.portalcitas.dto.cita.CitaResponse;
import com.salud.portalcitas.entity.Cita;
import com.salud.portalcitas.entity.Cupo;
import com.salud.portalcitas.entity.Medico;
import com.salud.portalcitas.entity.Paciente;
import com.salud.portalcitas.repository.CitaRepository;
import com.salud.portalcitas.service.cupo.CupoService;
import com.salud.portalcitas.service.medico.MedicoService;
import com.salud.portalcitas.service.paciente.PacienteService;
import com.salud.portalcitas.util.client.CalendarService;
import com.salud.portalcitas.util.enums.EstadoCita;
import com.salud.portalcitas.util.mail.EmailService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CitaServiceImpl implements CitaService{

    private final CitaRepository citaRepository;
    private final CupoService cupoService;
    private final PacienteService pacienteService;
    private final MedicoService medicoService;
    private final CalendarService calendarService;
    private final EmailService emailService;


    @Override
    @Transactional
    public CitaResponse programarCita(CitaRequest citaRequest) {
        Cupo cupo = cupoService.obtenerPorId(citaRequest.getCupoId());
        if (cupo.getReservado()) throw new RuntimeException("Cupo no disponible");

        Paciente paciente = pacienteService.obtenerEntidadPorId(citaRequest.getPacienteId());
        Medico medico = medicoService.obtenerPorId(cupo.getDisponibilidad().getMedico().getId());

        Cita cita = new Cita();
        cita.setCupo(cupo);
        cita.setPaciente(paciente);
        cita.setMedico(medico);
        cita.setTipo(citaRequest.getTipo());
        cita.setLinkVideo(citaRequest.getLinkVideo());
        cita.setMotivoCita(citaRequest.getMotivoCita());
        cita.setEstado(EstadoCita.PROGRAMADA);

        //reservar cupo
        cupoService.marcarReservado(cupo.getId());

        //guardar cita
        Cita citaGuardada = citaRepository.save(cita);

        // crear evento en Google Calendar
        String eventId = calendarService.crearEvento(citaGuardada);
        citaGuardada.setGoogleEventId(eventId);
        citaRepository.save(citaGuardada);

        // enviar mail de confirmación
        emailService.enviarConfirmacionCita(citaGuardada);

        return toResponse(citaGuardada);
    }

    @Override
    @Transactional
    public CitaResponse cancelarCita(Long citaId, String motivo) {
        Cita cita = this.obtenerEntidadPorId(citaId);

        if (cita.getEstado() == EstadoCita.CANCELADA) return toResponse(cita);

        cita.setEstado(EstadoCita.CANCELADA);;
        cita.setMotivoCancelacion(motivo);

        Cita citaGuardada = citaRepository.save(cita);

        // eliminar evento de Google Calendar
        if (cita.getGoogleEventId() != null) {
            calendarService.eliminarEvento(cita.getGoogleEventId());
        }

        // enviar email al paciente
        emailService.enviarCancelacionCita(cita);

        return toResponse(citaGuardada);
    }

    @Override
    @Transactional
    public CitaResponse completarCita(Long citaId) {
        Cita cita = this.obtenerEntidadPorId(citaId);

        if (cita.getEstado() == EstadoCita.COMPLETADA) return toResponse(cita);

        cita.setEstado(EstadoCita.COMPLETADA);

        Cita citaGuardada = citaRepository.save(cita);
        return toResponse(citaGuardada);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CitaResponse> listarCitasPendientesPorPaciente(Long pacienteId) {
        return citaRepository.findByPacienteId(pacienteId).stream()
                .filter(this::isFuture)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CitaResponse> listarTotalCitasPorPaciente(Long pacienteId){
        return citaRepository.findByPacienteId(pacienteId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CitaResponse> listarCitasPendientesPorMedico(Long medicoId) {
        return citaRepository.findByMedicoId(medicoId).stream()
                .filter(this::isFuture)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CitaResponse> listarTotalCitasPorMedico(Long medicoId) {
        return citaRepository.findByMedicoId(medicoId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CitaResponse obtenerPorId(Long citaId) {
        Cita cita =  citaRepository.findById(citaId)
                .orElseThrow(() -> new EntityNotFoundException("Cita no econtrada"));
        return toResponse(cita);
    }

    private Cita obtenerEntidadPorId(Long citaId) {
        return citaRepository.findById(citaId)
                .orElseThrow(() -> new EntityNotFoundException("Cita no econtrada"));
    }

    private boolean isFuture(Cita c) {
        return c.getCupo().getFecha() != null && !c.getCupo().getFecha().isBefore(LocalDate.now());
    }

    private CitaResponse toResponse(Cita cita) {
        Cupo cupo = cita.getCupo();
        return new CitaResponse(
                cita.getId(),
                cita.getPaciente().getId(),
                cita.getMedico().getId(),
                cupo.getId(),
                cupo.getFecha(),
                cupo.getHoraInicio().toString(),
                cupo.getHoraFin().toString(),
                cita.getTipo(),
                cita.getEstado(),
                cita.getLinkVideo(),
                cita.getMedico().getClinica().getNombre(),
                cita.getMotivoCita(),
                cita.getMotivoCancelacion()
        );
    }
}
