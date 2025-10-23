'use client'

import { useState } from "react";
import "@/styles/pages/Clinicas.css";
import { ClinicCard } from "./components/ClinicCard";

interface Clinic {
  id: string;
  name: string;
  image: string;
  phone: string;
  address: string;
  color: string;
}

const clinics: Clinic[] = [
  {
    id: "1",
    name: "Hospital Centro Integral",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    phone: "+54 9 11\n6844-8899",
    address: "Calle Cualquiera 123, Lanús, Buenos Aires",
    color: "bg-blue-100",
  },
  {
    id: "2",
    name: "Hospital Italiano",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    phone: "+54 9 261\n844-8899",
    address: "Calle Cualquiera, Ciudad, Mendoza",
    color: "bg-orange-100",
  },
  {
    id: "3",
    name: "Clínica Santa María",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    phone: "+54 9 261\n844-8899",
    address: "Calle Cualquiera, Ciudad, Mendoza",
    color: "bg-orange-100",
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

      <div className="clinicas-content">
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.id} {...clinic} />
        ))}
      </div>
    </>
  );
}