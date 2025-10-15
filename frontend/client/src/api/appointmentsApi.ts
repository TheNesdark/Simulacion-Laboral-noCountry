import appointmentsData from '@/data/appointments.json';
import { Appointment } from '@/types/appointments';

export const getTodaysAppointments = async (): Promise<Appointment[]> => {
  await new Promise(res => setTimeout(res, 100));
  const todayString = new Date().toISOString().split('T')[0];
  return appointmentsData.appointments.filter((app: Appointment) => app.date === todayString);
};

export const getAllAppointments = async (): Promise<Appointment[]> => {
  await new Promise(res => setTimeout(res, 100));
  return appointmentsData.appointments;
};
  