package com.salud.portalcitas.controller;

import com.salud.portalcitas.dto.DisponibilidadRequest;
import com.salud.portalcitas.dto.DisponibilidadResponse;
import com.salud.portalcitas.entity.Disponibilidad;
import com.salud.portalcitas.service.DisponibilidadService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.bind.Name;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/disponibilidad")
@RequiredArgsConstructor
public class DisponibilidadController {

    private final DisponibilidadService disponibilidadService;

    @PostMapping()
    public ResponseEntity<DisponibilidadResponse> crearDisponibilidad(@RequestBody @Valid DisponibilidadRequest disponibilidadRequest) {
        DisponibilidadResponse disponibilidadResponse = disponibilidadService.crearDisponibilidad(disponibilidadRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(disponibilidadResponse);
    }
}
