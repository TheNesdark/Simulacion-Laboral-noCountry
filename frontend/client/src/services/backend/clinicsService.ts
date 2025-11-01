import { Clinic } from '@/types';
import { API_BASE_URL } from './config';

export const getAllClinics = async (): Promise<Clinic[]> => {
  const response = await fetch(`${API_BASE_URL}/clinicas`);
  if (!response.ok) throw new Error('Error al obtener clínicas');
  return response.json();
};

export const getClinicById = async (id: number): Promise<Clinic> => {
  const response = await fetch(`${API_BASE_URL}/clinicas/${id}`);
  if (!response.ok) throw new Error('Error al obtener clínica');
  return response.json();
};

