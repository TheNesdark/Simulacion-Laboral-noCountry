'use client';

import Link from 'next/link';
import {
  MedicosIcon,
  HospitalIcon,
  EspecialidadesIcon,
} from '@/components/icons';

const categories = [
  {
    icon: MedicosIcon,
    alt: 'Medicos',
    label: 'Medicos',
    path: '/Medicos',
  },
  {
    icon: HospitalIcon,
    alt: 'Hospital',
    label: 'Clinicas y Hospitales',
    path: '/Clinicas',
  },
  {
    icon: EspecialidadesIcon,
    alt: 'Especialidades',
    label: 'Especialidades',
    path: '/Especialidades',
  },
];

export default function CategoryCards() {
  return (
    <section className='category-cards'>
      {categories.map((category, index) => (
        <Link href={category.path} key={index} className='category-card'>
          <article>
            <category.icon />
            {category.label}
          </article>
        </Link>
      ))}
    </section>
  );
}
