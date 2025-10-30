import { Clinic } from '@/types';

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const getAllClinics = async (): Promise<Clinic[]> => {
  const res = await fetch(`${BASEURL}/api/clinicas`);
  console.log(res);
  return res.json();
};
