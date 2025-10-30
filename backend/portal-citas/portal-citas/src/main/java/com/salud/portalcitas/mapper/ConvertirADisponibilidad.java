package com.salud.portalcitas.mapper;

import com.salud.portalcitas.dto.disponibilidad.DisponibilidadRequest;
import com.salud.portalcitas.entity.Disponibilidad;
import org.springframework.stereotype.Component;

@Component
public class ConvertirADisponibilidad {

    public Disponibilidad convertir(DisponibilidadRequest disponibilidadRequest) {

        Disponibilidad disponibilidad = new Disponibilidad();

        disponibilidad.setDiaSemana(disponibilidadRequest.getDiaSemana());
        disponibilidad.setHoraInicio(disponibilidadRequest.getHoraInicio());
        disponibilidad.setHoraFin(disponibilidadRequest.getHoraFin());
        disponibilidad.setMinutosCupo(disponibilidadRequest.getMinutosCupo());

        return disponibilidad;
    }
}
