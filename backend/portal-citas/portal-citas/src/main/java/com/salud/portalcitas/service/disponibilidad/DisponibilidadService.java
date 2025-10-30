package com.salud.portalcitas.service.disponibilidad;

import com.salud.portalcitas.dto.disponibilidad.DisponibilidadRequest;
import com.salud.portalcitas.dto.disponibilidad.DisponibilidadResponse;

import java.util.List;

public interface DisponibilidadService {

    public List<DisponibilidadResponse> listarPorMedico(Long medicoId);
    public DisponibilidadResponse crearDisponibilidad(Long medicoId, DisponibilidadRequest disponibilidadRequest);
    public DisponibilidadResponse actualizarDisponibilidad(Long disponibilidadId, DisponibilidadRequest disponibilidadRequest);
    public DisponibilidadResponse activar(Long disponibilidadId);
    public DisponibilidadResponse desactivar(Long disponibilidadId);
    public void eliminarLogico(Long disponibilidadId);
}
