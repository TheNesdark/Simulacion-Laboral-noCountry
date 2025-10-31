import '@/styles/components/DoctorCard.css';
import { Medico } from '@/types';
import { useRouter } from 'next/navigation';

interface DoctorCardProps extends Medico {}

export function DoctorCard({
  id,
  nombre,
  apellido,
  matricula,
  nombreEspecialidad,
  userId,
}: DoctorCardProps) {
  const router = useRouter();

  const handleChat = async () => {
    if (!userId) {
      alert('No se puede iniciar chat con este médico');
      return;
    }
    router.push(`/Chat?medicoId=${userId}`);
  };

  return (
    <div className="doctor-card">
      <div className="doctor-card-content">
        <div className="doctor-card-flex">
          <div className="doctor-card-image-container">
            <img src="/default-doctor.png" alt={`${nombre} ${apellido}`} className="doctor-card-image" />
          </div>
          <div className="doctor-card-info">
            <h3 className="doctor-card-name">Dr. {nombre} {apellido}</h3>
            <p className="doctor-card-specialty">{nombreEspecialidad || 'Sin especialidad'}</p>
            <p className="doctor-card-matricula">Mat. {matricula}</p>
          </div>
        </div>
        <div className='doctor-card-button-container'>
          <button className='doctor-card-button z-10' onClick={() => router.replace(`Medicos/${id}`)}>Pedir Turno</button>
        </div>
      </div>
    </div>
  );
}
