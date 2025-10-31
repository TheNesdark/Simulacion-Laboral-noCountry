import { Clinic } from '@/types';
import ClinicData from "@data/clinics.json"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const getAllClinics = () => {
  return ClinicData.clinics
};

export const getClinicById = async (id: string): Promise<Clinic> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/clinicas/${id}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener la clínica');
    }
    
    const clinicData = await response.json();
    
    return {
      id: clinicData.id.toString(),
      nombre: clinicData.nombre,
      descripcion: clinicData.descripcion || '',
      telefono: clinicData.telefono || '',
      direccion: clinicData.direccion || '',
    };
  } catch (error) {
    console.error('Error fetching clinic:', error);
    throw error;
  }
};