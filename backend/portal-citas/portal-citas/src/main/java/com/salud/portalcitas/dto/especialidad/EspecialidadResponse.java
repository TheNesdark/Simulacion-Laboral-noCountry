package com.salud.portalcitas.dto.especialidad;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadResponse {

    private Long id;
    private String nombre;
    private String descripcion;
}
