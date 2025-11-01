'use client';

import '@/styles/components/layout/Header.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getGreeting } from '@/utils';
import ArrowLeftIcon from '../icons/BackIcon';
import DropdownUser from '../ui/DropdownUser';

export default function Header() {
  const { userData } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/') {
    return (
      <header className='header'>
        <div className='header-content'>
          <h1>{getGreeting(userData)}</h1>
          <div className='user-info'>
            <DropdownUser />
          </div>
        </div>
      </header>
    );
  }

  if (pathname === '/Clinicas') {
    return (
      <header className='header'>
        <Link href='/' className='back-link'>
          <ArrowLeftIcon />
        </Link>
        <h1>Clínicas</h1>
      </header>
    );
  }

  if (pathname === '/Medicos') {
    return (
      <header className='header'>
        <Link href='/' className='back-link'>
          <ArrowLeftIcon />
        </Link>
        <h1>Médicos</h1>
      </header>
    );
  }

  if (pathname === '/Especialidades') {
    return (
      <header className='header'>
        <Link href='/' className='back-link'>
          <ArrowLeftIcon />
        </Link>
        <h1>Especialidades</h1>
      </header>
    );
  }

  // Botón de retroceso para páginas de añadir cita
  if (pathname?.match(/\/Medicos\/\d+$/)) {
    return (
      <header className='header'>
        <button 
          onClick={() => router.back()} 
          className='back-link'
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <ArrowLeftIcon />
        </button>
        <h1>Reservar Cita</h1>
        <DropdownUser />
      </header>
    );
  }

  // Botón de retroceso para páginas de perfil
  if (pathname?.startsWith('/Profesional/Perfil') || pathname?.startsWith('/Profile')) {
    const backPath = pathname?.includes('/Profesional/Perfil') ? '/Profesional' : '/';
    return (
      <header className='header'>
        <button 
          onClick={() => router.back()} 
          className='back-link'
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <ArrowLeftIcon />
        </button>
        <h1>Perfil</h1>
        <DropdownUser />
      </header>
    );
  }

  // Botón de retroceso para página de horario profesional
  if (pathname === '/Profesional/Horario') {
    return (
      <header className='header'>
        <button 
          onClick={() => router.back()} 
          className='back-link'
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <ArrowLeftIcon />
        </button>
        <h1>Modificar horario</h1>
        <DropdownUser />
      </header>
    );
  }

  return (
    <header className='header'>
      <h1>Medical Salud</h1>
      <DropdownUser />
    </header>
  );
}
