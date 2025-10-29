package com.salud.portalcitas.dto.medico;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MedicoUpdate {

    @Size(max = 100)
    private String nombre;

    @Size(max = 100)
    private String apellido;

    @Size(max = 30)
    private String telefono;

    private Long matricula;

    @Email
    private String email;
    private Long clinicaId;
    private Long especialidadId;
}
