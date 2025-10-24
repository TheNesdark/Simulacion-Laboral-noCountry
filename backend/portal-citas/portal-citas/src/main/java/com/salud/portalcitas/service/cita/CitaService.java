package com.salud.portalcitas.service.cita;

import com.salud.portalcitas.dto.cita.CitaRequest;
import com.salud.portalcitas.dto.cita.CitaResponse;

import java.util.List;

public interface CitaService {

    CitaResponse programarCita(CitaRequest citaRequest);
    CitaResponse cancelarCita(Long citaId, String motivo);
    CitaResponse completarCita(Long citaId);
    List<CitaResponse> listarPorPaciente(Long pacienteId);
    List<CitaResponse> listarPorMedico(Long medicoId);
    public CitaResponse obtenerPorId(Long id);
}
