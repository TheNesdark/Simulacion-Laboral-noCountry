"use client";

import Image from "next/image";

interface SignInProps {
  onBack: () => void;
  onChange: () => void;
}

export default function Login({ onBack, onChange }: SignInProps) {
  return (
    <>
      {/* Boton de regreso */}
      <button className="button-back" onClick={onBack}>
        <img src="/assets/icons/back-icon.svg" alt="back" />
      </button>

      {/* Circulo Rosa */}
      <div className="circle-pink">
        <span>Iniciar Sesión</span>
        <img src="/assets/Login-computer.png" alt="user" />
      </div>

      {/* Sección de inicio de sesión */}
      <section className="login">
        {/* Panel de navegacion */}
        <div className="options">
          <button className="active">Iniciar Sesión</button>
          <button onClick={onChange}>Registrarse</button>
        </div>

        {/* Formulario de inicio de sesión */}
        <form className="login-form" action="">
          {/* Logo */}
          <div className="login-logo">
            <div className="Logo">
              <Image
                src="/assets/icons/logo-icon.svg"
                alt="user"
                width={40}
                height={40}
              />
            </div>
            <span>Medical Salud</span>
          </div>

          {/* Inputs */}
          <div className="login-inputs">
            <label htmlFor="paciente-email">Correo electrónico</label>
            <input
              id="paciente-email"
              type="email"
              placeholder="Correo electrónico"
            />
            <label htmlFor="paciente-password">Contraseña</label>
            <input
              id="paciente-password"
              type="password"
              placeholder="Contraseña"
            />
          </div>

          {/* Opciones de inicio de sesión */}
          <div className="login-options">
            <label htmlFor="remember-me" className="remember">
              <input type="checkbox" name="remember-me" id="remember-me" />
              Recuérdame
            </label>
            <span>Olvidé mi contraseña</span>
          </div>

          {/* Botón de inicio de sesión */}
          <button type="submit">Iniciar Sesión</button>

          {/* Sección de proveedores */}
          <div className="login-providers">
            <svg width={50} height={50}>
              <use href="/assets/icons/Providers.svg#google" />
            </svg>
            <svg width={50} height={50}>
              <use href="/assets/icons/Providers.svg#facebook" />
            </svg>
          </div>
        </form>
      </section>
    </>
  );
}
