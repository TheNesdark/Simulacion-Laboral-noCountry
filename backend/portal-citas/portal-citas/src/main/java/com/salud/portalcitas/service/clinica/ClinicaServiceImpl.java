package com.salud.portalcitas.service.clinica;

import com.salud.portalcitas.dto.clinica.ClinicaRequest;
import com.salud.portalcitas.dto.clinica.ClinicaResponse;
import com.salud.portalcitas.entity.Clinica;
import com.salud.portalcitas.mapper.ClinicaMapper;
import com.salud.portalcitas.repository.ClinicaRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClinicaServiceImpl implements ClinicaService{

    private final ClinicaRepository clinicaRepository;
    private final ClinicaMapper clinicaMapper;


    @Override
    public ClinicaResponse crearClinica(ClinicaRequest clinicaRequest) {
        Clinica clinica = clinicaMapper.toEntity(clinicaRequest);
        return clinicaMapper.toResponse(clinicaRepository.save(clinica));
    }

    @Override
    public List<ClinicaResponse> listarClinicas() {
        return clinicaMapper.toResponseList(clinicaRepository.findAll());
    }

    @Override
    public Clinica obtenerPorId(Long clinicaId) {
        return clinicaRepository.findById(clinicaId)
                .orElseThrow(() -> new EntityNotFoundException("Clínica no encontrada"));
    }

    @Override
    public ClinicaResponse obtenerPorIdResponse(Long clinicaId) {
        Clinica clinica = this.obtenerPorId(clinicaId);
        return clinicaMapper.toResponse(clinica);
    }

    @Override
    public ClinicaResponse actualizarClinica(Long clinicaId, ClinicaRequest clinicaRequest) {
        Clinica clinica = obtenerPorId(clinicaId);

        clinica.setNombre(clinicaRequest.getNombre());
        clinica.setDireccion(clinicaRequest.getDireccion());
        clinica.setDescripcion(clinicaRequest.getDescripcion());
        clinica.setTelefono(clinicaRequest.getTelefono());
        clinica.setEmail(clinicaRequest.getEmail());

        return clinicaMapper.toResponse(clinicaRepository.save(clinica));
    }

    @Override
    public void eliminarClinica(Long clinicaId) {
        Clinica clinica = obtenerPorId(clinicaId);
        clinicaRepository.delete(clinica);
    }
}
