import { Cita, CitaRequest, CupoDisponible } from '@/types';
import { API_BASE_URL } from './config';

export const createAppointment = async (data: CitaRequest): Promise<Cita> => {
  const response = await fetch(`${API_BASE_URL}/citas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear cita');
  return response.json();
};

export const cancelAppointment = async (citaId: number, motivoCancelacion: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/citas/${citaId}/cancelar`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ motivoCancelacion }),
  });
  if (!response.ok) throw new Error('Error al cancelar cita');
};

export const completeAppointment = async (citaId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/citas/${citaId}/completar`, {
    method: 'PUT',
  });
  if (!response.ok) throw new Error('Error al completar cita');
};

export const getAppointmentsByDoctor = async (medicoId: number): Promise<Cita[]> => {
  const response = await fetch(`${API_BASE_URL}/citas/medico/${medicoId}`);
  if (!response.ok) throw new Error('Error al obtener citas');
  return response.json();
};

export const getAllAppointmentsByDoctor = async (medicoId: number): Promise<Cita[]> => {
  const response = await fetch(`${API_BASE_URL}/citas/total/medico/${medicoId}`);
  if (!response.ok) throw new Error('Error al obtener citas');
  return response.json();
};

export const getAppointmentsByPatient = async (pacienteId: number): Promise<Cita[]> => {
  const response = await fetch(`${API_BASE_URL}/citas/paciente/${pacienteId}`);
  if (!response.ok) throw new Error('Error al obtener citas');
  return response.json();
};

export const getAllAppointmentsByPatient = async (pacienteId: number): Promise<Cita[]> => {
  const response = await fetch(`${API_BASE_URL}/citas/total/paciente/${pacienteId}`);
  if (!response.ok) throw new Error('Error al obtener citas');
  return response.json();
};

export const getTodaysAppointmentsByPatient = async (pacienteId: number): Promise<Cita[]> => {
  const response = await fetch(`${API_BASE_URL}/citas/hoy/paciente/${pacienteId}`);
  if (!response.ok) throw new Error('Error al obtener citas de hoy');
  return response.json();
};

export const getTodaysAppointmentsByDoctor = async (medicoId: number): Promise<Cita[]> => {
  const response = await fetch(`${API_BASE_URL}/citas/hoy/medico/${medicoId}`);
  if (!response.ok) throw new Error('Error al obtener citas de hoy');
  return response.json();
};

export const getAppointmentById = async (citaId: number): Promise<Cita> => {
  const response = await fetch(`${API_BASE_URL}/citas/${citaId}`);
  if (!response.ok) throw new Error('Error al obtener cita');
  return response.json();
};

export const getCuposDisponibles = async (medicoId: number, fecha: string): Promise<CupoDisponible[]> => {
  const response = await fetch(`${API_BASE_URL}/medicos/${medicoId}/cupos-disponibles?fecha=${fecha}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al obtener cupos disponibles: ${errorText}`);
  }
  const data = await response.json();
  // El backend ya devuelve solo cupos disponibles (reservado = false)
  // Transformar reservado (Boolean) a disponible (boolean), manejando null
  return data.map((cupo: any) => ({
    id: cupo.id,
    fecha: cupo.fecha,
    horaInicio: cupo.horaInicio,
    horaFin: cupo.horaFin,
    disponible: cupo.reservado === false || cupo.reservado === null, // Si reservado es false o null, está disponible
  }));
};

