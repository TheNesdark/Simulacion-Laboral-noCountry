package com.salud.portalcitas.dto.especialidad;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadRequest {

    @NotBlank
    private String nombre;

    private String descripcion;
}
