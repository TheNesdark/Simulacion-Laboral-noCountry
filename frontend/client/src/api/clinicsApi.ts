import clinicsData from '@/data/clinics.json';
import { Clinic } from '@/types';

export const getAllClinics = async (): Promise<Clinic[]> => {
  await new Promise(res => setTimeout(res, 100));
  return clinicsData.clinics as Clinic[];
};
