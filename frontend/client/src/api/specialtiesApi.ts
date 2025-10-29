import specialtiesData from '@/data/specialties.json';
import { Specialty, SpecialtiesGroup } from '@/types';

export const getAllSpecialtiesGrouped = async (): Promise<SpecialtiesGroup[]> => {
  await new Promise(res => setTimeout(res, 100));

  const specialties = specialtiesData.specialties as Specialty[];
  console.log('Specialties data:', specialties);

  const grouped = specialties.reduce((acc, specialty) => {
    const letter = specialty.letter;
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(specialty.name);
    return acc;
  }, {} as Record<string, string[]>);

  console.log('Grouped specialties:', grouped);

  const result = Object.entries(grouped)
    .map(([letter, specialties]) => ({
      letter,
      specialties: specialties.sort((a, b) => a.localeCompare(b))
    }))
    .sort((a, b) => a.letter.localeCompare(b.letter));

  console.log('Final result:', result);
  return result;
};