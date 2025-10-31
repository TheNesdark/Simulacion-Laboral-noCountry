'use client';

import '@styles/pages/Home.css';
import SearchBar from './components/SearchBar';
import CategoryCards from './components/CategoryCards';
import AppointmentList from '@/components/ui/AppointmentsList';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentsByPatient } from '@/api/appointmentsApi';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { pacienteId } = useAuth();
  
  const {
    data: todaysAppointments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['appointments', 'patient', pacienteId],
    queryFn: () => getAppointmentsByPatient(pacienteId!),
    enabled: !!pacienteId,
  });

  return (
    <>
      <SearchBar />
      <CategoryCards />
      <AppointmentList
        title='Turnos Programados para hoy'
        appointments={todaysAppointments || []}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}
