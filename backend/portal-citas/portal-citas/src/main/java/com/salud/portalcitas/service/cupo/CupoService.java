package com.salud.portalcitas.service.cupo;

import com.salud.portalcitas.dto.cupo.CupoResponse;
import com.salud.portalcitas.entity.Disponibilidad;

import java.time.LocalDate;
import java.util.List;

public interface CupoService {

    public void generarCuposParaDisponibilidad(Disponibilidad disponibilidad, int diasAdelante);
    public void eliminarCuposLibresFuturos(Long disponibilidadId);
    public List<CupoResponse> obtenerCuposDisponiblesPorMedicoYFecha(Long medicoId, LocalDate fecha);
}
