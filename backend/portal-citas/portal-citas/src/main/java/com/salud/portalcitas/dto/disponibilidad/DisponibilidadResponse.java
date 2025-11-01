package com.salud.portalcitas.dto.disponibilidad;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DisponibilidadResponse {

    private Long id;
    private int diaSemana;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private int minutosCupo;
}
