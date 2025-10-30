# Portal de Citas Médicas - Documentación API

## Información General

**Base URL:** `http://localhost:8080/api`  
**Formato:** JSON  
**Autenticación:** No implementada (development)

---

## 1. Estado del Servidor

### GET `/` - Verificar estado del servidor

**Descripción:** Endpoint para verificar que el servicio esté corriendo.

**Response:**
```json
{
  "status": "ok",
  "message": "Portal de Citas - Servidor activo",
  "timestamp": 1730288400000,
  "service": "Portal de Citas Médicas",
  "version": "1.0.0"
}
```

---

## 2. Pacientes

### GET `/api/pacientes` - Listar todos los pacientes

**Descripción:** Obtiene la lista completa de pacientes.

**Response:**
```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "fechaNacimiento": "1990-05-15",
    "telefono": "+54 11 1234-5678",
    "email": "juan.perez@email.com",
    "direccion": "Av. Corrientes 1234",
    "documento": "12345678",
    "genero": "M",
    "obraSocial": "OSDE",
    "numeroAfiliado": "123-456-789",
    "activo": true
  }
]
```

### GET `/api/pacientes/{pacienteId}` - Obtener paciente por ID

**Parámetros:** `pacienteId` (Long) - ID del paciente

**Response:**
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "fechaNacimiento": "1990-05-15",
  "telefono": "+54 11 1234-5678",
  "email": "juan.perez@email.com",
  "direccion": "Av. Corrientes 1234",
  "documento": "12345678",
  "genero": "M",
  "obraSocial": "OSDE",
  "numeroAfiliado": "123-456-789",
  "activo": true
}
```

### POST `/api/pacientes` - Crear nuevo paciente

**Body:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "fechaNacimiento": "1990-05-15",
  "telefono": "+54 11 1234-5678",
  "email": "juan.perez@email.com",
  "direccion": "Av. Corrientes 1234",
  "documento": "12345678",
  "genero": "M",
  "obraSocial": "OSDE",
  "numeroAfiliado": "123-456-789"
}
```

**Response:** 201 Created

### PUT `/api/pacientes/{pacienteId}` - Actualizar paciente

**Parámetros:** `pacienteId` (Long) - ID del paciente

**Body:** Mismo formato que POST

### DELETE `/api/pacientes/{pacienteId}` - Eliminar paciente (lógico)

**Parámetros:** `pacienteId` (Long) - ID del paciente

**Response:** 204 No Content

---

## 3. Médicos

### GET `/api/medicos` - Listar todos los médicos

**Response:**
```json
[
  {
    "id": 1,
    "nombre": "Dr. Carlos",
    "apellido": "González",
    "especialidad": {
      "id": 1,
      "nombre": "Cardiología",
      "descripcion": "Especialista en enfermedades del corazón"
    },
    "clinica": {
      "id": 1,
      "nombre": "Centro Médico San José",
      "direccion": "Av. Medrano 456"
    },
    "telefono": "+54 11 5555-1234",
    "email": "dr.gonzalez@clinica.com",
    "matricula": "MP 12345",
    "activo": true
  }
]
```

### GET `/api/medicos/{medicoId}` - Obtener médico por ID

### POST `/api/medicos` - Crear nuevo médico

**Body:**
```json
{
  "nombre": "Carlos",
  "apellido": "González",
  "especialidadId": 1,
  "clinicaId": 1,
  "telefono": "+54 11 5555-1234",
  "email": "dr.gonzalez@clinica.com",
  "matricula": "MP 12345"
}
```

### PATCH `/api/medicos/{medicoId}` - Actualizar parcialmente médico

### DELETE `/api/medicos/{medicoId}` - Eliminar médico

### GET `/api/medicos/{medicoId}/cupos-disponibles?fecha=2025-01-15` - Obtener cupos disponibles

**Parámetros Query:**
- `fecha` (LocalDate, requerido) - Fecha en formato YYYY-MM-DD

**Response:**
```json
[
  {
    "id": 1,
    "hora": "09:00",
    "disponible": true
  },
  {
    "id": 2,
    "hora": "09:30",
    "disponible": false
  }
]
```

---

## 4. Citas

### GET `/api/citas` - Listar todas las citas

### POST `/api/citas` - Programar nueva cita

**Body:**
```json
{
  "pacienteId": 1,
  "medicoId": 1,
  "fecha": "2025-01-15",
  "hora": "09:00",
  "tipoConsulta": "Consulta general",
  "observaciones": "Primera consulta"
}
```

**Response:**
```json
{
  "id": 1,
  "paciente": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez"
  },
  "medico": {
    "id": 1,
    "nombre": "Dr. Carlos",
    "apellido": "González",
    "especialidad": "Cardiología"
  },
  "fecha": "2025-01-15",
  "hora": "09:00",
  "estado": "PROGRAMADA",
  "tipoConsulta": "Consulta general",
  "observaciones": "Primera consulta",
  "fechaCreacion": "2025-01-10T10:30:00"
}
```

### PUT `/api/citas/{citaId}/cancelar` - Cancelar cita

**Body:**
```json
{
  "motivoCancelacion": "Paciente canceló por enfermedad"
}
```

### PUT `/api/citas/{citaId}/completar` - Completar cita

### GET `/api/citas/medico/{medicoId}` - Listar citas pendientes por médico

### GET `/api/citas/total/medico/{medicoId}` - Listar todas las citas por médico

### GET `/api/citas/paciente/{pacienteId}` - Listar citas pendientes por paciente

### GET `/api/citas/total/paciente/{pacienteId}` - Listar todas las citas por paciente

