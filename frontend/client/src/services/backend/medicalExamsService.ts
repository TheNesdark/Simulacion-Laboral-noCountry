import medicalExamsData from '@/data/medicalExams.json';
import { MedicalExams } from '@/types';

export const getAllMedicalExams = async (): Promise<MedicalExams> => {
  await new Promise(res => setTimeout(res, 100));
  return medicalExamsData.medicalExams as MedicalExams;
};

