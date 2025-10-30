package com.salud.portalcitas.dto.cita;

import com.salud.portalcitas.util.enums.EstadoCita;
import com.salud.portalcitas.util.enums.TipoCita;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CitaResponse {

    private Long id;
    private Long pacienteId;
    private Long medicoId;
    private Long cupoId;
    private LocalDate fecha;
    private String horaInicio;
    private String horaFin;
    private TipoCita tipo;
    private EstadoCita estado;
    private String linkVideo;
    private String nombreClinica;
    private String motivoCita;
    private String motivoCancelacion;
}
