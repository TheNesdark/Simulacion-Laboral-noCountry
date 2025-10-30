package com.salud.portalcitas.controller;

import com.salud.portalcitas.dto.paciente.PacienteRequest;
import com.salud.portalcitas.dto.paciente.PacienteResponse;
import com.salud.portalcitas.service.paciente.PacienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@RequiredArgsConstructor
public class PacienteController {

    private final PacienteService pacienteService;

    @PostMapping
    public ResponseEntity<PacienteResponse> crear(@Valid @RequestBody PacienteRequest pacienteRequest) {
        PacienteResponse response = pacienteService.crear(pacienteRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{pacienteId}")
    public ResponseEntity<PacienteResponse> obtener(@PathVariable Long pacienteId) {
        return ResponseEntity.ok(pacienteService.obtenerPorIdResponse(pacienteId));
    }

    @GetMapping
    public ResponseEntity<List<PacienteResponse>> listar() {
        return ResponseEntity.ok(pacienteService.listarTodos());
    }

    @PutMapping("/{pacienteId}")
    public ResponseEntity<PacienteResponse> actualizar(@PathVariable Long pacienteId,
                                                       @Valid @RequestBody PacienteRequest pacienteRequest) {
        return ResponseEntity.ok(pacienteService.actualizar(pacienteId, pacienteRequest));
    }

    @DeleteMapping("/{pacienteId}")
    public ResponseEntity<Void> eliminar(@PathVariable Long pacienteId) {
        pacienteService.eliminarLogico(pacienteId);
        return ResponseEntity.noContent().build();
    }
}