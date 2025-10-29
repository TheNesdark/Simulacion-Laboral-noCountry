package com.salud.portalcitas.mapper;

import com.salud.portalcitas.dto.especialidad.EspecialidadRequest;
import com.salud.portalcitas.dto.especialidad.EspecialidadResponse;
import com.salud.portalcitas.entity.Especialidad;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EspecialidadMapper {

    Especialidad toEntity(EspecialidadRequest request);

    EspecialidadResponse toResponse(Especialidad entity);

    List<EspecialidadResponse> toResponseList(List<Especialidad> entities);
}
