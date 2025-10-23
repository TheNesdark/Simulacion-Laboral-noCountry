package com.salud.portalcitas.service.disponibilidad;

import com.salud.portalcitas.dto.disponibilidad.DisponibilidadRequest;
import com.salud.portalcitas.dto.disponibilidad.DisponibilidadResponse;
import com.salud.portalcitas.entity.Disponibilidad;
import com.salud.portalcitas.entity.Medico;
import com.salud.portalcitas.mapper.ConvertirADisponibilidad;
import com.salud.portalcitas.mapper.ConvertirADisponibilidadResponse;
import com.salud.portalcitas.repository.CitaRepository;
import com.salud.portalcitas.repository.DisponibilidadRepository;
import com.salud.portalcitas.service.cupo.CupoService;
import com.salud.portalcitas.service.medico.MedicoService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DisponibilidadServiceImpl implements DisponibilidadService {

    private final DisponibilidadRepository disponibilidadRepository;
    private final ConvertirADisponibilidad convertirADisponibilidad;
    private final ConvertirADisponibilidadResponse convertirADisponibilidadResponse;
    private final MedicoService medicoService;
    private final CupoService cupoService;
    private final CitaRepository citaRepository;

    private final int DIAS_GENERACION = 30;



    @Transactional(readOnly = true)
    public List<DisponibilidadResponse> listarPorMedico(Long medicoId) {
        List<Disponibilidad> list = disponibilidadRepository.findByMedicoIdAndEliminadaFalse(medicoId);
        return list.stream()
                .map(convertirADisponibilidadResponse::convertir)
                .collect(Collectors.toList());
    }

    @Override
    public DisponibilidadResponse crearDisponibilidad(Long medicoId, DisponibilidadRequest disponibilidadRequest) {

        validarHoras(disponibilidadRequest);
        validarSolapamientoHoras(medicoId, disponibilidadRequest);

        Medico medico = medicoService.obtenerPorId(medicoId);

        Disponibilidad disponibilidad = convertirADisponibilidad.convertir(disponibilidadRequest);

        disponibilidad.setMedico(medico);

        Disponibilidad disponibilidadGuardada = disponibilidadRepository.save(disponibilidad);

        if (disponibilidadGuardada.getActiva()) {
            cupoService.generarCuposParaDisponibilidad(disponibilidadGuardada, DIAS_GENERACION);
        }

        return convertirADisponibilidadResponse.convertir(disponibilidad);
    }

    @Override
    public DisponibilidadResponse actualizarDisponibilidad(Long disponibilidadId, DisponibilidadRequest disponibilidadRequest) {

        Disponibilidad disponibilidad = disponibilidadRepository.findById(disponibilidadId)
                .orElseThrow(() -> new EntityNotFoundException("Disponibilidad no encontrada"));

        boolean tieneCitasFuturas = citaRepository.existsFutureCitasForDisponibilidad(disponibilidadId, LocalDateTime.now());
        if (tieneCitasFuturas) {
            throw new RuntimeException("No se puede modificar la disponibilidad porque existen citas futuras asociadas");
        }

        this.validarHoras(disponibilidadRequest);
        this.validarSolapamientoHoras(disponibilidad.getMedico().getId(), disponibilidadRequest);

        disponibilidad.setDiaSemana(disponibilidadRequest.getDiaSemana());
        disponibilidad.setHoraInicio(disponibilidadRequest.getHoraInicio());
        disponibilidad.setHoraFin(disponibilidadRequest.getHoraFin());
        disponibilidad.setMinutosCupo(disponibilidadRequest.getMinutosCupo());

        cupoService.eliminarCuposLibresFuturos(disponibilidadId);

        if (disponibilidad.getActiva()) {
            cupoService.generarCuposParaDisponibilidad(disponibilidad, DIAS_GENERACION);
        }

        disponibilidadRepository.save(disponibilidad);
        return convertirADisponibilidadResponse.convertir(disponibilidad);
    }

    public DisponibilidadResponse activar(Long disponibilidadId) {
        Disponibilidad d = disponibilidadRepository.findById(disponibilidadId)
                .orElseThrow(() -> new EntityNotFoundException("Disponibilidad no encontrada"));

        if (Boolean.TRUE.equals(d.getEliminada())) {
            throw new IllegalStateException("Disponibilidad eliminada");
        }

        d.setActiva(true);
        Disponibilidad guardada = disponibilidadRepository.save(d);

        cupoService.generarCuposParaDisponibilidad(guardada, DIAS_GENERACION);

        return convertirADisponibilidadResponse.convertir(guardada);
    }

    public DisponibilidadResponse desactivar(Long disponibilidadId) {
        Disponibilidad d = disponibilidadRepository.findById(disponibilidadId)
                .orElseThrow(() -> new EntityNotFoundException("Disponibilidad no encontrada"));

        d.setActiva(false);
        Disponibilidad guardada = disponibilidadRepository.save(d);

        cupoService.eliminarCuposLibresFuturos(guardada.getId());

        return convertirADisponibilidadResponse.convertir(guardada);
    }

    public void eliminarLogico(Long disponibilidadId) {
        Disponibilidad d = disponibilidadRepository.findById(disponibilidadId)
                .orElseThrow(() -> new EntityNotFoundException("Disponibilidad no encontrada"));

        d.setActiva(false);
        d.setEliminada(true);
        disponibilidadRepository.save(d);

        cupoService.eliminarCuposLibresFuturos(d.getId());
    }

    private void validarHoras(DisponibilidadRequest request) {
        if (request.getHoraFin().isBefore(request.getHoraInicio())) {
            throw new IllegalArgumentException("La hora de fin debe ser posterior a la hora de inicio");
        }

        long minutosDisponibles = Duration.between(request.getHoraInicio(), request.getHoraFin()).toMinutes();

        if (minutosDisponibles < request.getMinutosCupo()) {
            throw new IllegalArgumentException("El rango horario debe ser mayor o igual al tiempo de un cupo (" + request.getMinutosCupo() + " minutos)");
        }
    }

    private void validarSolapamientoHoras(Long medicoId, DisponibilidadRequest request) {

        List<Disponibilidad> existentes = disponibilidadRepository.findByMedicoIdAndDiaSemanaAndEliminadaFalse(medicoId, request.getDiaSemana());

        for (Disponibilidad d : existentes) {
            boolean solapan =
                    !request.getHoraFin().isBefore(d.getHoraInicio()) && !request.getHoraInicio().isAfter(d.getHoraFin());

            if (solapan) {
                throw new IllegalArgumentException(
                        String.format(
                                "El rango horario %s-%s se solapa con otra disponibilidad existente (%s-%s)",
                                request.getHoraInicio(), request.getHoraFin(),
                                d.getHoraInicio(), d.getHoraFin()
                        )
                );
            }
        }
    }
}