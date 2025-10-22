package com.salud.portalcitas.service.cupo;

import com.salud.portalcitas.dto.cupo.CupoResponse;
import com.salud.portalcitas.entity.Disponibilidad;

import java.time.LocalDate;
import java.util.List;

public interface CupoService {

    void generarCuposParaDisponibilidad(Disponibilidad disponibilidad, int diasAdelante);
    List<CupoResponse> obtenerCuposDisponiblesPorMedicoYFecha(Long medicoId, LocalDate fecha);
}
