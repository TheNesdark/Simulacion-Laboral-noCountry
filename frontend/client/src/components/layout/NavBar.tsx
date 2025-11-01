'use client';

import '@/styles/components/layout/NavBar.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  HomeIcon,
  EstudiosIcon,
  CalendarioIcon,
  ChatIcon,
} from '@/components/icons';

export default function NavBar() {
  const pathname = usePathname();
  const { role } = useAuth();

  // No mostrar navbar en páginas de perfil y horario
  if (pathname?.startsWith('/Profesional/Perfil') || pathname?.startsWith('/Profile') || pathname === '/Profesional/Horario') {
    return null;
  }

  const navItems = [
    {
      href: '/',
      icon: HomeIcon,
      label: 'inicio',
      active: pathname === '/',
    },
    {
      href: '/Examenes',
      icon: EstudiosIcon,
      label: 'Estudio',
      active: pathname === '/Examenes',
    },
    {
      href: '/Calendario',
      icon: CalendarioIcon,
      label: 'Mis citas',
      active: pathname === '/Calendario',
    },
    {
      href: '/Chat',
      icon: ChatIcon,
      label: 'Chat',
      active: pathname === '/Chat',
    },
  ];

  const medicoNavItems = [
    {
      href: '/Profesional',
      icon: HomeIcon,
      label: 'Inicio',
      active: pathname === '/Profesional',
    },
    {
      href: '/Profesional/Calendario',
      icon: CalendarioIcon,
      label: 'Mis citas',
      active: pathname === '/Profesional/Calendario',
    },
    {
      href: '/Chat',
      icon: ChatIcon,
      label: 'Chat',
      active: pathname.startsWith('/Chat'),
    },
  ];

  if (role === 'medico') {
    return (
      <nav className='bottom-navbar bottom-navbar-medico'>
        {medicoNavItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={item.active ? 'active' : ''}
          >
            <item.icon width={30} height={30} />
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className='bottom-navbar'>
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={item.active ? 'active' : ''}
        >
          <item.icon width={30} height={30} />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
