import { useState, useMemo } from 'react';
import { OnArgs } from 'react-calendar';
import { Cita } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllAppointmentsByDoctor, getAllAppointmentsByPatient } from '@/services/backend/appointmentsService';
import { useAuth } from '@/context/AuthContext';

interface TileClassNameProps {
  date: Date;
  view: string;
}

export default function useCalendar() {
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const { medicoId, pacienteId, role } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: allAppointments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['appointments', role, medicoId || pacienteId],
    queryFn: () => {
      if (role === 'medico' && medicoId) {
        return getAllAppointmentsByDoctor(medicoId);
      } else if (role === 'paciente' && pacienteId) {
        return getAllAppointmentsByPatient(pacienteId);
      }
      return [];
    },
    enabled: !!(medicoId || pacienteId),
  });

  const monthAppointments = useMemo(() => {
    return allAppointments.filter(appointment => {
      const appointmentDate = new Date(`${appointment.fecha}T00:00:00`);
      return (
        appointmentDate.getMonth() === activeDate.getMonth() &&
        appointmentDate.getFullYear() === activeDate.getFullYear()
      );
    });
  }, [activeDate, allAppointments]);

  const handleActiveStartDateChange = ({ activeStartDate }: OnArgs) => {
    setActiveDate(activeStartDate || new Date());
  };

  const isDateHasAppointment = ({ date }: TileClassNameProps) => {
    const dateString: string = date.toISOString().split('T')[0];
    const appointment = monthAppointments.find(
      (appointment: Cita) => appointment.fecha === dateString
    );
    
    if (!appointment) return null;
    
    // Si la cita está cancelada, usar clase especial
    if (appointment.estado === 'CANCELADA') {
      return 'appointment-date-cancelled';
    }
    
    return 'appointment-date';
  };

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['appointments', role, medicoId || pacienteId] });
  };

  return {
    activeDate,
    monthAppointments,
    handleActiveStartDateChange,
    isDateHasAppointment,
    isLoading,
    error,
    refresh,
  };
}
