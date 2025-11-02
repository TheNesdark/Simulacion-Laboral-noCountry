'use client';

import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';

export default function InfoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Determinar el tipo de header según la ruta
  let headerType: 'home' | 'pages' | 'especialidades' | 'reservar-cita' | 'perfil' | 'horario' | 'default' = 'default';
  let headerTitle = '';
  let headerBackPath = '/';

  if (pathname === '/Medicos') {
    headerType = 'pages';
    headerTitle = 'Médicos';
  } else if (pathname === '/Especialidades') {
    headerType = 'pages';
    headerTitle = 'Especialidades';
  } else if (pathname?.match(/\/Medicos\/\d+$/)) {
    headerType = 'pages';
    headerTitle = 'Reservar Cita';
  }

  return (
    <>
      <Header type={headerType} title={headerTitle} backPath={headerBackPath} />
      <main>{children}</main>
    </>
  );
}
