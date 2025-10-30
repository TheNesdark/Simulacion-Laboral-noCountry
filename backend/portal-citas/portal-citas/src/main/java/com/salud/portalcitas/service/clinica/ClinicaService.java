package com.salud.portalcitas.service.clinica;

import com.salud.portalcitas.dto.clinica.ClinicaRequest;
import com.salud.portalcitas.dto.clinica.ClinicaResponse;
import com.salud.portalcitas.entity.Clinica;

import java.util.List;


public interface ClinicaService {

    public ClinicaResponse crearClinica(ClinicaRequest clinicaRequest);
    public List<ClinicaResponse> listarClinicas();
    public Clinica obtenerPorId(Long clinicaId);
    public ClinicaResponse obtenerPorIdResponse(Long clinicaId);
    public ClinicaResponse actualizarClinica(Long clinicaId, ClinicaRequest clinicaRequest);
    public void eliminarClinica(Long clinicaId);
}
