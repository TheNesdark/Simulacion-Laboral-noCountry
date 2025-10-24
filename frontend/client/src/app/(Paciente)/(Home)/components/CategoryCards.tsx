"use client";

import Link from 'next/link';
import ClinicsIcon from '@/components/icons/ClinicsIcon';

const categories = [
  {
    icon: ClinicsIcon,
    alt: "Medicos",
    label: "Medicos",
    path: "/Medicos"
  },
  {
    icon: "hospital-icon",
    alt: "Hospital",
    label: "Clinicas y Hospitales",
    path: "/Clinicas"
  },
  {
    icon: "especialidades-icon",
    alt: "Especialidades",
    label: "Especialidades",
    path: "/Especialidades"
  },
];

export default function CategoryCards() {
  return (
    <section className="category-cards">
      {categories.map((category, index) => (
        <Link href={category.path} key={index} className="category-card">
          <article>
            <category.icon />
            {category.label}
          </article>
        </Link>
      ))}
    </section>
  );
}
