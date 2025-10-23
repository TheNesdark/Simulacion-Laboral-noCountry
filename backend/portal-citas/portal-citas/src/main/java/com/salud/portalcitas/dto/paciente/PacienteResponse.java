package com.salud.portalcitas.dto.paciente;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PacienteResponse {

    private Long id;
    private String nombre;
    private String apellido;
    private String telefono;
    private String email;
    private String dni;
    private String fechaNacimiento;
    private Boolean activo;
}
