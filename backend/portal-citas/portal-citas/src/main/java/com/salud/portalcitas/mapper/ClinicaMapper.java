package com.salud.portalcitas.mapper;

import com.salud.portalcitas.dto.clinica.ClinicaRequest;
import com.salud.portalcitas.dto.clinica.ClinicaResponse;
import com.salud.portalcitas.entity.Clinica;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClinicaMapper {

    Clinica toEntity(ClinicaRequest request);
    ClinicaResponse toResponse(Clinica entity);
    List<ClinicaResponse> toResponseList(List<Clinica> entities);
}
