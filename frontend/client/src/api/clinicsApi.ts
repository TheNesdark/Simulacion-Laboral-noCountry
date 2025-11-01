import { Clinic } from '@/types';
import { API_BASE_URL } from '@/services/backend/config';
import clinicasData from '@/data/clinicas.json';

const USE_MOCK = false;

export const getAllClinics = async (): Promise<Clinic[]> => {
  if (USE_MOCK) {
    return clinicasData.map(c => ({
      id: c.id.toString(),
      nombre: c.nombre,
      descripcion: c.descripcion,
      telefono: c.telefono,
      direccion: c.direccion,
    }));
  }
  const response = await fetch(`${API_BASE_URL}/clinicas`);
  if (!response.ok) throw new Error('Error al obtener clínicas');
  return response.json();
};

export const getClinicById = async (id: string): Promise<Clinic> => {
  if (USE_MOCK) {
    const clinica = clinicasData.find(c => c.id.toString() === id);
    if (!clinica) throw new Error('Clínica no encontrada');
    return {
      id: clinica.id.toString(),
      nombre: clinica.nombre,
      descripcion: clinica.descripcion,
      telefono: clinica.telefono,
      direccion: clinica.direccion,
    };
  }
  const response = await fetch(`${API_BASE_URL}/clinicas/${id}`);
  if (!response.ok) throw new Error('Error al obtener clínica');
  return response.json();
};
