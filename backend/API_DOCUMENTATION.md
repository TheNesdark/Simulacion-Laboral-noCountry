# Documentación de la API Portal Citas

## Introducción

Esta documentación describe los endpoints disponibles en la API del sistema Portal Citas, una aplicación para la gestión de citas médicas.

## Configuración del Servidor

- **URL Base**: `http://localhost:8000`
- **Prefijo de Rutas**: `/api`

## Autenticación

La API no implementa un sistema de autenticación específico en los controladores revisados. Se recomienda implementar autenticación JWT o similar para producción.

## Endpoints

### 1. Health Check

#### `GET /`
Verifica el estado del servidor.

**Respuesta:**
```json
{
  "status": "active",
  "message": "Backend is running"
}
```

### 2. Gestión de Citas

#### `POST /api/citas`
Programa una nueva cita.

**Cuerpo de la solicitud:**
```json
{
  "cupoId": 1,
  "pacienteId": 1,
  "tipo": "PRESENCIAL",
  "motivoCita": "Consulta de rutina",
  "linkVideo": "string (opcional)"
}
```

**Respuesta:**
```json
{
  "id": 1,
  "pacienteId": 1,
  "medicoId": 1,
  "cupoId": 1,
  "fecha": "2023-10-01",
  "horaInicio": "09:00",
  "horaFin": "09:30",
  "tipo": "PRESENCIAL",
  "estado": "PROGRAMADA",
  "linkVideo": "string",
  "nombreClinica": "Clínica Central",
  "motivoCita": "Consulta de rutina",
  "motivoCancelacion": "string"
}
```

#### `PUT /api/citas/{citaId}/cancelar`
Cancela una cita existente.

**Parámetros:**
- `citaId` (path): ID de la cita a cancelar

**Cuerpo de la solicitud:**
```json
{
  "motivoCancelacion": "Motivo de cancelación"
}
```

#### `PUT /api/citas/{citaId}/completar`
Marca una cita como completada.

**Parámetros:**
- `citaId` (path): ID de la cita a completar

#### `GET /api/citas/medico/{medicoId}`
Obtiene las citas pendientes de un médico.

**Parámetros:**
- `medicoId` (path): ID del médico

#### `GET /api/citas/total/medico/{medicoId}`
Obtiene todas las citas de un médico.

**Parámetros:**
- `medicoId` (path): ID del médico

#### `GET /api/citas/paciente/{pacienteId}`
Obtiene las citas pendientes de un paciente.

**Parámetros:**
- `pacienteId` (path): ID del paciente

#### `GET /api/citas/total/paciente/{pacienteId}`
Obtiene todas las citas de un paciente.

**Parámetros:**
- `pacienteId` (path): ID del paciente

#### `GET /api/citas/{citaId}`
Obtiene los detalles de una cita específica.

**Parámetros:**
- `citaId` (path): ID de la cita

### 3. Gestión de Clínicas

#### `POST /api/clinicas`
Crea una nueva clínica.

**Cuerpo de la solicitud:**
```json
{
  "nombre": "Clínica Central",
  "direccion": "Calle Principal 123",
  "telefono": "123456789",
  "email": "info@clinicacentral.com",
  "descripcion": "Clínica de atención primaria"
}
```

**Respuesta:**
```json
{
  "id": 1,
  "nombre": "Clínica Central",
  "direccion": "Calle Principal 123",
  "telefono": "123456789",
  "email": "info@clinicacentral.com",
  "descripcion": "Clínica de atención primaria"
}
```

#### `GET /api/clinicas`
Obtiene la lista de todas las clínicas.

#### `GET /api/clinicas/{clinicaId}`
Obtiene los detalles de una clínica específica.

**Parámetros:**
- `clinicaId` (path): ID de la clínica

#### `GET /api/clinicas/{clinicaId}/medicos`
Obtiene los médicos asociados a una clínica.

**Parámetros:**
- `clinicaId` (path): ID de la clínica

#### `PUT /api/clinicas/{clinicaId}`
Actualiza los datos de una clínica.

**Parámetros:**
- `clinicaId` (path): ID de la clínica

