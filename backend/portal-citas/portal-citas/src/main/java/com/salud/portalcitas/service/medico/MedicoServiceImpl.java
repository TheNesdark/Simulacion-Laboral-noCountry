package com.salud.portalcitas.service.medico;

import com.salud.portalcitas.dto.medico.MedicoRequest;
import com.salud.portalcitas.dto.medico.MedicoResponse;
import com.salud.portalcitas.dto.medico.MedicoUpdate;
import com.salud.portalcitas.entity.Clinica;
import com.salud.portalcitas.entity.Medico;
import com.salud.portalcitas.mapper.MedicoMapper;
import com.salud.portalcitas.repository.MedicoRepository;
import com.salud.portalcitas.service.clinica.ClinicaService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicoServiceImpl implements MedicoService{

    private final MedicoRepository medicoRepository;
    private final MedicoMapper medicoMapper;
    private final ClinicaService clinicaService;


    @Override
    public MedicoResponse crear(MedicoRequest medicoRequest) {
        Clinica clinica = clinicaService.obtenerPorId(medicoRequest.getClinicaId());
        Medico medico = medicoMapper.toEntity(medicoRequest);
        medico.setClinica(clinica);
        Medico guardado = medicoRepository.save(medico);
        return medicoMapper.toResponse(guardado);
    }

    @Override
    @Transactional(readOnly = true)
    public MedicoResponse obtenerPorIdResponse(Long medicoId) {
        Medico medico = this.obtenerPorId(medicoId);
        return medicoMapper.toResponse(medico);
    }
    @Override
    @Transactional(readOnly = true)
    public Medico obtenerPorId(Long medicoId) {
        return medicoRepository.findById(medicoId)
                .orElseThrow(() -> new EntityNotFoundException("El médico no existe"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<MedicoResponse> listarTodos() {
        return medicoRepository.findAll().stream()
                .map(medicoMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<MedicoResponse> listarMedicosPorClinica(Long clinicaId) {
        return medicoMapper.toResponseList(medicoRepository.findByClinicaId(clinicaId));
    }

    @Override
    public MedicoResponse actualizar(Long medicoId, MedicoUpdate medicoUpdate) {
        Medico existente = obtenerPorId(medicoId);

        medicoMapper.updateEntityFromDto(medicoUpdate, existente);

        if (medicoUpdate.getClinicaId() != null) {
            Clinica clinica = clinicaService.obtenerPorId(medicoUpdate.getClinicaId());
            existente.setClinica(clinica);
        }

        Medico saved = medicoRepository.save(existente);
        return medicoMapper.toResponse(saved);
    }

    @Override
    public void eliminar(Long medicoId) {
        Medico medico = obtenerPorId(medicoId);
        medicoRepository.delete(medico);
    }
}
