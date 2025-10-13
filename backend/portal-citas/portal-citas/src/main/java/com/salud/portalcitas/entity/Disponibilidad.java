package com.salud.portalcitas.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "disponibilidades")
public class Disponibilidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dia_semana", nullable = false)
    @Min(0)
    @Max(6)
    private int diaSemana;

    @Column(name = "hora_inicio")
    @NotNull(message = "La hora de inicio es obligatoria")
    private LocalTime horaInicio;

    @Column(name = "hora_fin")
    @NotNull(message = "La hora de fin es obligatoria")
    private LocalTime horaFin;

    @Column(name ="minutos_cupo", nullable = false)
    @Min(value = 10, message = "El cupo mínimo debe ser de 10 minutos")
    @Max(value = 30, message = "El cupo máximo debe ser de 30 minutos")
    private int minutosCupo;

    @Column(nullable = false)
    private boolean activa = true;
}
