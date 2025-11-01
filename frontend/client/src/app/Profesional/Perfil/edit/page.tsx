'use client';

import '@/styles/pages/Profile.css';
import React, { useState, useEffect } from 'react';
import EditIcon from '@/components/icons/EditIcon';
import { useAuth } from '@/context/AuthContext';
import { getDoctorById, updateDoctor } from '@/services/backend/doctorsService';
import { Medico } from '@/types';
import { useRef } from 'react';
import { uploadPhotoToFirebase } from '@/services/firebase/storageService';
import { useNotifications } from '@/utils/notifications';

export default function EditProfilePage() {
  const { medicoId, user, updateUserData } = useAuth();
  const notifications = useNotifications();
  const [medico, setMedico] = useState<Medico | null>(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (medicoId) {
      cargarMedico();
    }
  }, [medicoId]);

  const cargarMedico = async () => {
    if (!medicoId) return;
    try {
      const data = await getDoctorById(medicoId);
      setMedico(data);
      setNombre(data.nombre);
      setApellido(data.apellido);
      setTelefono(data.telefono);
      setEmail(data.email);
    } catch (err) {
      setError('Error al cargar perfil');
    }
  };

  const handleEditPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      notifications.warning('Por favor, selecciona un archivo de imagen válido');
      return;
    }

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      notifications.warning('La imagen es demasiado grande. Por favor, selecciona una imagen menor a 5MB');
      return;
    }

    // Mostrar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicoId) return;

    setLoading(true);
    setError(null);

    try {
      // Actualizar datos del médico en el backend
      await updateDoctor(medicoId, {
        nombre,
        apellido,
        telefono,
        email,
      });

      // Subir foto si hay una nueva
      const file = fileInputRef.current?.files?.[0];
      if (file && user?.uid) {
        try {
          const photoURL = await uploadPhotoToFirebase(file, user.uid);
          await updateUserData({ photoURL });
        } catch (photoError) {
          // Error al subir foto
          // No fallar toda la operación si solo falla la foto
        }
      }

      notifications.success('Perfil actualizado exitosamente');
      await cargarMedico();
      setPhotoPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: unknown) {
      const errorMessage = err && typeof err === 'object' && 'message' in err
        ? String(err.message)
        : 'Error al actualizar perfil';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!medico) {
    return (
      <div className='edit-profile-page'>
        <div style={{ padding: '20px', textAlign: 'center' }}>Cargando...</div>
      </div>
    );
  }

  return (
    <div className='edit-profile-page'>
      <div className='profile-banner edit-banner'>
        <div className='profile-image-container'>
          <div className='profile-image'>
            {photoPreview ? (
              <img
                src={photoPreview}
                alt='Vista previa'
                className='w-full h-full object-cover rounded-full'
              />
            ) : (
              <span>
                {nombre.charAt(0).toUpperCase()}
                {apellido.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <button
            className='edit-photo-btn'
            type='button'
            aria-label='Editar foto'
            onClick={handleEditPhotoClick}
          >
            <EditIcon />
          </button>
        </div>
        <div className='profile-name-display'>
          <h2>
            {nombre} {apellido}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='edit-profile-form'>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handlePhotoChange}
          accept='image/*'
          className='hidden'
        />

        <div className='form-group'>
          <label htmlFor='nombre'>Nombre</label>
          <input
            type='text'
            id='nombre'
            name='nombre'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='apellido'>Apellido</label>
          <input
            type='text'
            id='apellido'
            name='apellido'
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='telefono'>Teléfono</label>
          <input
            type='tel'
            id='telefono'
            name='telefono'
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Correo Electrónico</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='matricula'>Matrícula</label>
          <input
            type='text'
            id='matricula'
            name='matricula'
            value={medico.matricula}
            disabled
            readOnly
            style={{
              backgroundColor: '#f5f5f5',
              cursor: 'not-allowed',
              color: '#666'
            }}
          />
        </div>

        <div className='form-group'>
          <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            {medico.especialidad?.nombre && (
              <p style={{ margin: '4px 0', fontSize: '14px' }}>
                <strong>Especialidad:</strong> {medico.especialidad.nombre}
              </p>
            )}
            {medico.clinica?.nombre && (
              <p style={{ margin: '4px 0', fontSize: '14px' }}>
                <strong>Clínica:</strong> {medico.clinica.nombre}
              </p>
            )}
          </div>
        </div>

        {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}

        <button type='submit' className='save-button' disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}

