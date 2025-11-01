'use client';

import '@styles/pages/Home.css';
import SearchBar from './components/SearchBar';
import AppointmentList from '@/components/ui/AppointmentsList';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodaysAppointmentsByDoctor } from '@/services/backend/appointmentsService';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { medicoId } = useAuth();
  const queryClient = useQueryClient();
  
  const {
    data: todaysAppointments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['appointments', 'today', 'doctor', medicoId],
    queryFn: () => getTodaysAppointmentsByDoctor(medicoId!),
    enabled: !!medicoId,
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['appointments', 'today', 'doctor', medicoId] });
  };

  return (
    <>
      <SearchBar />
      <AppointmentList
        title='Turnos Programados para hoy'
        appointments={todaysAppointments || []}
        isLoading={isLoading}
        error={error}
        role="medico"
        onRefresh={handleRefresh}
      />
    </>
  );
}
