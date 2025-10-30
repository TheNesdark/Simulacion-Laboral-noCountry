package com.salud.portalcitas.controller;

import com.salud.portalcitas.dto.clinica.ClinicaRequest;
import com.salud.portalcitas.dto.clinica.ClinicaResponse;
import com.salud.portalcitas.dto.medico.MedicoResponse;
import com.salud.portalcitas.service.clinica.ClinicaService;
import com.salud.portalcitas.service.medico.MedicoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clinicas")
@RequiredArgsConstructor
public class ClinicaController {

    private final ClinicaService clinicaService;
    private final MedicoService medicoService;


    @PostMapping
    public ResponseEntity<ClinicaResponse> crear(@RequestBody @Valid ClinicaRequest request) {
        return ResponseEntity.ok(clinicaService.crearClinica(request));
    }

    @GetMapping
    public ResponseEntity<List<ClinicaResponse>> listar() {
        return ResponseEntity.ok(clinicaService.listarClinicas());
    }

    @GetMapping("/{clinicaId}")
    public ResponseEntity<ClinicaResponse> obtenerPorIdResponse(@PathVariable Long clinicaId) {
        ClinicaResponse clinicaResponse = clinicaService.obtenerPorIdResponse(clinicaId);
        return ResponseEntity.ok(clinicaResponse);
    }

    @GetMapping("/{clinicaId}/medicos")
    public ResponseEntity<List<MedicoResponse>> obtenerMedicos(@PathVariable Long clinicaId) {
        return ResponseEntity.ok(medicoService.listarMedicosPorClinica(clinicaId));
    }

    @PutMapping("/{clinicaId}")
    public ResponseEntity<ClinicaResponse> actualizar(@PathVariable Long clinicaId,
                                                      @RequestBody @Valid ClinicaRequest clinicaRequest) {
        return ResponseEntity.ok(clinicaService.actualizarClinica(clinicaId, clinicaRequest));
    }

    @DeleteMapping("/{clinicaId}")
    public ResponseEntity<Void> eliminar(@PathVariable Long clinicaId) {
        clinicaService.eliminarClinica(clinicaId);
        return ResponseEntity.noContent().build();
    }
}
