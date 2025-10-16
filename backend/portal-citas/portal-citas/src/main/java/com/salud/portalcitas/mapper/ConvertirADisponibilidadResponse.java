package com.salud.portalcitas.mapper;

import com.salud.portalcitas.dto.DisponibilidadResponse;
import com.salud.portalcitas.entity.Disponibilidad;
import org.springframework.stereotype.Component;

@Component
public class ConvertirADisponibilidadResponse {

    public DisponibilidadResponse convertir(Disponibilidad disponibilidad) {

        DisponibilidadResponse disponibilidadResponse = new DisponibilidadResponse();

        disponibilidadResponse.setDiaSemana(disponibilidad.getDiaSemana());
        disponibilidadResponse.setHoraInicio(disponibilidad.getHoraInicio());
        disponibilidadResponse.setHoraFin(disponibilidad.getHoraFin());
        disponibilidadResponse.setMinutosCupo(disponibilidad.getMinutosCupo());

        return disponibilidadResponse;
    }
}
