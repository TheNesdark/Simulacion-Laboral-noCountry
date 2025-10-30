import '@/styles/components/ClinicCard.css';
import { Clinic } from '@/types';

export function ClinicCard({ id, nombre, telefono, direccion, descripcion }: Clinic) {
  return (
    <div key={id} className='clinic-card'>
      <div className={`clinic-card-image-container`}>
        <img src={descripcion} alt={nombre} className='clinic-card-image' />
      </div>

      <div className='clinic-card-content'>
        <div className='clinic-card-info'>
          <h2 className='clinic-card-name'>{nombre}</h2>

          <div className='clinic-card-phone-container'>
            <div className='clinic-card-phone'>{telefono}</div>
          </div>

          <div className='clinic-card-address-container'>
            <div className='clinic-card-address'>{direccion}</div>
          </div>
        </div>

        <button className='clinic-card-button'>Contactar</button>
      </div>
    </div>
  );
}
