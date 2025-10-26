"use client";

import { useState } from "react";
import { BackIcon, LogoIcon } from "@components/icons";
import { GoogleIcon, FacebookIcon } from "@components/icons";
import { useAuth } from "@/context/AuthContext";

interface SignUpProps {
  onBack: () => void;
  onChange: () => void;
}

export default function Register({ onBack, onChange }: SignUpProps) {
  const { register, error , setError } = useAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      nombres,
      apellidos,
      email,
      password,
      documento,
      telefono,
      fechaNacimiento
    };
    try {
      await register(userData);

    } catch (error: any) {
      console.error("Error al registrar usuario:", error);

    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (nombres && apellidos && email && password) {
      setStep(2);
    } else {
      setError("Por favor, completa todos los campos requeridos.");
    }
  };

  const prevStep = () => {
    setStep(1);
  };

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
                    type="text"
                    placeholder="Nombre"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="apellidos">Apellidos *</label>
                  <input
                    id="apellidos"
                    type="text"
                    placeholder="Apellidos"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    required
                  />
                </div>
              </div>

              <label htmlFor="paciente-email">Correo electrónico *</label>
              <input
                id="paciente-email"
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="paciente-password">Contraseña *</label>
              <input
                id="paciente-password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                type="text"
                placeholder="Documento de identidad"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
              />
              
              <label htmlFor="telefono">Número de Teléfono</label>
              <input
                id="telefono"
                type="tel"
                placeholder="Número de teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              
              <label htmlFor="fecha-nacimiento">Fecha de Nacimiento</label>
              <input
                id="fecha-nacimiento"
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
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