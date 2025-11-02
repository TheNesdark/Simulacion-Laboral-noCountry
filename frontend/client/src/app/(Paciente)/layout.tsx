'use client';

import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import { usePathname } from 'next/navigation';
import '@/styles/pages/Home.css';

export default function PacienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Determinar el tipo de header según la ruta
  let headerType: 'home' | 'pages' | 'especialidades' | 'reservar-cita' | 'perfil' | 'horario' | 'default' = 'default';
  let headerTitle = '';

  if (pathname === '/') {
    headerType = 'home';
  } else if (pathname?.startsWith('/Perfil')) {
    headerType = 'pages';
    headerTitle = 'Perfil';
  }

  return (
    <>
      <Header type={headerType} title={headerTitle} />
      <main className='paciente-page'>{children}</main>
      <NavBar />
    </>
  );
}
