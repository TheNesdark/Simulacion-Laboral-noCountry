// Función para formatear la fecha
export function formatDate(dateString: string) {
    const date = new Date(`${dateString}T00:00:00`);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === today.toDateString()) {
        return "Hoy";
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return "Mañana";
    } else {
        return date.toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
};

