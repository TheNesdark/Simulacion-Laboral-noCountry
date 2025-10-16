"use client";

const categories = [
  {
    icon: "medicos-icon",
    alt: "Medicos",
    label: "Medicos",
  },
  {
    icon: "hospital-icon",
    alt: "Hospital",
    label: "Clinicas y Hospitales",
  },
  {
    icon: "especialidades-icon",
    alt: "Especialidades",
    label: "Especialidades",
  },
];

export default function CategoryCards() {
  return (
    <section className="category-cards">
      {categories.map((category, index) => (
        <article key={index}>
          <svg width={50} height={50}>
            <use
              href={`/assets/icons/homeIcons-sprites.svg#${category.icon}`}
            />
          </svg>
          {category.label}
        </article>
      ))}
    </section>
  );
}
