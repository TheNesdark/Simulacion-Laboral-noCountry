package com.salud.portalcitas.dto.paciente;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PacienteRequest {

    @NotBlank
    private String nombre;

    @NotBlank
    private String apellido;

    private String telefono;

    @NotNull
    private String email;

    @NotBlank
    private String dni;

    @NotNull
    private LocalDate fechaNacimiento;
}
