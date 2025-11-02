'use client';

import '@/styles/components/layout/Header.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';


import ArrowLeftIcon from '../icons/BackIcon';
import DropdownUser from '../ui/DropdownUser';
import { NotificationIcon } from '@/components/icons';
import { LogoIcon } from '@/components/icons';

type HeaderType = 
  | 'home'
  | 'pages'
  | 'especialidades'
  | 'reservar-cita'
  | 'perfil'
  | 'horario'
  | 'default';

interface HeaderProps {
  type?: HeaderType;
  title?: string;
  backPath?: string;
}

export default function Header({ 
  type = 'default',
  title,
  backPath
}: HeaderProps = {}) {
  const { userData } = useAuth();
  const router = useRouter();

  // Renderizar según el tipo de header
  switch (type) {
    case 'home':
      return (
        <header className='header'>
          <div className='header-content'>
            <DropdownUser />
            <NotificationIcon />
          </div>
        </header>
      );

    case 'pages':
      return (
        <header className='header'>
          <button 
            onClick={() => router.back()} 
            className='back-link'
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <ArrowLeftIcon />
          </button>
          <h1>{title || 'Página'}</h1>
        </header>
      );

    case 'especialidades':
      return (
        <header className='header'>
          <Link href={backPath || '/'} className='back-link'>
            <ArrowLeftIcon />
          </Link>
          <h1>{title || 'Especialidades'}</h1>
        </header>
      );

    case 'reservar-cita':
      return (
        <header className='header'>
          <button 
            onClick={() => router.back()} 
            className='back-link'
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <ArrowLeftIcon />
          </button>
          <h1>{title || 'Reservar Cita'}</h1>
          <DropdownUser />
        </header>
      );

    case 'perfil':
      return (
        <header className='header'>
          <button 
            onClick={() => router.back()} 
            className='back-link'
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <ArrowLeftIcon />
          </button>
          <h1>{title || 'Perfil'}</h1>
          <DropdownUser />
        </header>
      );


    case 'default':
    default:
      return (
        <header className='header'>
          <LogoIcon />
          <h1>{title || 'Medical Salud'}</h1>
        </header>
      );
  }
}
