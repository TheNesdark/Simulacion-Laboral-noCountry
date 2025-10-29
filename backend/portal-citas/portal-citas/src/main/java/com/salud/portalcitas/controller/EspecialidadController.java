package com.salud.portalcitas.controller;

import com.salud.portalcitas.dto.especialidad.EspecialidadRequest;
import com.salud.portalcitas.dto.especialidad.EspecialidadResponse;
import com.salud.portalcitas.service.especialidad.EspecialidadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/especialidades")
@RequiredArgsConstructor
public class EspecialidadController {

    private final EspecialidadService especialidadService;


    @PostMapping
    public ResponseEntity<EspecialidadResponse> crear(@Valid @RequestBody EspecialidadRequest especialidadRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(especialidadService.crear(especialidadRequest));
    }

    @GetMapping
    public ResponseEntity<List<EspecialidadResponse>> listar() {
        return ResponseEntity.ok(especialidadService.listarTodos());
    }

    @GetMapping("/{especialidadId}")
    public ResponseEntity<EspecialidadResponse> obtener(@PathVariable Long especialidadId) {
        return ResponseEntity.ok(especialidadService.obtenerPorIdResponse(especialidadId));
    }

    @PutMapping("/{especialidadId}")
    public ResponseEntity<EspecialidadResponse> actualizar(@PathVariable Long especialidadId,
                                                           @Valid @RequestBody EspecialidadRequest especialidadRequest) {
        return ResponseEntity.ok(especialidadService.actualizar(especialidadId, especialidadRequest));
    }

    @DeleteMapping("/{especialidadId}")
    public ResponseEntity<Void> eliminar(@PathVariable Long especialidadId) {
        especialidadService.eliminar(especialidadId);
        return ResponseEntity.noContent().build();
    }
}
