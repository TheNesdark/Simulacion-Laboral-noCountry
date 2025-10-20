import React from 'react';
import Link from 'next/link';
import "@/styles/pages/Profile.css";
import EditIcon from "@/components/icons/EditIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import MonitorIcon from "@/components/icons/MonitorIcon";
import LockIcon from "@/components/icons/LockIcon";
import HelpIcon from "@/components/icons/HelpIcon";

const profileOptions = [
  {
    id: 'edit-profile',
    icon: EditIcon,
    label: 'Editar perfil',
    href: '/Profile/edit',
  },
  {
    id: 'switch-professional',
    icon: MonitorIcon,
    label: 'Cambiar a Profesional',
    href: '/Profile/professional',
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
    <div className="profile-page">
      <div className="profile-banner">
        <div className="profile-image-container">
          <div className="profile-image">
            <span>V</span>
          </div>
          <button className="edit-photo-btn" aria-label="Editar foto">
            <EditIcon />
          </button>
        </div>
      </div>

      <div className="profile-options">
        {profileOptions.map((option) => {
          const IconComponent = option.icon;
          const content = (
            <>
              <IconComponent />
              <span>{option.label}</span>
              <ArrowRightIcon />
            </>
          );

          return option.href ? (
            <Link key={option.id} href={option.href} className="option-item">
              {content}
            </Link>
          ) : (
            <button key={option.id} className="option-item">
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