**Cuerpo de la solicitud:**
```json
{
  "nombre": "Clínica Central",
  "direccion": "Calle Principal 123",
  "telefono": "123456789",
  "email": "info@clinicacentral.com",
  "descripcion": "Clínica de atención primaria actualizada"
}
```

#### `DELETE /api/clinicas/{clinicaId}`
Elimina una clínica.

**Parámetros:**
- `clinicaId` (path): ID de la clínica

### 4. Gestión de Disponibilidad

#### `GET /api/medicos/{medicoId}/disponibilidades`
Obtiene las disponibilidades de un médico.

**Parámetros:**
- `medicoId` (path): ID del médico

#### `POST /api/medicos/{medicoId}/disponibilidades`
Crea una nueva disponibilidad para un médico.

**Parámetros:**
- `medicoId` (path): ID del médico

**Cuerpo de la solicitud:**
```json
{
  "diaSemana": 1,
  "horaInicio": "09:00",
  "horaFin": "17:00",
  "minutosCupo": 30
}
```

#### `PUT /api/disponibilidades/{disponibilidadId}`
Actualiza una disponibilidad existente.

**Parámetros:**
- `disponibilidadId` (path): ID de la disponibilidad

**Cuerpo de la solicitud:**
```json
{
  "diaSemana": 1,
  "horaInicio": "09:00",
  "horaFin": "17:00",
  "minutosCupo": 30
}
```

#### `PATCH /api/disponibilidades/{disponibilidadId}/activar`
Activa una disponibilidad.

**Parámetros:**
- `disponibilidadId` (path): ID de la disponibilidad

#### `PATCH /api/disponibilidades/{disponibilidadId}/desactivar`
Desactiva una disponibilidad.

**Parámetros:**
- `disponibilidadId` (path): ID de la disponibilidad

#### `DELETE /api/disponibilidades/{disponibilidadId}`
Elimina una disponibilidad.

**Parámetros:**
- `disponibilidadId` (path): ID de la disponibilidad

### 5. Gestión de Especialidades

#### `POST /api/especialidades`
Crea una nueva especialidad médica.

**Cuerpo de la solicitud:**
```json
{
  "nombre": "Cardiología",
  "descripcion": "Especialidad médica que se enfoca en el corazón"
}
```

**Respuesta:**
```json
{
  "id": 1,
  "nombre": "Cardiología",
  "descripcion": "Especialidad médica que se enfoca en el corazón"
}
```

#### `GET /api/especialidades`
Obtiene la lista de todas las especialidades.

#### `GET /api/especialidades/{especialidadId}`
Obtiene los detalles de una especialidad específica.

**Parámetros:**
- `especialidadId` (path): ID de la especialidad

#### `PUT /api/especialidades/{especialidadId}`
Actualiza una especialidad.

**Parámetros:**
- `especialidadId` (path): ID de la especialidad

**Cuerpo de la solicitud:**
```json
{
  "nombre": "Cardiología",
  "descripcion": "Especialidad médica que se enfoca en el corazón y vasos sanguíneos"
}
```

#### `DELETE /api/especialidades/{especialidadId}`
Elimina una especialidad.

**Parámetros:**
- `especialidadId` (path): ID de la especialidad

### 6. Gestión de Médicos

#### `POST /api/medicos`
Crea un nuevo médico.

**Cuerpo de la solicitud:**
```json
{
  "userId": "string (opcional)",
  "nombre": "Juan",
  "apellido": "Pérez",
  "telefono": "123456789",
  "genero": "MASCULINO",
  "numeroDocumento": "12345678",
  "fechaNacimiento": "1980-01-01",
  "matricula": 123456,
  "email": "juan.perez@clinicacentral.com",
  "clinicaId": 1,
  "especialidadId": 1
}
```

**Respuesta:**
```json
{
  "id": 1,
  "userId": "string",
  "nombre": "Juan",
  "apellido": "Pérez",
  "telefono": "123456789",
  "genero": "MASCULINO",
  "numeroDocumento": "12345678",
  "fechaNacimiento": "1980-01-01",
  "matricula": 123456,
  "email": "juan.perez@clinicacentral.com",
  "clinica": {
    "id": 1,
    "nombre": "Clínica Central"
  },
  "especialidad": {
    "id": 1,
    "nombre": "Cardiología"
  }
}
```

