package com.salud.portalcitas.dto.cupo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CupoResponse {

    private Long id;
    private Long disponibilidadId;
    private LocalDate fecha;
    private String horaInicio;
    private String horaFin;
    private Boolean reservado;
}
