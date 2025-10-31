import '@/styles/components/DoctorCard.css';
import { Doctor } from '@/types';
import { useRouter } from 'next/navigation';

interface DoctorCardProps extends Doctor { }

export function DoctorCard({
  id,
  name,
  specialty,
  rating,
  image,
}: DoctorCardProps) {
  const router = useRouter();

  const handleClick = () => router.replace(`./${id}`)
  return (
    <div className="doctor-card">
      <div className="doctor-card-content">
        <div className="doctor-card-flex">
          <div className="doctor-card-image-container">
            <img src={image} alt={name} className="doctor-card-image" />
          </div>
          <div className="doctor-card-info">
            <h3 className="doctor-card-name">{name}</h3>
            <p className="doctor-card-specialty">{specialty}</p>
          </div>
        </div>
        <div className='doctor-card-button-container'>
          <div className='doctor-card-rating-container'>
            <span className='doctor-card-rating'>{rating}%</span>
          </div>
          <button className='doctor-card-button z-10' onClick={() => router.replace(`Medicos/${id}`)}>Pedir Turno</button>
        </div>
      </div>
    </div>
  );
}
