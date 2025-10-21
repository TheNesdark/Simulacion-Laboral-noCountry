package com.salud.portalcitas.controller;

import com.salud.portalcitas.dto.DisponibilidadRequest;
import com.salud.portalcitas.dto.DisponibilidadResponse;
import com.salud.portalcitas.service.disponibilidad.DisponibilidadService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/disponibilidad")
@RequiredArgsConstructor
public class DisponibilidadController {

    private final DisponibilidadService disponibilidadService;

    @PostMapping("/{medicoId}")
    public ResponseEntity<DisponibilidadResponse> crearDisponibilidad(@PathVariable @NotNull Long medicoId,
                                                                      @RequestBody @Valid DisponibilidadRequest disponibilidadRequest) {
        DisponibilidadResponse disponibilidadResponse = disponibilidadService.crearDisponibilidad(medicoId, disponibilidadRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(disponibilidadResponse);
    }
}
