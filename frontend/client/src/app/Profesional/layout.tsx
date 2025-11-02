'use client';

import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import { usePathname } from 'next/navigation';
import '@/styles/pages/Home.css';

export default function ProfesionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Determinar el tipo de header según la ruta
  let headerType: 'home' | 'pages' | 'especialidades' | 'reservar-cita' | 'perfil' | 'horario' | 'default' = 'default';
  let headerTitle = '';

  if (pathname === '/Profesional' || pathname?.startsWith('/Profesional/Home')) {
    headerType = 'home';
  } else if (pathname?.startsWith('/Profesional/Perfil')) {
    headerType = 'pages';
    headerTitle = 'Perfil';
  } else if (pathname === '/Profesional/Horario') {
    headerType = 'pages';
    headerTitle = 'Modificar horario';
  }

  return (
    <>
      <Header type={headerType} title={headerTitle} />
      <main className='profesional-page'>{children}</main>
      <NavBar />
    </>
  );
}
