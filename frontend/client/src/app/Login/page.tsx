"use client";

import Image from "next/image";
import "@styles/pages/Login.css";
import PacienteLogin from "./components/SignIn";
import ProfesionalLogin from "./components/SignUp";
import { useState } from "react";

export default function Login() {
  const [showPacientesLogin, setShowPacientesLogin] = useState(false);
  const [showProfesionalLogin, setShowProfesionalLogin] = useState(false);

  const handleBack = () => {
    setShowPacientesLogin(false);
    setShowProfesionalLogin(false);
  };

  const handlePacienteLogin = () => {
    setShowPacientesLogin(true);
  };

  const handleProfesionalLogin = () => {
    setShowProfesionalLogin(true);
  };
  if (showPacientesLogin) {
    return <PacienteLogin onBack={handleBack} />;
  } else if (showProfesionalLogin) {
    return <ProfesionalLogin onBack={handleBack} />;
  } else {
    return (
      <div className="login-container">
        <div className="login-title">
          <Image
            src="/assets/Login.png"
            alt="Logo"
            width={287}
            height={245}
            priority
          />
        </div>
        <div className="options">
          <button className="button-login" onClick={handlePacienteLogin}>
            Iniciar Sesion
          </button>
          <button className="button-register" onClick={handleProfesionalLogin}>
            Registrarse
          </button>
          <img  
            className="logo"
            src="/assets/icons/logo-icon.svg"
            alt="Logo"
            width={40}
            height={44}
          />
        </div>
      </div>
    );
  }
}
