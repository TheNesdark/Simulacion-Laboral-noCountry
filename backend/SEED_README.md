# Alimentar Base de Datos

Este directorio contiene scripts para alimentar la base de datos con datos de prueba.

## Opción 1: Script Node.js (Recomendado)

### Requisitos
- Node.js instalado
- Backend corriendo en `http://localhost:8000`

### Pasos

1. Asegúrate de que el backend esté corriendo:
```bash
cd portal-citas/portal-citas
./mvnw spring-boot:run
```

2. En otra terminal, ejecuta el script de seed:
```bash
cd backend
node seed-database.js
```

### Datos que se crearán

- **5 Especialidades**: Cardiología, Pediatría, Dermatología, Traumatología, Ginecología
- **3 Clínicas**: Clínica Central, Hospital San Juan, Centro Médico Vida

**Nota**: Los médicos y pacientes se crean mediante el registro de usuarios en la aplicación.

## Opción 2: Script SQL

Si prefieres ejecutar SQL directamente:

1. Localiza el archivo: `portal-citas/portal-citas/src/main/resources/data-seed.sql`
2. Ejecuta el script en tu base de datos PostgreSQL

```bash
psql -U tu_usuario -d nombre_base_datos -f portal-citas/portal-citas/src/main/resources/data-seed.sql
```

## Verificación

Después de ejecutar el script, puedes verificar los datos:

```bash
# Listar especialidades
curl http://localhost:8000/api/especialidades

# Listar clínicas
curl http://localhost:8000/api/clinicas


```

## Notas

- Los `userId` en el script son placeholders. Si usas Firebase Authentication, deberás actualizar estos valores con UIDs reales.
- Las disponibilidades se crean automáticamente para todos los médicos (Lunes a Viernes, 9:00-17:00).
- Los cupos se generan automáticamente basados en las disponibilidades.