#### `GET /api/medicos/{medicoId}`
Obtiene los detalles de un médico específico.

**Parámetros:**
- `medicoId` (path): ID del médico

#### `GET /api/medicos`
Obtiene la lista de todos los médicos.

#### `PATCH /api/medicos/{medicoId}`
Actualiza parcialmente los datos de un médico.

**Parámetros:**
- `medicoId` (path): ID del médico

**Cuerpo de la solicitud:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "telefono": "123456789",
  "genero": "MASCULINO",
  "numeroDocumento": "12345678",
  "fechaNacimiento": "1980-01-01",
  "matricula": 123456,
  "email": "juan.perez@clinicacentral.com"
}
```

#### `DELETE /api/medicos/{medicoId}`
Elimina un médico.

**Parámetros:**
- `medicoId` (path): ID del médico

#### `GET /api/medicos/{medicoId}/cupos-disponibles`
Obtiene los cupos disponibles de un médico para una fecha específica.

**Parámetros:**
- `medicoId` (path): ID del médico
- `fecha` (query): Fecha para la cual se buscan cupos (formato: YYYY-MM-DD)

### 7. Gestión de Pacientes

#### `POST /api/pacientes`
Crea un nuevo paciente.

**Cuerpo de la solicitud:**
```json
{
  "userId": "string (opcional)",
  "nombre": "María",
  "apellido": "González",
  "telefono": "987654321",
  "genero": "FEMENINO",
  "numeroDocumento": "87654321",
  "email": "maria.gonzalez@example.com",
  "fechaNacimiento": "1990-05-15"
}
```

**Respuesta:**
```json
{
  "id": 1,
  "userId": "string",
  "nombre": "María",
  "apellido": "González",
  "telefono": "987654321",
  "genero": "FEMENINO",
  "numeroDocumento": "87654321",
  "email": "maria.gonzalez@example.com",
  "fechaNacimiento": "1990-05-15"
}
```

#### `GET /api/pacientes/{pacienteId}`
Obtiene los detalles de un paciente específico.

**Parámetros:**
- `pacienteId` (path): ID del paciente

#### `GET /api/pacientes`
Obtiene la lista de todos los pacientes.

#### `PUT /api/pacientes/{pacienteId}`
Actualiza los datos de un paciente.

**Parámetros:**
- `pacienteId` (path): ID del paciente

**Cuerpo de la solicitud:**
```json
{
  "userId": "string",
  "nombre": "María",
  "apellido": "González",
  "telefono": "987654321",
  "genero": "FEMENINO",
  "numeroDocumento": "87654321",
  "email": "maria.gonzalez@example.com",
  "fechaNacimiento": "1990-05-15"
}
```

#### `DELETE /api/pacientes/{pacienteId}`
Elimina un paciente (eliminación lógica).

**Parámetros:**
- `pacienteId` (path): ID del paciente

### 8. Integración FHIR (Simulada)

#### `GET /api/fhir/pacientes/{id}`
Obtiene datos de un paciente en formato FHIR.

**Parámetros:**
- `id` (path): ID del paciente

#### `POST /api/fhir/observaciones`
Recibe observaciones en formato FHIR.

**Cuerpo de la solicitud:**
Datos en formato JSON según estándar FHIR.

## Códigos de Estado HTTP

- `200 OK`: Solicitud exitosa
- `201 Created`: Recurso creado exitosamente
- `204 No Content`: Solicitud exitosa sin contenido en la respuesta
- `400 Bad Request`: Solicitud mal formada
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error interno del servidor

## Enumeraciones

### TipoCita
- `PRESENCIAL`
- `VIRTUAL`

### EstadoCita
- `PROGRAMADA`
- `CANCELADA`
- `COMPLETADA`

### Género
- `MASCULINO`
- `FEMENINO`
- `OTRO`

## Notas Adicionales

1. Todos los endpoints que manejan datos sensibles deberían estar protegidos por autenticación.
2. La API implementa validación de datos en los DTOs.
3. Algunos endpoints devuelven listas vacías si no hay datos disponibles.
4. Las fechas se manejan en formato ISO 8601 (YYYY-MM-DD).
5. Las horas se manejan en formato 24 horas (HH:mm).