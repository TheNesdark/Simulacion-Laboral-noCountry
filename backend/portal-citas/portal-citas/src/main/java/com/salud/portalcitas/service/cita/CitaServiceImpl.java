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
import com.salud.portalcitas.util.enums.EstadoCita;
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


    @Override
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
        cita.setEstado(EstadoCita.PROGRAMADA);

        cupoService.marcarReservado(cupo.getId());

        Cita citaGuardada = citaRepository.save(cita);
        return toResponse(citaGuardada);
    }

    @Override
    public CitaResponse cancelarCita(Long citaId, String motivo) {
        Cita cita = this.obtenerEntidadPorId(citaId);
        if (cita.getEstado() == EstadoCita.CANCELADA) return toResponse(cita);

        cita.setEstado(EstadoCita.CANCELADA);;
        cita.setMotivoCancelacion(motivo);

        Cita citaGuardada = citaRepository.save(cita);
        return toResponse(citaGuardada);
    }

    @Override
    public CitaResponse completarCita(Long citaId) {
        Cita cita = this.obtenerEntidadPorId(citaId);
        if (cita.getEstado() == EstadoCita.COMPLETADA) return toResponse(cita);

        cita.setEstado(EstadoCita.COMPLETADA);

        Cita citaGuardada = citaRepository.save(cita);
        return toResponse(citaGuardada);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CitaResponse> listarPorPaciente(Long pacienteId) {
        return citaRepository.findByPacienteId(pacienteId).stream()
                .filter(this::isFuture)
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CitaResponse> listarPorMedico(Long medicoId) {
        return citaRepository.findByMedicoId(medicoId).stream()
                .filter(this::isFuture)
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
                cita.getMotivoCancelacion()
        );
    }
}
