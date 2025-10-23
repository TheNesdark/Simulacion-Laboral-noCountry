package com.salud.portalcitas.mapper;

import com.salud.portalcitas.dto.paciente.PacienteRequest;
import com.salud.portalcitas.dto.paciente.PacienteResponse;
import com.salud.portalcitas.entity.Paciente;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PacienteMapper {

    Paciente toEntity(PacienteRequest request);

    PacienteResponse toResponse(Paciente paciente);
}
