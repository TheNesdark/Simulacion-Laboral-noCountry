'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { UserPhoto } from '@components/icons';

export default function DropdownUser() {
  const { user, logout, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className='dropdown-user' ref={ref}>
      <button
        aria-expanded={isOpen}
        aria-haspopup='menu'
        className='dropdown-toggle'
        onClick={() => setIsOpen(s => !s)}
        type='button'
      >
        <UserPhoto />
      </button>

      {isOpen && (
        <div className='dropdown-menu' role='menu'>
          <Link href={role === 'medico' ? '/Profesional/Perfil' : '/Perfil'} className='dropdown-item' role='menuitem'>
            <span className='dropdown-item-profile'>Perfil</span>
          </Link>
          <button className='dropdown-item' role='menuitem' onClick={logout}>
            <span className='dropdown-item-logout'>Cerrar sesión</span>
          </button>
        </div>
      )}
    </div>
  );
}
