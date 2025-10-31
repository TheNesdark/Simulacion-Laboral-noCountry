import { Clinic } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const getAllClinics = async (): Promise<Clinic[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/clinicas`);
    
    if (!response.ok) {
      throw new Error('Error al obtener las clínicas');
    }
    
    const clinicsData = await response.json();
    
    // Mapear los datos del backend al formato esperado por el frontend
    return clinicsData.map((clinic: any) => ({
      id: clinic.id.toString(),
      nombre: clinic.nombre,
      descripcion: clinic.descripcion || '',
      telefono: clinic.telefono || '',
      direccion: clinic.direccion || '',
    }));
  } catch (error) {
    console.error('Error fetching clinics:', error);
    throw error;
  }
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