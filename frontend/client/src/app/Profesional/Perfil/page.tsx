'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '@/styles/pages/Profile.css';
import EditIcon from '@/components/icons/EditIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import CalendarIcon from '@/components/icons/CalendarIcon';
import LockIcon from '@/components/icons/LockIcon';
import HelpIcon from '@/components/icons/HelpIcon';
import ProfileIcon from '@/components/icons/ProfileIcon';
import { useAuth } from '@/context/AuthContext';
import Avatar from '@/components/ui/Avatar';
import { getDoctorById } from '@/services/backend/doctorsService';
import { getUserData } from '@/services/firebase/authService';
import { Medico } from '@/types';

const profileOptions = [
  {
    id: 'edit-profile',
    icon: EditIcon,
    label: 'Editar perfil',
    href: '/Profesional/Perfil/edit',
  },
  {
    id: 'modify-schedule',
    icon: CalendarIcon,
    label: 'Modificar horario',
    href: '/Profesional/Horario',
  },
  {
    id: 'switch-to-patient',
    icon: ProfileIcon,
    label: 'Volver a ser Paciente',
    action: 'switch-to-patient',
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

export default function PerfilPage() {
  const { medicoId, user, pacienteId, updateUserData } = useAuth();
  const router = useRouter();
  const [medico, setMedico] = useState<Medico | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [switchDialogOpen, setSwitchDialogOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    if (medicoId) {
      cargarMedico();
    }
  }, [medicoId]);

  useEffect(() => {
    const loadPhoto = async () => {
      if (user?.uid) {
        try {
          const userData = await getUserData(user.uid);
          if (userData?.photoURL) {
            setPhotoURL(userData.photoURL);
          }
        } catch (error) {
          console.error('Error al cargar foto del médico:', error);
        }
      }
    };
    loadPhoto();
  }, [user]);

  const cargarMedico = async () => {
    if (!medicoId) return;
    try {
      const data = await getDoctorById(medicoId);
      setMedico(data);
    } catch (err) {
      console.error('Error al cargar perfil:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToPatient = async () => {
    if (!pacienteId) {
      alert('No tiene una cuenta de paciente asociada. Por favor, contacte al administrador.');
      return;
    }

    setIsSwitching(true);
    try {
      // Solo cambiar el rol, preservando ambos IDs (pacienteId y medicoId)
      // Los datos en el backend (tablas medicos y pacientes) se mantienen intactos
      await updateUserData({ role: 'paciente' });
      setSwitchDialogOpen(false);
      alert('Ha vuelto a ser paciente exitosamente. Sus datos profesionales se mantienen guardados y podrá volver a ser médico cuando lo desee.');
      router.push('/');
    } catch (error) {
      console.error('Error al cambiar a paciente:', error);
      alert('Error al cambiar a paciente. Por favor, intente nuevamente.');
    } finally {
      setIsSwitching(false);
    }
  };

  const handleOptionClick = (option: typeof profileOptions[0]) => {
    if (option.action === 'switch-to-patient') {
      setSwitchDialogOpen(true);
    }
  };

  if (loading) {
    return (
      <div className='profile-page'>
        <div className='profile-banner'>
          <div className='profile-image-container'>
            <Avatar
              src={photoURL}
              alt="Perfil"
              size={100}
              fallbackText={medico ? `${medico.nombre} ${medico.apellido}` : 'Usuario'}
            />
          </div>
        </div>
        <div className='profile-options'>
          <div style={{ padding: '20px', textAlign: 'center' }}>Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='profile-page'>
        <div className='profile-banner'>
          <div className='profile-image-container'>
            <Avatar
              src={photoURL}
              alt={`${medico?.nombre || ''} ${medico?.apellido || ''}`}
              size={100}
              fallbackText={medico ? `${medico.nombre} ${medico.apellido}` : 'Usuario'}
            />
          </div>
          {medico && (
            <div className='profile-name-display'>
              <h2>{medico.nombre} {medico.apellido}</h2>
              {medico.especialidad?.nombre && (
                <p style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>
                  {medico.especialidad.nombre}
                </p>
              )}
            </div>
          )}
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

            if (option.href) {
              return (
                <Link key={option.id} href={option.href} className='option-item'>
                  {content}
                </Link>
              );
            } else if (option.action) {
              return (
                <button 
                  key={option.id} 
                  className='option-item'
                  onClick={() => handleOptionClick(option)}
                >
                  {content}
                </button>
              );
            } else {
              return (
                <button key={option.id} className='option-item'>
                  {content}
                </button>
              );
            }
          })}
        </div>
      </div>

      {/* Diálogo para cambiar a paciente */}
      {switchDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Volver a ser Paciente</h2>
            <p className="mb-4">
              ¿Está seguro que desea volver a ser paciente? 
            </p>
            <p className="mb-4 text-sm text-gray-600">
              <strong>Nota:</strong> Sus datos profesionales se mantendrán guardados. Perderá acceso temporal a las funciones de profesional, pero podrá volver a activarlas cuando lo desee desde su perfil de paciente.
            </p>
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={() => setSwitchDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={isSwitching}
              >
                Cancelar
              </button>
              <button
                onClick={handleSwitchToPatient}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={isSwitching}
              >
                {isSwitching ? 'Procesando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
