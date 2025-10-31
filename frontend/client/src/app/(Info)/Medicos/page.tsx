"use client";

import { useState } from 'react';
import { DoctorCard } from './components/DoctorCard';
import { Doctor } from '@/types';
import { getAllDoctors } from '@/api/doctorsApi';
import { useQuery } from '@tanstack/react-query';
import '@/styles/pages/Medicos.css';

export default function MedicosPage() {
  const [activeFilter, setActiveFilter] = useState("Recientes");

  const { data: doctors = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });

  let filteredDoctors = doctors || [];
  if (activeFilter === "A-Z") {
    filteredDoctors = [...doctors].sort((a, b) => a.name.localeCompare(b.name));
  } else if (activeFilter === "Favoritos") {
    filteredDoctors = doctors.filter(doctor => doctor.category === 'favorites');
  } else if (activeFilter === "Recientes") {
    filteredDoctors = doctors.filter(doctor => doctor.category === 'recent');
  }

  return (
    <>
      <div className="filter-bar">
        <div className="filter-buttons">
          {["A-Z", "Recientes", "Favoritos"].map((filter) => (
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
