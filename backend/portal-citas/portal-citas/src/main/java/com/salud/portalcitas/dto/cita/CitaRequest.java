package com.salud.portalcitas.dto.cita;

import com.salud.portalcitas.util.enums.TipoCita;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CitaRequest {

    @NotNull
    private Long cupoId;

    @NotNull
    private Long pacienteId;

    @NotNull
    private TipoCita tipo;

    private String linkVideo;
}
