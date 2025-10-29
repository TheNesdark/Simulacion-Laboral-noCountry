'use client';
import { useState } from 'react';

import '@/styles/pages/Especialidades.css';

interface SpecialtiesGroup {
  letter: string;
  specialties: string[];
}

const specialtiesData: SpecialtiesGroup[] = [
  { letter: 'A', specialties: ['Alergología', 'Anestesiología'] },
  { letter: 'B', specialties: ['Angiología', 'Bioquímica clínica'] },
  { letter: 'C', specialties: ['Cardiología'] },
  { letter: 'D', specialties: ['Dermatología', 'Diag. por Imágenes'] },
  { letter: 'E', specialties: ['Endocrinología'] },
  { letter: 'F', specialties: ['Fisiatra'] },
  {
    letter: 'G',
    specialties: ['Gastroenterología', 'Genética', 'Ginecología'],
  },
  { letter: 'H', specialties: ['Hematología', 'Hepatología'] },
  { letter: 'I', specialties: ['Inmunología', 'Infectología'] },
];

export default function MedicosPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );

  return (
    <div className='especialidades-container'>
      <div className='especialidades-decorative-circle-1'></div>
      <div className='especialidades-decorative-circle-2'></div>
      <div className='especialidades-decorative-circle-3'></div>

      <div className='especialidades-list'>
        {specialtiesData.map(group => (
          <div key={group.letter} className='especialidades-group'>
            <div className='especialidades-group-letter'>{group.letter}</div>

            <div className='especialidades-buttons-grid'>
              {group.specialties.map(specialty => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`especialidades-specialty-button ${selectedSpecialty === specialty ? 'especialidades-specialty-button-active' : ''}`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
