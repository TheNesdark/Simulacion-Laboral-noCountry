'use client';

import { useState } from 'react';
import '@/styles/pages/Clinicas.css';
import { ClinicCard } from './components/ClinicCard';
import { getAllClinics } from '@/api/clinicsApi';
import { useQuery } from '@tanstack/react-query';

export default function MedicosPage() {
  const [activeFilter, setActiveFilter] = useState('Recientes');

  const { data: clinics = [] } = useQuery({
    queryKey: ['clinics'],
    queryFn: getAllClinics,
  });

  let filteredClinics = clinics || [];
  if (activeFilter === 'A-Z') {
    filteredClinics = [...clinics].sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  return (
    <>
      <div className='filter-bar'>
        <div className='filter-buttons'>
          {['A-Z', 'Recientes', 'Favoritos'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-button ${activeFilter === filter ? 'filter-button-active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className='clinicas-content'>
        {filteredClinics.map(clinic => (
          <ClinicCard key={clinic.id} {...clinic} />
        ))}
      </div>
    </>
  );
}
