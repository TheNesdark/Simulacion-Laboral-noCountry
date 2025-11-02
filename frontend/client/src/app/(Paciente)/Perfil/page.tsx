'use client';

import React from 'react';
import Link from 'next/link';
import '@/styles/pages/Profile.css';
import EditIcon from '@/components/icons/EditIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import MonitorIcon from '@/components/icons/MonitorIcon';
import LockIcon from '@/components/icons/LockIcon';
import HelpIcon from '@/components/icons/HelpIcon';
import { useAuth } from '@/context/AuthContext';
import { UserPhoto } from '@/components/icons';

const profileOptions = [
  {
    id: 'edit-profile',
    icon: EditIcon,
    label: 'Editar perfil',
    href: '/Perfil/edit',
  },
  {
    id: 'switch-professional',
    icon: MonitorIcon,
    label: 'Cambiar a Profesional',
    href: '/Perfil/professional',
  },
  {
    id: 'privacy',
    icon: LockIcon,
    label: 'Privacidad',
  },
  {
    id: 'help',
    icon: HelpIcon,
    label: 'Ayuda',
  },
];

export default function ProfilePage() {

  return (
    <div className='profile-page'>
      <div className='profile-banner'>
        <div className='profile-image-container'>
          <UserPhoto width={100} height={100} />
        </div>
      </div>

      <div className='profile-options'>
        {profileOptions.map(option => {
          const IconComponent = option.icon;
          const content = (
            <>
              <IconComponent />
              <span>{option.label}</span>
              <ArrowRightIcon />
            </>
          );

          return option.href ? (
            <Link key={option.id} href={option.href} className='option-item'>
              {content}
            </Link>
          ) : (
            <button key={option.id} className='option-item'>
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
