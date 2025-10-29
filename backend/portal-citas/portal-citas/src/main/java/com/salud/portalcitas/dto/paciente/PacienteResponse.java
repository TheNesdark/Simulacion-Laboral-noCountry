package com.salud.portalcitas.dto.paciente;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PacienteResponse {

    private Long id;
    private String userId;
    private String nombre;
    private String apellido;
    private String telefono;
    private String email;
    private String genero;
    private String numeroDocumento;
    private LocalDate fechaNacimiento;
    private Boolean activo;
}
