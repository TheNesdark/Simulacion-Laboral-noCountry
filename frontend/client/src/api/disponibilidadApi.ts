import { API_BASE_URL } from '@/services/backend/config';

export interface DisponibilidadRequest {
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
  minutosCupo: number;
}

export const getDoctorDisponibilidades = async (medicoId: number) => {
  const response = await fetch(`${API_BASE_URL}/medicos/${medicoId}/disponibilidades`);
  if (!response.ok) throw new Error('Error al obtener disponibilidades');
  return response.json();
};

export const createDisponibilidad = async (medicoId: number, data: DisponibilidadRequest) => {
  const response = await fetch(`${API_BASE_URL}/medicos/${medicoId}/disponibilidades`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear disponibilidad');
  return response.json();
};

export const updateDisponibilidad = async (disponibilidadId: number, data: DisponibilidadRequest) => {
  const response = await fetch(`${API_BASE_URL}/disponibilidades/${disponibilidadId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar disponibilidad');
  return response.json();
};

export const activarDisponibilidad = async (disponibilidadId: number) => {
  const response = await fetch(`${API_BASE_URL}/disponibilidades/${disponibilidadId}/activar`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Error al activar disponibilidad');
  return response.json();
};

export const desactivarDisponibilidad = async (disponibilidadId: number) => {
  const response = await fetch(`${API_BASE_URL}/disponibilidades/${disponibilidadId}/desactivar`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Error al desactivar disponibilidad');
  return response.json();
};

export const deleteDisponibilidad = async (disponibilidadId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/disponibilidades/${disponibilidadId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar disponibilidad');
};
