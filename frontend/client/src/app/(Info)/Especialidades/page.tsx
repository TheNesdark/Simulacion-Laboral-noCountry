'use client';
import { useState } from 'react';
import { getAllSpecialtiesGrouped } from '@/api/specialtiesApi';
import { useQuery } from '@tanstack/react-query';
import '@/styles/pages/Especialidades.css';

export default function EspecialidadesPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null,
  );

  const { data: specialtiesData = [], isLoading, error } = useQuery({
    queryKey: ["specialties"],
    queryFn: getAllSpecialtiesGrouped,
  });

  if (isLoading) {
    return (
      <div className="especialidades-container">
        <div className="especialidades-decorative-circle-1"></div>
        <div className="especialidades-decorative-circle-2"></div>
        <div className="especialidades-decorative-circle-3"></div>
        <div className="especialidades-list">
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Cargando especialidades...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="especialidades-container">
        <div className="especialidades-decorative-circle-1"></div>
        <div className="especialidades-decorative-circle-2"></div>
        <div className="especialidades-decorative-circle-3"></div>
        <div className="especialidades-list">
          <div style={{ textAlign: "center", padding: "2rem", color: "#ef4444" }}>
            Error al cargar especialidades: {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="especialidades-container">
      <div className="especialidades-decorative-circle-1"></div>
      <div className="especialidades-decorative-circle-2"></div>
      <div className="especialidades-decorative-circle-3"></div>

      <div className='especialidades-list'>
        {specialtiesData.map(group => (
          <div key={group.letter} className='especialidades-group'>
            <div className='especialidades-group-letter'>{group.letter}</div>

            <div className="especialidades-buttons-grid">
              {group.specialties.map((specialty) => (
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
