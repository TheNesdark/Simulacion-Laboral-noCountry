package com.salud.portalcitas.service.paciente;

import com.salud.portalcitas.dto.paciente.PacienteRequest;
import com.salud.portalcitas.dto.paciente.PacienteResponse;
import com.salud.portalcitas.entity.Paciente;
import com.salud.portalcitas.mapper.PacienteMapper;
import com.salud.portalcitas.repository.PacienteRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PacienteServiceImpl implements PacienteService{

    private final PacienteRepository pacienteRepository;
    private final PacienteMapper pacienteMapper;


    @Override
    public PacienteResponse crear(PacienteRequest pacienteRequest) {
        Paciente paciente = pacienteMapper.toEntity(pacienteRequest);
        Paciente guardado = pacienteRepository.save(paciente);
        return pacienteMapper.toResponse(guardado);
    }

    @Transactional(readOnly = true)
    public Paciente obtenerEntidadPorId(Long pacienteId) {
        return pacienteRepository.findById(pacienteId)
                .orElseThrow(() -> new EntityNotFoundException("El paciente no existe"));
    }

    @Override
    @Transactional(readOnly = true)
    public PacienteResponse obtenerPorIdResponse(Long pacienteId) {
        Paciente paciente = this.obtenerEntidadPorId(pacienteId);
        return pacienteMapper.toResponse(paciente);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PacienteResponse> listarTodos() {
        return pacienteRepository.findByActivoTrue().stream()
                .map(pacienteMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PacienteResponse actualizar(Long pacienteId, PacienteRequest pacienteRequest) {
        Paciente paciente = this.obtenerEntidadPorId(pacienteId);

        paciente.setNombre(pacienteRequest.getNombre());
        paciente.setApellido(pacienteRequest.getApellido());
        paciente.setTelefono(pacienteRequest.getTelefono());
        paciente.setDni(pacienteRequest.getDni());
        paciente.setFechaNacimiento(pacienteRequest.getFechaNacimiento());

        Paciente guardado = pacienteRepository.save(paciente);
        return pacienteMapper.toResponse(guardado);
    }

    @Override
    public void eliminarLogico(Long pacienteId) {
        Paciente paciente = this.obtenerEntidadPorId(pacienteId);
        paciente.setActivo(false);
        pacienteRepository.save(paciente);
    }
}
