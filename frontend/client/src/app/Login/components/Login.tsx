'use client';

import {
  LogoIcon,
  BackIcon,
} from '@/components/icons';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

interface SignInProps {
  onBack: () => void;
  onChange: () => void;
}

export default function Login({ onBack, onChange }: SignInProps) {
  const { login, error, setError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string>('');

  const validateForm = (): boolean => {
    if (!email.trim() || !password.trim()) {
      setValidationError('Completa todos los campos');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Ingrese un correo electrónico válido');
      return false;
    }

    if (password.length < 6) {
      setValidationError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setValidationError('');
    setError(null);
    
    try {
      await login({ email, password });
    } catch (error) {
      // El error ya se maneja en el contexto, solo necesitamos capturarlo
      console.error('Error en login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Boton de regreso */}
      <button className='button-back' onClick={onBack}>
        <BackIcon />
      </button>

      {/* Circulo Rosa */}
      <div className='circle-pink'>
        <span>Iniciar Sesión</span>
        <img src='/assets/Login-computer.png' alt='user' />
      </div>

      {/* Sección de inicio de sesión */}
      <section className='login'>
        {/* Panel navegacion */}
        <div className='options'>
          <button className='active'>Iniciar Sesión</button>
          <button onClick={onChange}>Registrarse</button>
        </div>

        {/* Formulario de inicio de sesión */}
        <form className='login-form' onSubmit={handleLogin} noValidate>
          {/* Logo */}
          <div className='login-logo'>
            <div className='Logo'>
              <LogoIcon />
            </div>
            <span>Medical Salud</span>
          </div>

          {/* Inputs */}
          <div className='login-inputs'>
            <label htmlFor='paciente-email'>Correo electrónico</label>
            <input
              id='paciente-email'
              type='email'
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (validationError) {
                  setValidationError('');
                }
                if (error) {
                  setError(null);
                }
              }}
              placeholder='Correo electrónico'
            />
            
            <label htmlFor='paciente-password'>Contraseña</label>
            <input
              id='paciente-password'
              type='password'
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (validationError) {
                  setValidationError('');
                }
                if (error) {
                  setError(null);
                }
              }}
              placeholder='Contraseña'
            />
            
          </div>

          {/* Opciones de inicio de sesión */}
          <div className='login-options'>
            <label htmlFor='remember-me' className='remember'>
              <input type='checkbox' name='remember-me' id='remember-me' />
              Recuérdame
            </label>
            <span>Olvidé mi contraseña</span>
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
                  setValidationError('');
                  setError(null);
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

          {/* Botón de inicio de sesión */}
          <button 
            type='submit' 
            disabled={loading} 
            className='submit-button'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </section>
    </>
  );
}
