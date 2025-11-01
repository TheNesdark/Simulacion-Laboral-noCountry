const API_BASE_URL = "http://localhost:8000/api";

const especialidades = [
  { nombre: "Cardiología", descripcion: "Especialidad médica que se enfoca en el corazón y sistema cardiovascular" },
  { nombre: "Pediatría", descripcion: "Especialidad médica dedicada al cuidado de niños y adolescentes" },
  { nombre: "Dermatología", descripcion: "Especialidad médica que trata enfermedades de la piel" },
  { nombre: "Traumatología", descripcion: "Especialidad médica que trata lesiones del sistema musculoesquelético" },
  { nombre: "Ginecología", descripcion: "Especialidad médica dedicada a la salud de la mujer" }
];

const clinicas = [
  { nombre: "Clínica Central", direccion: "Av. Principal 123", telefono: "555-0001", email: "info@clinicacentral.com", descripcion: "Clínica de atención primaria y especializada" },
  { nombre: "Hospital San Juan", direccion: "Calle Salud 456", telefono: "555-0002", email: "contacto@hospitalsanjuan.com", descripcion: "Hospital general con múltiples especialidades" },
  { nombre: "Centro Médico Vida", direccion: "Av. Bienestar 789", telefono: "555-0003", email: "info@centrovida.com", descripcion: "Centro médico especializado" }
];

async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
}

async function seedDatabase() {
  console.log("🌱 Iniciando seed de la base de datos...\n");

  try {
    // 1. Crear Especialidades
    console.log("📋 Creando especialidades...");
    for (const esp of especialidades) {
      const result = await post(`${API_BASE_URL}/especialidades`, esp);
      console.log(`  ✓ ${esp.nombre} (ID: ${result.id})`);
    }

    // 2. Crear Clínicas
    console.log("\n🏥 Creando clínicas...");
    for (const clinica of clinicas) {
      const result = await post(`${API_BASE_URL}/clinicas`, clinica);
      console.log(`  ✓ ${clinica.nombre} (ID: ${result.id})`);
    }

    console.log("\n✅ Base de datos alimentada exitosamente!");
  } catch (error) {
    console.error("\n❌ Error al alimentar la base de datos:", error.message);
  }
}

seedDatabase();
