'use client';

import '@/styles/pages/Profile.css';
import React from 'react';
import EditIcon from '@/components/icons/EditIcon';
import useEditProfile from '@/hooks/useEditProfile';

export default function EditProfilePage() {
  const {
    formData,
    photoPreview,
    fileInputRef,
    handlePhotoChange,
    handleEditPhotoClick,
    handleInputChange,
    handleSubmit,
    userData,
  } = useEditProfile();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await handleSubmit(e);
      if (result?.success) {
        if (result.photoUploadSuccess || !fileInputRef.current?.files?.[0]) {
          alert('Cambios guardados exitosamente');
        } else {
          alert(
            'Cambios guardados, pero hubo un error al subir la foto. Puedes intentar subirla nuevamente.'
          );
        }
      }
    } catch (error: any) {
      if (error.message) {
        alert(error.message);
      } else {
        alert('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
      }
    }
  };

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
            ) : userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt='Foto de perfil'
                className='w-full h-full object-cover rounded-full'
              />
            ) : (
              <span>
                {userData?.nombres
                  ? userData.nombres.charAt(0).toUpperCase()
                  : 'U'}
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
            {formData.nombres} {formData.apellidos}
          </h2>
        </div>
      </div>

      <form onSubmit={onSubmit} className='edit-profile-form'>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handlePhotoChange}
          accept='image/*'
          className='hidden'
        />
        <div className='form-group'>
          <label htmlFor='nombres'>Nombres</label>
          <input
            type='text'
            id='nombres'
            name='nombres'
            value={formData.nombres}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='apellidos'>Apellidos</label>
          <input
            type='text'
            id='apellidos'
            name='apellidos'
            value={formData.apellidos}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='documento'>Número de Documento</label>
          <input
            type='text'
            id='documento'
            name='documento'
            value={formData.documento}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='genero'>Género</label>
          <select
            id='genero'
            name='genero'
            value={formData.genero}
            onChange={handleInputChange}
            required
          >
            <option value=''>Seleccione</option>
            <option value='masculino'>Masculino</option>
            <option value='femenino'>Femenino</option>
            <option value='otro'>Otro</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='fechaNacimiento'>Fecha de Nacimiento</label>
          <input
            type='date'
            id='fechaNacimiento'
            name='fechaNacimiento'
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='correo'>Correo Electrónico</label>
          <input
            type='email'
            id='correo'
            name='correo'
            value={formData.correo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='telefono'>Número de Teléfono</label>
          <input
            type='tel'
            id='telefono'
            name='telefono'
            value={formData.telefono}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type='submit' className='save-button'>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
