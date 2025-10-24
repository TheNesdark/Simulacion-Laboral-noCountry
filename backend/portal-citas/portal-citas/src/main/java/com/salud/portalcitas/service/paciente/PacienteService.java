package com.salud.portalcitas.service.paciente;

import com.salud.portalcitas.dto.paciente.PacienteRequest;
import com.salud.portalcitas.dto.paciente.PacienteResponse;
import com.salud.portalcitas.entity.Paciente;

import java.util.List;

public interface PacienteService {

    PacienteResponse crear(PacienteRequest pacienteRequest);
    PacienteResponse obtenerPorIdResponse(Long pacienteId);
    List<PacienteResponse> listarTodos();
    PacienteResponse actualizar(Long pacienteId, PacienteRequest pacienteRequest);
    void eliminarLogico(Long pacienteId);

    public Paciente obtenerEntidadPorId(Long pacienteId);
}
