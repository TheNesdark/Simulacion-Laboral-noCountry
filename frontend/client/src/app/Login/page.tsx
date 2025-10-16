"use client";

import Image from "next/image";
import "@/styles/pages/Login.css";
import PacienteLogin from "./components/SignIn";
import ProfesionalLogin from "./components/SignUp";
import { useState } from "react";

type AuthView = "initial" | "login" | "register";

export default function LoginPage() {
  const [view, setView] = useState<AuthView>("initial");

  const handleBack = () => {
    setView("initial");
  };

  const handleLoginView = () => {
    setView("login");
  };

  const handleRegisterView = () => {
    setView("register");
  };

  if (view === "login") {
    return <PacienteLogin onBack={handleBack} />;
  }

  if (view === "register") {
    return <ProfesionalLogin onBack={handleBack} />;
  }

  return (
    <>
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
        <button className="button-login" onClick={handleLoginView}>
          Iniciar Sesión
        </button>
        <button className="button-register" onClick={handleRegisterView}>
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
    </>
  );
}
