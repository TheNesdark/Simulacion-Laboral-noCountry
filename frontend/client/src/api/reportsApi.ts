import reportsData from '@/data/reports.json';
import { Reports } from '@/types';

export const getAllReports = async (): Promise<Reports> => {
  await new Promise(res => setTimeout(res, 100));
  return reportsData.reports as Reports;
};

