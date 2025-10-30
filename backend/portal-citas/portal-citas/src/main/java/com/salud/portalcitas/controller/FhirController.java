package com.salud.portalcitas.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/fhir")
public class FhirController {



    // Endpoint simulado para obtener datos de un paciente (FHIR)

    @GetMapping("/pacientes/{id}")
    public ResponseEntity<Map<String, Object>> obtenerPaciente(@PathVariable Long id) {

        Map<String, Object> paciente = Map.of(
                "resourceType", "Patient",
                "id", id,
                "identificador", List.of(Map.of(
                        "sistema", "https://hospital.dac.org/pacientes",
                        "valor", "PAC-" + id
                )),
                "nombre", List.of(Map.of(
                        "apellido", "Sanchez",
                        "nombres", List.of("Matias")
                )),
                "genero", "masculino",
                "fechaNacimiento", "1990-05-10",
                "direccion", List.of(Map.of(
                        "linea", List.of("Calle Rivadavia 123"),
                        "ciudad", "Buenos Aires",
                        "pais", "Argentina"
                )),
                "contacto", List.of(Map.of(
                        "tipo", "teléfono",
                        "valor", "+54 11 3455 2872"
                )),
                // Datos clínicos simulados
                "datosClinicos", List.of(
                        Map.of(
                                "tipo", "Grupo sanguíneo",
                                "valor", "O+"
                        ),
                        Map.of(
                                "tipo", "Condición médica",
                                "valor", "Hipertensión arterial"
                        ),
                        Map.of(
                                "tipo", "Tratamiento actual",
                                "valor", "Amlodipina 5mg diarios"
                        ),
                        Map.of(
                                "tipo", "Diagnóstico",
                                "valor", "Hipertensión esencial"
                        ),
                        Map.of(
                                "tipo", "Notas médicas",
                                "valor", "El paciente responde bien al tratamiento actual. Control en 3 meses."
                        )
                )
        );

        return ResponseEntity.ok(paciente);
    }



    // Endpoint simulado para recibir observaciones

    @PostMapping("/observaciones")
    public ResponseEntity<Map<String, Object>> recibirObservaciones(@RequestBody Map<String, Object> observaciones) {

        // Devolvemos una respuesta de éxito sin persistir nada

        Map<String, Object> respuesta = Map.of(
                "mensaje", "Observaciones recibidas correctamente en el sistema externo",
                "cantidadObservaciones", observaciones.size(),
                "estado", "OK"
        );

        return ResponseEntity.ok(respuesta);
    }
}

