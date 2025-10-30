package com.salud.portalcitas.service.medico;

import com.salud.portalcitas.dto.medico.MedicoRequest;
import com.salud.portalcitas.dto.medico.MedicoResponse;
import com.salud.portalcitas.dto.medico.MedicoUpdate;
import com.salud.portalcitas.entity.Medico;

import java.util.List;

public interface MedicoService {

    public MedicoResponse crear(MedicoRequest request);
    public MedicoResponse obtenerPorIdResponse(Long medicoId);
    public Medico obtenerPorId(Long medicoId);
    public List<MedicoResponse> listarTodos();
    public List<MedicoResponse> listarMedicosPorClinica(Long clinicaId);
    public MedicoResponse actualizar(Long medicoId, MedicoUpdate medicoUpdate);
    public void eliminar(Long medicoId);
}
