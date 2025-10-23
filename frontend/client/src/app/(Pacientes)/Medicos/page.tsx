'use client'

import { useState } from "react";
import { DoctorCard } from "./components/DoctorCard";
import "@/styles/pages/Medicos.css";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  colorClass: string;
  category: "recent" | "favorites" | "all";
}

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Franco Pérez",
    specialty: "Médico Pediatra",
    rating: 94,
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23d4a5a5' width='100' height='100'/%3E%3Ccircle cx='50' cy='35' r='15' fill='%23c8a882'/%3E%3Cellipse cx='50' cy='70' rx='20' ry='25' fill='%23c8a882'/%3E%3C/svg%3E",
    category: "recent",
    colorClass: "bg-pink-400",
  },
  {
    id: "2",
    name: "Dra. Valeria Gómez",
    specialty: "Uróloga",
    rating: 97,
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23c9b5d4' width='100' height='100'/%3E%3Ccircle cx='50' cy='35' r='15' fill='%23d4a5a5'/%3E%3Cellipse cx='50' cy='70' rx='20' ry='25' fill='%23d4a5a5'/%3E%3C/svg%3E",
    category: "recent",
    colorClass: "bg-pink-300",
  },
  {
    id: "3",
    name: "Dr. Tomás Ferreyra",
    specialty: "Médico Psiquiatra",
    rating: 95,
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23a8c89f' width='100' height='100'/%3E%3Ccircle cx='50' cy='35' r='15' fill='%238fb88a'/%3E%3Cellipse cx='50' cy='70' rx='20' ry='25' fill='%238fb88a'/%3E%3C/svg%3E",
    category: "recent",
    colorClass: "bg-green-300",
  },
];

export default function MedicosPage() {
  const [activeFilter, setActiveFilter] = useState("Recientes");

  return (
    <>
      <div className="filter-bar">
        <div className="filter-buttons">
          {["A-Z", "Recientes", "Favoritos"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-button ${activeFilter === filter ? "filter-button-active" : ""}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="medicos-content">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorCard key={doctor.id} {...doctor} />
          ))
        ) : (
          <div className="medicos-no-doctors">
            <p className="medicos-no-doctors-text">
              No doctors found in this category
            </p>
          </div>
        )}
      </div>
    </>
  );
}