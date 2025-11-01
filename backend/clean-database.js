const API_BASE_URL = "http://localhost:8000/api";

async function get(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
}

async function deleteRequest(url) {
  const response = await fetch(url, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
}

async function cleanDatabase() {
  console.log("🧹 Iniciando limpieza de la base de datos...\n");

  try {
    // 1. Obtener todos los médicos
    console.log("📋 Obteniendo médicos...");
    const medicos = await get(`${API_BASE_URL}/medicos`);
    console.log(`  ✓ ${medicos.length} médicos encontrados`);

    // 2. Eliminar disponibilidades de cada médico
    console.log("\n🗑️  Eliminando disponibilidades...");
    let totalDisponibilidades = 0;
    
    for (const medico of medicos) {
      try {
        const disponibilidades = await get(`${API_BASE_URL}/medicos/${medico.id}/disponibilidades`);
        
        for (const disp of disponibilidades) {
          await deleteRequest(`${API_BASE_URL}/disponibilidades/${disp.id}`);
          totalDisponibilidades++;
        }
        
        console.log(`  ✓ Disponibilidades eliminadas para Dr. ${medico.nombre} ${medico.apellido}`);
      } catch (err) {
        console.log(`  ⚠ No se pudieron eliminar disponibilidades de Dr. ${medico.nombre} ${medico.apellido}`);
      }
    }

    console.log(`\n✅ Limpieza completada!`);
    console.log(`   - ${totalDisponibilidades} disponibilidades eliminadas`);
    console.log(`   - Los cupos asociados se eliminaron automáticamente`);
  } catch (error) {
    console.error("\n❌ Error al limpiar la base de datos:", error.message);
  }
}

cleanDatabase();
