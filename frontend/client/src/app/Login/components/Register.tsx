"use client";

import { BackIcon, LogoIcon } from "@/components/icons";
import { GoogleIcon, FacebookIcon } from "@/components/icons";
import useRegister from "@/hooks/useRegister";

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
    handleInputChange,
    handleRegister,
    nextStep,
    prevStep
  } = useRegister();
 
  return (
    <>
      {/* Boton de regreso */}
      <button className="button-back" onClick={onBack}>
        <BackIcon />
      </button>

      {/* Circulo Rosa */}
      <div className="circle-pink">
        <span>Registrarse</span>
        <img src="/assets/Login-computer.png" alt="user" />
      </div>

      {/* Sección de inicio de sesión */}
      <section className="login">
        {/* Panel de navegacion */}
        <div className="options">
          <button onClick={onChange}>Iniciar Sesión</button>
          <button className="active">Registrarse</button>
        </div>

        {/* Formulario de inicio de sesión */}
        <form className="login-form" action="" onSubmit={handleRegister}>
          {/* Logo */}
          <div className="login-logo">
            <div className="Logo">
              <LogoIcon />
            </div>
            <span>Medical Salud</span>
          </div>

          {/* Paso 1: Datos básicos */}
          {step === 1 && (
            <div className="login-inputs">
              <div className="input-nombres">
                <div>
                  <label htmlFor="nombres">Nombres *</label>
                  <input
                    id="nombres"
                    name="nombres"
                    type="text"
                    placeholder="Nombre"
                    value={formData.nombres}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="apellidos">Apellidos *</label>
                  <input
                    id="apellidos"
                    name="apellidos"
                    type="text"
                    placeholder="Apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <label htmlFor="paciente-email">Correo electrónico *</label>
              <input
                id="paciente-email"
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="paciente-password">Contraseña *</label>
              <input
                id="paciente-password"
                name="password"
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button type="button" onClick={nextStep} className="next-step-button">
                Siguiente
              </button>
            </div>
          )}

          {/* Paso 2: Datos adicionales */}
          {step === 2 && (
            <div className="login-inputs">         
              <label htmlFor="documento">Número de Documento</label>
              <input
                id="documento"
                name="documento"
                type="text"
                placeholder="Documento de identidad"
                value={formData.documento}
                onChange={handleInputChange}
              />
              
              <label htmlFor="telefono">Número de Teléfono</label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="Número de teléfono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
              
              <label htmlFor="fecha-nacimiento">Fecha de Nacimiento</label>
              <input
                id="fecha-nacimiento"
                name="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
              />
              
              <div className="step-buttons">
                <button type="button" onClick={prevStep} className="prev-step-button">
                  Anterior
                </button>
                <button type="submit" disabled={loading} className="submit-button">
                  {loading ? "Registrando..." : "Registrarse"}
                </button>
              </div>
            </div>
          )}

          {/* Mostrar errores si existen */}
          {error && <div className="error-message">{error}</div>}

          {/* Sección de proveedores */}
          <div className="login-providers">
            <GoogleIcon />
            <FacebookIcon />
          </div>
        </form>
      </section>
    </>
  );
}