package com.salud.portalcitas.controller;

import com.salud.portalcitas.dto.cupo.CupoResponse;
import com.salud.portalcitas.dto.medico.MedicoRequest;
import com.salud.portalcitas.dto.medico.MedicoResponse;
import com.salud.portalcitas.dto.medico.MedicoUpdate;
import com.salud.portalcitas.service.cupo.CupoService;
import com.salud.portalcitas.service.medico.MedicoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/medicos")
@RequiredArgsConstructor
public class MedicoController {

    private final MedicoService medicoService;
    private final CupoService cupoService;


    @PostMapping
    public ResponseEntity<MedicoResponse> crear(@Valid @RequestBody MedicoRequest medicoRequest) {
        MedicoResponse medicoResponse = medicoService.crear(medicoRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(medicoResponse);
    }

    @GetMapping("/{medicoId}")
    public ResponseEntity<MedicoResponse> obtener(@PathVariable Long medicoId) {
        MedicoResponse medicoResponse = medicoService.obtenerPorIdResponse(medicoId);
        return ResponseEntity.ok(medicoResponse);
    }

    @GetMapping
    public ResponseEntity<List<MedicoResponse>> listar() {
        return ResponseEntity.ok(medicoService.listarTodos());
    }

    @PatchMapping("/{medicoId}")
    public ResponseEntity<MedicoResponse> actualizarParcial(@PathVariable Long medicoId,
                                                            @Valid @RequestBody MedicoUpdate medicoUpdate) {
        MedicoResponse medicoResponse = medicoService.actualizar(medicoId, medicoUpdate);
        return ResponseEntity.ok(medicoResponse);
    }

    @DeleteMapping("/{medicoId}")
    public ResponseEntity<Void> eliminar(@PathVariable Long medicoId) {
        medicoService.eliminar(medicoId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{medicoId}/cupos-disponibles")
    public List<CupoResponse> obtenerCuposDisponibles(
            @PathVariable Long medicoId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return cupoService.obtenerCuposDisponiblesPorMedicoYFecha(medicoId, fecha);
    }
}
