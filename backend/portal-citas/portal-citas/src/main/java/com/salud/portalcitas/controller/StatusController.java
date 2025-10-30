package com.salud.portalcitas.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
public class StatusController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> status() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "ok");
        response.put("message", "Portal de Citas - Servidor activo");
        response.put("timestamp", System.currentTimeMillis());
        response.put("service", "Portal de Citas Médicas");
        response.put("version", "1.0.0");
        
        return ResponseEntity.ok(response);
    }
}
