'use client';
import React from 'react';
import '@/styles/pages/Profile.css';
import clinics from "@data/clinics.json"
import specialitys from "@data/specialties.json"
import useSwitchToProfessional from '@/hooks/useSwitchToProfessional';

export default function SwitchToProfessionalPage() {
  const {
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
  } = useSwitchToProfessional();


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div className='edit-profile-page'>
      <h1 className='page-title'>Convertirse en Profesional de la Salud</h1>
      
      {error && (
        <div className='error-message'>
          {error}
        </div>
      )}
      
      <form onSubmit={handleFormSubmit} className='edit-profile-form'>
        <div className='form-section'>
          <h2>Datos Personales</h2>
          
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='nombre'>Nombre</label>
              <input
                type='text'
                id='nombre'
                name='nombre'
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder='Ingrese su nombre'
                required
              />
            </div>
            
            <div className='form-group'>
              <label htmlFor='apellido'>Apellido</label>
              <input
                type='text'
                id='apellido'
                name='apellido'
                value={formData.apellido}
                onChange={handleInputChange}
                placeholder='Ingrese su apellido'
                required
              />
            </div>
          </div>
          
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Ingrese su email'
                required
              />
            </div>
            
            <div className='form-group'>
              <label htmlFor='telefono'>Teléfono</label>
              <input
                type='tel'
                id='telefono'
                name='telefono'
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder='Ingrese su teléfono'
                required
              />
            </div>
          </div>
          
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='numeroDocumento'>Número de Documento</label>
              <input
                type='text'
                id='numeroDocumento'
                name='numeroDocumento'
                value={formData.numeroDocumento}
                onChange={handleInputChange}
                placeholder='Ingrese su número de documento'
                required
              />
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
              <option value=''>Seleccione un género</option>
              <option value='M'>Masculino</option>
              <option value='F'>Femenino</option>
              <option value='O'>Otro</option>
            </select>
          </div>
        </div>
        
        <div className='form-section'>
          <h2>Datos Profesionales</h2>
          
          <div className='form-group'>
            <label htmlFor='matricula'>Número de Matrícula Profesional</label>
            <input
              type='number'
              id='matricula'
              name='matricula'
              value={formData.matricula || ''}
              onChange={handleInputChange}
              placeholder='Ingrese su número de matrícula'
              required
            />
          </div>
          
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='clinicaId'>Clínica</label>
              <select
                id='clinicaId'
                name='clinicaId'
                value={formData.clinicaId || ''}
                onChange={handleInputChange}
                required
              >
                <option value=''>Seleccione una clínica</option>
                {clinics.clinics.map(clinic => (
                  <option key={clinic.id} value={clinic.id}>
                    {clinic.nombre}
                  </option>
                ))}
              </select>
            </div>
            
            <div className='form-group'>
              <label htmlFor='especialidadId'>Especialidad</label>
              <select
                id='especialidadId'
                name='especialidadId'
                value={formData.especialidadId || ''}
                onChange={handleInputChange}
                required
              >
                <option value=''>Seleccione una especialidad</option>
                {specialitys.specialties.map((specialty, index) => (
                  <option key={index} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <button type='submit' className='save-button' disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  );
}
