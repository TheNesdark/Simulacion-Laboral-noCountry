"use client";

import Image from "next/image";
import "@styles/pages/Login.css";
import PacienteLogin from "./PacienteLogin";
import ProfesionalLogin from "./ProfesionalLogin";
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
        <div className="login-options">
          <button className="button-paciente" onClick={handlePacienteLogin}>
            Soy Paciente
          </button>
          <button
            className="button-profesional"
            onClick={handleProfesionalLogin}
          >
            Soy Profesional
          </button>
          <Image
            className="logo"
            src="/assets/icons/logo-icon.svg"
            alt="Logo"
            width={40}
            height={44}
            priority
          />
        </div>
      </div>
    );
  }
}
