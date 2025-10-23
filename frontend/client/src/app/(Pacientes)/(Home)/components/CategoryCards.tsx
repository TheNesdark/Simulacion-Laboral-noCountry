"use client";

import Link from 'next/link';

const categories = [
  {
    icon: "medicos-icon",
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
            <svg width={50} height={50}>
              <use
                href={`/assets/icons/homeIcons-sprites.svg#${category.icon}`}
              />
            </svg>
            {category.label}
          </article>
        </Link>
      ))}
    </section>
  );
}
