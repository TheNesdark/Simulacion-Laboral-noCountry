import '@/styles/components/DoctorCard.css';
import { Medico } from '@/types';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
import { useEffect, useState } from 'react';
import { getUserData } from '@/services/firebase/authService';

interface DoctorCardProps extends Medico {}

export function DoctorCard({
  id,
  nombre,
  apellido,
  matricula,
  especialidad,
  userId,
}: DoctorCardProps) {
  const router = useRouter();
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    const loadPhoto = async () => {
      if (userId) {
        try {
          const userData = await getUserData(userId);
          if (userData?.photoURL) {
            setPhotoURL(userData.photoURL);
          }
        } catch (error) {
          console.error('Error al cargar foto del médico:', error);
        }
      }
    };
    loadPhoto();
  }, [userId]);

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
            <Avatar
              src={photoURL}
              alt={`${nombre} ${apellido}`}
              size={80}
              className="doctor-card-image"
              fallbackText={`${nombre} ${apellido}`}
            />
          </div>
          <div className="doctor-card-info">
            <h3 className="doctor-card-name">Dr. {nombre} {apellido}</h3>
            <p className="doctor-card-specialty">{especialidad?.nombre || 'Sin especialidad'}</p>
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
