package com.salud.portalcitas.service.especialidad;

import com.salud.portalcitas.dto.especialidad.EspecialidadRequest;
import com.salud.portalcitas.dto.especialidad.EspecialidadResponse;
import com.salud.portalcitas.entity.Especialidad;

import java.util.List;

public interface EspecialidadService {

    EspecialidadResponse crear(EspecialidadRequest especialidadRequest);
    List<EspecialidadResponse> listarTodos();
    EspecialidadResponse obtenerPorIdResponse(Long especialidadId);
    Especialidad obtenerPorId(Long especialidadId);
    EspecialidadResponse actualizar(Long especialidadId, EspecialidadRequest especialidadRequest);
    void eliminar(Long especialidadId);
}
