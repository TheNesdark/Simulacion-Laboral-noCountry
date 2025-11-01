// Función para formatear la fecha
export function formatDate(dateString: string) {
  // Crear fecha de la cita normalizada a medianoche en hora local
  const date = new Date(dateString + 'T00:00:00');
  date.setHours(0, 0, 0, 0);
  
  // Crear fecha de hoy normalizada a medianoche en hora local
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Crear fecha de mañana normalizada a medianoche en hora local
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Comparar usando timestamps
  if (date.getTime() === today.getTime()) {
    return 'Hoy';
  } else if (date.getTime() === tomorrow.getTime()) {
    return 'Mañana';
  } else {
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
