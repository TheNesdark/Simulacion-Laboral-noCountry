package com.salud.portalcitas.dto.medico;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MedicoRequest {

    private String userId;

    @NotBlank
    @Size(max = 100)
    private String nombre;

    @NotBlank
    @Size(max = 100)
    private String apellido;

    @Size(max = 30)
    private String telefono;

    private String genero;
    private String numeroDocumento;
    private LocalDate fechaNacimiento;

    private Long matricula;

    @NotBlank
    @Email
    private String email;

    private Long clinicaId;

    private Long especialidadId;
}
