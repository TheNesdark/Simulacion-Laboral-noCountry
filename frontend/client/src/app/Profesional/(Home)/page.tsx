'use client';

import '@styles/pages/Home.css';
import SearchBar from './components/SearchBar';
import AppointmentList from '@/components/ui/AppointmentsList';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentsByDoctor } from '@/api/appointmentsApi';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { medicoId } = useAuth();
  
  const {
    data: todaysAppointments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['appointments', 'doctor', medicoId],
    queryFn: () => getAppointmentsByDoctor(medicoId!),
    enabled: !!medicoId,
  });

  return (
    <>
      <SearchBar />
      <AppointmentList
        title='Turnos Programados para hoy'
        appointments={todaysAppointments || []}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}
