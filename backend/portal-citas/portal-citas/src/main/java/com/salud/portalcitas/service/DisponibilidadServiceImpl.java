package com.salud.portalcitas.service;

import com.salud.portalcitas.dto.DisponibilidadRequest;
import com.salud.portalcitas.dto.DisponibilidadResponse;
import com.salud.portalcitas.entity.Disponibilidad;
import com.salud.portalcitas.mapper.ConvertirADisponibilidad;
import com.salud.portalcitas.mapper.ConvertirADisponibilidadResponse;
import com.salud.portalcitas.repository.DisponibilidadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DisponibilidadServiceImpl implements DisponibilidadService{

    private final DisponibilidadRepository disponibilidadRepository;
    private final ConvertirADisponibilidad convertirADisponibilidad;
    private final ConvertirADisponibilidadResponse convertirADisponibilidadResponse;


    @Override
    public DisponibilidadResponse crearDisponibilidad(DisponibilidadRequest disponibilidadRequest) {

        validarHoras(disponibilidadRequest);

        Disponibilidad disponibilidad = convertirADisponibilidad.convertir(disponibilidadRequest);

        disponibilidadRepository.save(disponibilidad);

        return convertirADisponibilidadResponse.convertir(disponibilidad);
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
}
