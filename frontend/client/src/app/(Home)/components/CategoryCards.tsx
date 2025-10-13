import Image from "next/image";

export default function CategoryCards() {
  const categories = [
    {
      icon: "/assets/icons/Home/medicos-icon.svg",
      alt: "Medicos",
      label: "Medicos",
    },
    {
      icon: "/assets/icons/Home/hospital-icon.svg",
      alt: "Hospital",
      label: "Clinicas y Hospitales",
    },
    {
      icon: "/assets/icons/Home/especialidades-icon.svg",
      alt: "Especialidades",
      label: "Especialidades",
    },
  ];

  return (
    <section className="category-cards">
      {categories.map((category, index) => (
        <article key={index} >
          <Image
            src={category.icon}
            alt={category.alt}
            width={50}
            height={50}
            priority
          />
          {category.label}
        </article>
      ))}
    </section>
  );
}