### GET `/api/citas/{citaId}` - Obtener cita por ID

---

## 5. Clínicas

### GET `/api/clinicas` - Listar todas las clínicas

**Response:**
```json
[
  {
    "id": 1,
    "nombre": "Centro Médico San José",
    "direccion": "Av. Medrano 456",
    "telefono": "+54 11 4444-1234",
    "email": "contacto@centrosanjose.com",
    "activo": true
  }
]
```

### GET `/api/clinicas/{clinicaId}` - Obtener clínica por ID

### POST `/api/clinicas` - Crear nueva clínica

**Body:**
```json
{
  "nombre": "Centro Médico San José",
  "direccion": "Av. Medrano 456",
  "telefono": "+54 11 4444-1234",
  "email": "contacto@centrosanjose.com"
}
```

### PUT `/api/clinicas/{clinicaId}` - Actualizar clínica

### DELETE `/api/clinicas/{clinicaId}` - Eliminar clínica

### GET `/api/clinicas/{clinicaId}/medicos` - Listar médicos de una clínica

---

## 6. Especialidades

### GET `/api/especialidades` - Listar todas las especialidades

**Response:**
```json
[
  {
    "id": 1,
    "nombre": "Cardiología",
    "descripcion": "Especialista en enfermedades del corazón",
    "activo": true
  }
]
```

### GET `/api/especialidades/{especialidadId}` - Obtener especialidad por ID

### POST `/api/especialidades` - Crear nueva especialidad

**Body:**
```json
{
  "nombre": "Cardiología",
  "descripcion": "Especialista en enfermedades del corazón"
}
```

### PUT `/api/especialidades/{especialidadId}` - Actualizar especialidad

### DELETE `/api/especialidades/{especialidadId}` - Eliminar especialidad

---

## 7. Disponibilidades

### GET `/api/medicos/{medicoId}/disponibilidades` - Listar disponibilidades por médico

**Response:**
```json
[
  {
    "id": 1,
    "diaSemana": "LUNES",
    "horaInicio": "08:00",
    "horaFin": "12:00",
    "duracionMinutos": 30,
    "activo": true
  }
]
```

### POST `/api/medicos/{medicoId}/disponibilidades` - Crear disponibilidad

**Body:**
```json
{
  "diaSemana": "LUNES",
  "horaInicio": "08:00",
  "horaFin": "12:00",
  "duracionMinutos": 30
}
```

### PUT `/api/disponibilidades/{disponibilidadId}` - Actualizar disponibilidad

### PATCH `/api/disponibilidades/{disponibilidadId}/activar` - Activar disponibilidad

### PATCH `/api/disponibilidades/{disponibilidadId}/desactivar` - Desactivar disponibilidad

### DELETE `/api/disponibilidades/{disponibilidadId}` - Eliminar disponibilidad (lógico)

**Nota:** Los días de la semana pueden ser: LUNES, MARTES, MIÉRCOLES, JUEVES, VIERNES, SÁBADO, DOMINGO

---

## 8. Integración FHIR

### GET `/api/fhir/pacientes/{id}` - Obtener datos FHIR del paciente

**Descripción:** Endpoint simulado para obtener datos de un paciente en formato FHIR.

**Response:**
```json
{
  "resourceType": "Patient",
  "id": 1,
  "identificador": [
    {
      "sistema": "https://hospital.dac.org/pacientes",
      "valor": "PAC-1"
    }
  ],
  "nombre": [
    {
      "apellido": "Sanchez",
      "nombres": ["Matias"]
    }
  ],
  "genero": "masculino",
  "fechaNacimiento": "1990-05-10",
  "direccion": [
    {
      "linea": ["Calle Rivadavia 123"],
      "ciudad": "Buenos Aires",
      "pais": "Argentina"
    }
  ],
  "contacto": [
    {
      "tipo": "teléfono",
      "valor": "+54 11 3455 2872"
    }
  ],
  "datosClinicos": [
    {
      "tipo": "Grupo sanguíneo",
      "valor": "O+"
    },
    {
      "tipo": "Condición médica",
      "valor": "Hipertensión arterial"
    }
  ]
}
```

### POST `/api/fhir/observaciones` - Recibir observaciones FHIR

**Body:** JSON con observaciones en formato FHIR

**Response:**
```json
{
  "mensaje": "Observaciones recibidas correctamente en el sistema externo",
  "cantidadObservaciones": 5,
  "estado": "OK"
}
```

---

## Códigos de Estado HTTP

- `200 OK` - Operación exitosa
- `201 Created` - Recurso creado exitosamente
- `204 No Content` - Operación exitosa sin contenido de respuesta
- `400 Bad Request` - Error en la solicitud (datos inválidos)
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error interno del servidor

---

## Notas Importantes

1. **Validación:** Todos los endpoints que reciben datos validan la información según las reglas definidas en los DTOs.

2. **Eliminación lógica:** Los endpoints DELETE marcan los registros como inactivos en lugar de eliminarlos físicamente.

3. **Integración con Google Calendar:** La API está configurada para integrarse con Google Calendar para la gestión automática de citas.

4. **FHIR:** Los endpoints FHIR están simulados y no persisten datos en la base de datos.

5. **Timestamps:** Los campos de fecha y hora deben enviarse en formato ISO 8601.

---

## Configuración del Servidor

**Puerto por defecto:** 8080  
**Base de datos:** PostgreSQL (configurable via variables de entorno)  
**Integraciones:**
- Google Calendar API
- Servicio de email (Gmail SMTP)
