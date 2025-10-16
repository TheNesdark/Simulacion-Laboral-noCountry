package com.salud.portalcitas.service;

import com.salud.portalcitas.dto.DisponibilidadRequest;
import com.salud.portalcitas.dto.DisponibilidadResponse;
import com.salud.portalcitas.entity.Disponibilidad;

public interface DisponibilidadService {

    public DisponibilidadResponse crearDisponibilidad(DisponibilidadRequest disponibilidadRequest);
}
