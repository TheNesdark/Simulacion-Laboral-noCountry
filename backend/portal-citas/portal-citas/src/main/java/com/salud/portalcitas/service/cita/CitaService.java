package com.salud.portalcitas.service.cita;

import com.salud.portalcitas.dto.cita.CitaRequest;
import com.salud.portalcitas.dto.cita.CitaResponse;

import java.util.List;

public interface CitaService {

    CitaResponse programarCita(CitaRequest citaRequest);
    CitaResponse cancelarCita(Long citaId, String motivo);
    CitaResponse completarCita(Long citaId);
    List<CitaResponse> listarCitasPendientesPorPaciente(Long pacienteId);
    List<CitaResponse> listarTotalCitasPorPaciente(Long pacienteId);
    List<CitaResponse> listarCitasPendientesPorMedico(Long medicoId);
    List<CitaResponse> listarTotalCitasPorMedico(Long medicoId);
    List<CitaResponse> listarCitasDeHoyPorPaciente(Long pacienteId);
    List<CitaResponse> listarCitasDeHoyPorMedico(Long medicoId);
    public CitaResponse obtenerPorId(Long id);
}
