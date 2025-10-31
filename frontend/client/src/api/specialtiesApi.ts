import { Specialty } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const getAllSpecialtiesGrouped = async (): Promise<{ letter: string; specialties: string[] }[]> => {

  try {
    const response = await fetch(`${API_BASE_URL}/api/especialidades`);

    if (!response.ok) {
      throw new Error('Error al obtener las especialidades');
    }

    const specialties: Specialty[] = await response.json();

    // Group specialties by first letter
    const grouped = specialties.reduce((acc, specialty) => {
      const firstLetter = specialty.nombre.charAt(0).toUpperCase();

      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }

      acc[firstLetter].push(specialty.nombre);

      return acc;
    }, {} as Record<string, string[]>);

    // Convert to array format expected by component
    return Object.keys(grouped)
      .sort()
      .map(letter => ({
        letter,
        specialties: grouped[letter].sort()
      }));

  } catch (error) {
    console.error('Error fetching specialties:', error);
    throw error;
  }
};

export const getAllSpecialties = async (): Promise<Specialty[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/especialidades`);

    if (!response.ok) {
      throw new Error('Error al obtener las especialidades');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching specialties:', error);
    throw error;
  }
};
