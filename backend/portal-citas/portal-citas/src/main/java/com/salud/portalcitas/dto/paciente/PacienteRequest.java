package com.salud.portalcitas.dto.paciente;

import jakarta.validation.constraints.Email;
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

    private String userId;

    @NotBlank
    private String nombre;

    @NotBlank
    private String apellido;

    private String telefono;
    private String genero;
    private String numeroDocumento;

    @NotBlank
    @Email
    private String email;

    private LocalDate fechaNacimiento;
}
