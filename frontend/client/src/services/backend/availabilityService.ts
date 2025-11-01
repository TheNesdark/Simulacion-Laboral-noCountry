import { API_BASE_URL } from './config';

export interface Disponibilidad {
  id: number;
  medicoId: number;
  diaSemana: number; // 0=Domingo, 1=Lunes, ..., 6=Sábado
  horaInicio: string; // Formato: "HH:mm"
  horaFin: string; // Formato: "HH:mm"
  minutosCupo: number;
  activo: boolean;
}

export interface DisponibilidadRequest {
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
  minutosCupo: number;
}

// Obtener disponibilidades de un médico
export const getDoctorAvailabilities = async (medicoId: number): Promise<Disponibilidad[]> => {
  const response = await fetch(`${API_BASE_URL}/medicos/${medicoId}/disponibilidades`);
  if (!response.ok) throw new Error('Error al obtener disponibilidades');
  return response.json();
};

// Crear disponibilidad para un médico
export const createAvailability = async (medicoId: number, data: DisponibilidadRequest): Promise<Disponibilidad> => {
  const response = await fetch(`${API_BASE_URL}/medicos/${medicoId}/disponibilidades`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear disponibilidad');
  return response.json();
};

// Actualizar disponibilidad
export const updateAvailability = async (disponibilidadId: number, data: DisponibilidadRequest): Promise<Disponibilidad> => {
  const response = await fetch(`${API_BASE_URL}/disponibilidades/${disponibilidadId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Error al actualizar disponibilidad';
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorMessage;
    } catch {
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

// Activar disponibilidad
export const activateAvailability = async (disponibilidadId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/disponibilidades/${disponibilidadId}/activar`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Error al activar disponibilidad');
};

// Desactivar disponibilidad
export const deactivateAvailability = async (disponibilidadId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/disponibilidades/${disponibilidadId}/desactivar`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Error al desactivar disponibilidad');
};

// Eliminar disponibilidad
export const deleteAvailability = async (disponibilidadId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/disponibilidades/${disponibilidadId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Error al eliminar disponibilidad';
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorMessage;
    } catch {
      // Si no es JSON, usar el texto del error o el status
      errorMessage = errorText || `Error ${response.status}: ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }
};

