package com.salud.portalcitas.mapper;

import com.salud.portalcitas.dto.medico.MedicoRequest;
import com.salud.portalcitas.dto.medico.MedicoResponse;
import com.salud.portalcitas.dto.medico.MedicoUpdate;
import com.salud.portalcitas.entity.Medico;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface MedicoMapper {

    Medico toEntity(MedicoRequest request);

    MedicoResponse toResponse(Medico medico);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(MedicoUpdate dto, @MappingTarget Medico entity);
}
