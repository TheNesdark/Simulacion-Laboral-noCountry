package com.salud.portalcitas.service.medico;

import com.salud.portalcitas.dto.medico.MedicoRequest;
import com.salud.portalcitas.dto.medico.MedicoResponse;
import com.salud.portalcitas.dto.medico.MedicoUpdate;
import com.salud.portalcitas.entity.Medico;
import com.salud.portalcitas.mapper.MedicoMapper;
import com.salud.portalcitas.repository.MedicoRepository;
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


    public MedicoResponse crear(MedicoRequest request) {
        Medico medico = medicoMapper.toEntity(request);
        Medico guardado = medicoRepository.save(medico);
        return medicoMapper.toResponse(guardado);
    }

    @Transactional(readOnly = true)
    public MedicoResponse obtenerPorIdResponse(Long medicoId) {
        Medico medico = this.obtenerPorId(medicoId);
        return medicoMapper.toResponse(medico);
    }

    @Transactional(readOnly = true)
    public Medico obtenerPorId(Long medicoId) {
        return medicoRepository.findById(medicoId)
                .orElseThrow(() -> new EntityNotFoundException("El médico no existe"));
    }

    @Transactional(readOnly = true)
    public List<MedicoResponse> listarTodos() {
        return medicoRepository.findAll().stream()
                .map(medicoMapper::toResponse)
                .collect(Collectors.toList());
    }

    public MedicoResponse actualizar(Long medicoId, MedicoUpdate updateDto) {
        Medico existente = obtenerPorId(medicoId);

        medicoMapper.updateEntityFromDto(updateDto, existente);
        Medico saved = medicoRepository.save(existente);
        return medicoMapper.toResponse(saved);
    }

    public void eliminar(Long medicoId) {
        Medico medico = obtenerPorId(medicoId);
        medicoRepository.delete(medico);
    }
}
