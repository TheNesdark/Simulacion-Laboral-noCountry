import { Cita, CitaRequest, CupoDisponible } from '@/types';
import { API_BASE_URL } from '@/services/backend/config';
import citasData from '@/data/citas.json';

const USE_MOCK = false;

export const createAppointment = async (data: CitaRequest): Promise<Cita> => {
  if (USE_MOCK) {
    await new Promise(res => setTimeout(res, 100));
    return { ...citasData[0], id: Date.now() } as Cita;
  }
  const response = await fetch(`${API_BASE_URL}/citas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear cita');
  return response.json();
};

export const cancelAppointment = async (citaId: number, motivoCancelacion: string): Promise<void> => {
  if (USE_MOCK) {
    await new Promise(res => setTimeout(res, 100));
    return;
  }
  const response = await fetch(`${API_BASE_URL}/citas/${citaId}/cancelar`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ motivoCancelacion }),
  });
  if (!response.ok) throw new Error('Error al cancelar cita');
};

export const completeAppointment = async (citaId: number): Promise<void> => {
  if (USE_MOCK) {
    await new Promise(res => setTimeout(res, 100));
    return;
  }
  const response = await fetch(`${API_BASE_URL}/citas/${citaId}/completar`, {
    method: 'PUT',
  });
  if (!response.ok) throw new Error('Error al completar cita');
};

export const getAppointmentsByDoctor = async (medicoId: number): Promise<Cita[]> => {
  if (USE_MOCK) {
    await new Promise(res => setTimeout(res, 100));
    return citasData.filter(c => c.medicoId === medicoId && c.estado === 'PROGRAMADA') as Cita[];
  }
  const response = await fetch(`${API_BASE_URL}/citas/medico/${medicoId}`);
  if (!response.ok) throw new Error('Error al obtener citas');
  return response.json();
};

export const getAllAppointmentsByDoctor = async (medicoId: number): Promise<Cita[]> => {
  if (USE_MOCK) {
    await new Promise(res => setTimeout(res, 100));
    return citasData.filter(c => c.medicoId === medicoId) as Cita[];
  }
  const response = await fetch(`${API_BASE_URL}/citas/total/medico/${medicoId}`);
  if (!response.ok) throw new Error('Error al obtener citas');
  return response.json();
};

export const getAppointmentsByPatient = async (pacienteId: number): Promise<Cita[]> => {
  if (USE_MOCK) {
    await new Promise(res => setTimeout(res, 100));
    return citasData.filter(c => c.pacienteId === pacienteId && c.estado === 'PROGRAMADA') as Cita[];
  }
  const response = await fetch(`${API_BASE_URL}/citas/paciente/${pacienteId}`);
  if (!response.ok) throw new Error('Error al obtener citas');
  return response.json();
};

export const getAllAppointmentsByPatient = async (pacienteId: number): Promise<Cita[]> => {
  if (USE_MOCK) {
    await new Promise(res => setTimeout(res, 100));
    return citasData.filter(c => c.pacienteId === pacienteId) as Cita[];
  }
  const response = await fetch(`${API_BASE_URL}/citas/total/paciente/${pacienteId}`);
  if (!response.ok) throw new Error('Error al obtener citas');
  return response.json();
};


export const getAllAppointments = async (): Promise<Cita[]> => {
  if (USE_MOCK) {
    await new Promise(res => setTimeout(res, 100));
    return citasData as Cita[];
  }
  const response = await fetch(`${API_BASE_URL}/citas`);
  if (!response.ok) throw new Error('Error al obtener citas');
  return response.json();
};

export const getTodaysAppointments = async (): Promise<Cita[]> => {
  if (USE_MOCK) {
    await new Promise(res => setTimeout(res, 100));
    const today = new Date().toISOString().split('T')[0];
    return citasData.filter(c => c.fecha === today) as Cita[];
  }
  const response = await fetch(`${API_BASE_URL}/citas`);
  if (!response.ok) throw new Error('Error al obtener citas');
  const citas = await response.json();
  const today = new Date().toISOString().split('T')[0];
  return citas.filter((c: Cita) => c.fecha === today);
};

export const getAppointmentById = async (citaId: number): Promise<Cita> => {
  if (USE_MOCK) {
    await new Promise(res => setTimeout(res, 100));
    const cita = citasData.find(c => c.id === citaId);
    if (!cita) throw new Error('Cita no encontrada');
    return cita as Cita;
  }
  const response = await fetch(`${API_BASE_URL}/citas/${citaId}`);
  if (!response.ok) throw new Error('Error al obtener cita');
  return response.json();
};

export const getCuposDisponibles = async (medicoId: number, fecha: string): Promise<CupoDisponible[]> => {
  if (USE_MOCK) {
    await new Promise(res => setTimeout(res, 100));
    return [];
  }
  const response = await fetch(`${API_BASE_URL}/medicos/${medicoId}/cupos-disponibles?fecha=${fecha}`);
  if (!response.ok) throw new Error('Error al obtener cupos disponibles');
  return response.json();
};
