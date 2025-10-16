package com.salud.portalcitas.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DisponibilidadRequest {

    @NotNull(message = "El día de la semana es obligatorio")
    @Min(0)
    @Max(6)
    private int diaSemana;

    @NotNull(message = "La hora de inicio es obligatoria")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime horaInicio;

    @NotNull(message = "La hora de fin es obligatoria")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime horaFin;

    @NotNull(message = "Los minutos por cupos son obligatorios")
    @Min(value = 10, message = "El cupo mínimo debe ser de 10 minutos")
    @Max(value = 30, message = "El cupo máximo debe ser de 30 minutos")
    private int minutosCupo;
}
