package com.salud.portalcitas.mapper;

import com.salud.portalcitas.dto.medico.MedicoRequest;
import com.salud.portalcitas.dto.medico.MedicoResponse;
import com.salud.portalcitas.dto.medico.MedicoUpdate;
import com.salud.portalcitas.entity.Medico;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", uses = ClinicaMapper.class)
public interface MedicoMapper {

    Medico toEntity(MedicoRequest request);

    MedicoResponse toResponse(Medico medico);

    List<MedicoResponse> toResponseList(List<Medico> entities);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(MedicoUpdate dto, @MappingTarget Medico entity);
}
