'use client';

import {
  LogoIcon,
  GoogleIcon,
  FacebookIcon,
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

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    await login({ email, password });
    setLoading(false);
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
        <form className='login-form' action='' onSubmit={handleLogin}>
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
              onChange={e => setEmail(e.target.value)}
              placeholder='Correo electrónico'
            />
            <label htmlFor='paciente-password'>Contraseña</label>
            <input
              id='paciente-password'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
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

          {error && (
            <div className='mb-3 flex justify-between p-2 rounded-xl border border-red-700 bg-red-300 text-red-700'>
              <small>{error}</small>
              <button type='button' onClick={() => setError(null)}>
                x
              </button>
            </div>
          )}

          {/* Botón de inicio de sesión */}
          <button type='submit' disabled={loading} className='submit-button'>
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>

          {/* Sección de proveedores */}
          <div className='login-providers'>
            <GoogleIcon width={50} height={50} />
            <FacebookIcon width={50} height={50} />
          </div>
        </form>
      </section>
    </>
  );
}
