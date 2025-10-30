package com.salud.portalcitas.dto.clinica;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClinicaResponse {

    private Long id;
    private String nombre;
    private String direccion;
    private String telefono;
    private String email;
    private String descripcion;
}
