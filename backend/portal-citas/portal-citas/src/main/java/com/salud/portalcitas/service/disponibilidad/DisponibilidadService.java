package com.salud.portalcitas.service.disponibilidad;

import com.salud.portalcitas.dto.disponibilidad.DisponibilidadRequest;
import com.salud.portalcitas.dto.disponibilidad.DisponibilidadResponse;

public interface DisponibilidadService {

    public DisponibilidadResponse crearDisponibilidad(Long medicoId, DisponibilidadRequest disponibilidadRequest);
}
