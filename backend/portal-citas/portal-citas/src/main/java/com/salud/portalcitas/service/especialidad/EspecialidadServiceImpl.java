package com.salud.portalcitas.service.especialidad;

import com.salud.portalcitas.dto.especialidad.EspecialidadRequest;
import com.salud.portalcitas.dto.especialidad.EspecialidadResponse;
import com.salud.portalcitas.entity.Especialidad;
import com.salud.portalcitas.mapper.EspecialidadMapper;
import com.salud.portalcitas.repository.EspecialidadRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EspecialidadServiceImpl implements EspecialidadService{


    private final EspecialidadRepository especialidadRepository;
    private final EspecialidadMapper especialidadMapper;



    @Override
    public EspecialidadResponse crear(EspecialidadRequest especialidadRequest) {
        Especialidad especialidad = especialidadMapper.toEntity(especialidadRequest);
        return especialidadMapper.toResponse(especialidadRepository.save(especialidad));
    }

    @Override
    @Transactional(readOnly = true)
    public List<EspecialidadResponse> listarTodos() {
        return especialidadMapper.toResponseList(especialidadRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public EspecialidadResponse obtenerPorIdResponse(Long especialidadId) {
        return especialidadMapper.toResponse(obtenerPorId(especialidadId));
    }

    @Override
    @Transactional(readOnly = true)
    public Especialidad obtenerPorId(Long especialidadId) {
        return especialidadRepository.findById(especialidadId)
                .orElseThrow(() -> new EntityNotFoundException("Especialidad no encontrada"));
    }

    @Override
    public EspecialidadResponse actualizar(Long especialidadId, EspecialidadRequest especialidadRequest) {
        Especialidad especialidad = obtenerPorId(especialidadId);
        especialidad.setNombre(especialidadRequest.getNombre());
        especialidad.setDescripcion(especialidadRequest.getDescripcion());

        return especialidadMapper.toResponse(especialidadRepository.save(especialidad));
    }

    @Override
    public void eliminar(Long especialidadId) {
        Especialidad especialidad = obtenerPorId(especialidadId);
        especialidadRepository.delete(especialidad);
    }
}
