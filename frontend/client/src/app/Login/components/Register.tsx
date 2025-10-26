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
  const { register, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);


    try {
      await register(name, email, password);
      console.log("Usuario registrado exitosamente");
    } catch (error: any) {
      console.error("Error al registrar usuario:", error);
    } finally {
      setLoading(false);
    }
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

          {/* Inputs */}
          <div className="login-inputs">
            <label htmlFor="paciente-name">Nombre y Apellido</label>
            <input
              id="paciente-name"
              type="text"
              placeholder="Nombre y Apellido"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="paciente-email">Correo electrónico</label>
            <input
              id="paciente-email"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="paciente-password">Contraseña</label>
            <input
              id="paciente-password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Mostrar errores si existen */}
          {error && <div className="error-message">{error}</div>}

          {/* Botón de inicio de sesión */}
          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>

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