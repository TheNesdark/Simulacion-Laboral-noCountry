import appointmentsData from '@/data/appointments.json';
import { Appointment } from '@/types';

export const getTodaysAppointments = async (): Promise<Appointment[]> => {
  await new Promise(res => setTimeout(res, 100));
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return appointmentsData.appointments.filter(
    (app: Appointment) => app.date === todayString
  );
};

export const getAllAppointments = async (): Promise<Appointment[]> => {
  await new Promise(res => setTimeout(res, 100));
  return appointmentsData.appointments;
};
