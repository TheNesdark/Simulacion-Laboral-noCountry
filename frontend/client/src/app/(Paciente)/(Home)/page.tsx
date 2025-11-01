'use client';

import '@styles/pages/Home.css';
import SearchBar from './components/SearchBar';
import CategoryCards from './components/CategoryCards';
import AppointmentList from '@/components/ui/AppointmentsList';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodaysAppointmentsByPatient } from '@/services/backend/appointmentsService';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { pacienteId } = useAuth();
  const queryClient = useQueryClient();
  
  const {
    data: todaysAppointments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['appointments', 'today', 'patient', pacienteId],
    queryFn: () => getTodaysAppointmentsByPatient(pacienteId!),
    enabled: !!pacienteId,
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['appointments', 'today', 'patient', pacienteId] });
  };

  return (
    <>
      <SearchBar />
      <CategoryCards />
      <AppointmentList
        title='Turnos Programados para hoy'
        appointments={todaysAppointments || []}
        isLoading={isLoading}
        error={error}
        role="paciente"
        onRefresh={handleRefresh}
      />
    </>
  );
}
