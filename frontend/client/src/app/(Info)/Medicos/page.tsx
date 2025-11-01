"use client";

import { useState } from 'react';
import { DoctorCard } from './components/DoctorCard';
import { getAllDoctors } from '@/services/backend/doctorsService';
import { useQuery } from '@tanstack/react-query';
import '@/styles/pages/Medicos.css';

export default function MedicosPage() {
  const [activeFilter, setActiveFilter] = useState("A-Z");

  const { data: doctors = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });

  let filteredDoctors = doctors || [];
  if (activeFilter === "A-Z") {
    filteredDoctors = [...doctors].sort((a, b) => 
      `${a.nombre} ${a.apellido}`.localeCompare(`${b.nombre} ${b.apellido}`)
    );
  }

  return (
    <>
      <div className="filter-bar">
        <div className="filter-buttons">
          <button
            onClick={() => setActiveFilter("A-Z")}
            className={`filter-button ${activeFilter === "A-Z" ? 'filter-button-active' : ''}`}
          >
            A-Z
          </button>
        </div>
      </div>

      <div className="medicos-content">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} {...doctor} />
          ))
        ) : (
          <div className="medicos-no-doctors">
            <p className="medicos-no-doctors-text">
              No se encontraron médicos en esta categoría
            </p>
          </div>
        )}
      </div>
    </>
  );
}
