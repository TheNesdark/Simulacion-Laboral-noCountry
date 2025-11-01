'use client';
import '@/styles/pages/Calendario.css';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import AppointmentList from '@/components/ui/AppointmentsList';
import useCalendar from '@/hooks/useCalendar';

export default function CalendarPage() {
  const {
    activeDate,
    monthAppointments,
    handleActiveStartDateChange,
    isDateHasAppointment,
    isLoading,
    error,
    refresh,
  } = useCalendar();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const title = activeDate
    .toLocaleString('es-CO', { month: 'long', year: 'numeric' })
    .toUpperCase();

  return (
    <>
      <Calendar
        className={'calendar'}
        onActiveStartDateChange={handleActiveStartDateChange}
        tileClassName={isDateHasAppointment}
        onChange={() => {}}
        value={null}
      />
      <AppointmentList
        title={title}
        appointments={monthAppointments}
        isLoading={isLoading}
        error={error}
        role="medico"
        onRefresh={refresh}
      />
    </>
  );
}
