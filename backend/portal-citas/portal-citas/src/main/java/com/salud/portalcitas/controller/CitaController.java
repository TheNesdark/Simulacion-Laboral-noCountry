package com.salud.portalcitas.controller;

import com.salud.portalcitas.dto.cita.CitaCancelRequest;
import com.salud.portalcitas.dto.cita.CitaRequest;
import com.salud.portalcitas.dto.cita.CitaResponse;
import com.salud.portalcitas.service.cita.CitaService;
import com.salud.portalcitas.service.cupo.CupoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@RequiredArgsConstructor
public class CitaController {

    private final CitaService citaService;



    @PostMapping
    public ResponseEntity<CitaResponse> crear(@Valid @RequestBody CitaRequest citaRequest) {
        CitaResponse response = citaService.programarCita(citaRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{citaId}/cancelar")
    public ResponseEntity<CitaResponse> cancelar(@PathVariable Long citaId,
                                                 @RequestBody CitaCancelRequest cancelRequest) {
        String motivo = cancelRequest != null ? cancelRequest.getMotivoCancelacion() : "Motivo no especificado";
        CitaResponse response = citaService.cancelarCita(citaId, motivo);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{citaId}/completar")
    public ResponseEntity<CitaResponse> completar(@PathVariable Long citaId) {
        CitaResponse response = citaService.completarCita(citaId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/medico/{medicoId}")
    public ResponseEntity<List<CitaResponse>> listarCitasPendientesPorMedico(@PathVariable Long medicoId) {
        return ResponseEntity.ok(citaService.listarCitasPendientesPorMedico(medicoId));
    }

    @GetMapping("/total/medico/{medicoId}")
    public ResponseEntity<List<CitaResponse>> listarTotalCitasPorMedico(@PathVariable Long medicoId) {
        return ResponseEntity.ok(citaService.listarTotalCitasPorMedico(medicoId));
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<CitaResponse>> listarCitasPendientesPorPaciente(@PathVariable Long pacienteId) {
        return ResponseEntity.ok(citaService.listarCitasPendientesPorPaciente(pacienteId));
    }

    @GetMapping("/total/paciente/{pacienteId}")
    public ResponseEntity<List<CitaResponse>> listarTotalCitasPorPaciente(@PathVariable Long pacienteId) {
        return ResponseEntity.ok(citaService.listarTotalCitasPorPaciente(pacienteId));
    }

    @GetMapping("/{citaId}")
    public ResponseEntity<CitaResponse> obtener(@PathVariable Long citaId) {
        return ResponseEntity.ok(citaService.obtenerPorId(citaId));
    }
}
