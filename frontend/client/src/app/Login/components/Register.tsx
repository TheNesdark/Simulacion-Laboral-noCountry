'use client';

import { BackIcon, LogoIcon } from '@/components/icons';
import useRegister from '@/hooks/useRegister';

interface SignUpProps {
  onBack: () => void;
  onChange: () => void;
}

export default function Register({ onBack, onChange }: SignUpProps) {
  const {
    step,
    formData,
    loading,
    error,
    validationError,
    setError,
    clearErrors,
    handleInputChange,
    handleRegister,
    nextStep,
    prevStep,
  } = useRegister();

  return (
    <>
      {/* Boton de regreso */}
      <button className='button-back' onClick={onBack}>
        <BackIcon />
      </button>

      {/* Circulo Rosa */}
      <div className='circle-pink'>
        <span>Registrarse</span>
        <img src='/assets/Login-computer.png' alt='user' />
      </div>

      {/* Sección de inicio de sesión */}
      <section className='login'>
        {/* Panel de navegacion */}
        <div className='options'>
          <button onClick={onChange}>Iniciar Sesión</button>
          <button className='active'>Registrarse</button>
        </div>

        {/* Formulario de inicio de sesión */}
        <form className='login-form' onSubmit={handleRegister} noValidate>
          {/* Logo */}
          <div className='login-logo'>
            <div className='Logo'>
              <LogoIcon />
            </div>
            <span>Medical Salud</span>
          </div>

          {/* Paso 1: Datos básicos */}
          {step === 1 && (
            <div className='login-inputs'>
              <div className='input-nombres'>
                <div>
                  <label htmlFor='nombres'>Nombres *</label>
                  <input
                    id='nombres'
                    name='nombres'
                    type='text'
                    placeholder='Nombre'
                    value={formData.nombres}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor='apellidos'>Apellidos *</label>
                  <input
                    id='apellidos'
                    name='apellidos'
                    type='text'
                    placeholder='Apellidos'
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <label htmlFor='paciente-email'>Correo electrónico *</label>
              <input
                id='paciente-email'
                name='email'
                type='email'
                placeholder='Correo electrónico'
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              
              <label htmlFor='paciente-password'>Contraseña *</label>
              <input
                id='paciente-password'
                name='password'
                type='password'
                placeholder='Contraseña'
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              
              {/* Mensaje de error unificado */}
              {(validationError || error) && (
                <div className='error-container'>
                  <div className='error-content'>
                    <svg className='error-icon' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2'/>
                      <line x1='12' y1='8' x2='12' y2='12' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                      <line x1='12' y1='16' x2='12.01' y2='16' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                    </svg>
                    <span className='error-text'>{validationError || error}</span>
                  </div>
                  <button 
                    type='button' 
                    className='error-close-btn'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      clearErrors();
                    }}
                    aria-label='Cerrar error'
                  >
                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <line x1='18' y1='6' x2='6' y2='18' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                      <line x1='6' y1='6' x2='18' y2='18' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                    </svg>
                  </button>
                </div>
              )}
              
              <button
                type='button'
                onClick={nextStep}
                className='next-step-button'
              >
                Siguiente
              </button>
            </div>
          )}

          {/* Paso 2: Datos adicionales */}
          {step === 2 && (
            <div className='login-inputs'>
              <div className='input-nombres'>
                <div>
                  <label htmlFor='documento'>Número de Documento</label>
                  <input
                    id='documento'
                    name='documento'
                    type='text'
                    placeholder='Documento de identidad'
                    value={formData.documento}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor='telefono'>Número de Teléfono</label>
                  <input
                    id='telefono'
                    name='telefono'
                    type='tel'
                    placeholder='Número de teléfono'
                    value={formData.telefono}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className='input-nombres'>
                <div>
                  <label htmlFor='fecha-nacimiento'>Fecha de Nacimiento</label>
                  <input
                    id='fecha-nacimiento'
                    name='fechaNacimiento'
                    type='date'
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor='genero'>Género</label>
                  <select
                    id='genero'
                    name='genero'
                    value={formData.genero}
                    onChange={handleInputChange}
                  >
                    <option value=''>Seleccionar género</option>
                    <option value='M'>Masculino</option>
                    <option value='F'>Femenino</option>
                    <option value='O'>Otro</option>
                  </select>
                </div>
              </div>

              <div className='step-buttons'>
                <button
                  type='button'
                  onClick={prevStep}
                  className='prev-step-button'
                >
                  Anterior
                </button>
                <button
                  type='submit'
                  disabled={loading}
                  className='submit-button'
                >
                  {loading ? 'Registrando...' : 'Registrarse'}
                </button>
              </div>
              
              {/* Mensaje de error unificado */}
              {(validationError || error) && (
                <div className='error-container'>
                  <div className='error-content'>
                    <svg className='error-icon' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2'/>
                      <line x1='12' y1='8' x2='12' y2='12' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                      <line x1='12' y1='16' x2='12.01' y2='16' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                    </svg>
                    <span className='error-text'>{validationError || error}</span>
                  </div>
                  <button 
                    type='button' 
                    className='error-close-btn'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      clearErrors();
                    }}
                    aria-label='Cerrar error'
                  >
                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <line x1='18' y1='6' x2='6' y2='18' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                      <line x1='6' y1='6' x2='18' y2='18' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </form>
      </section>
    </>
  );
}
