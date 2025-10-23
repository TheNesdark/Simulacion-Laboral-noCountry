package com.salud.portalcitas.controller;

import com.salud.portalcitas.dto.disponibilidad.DisponibilidadRequest;
import com.salud.portalcitas.dto.disponibilidad.DisponibilidadResponse;
import com.salud.portalcitas.service.disponibilidad.DisponibilidadService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DisponibilidadController {

    private final DisponibilidadService disponibilidadService;



    @GetMapping("/medicos/{medicoId}/disponibilidades")
    public ResponseEntity<List<DisponibilidadResponse>> listarPorMedico(@PathVariable Long medicoId) {
        return ResponseEntity.ok(disponibilidadService.listarPorMedico(medicoId));
    }

    @PostMapping("/medico/{medicoId}/disponibilidades")
    public ResponseEntity<DisponibilidadResponse> crearDisponibilidad(@PathVariable Long medicoId,
                                                                      @RequestBody @Valid DisponibilidadRequest disponibilidadRequest) {
        DisponibilidadResponse disponibilidadResponse = disponibilidadService.crearDisponibilidad(medicoId, disponibilidadRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(disponibilidadResponse);
    }

    @PutMapping("/disponibilidades/{disponibilidadId}")
    public ResponseEntity<DisponibilidadResponse> actualizarDisponibilidad(@PathVariable Long disponibilidadId,
                                                                           @Valid @RequestBody DisponibilidadRequest disponibilidadRequest) {
        DisponibilidadResponse response = disponibilidadService.actualizarDisponibilidad(disponibilidadId, disponibilidadRequest);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/disponibilidades/{disponibilidadId}/activar")
    public ResponseEntity<DisponibilidadResponse> activar(@PathVariable Long disponibilidadId) {
        DisponibilidadResponse response = disponibilidadService.activar(disponibilidadId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/disponibilidades/{disponibilidadId}/desactivar")
    public ResponseEntity<DisponibilidadResponse> desactivar(@PathVariable Long disponibilidadId) {
        DisponibilidadResponse response = disponibilidadService.desactivar(disponibilidadId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/disponibilidades/{disponibilidadId}")
    public ResponseEntity<Void> eliminar(@PathVariable Long disponibilidadId) {
        disponibilidadService.eliminarLogico(disponibilidadId);
        return ResponseEntity.noContent().build();
    }


}
