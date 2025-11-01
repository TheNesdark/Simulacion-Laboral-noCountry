import { Specialty } from "@/types";
import { API_BASE_URL } from '@/services/backend/config';
import especialidadesData from '@/data/especialidades.json';

const USE_MOCK = false;

export const getAllSpecialties = async (): Promise<Specialty[]> => {
  if (USE_MOCK) {
    return especialidadesData.map(e => ({
      id: e.id.toString(),
      nombre: e.nombre,
      descripcion: e.descripcion,
    }));
  }
  const response = await fetch(`${API_BASE_URL}/especialidades`);
  if (!response.ok) throw new Error('Error al obtener especialidades');
  return response.json();
};

export const getAllSpecialtiesGrouped = async (): Promise<{ letter: string; specialties: string[] }[]> => {
  const specialties = await getAllSpecialties();
  
  const grouped = specialties.reduce((acc, specialty) => {
    const firstLetter = specialty.nombre.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(specialty.nombre);
    return acc;
  }, {} as Record<string, string[]>);

  return Object.keys(grouped)
    .sort()
    .map(letter => ({
      letter,
      specialties: grouped[letter].sort()
    }));
};
