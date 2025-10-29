package com.salud.portalcitas.dto.medico;

import com.salud.portalcitas.dto.clinica.ClinicaResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MedicoResponse {

    private Long id;
    private String userId;
    private String nombre;
    private String apellido;
    private String telefono;
    private Long matricula;
    private String email;

    private Long clinicaId;
    private String nombreClinica;

    private Long especialidadId;
    private String nombreEspecialidad;

}
