import { Medico, MedicoRequest } from '@/types';
import { API_BASE_URL } from '@/services/backend/config';


export const getAllDoctors = async (): Promise<Medico[]> => {
  const response = await fetch(`${API_BASE_URL}/medicos`);
  if (!response.ok) throw new Error('Error al obtener médicos');
  return response.json();
};

export const getDoctorById = async (medicoId: number): Promise<Medico> => {
  const response = await fetch(`${API_BASE_URL}/medicos/${medicoId}`);
  if (!response.ok) throw new Error('Error al obtener médico');
  return response.json();
};

export const createDoctor = async (data: MedicoRequest): Promise<Medico> => {
  const response = await fetch(`${API_BASE_URL}/medicos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear médico');
  return response.json();
};

export const updateDoctor = async (medicoId: number, data: Partial<MedicoRequest>): Promise<Medico> => {
  const response = await fetch(`${API_BASE_URL}/medicos/${medicoId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar médico');
  return response.json();
};

export const deleteDoctor = async (medicoId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/medicos/${medicoId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar médico');
};

export const getDoctorAvailableSlots = async (medicoId: number, fecha: string) => {
  const response = await fetch(`${API_BASE_URL}/medicos/${medicoId}/cupos-disponibles?fecha=${fecha}`);
  if (!response.ok) throw new Error('Error al obtener cupos disponibles');
  return response.json();
};
