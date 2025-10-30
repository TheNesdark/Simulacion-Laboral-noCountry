package com.salud.portalcitas.mapper;

import com.salud.portalcitas.dto.medico.MedicoRequest;
import com.salud.portalcitas.dto.medico.MedicoResponse;
import com.salud.portalcitas.dto.medico.MedicoUpdate;
import com.salud.portalcitas.entity.Medico;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = ClinicaMapper.class)
public interface MedicoMapper {

    Medico toEntity(MedicoRequest request);

    @Mapping(target = "clinicaId", source = "clinica.id")
    @Mapping(target = "nombreClinica", source = "clinica.nombre")
    @Mapping(target = "especialidadId", source = "especialidad.id")
    @Mapping(target = "nombreEspecialidad", source = "especialidad.nombre")
    MedicoResponse toResponse(Medico medico);

    List<MedicoResponse> toResponseList(List<Medico> entities);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(MedicoUpdate dto, @MappingTarget Medico entity);
}
