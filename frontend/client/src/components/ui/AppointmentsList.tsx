import { formatDate } from '@/utils/dateUtils';
import { Cita } from '@/types';
import ErrorMessage from '@/components/common/ErrorMessage';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const backgroundColors = [
  '#F8BBD0',
  '#BBDEFB',
  '#C8E6C9',
  '#FFF9C4',
  '#D1C4E9',
  '#FFE0B2',
];

interface AppointmentsListProps {
  appointments: Cita[];
  title: string;
  isLoading: boolean;
  error: Error | null;
}

export default function AppointmentsList({
  appointments,
  title,
  isLoading,
  error,
}: AppointmentsListProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!appointments.length) {
    return (
      <section className='appointments-list'>
        <h2>{title}</h2>
        <div className='flex items-center justify-center p-4 text-blue-500 m-auto gap-4'>
          <span className='ml-2'>No hay citas programadas.</span>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className='appointments-list'>
        <h2>{title}</h2>
        {appointments.map((appointment, index) => (
          <article
            key={appointment.id}
            style={{
              backgroundColor:
                backgroundColors[index % backgroundColors.length],
            }}
          >
            <div>
              <h3>{appointment.motivoCita}</h3>
              <p>{appointment.nombreClinica}</p>
              <span className="text-xs">{appointment.tipo}</span>
            </div>
            <time dateTime={`${appointment.fecha}T${appointment.horaInicio}`}>
              <span>{formatDate(appointment.fecha)}</span>
              <span>{appointment.horaInicio}</span>
            </time>
          </article>
        ))}
      </section>
    </>
  );
}
