import doctorsData from '@/data/doctors.json';
import { Doctor } from '@/types';

export const getAllDoctors = async (): Promise<Doctor[]> => {
  await new Promise(res => setTimeout(res, 100));
  return doctorsData.doctors as Doctor[];
};
