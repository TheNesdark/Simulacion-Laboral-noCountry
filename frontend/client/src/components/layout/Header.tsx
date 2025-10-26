"use client";

import "@/styles/components/layout/Header.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ArrowLeftIcon from "../icons/BackIcon";
import DropdownUser from "../ui/DropdownUser";

export default function Header() {
  const { userData } = useAuth();
  const pathname = usePathname();
  
  // Función para obtener el saludo según el género
  const getGreeting = () => {
    if (!userData) return "¡Bienvenido!";
    
    // Obtener primer nombre y primer apellido
    const firstName = userData.nombre?.split(' ')[0] || '';
    const lastName = userData.apellido?.split(' ')[0] || userData.apellidos?.split(' ')[0] || '';
    const fullName = `${firstName} ${lastName}`.trim();
    
    // Determinar saludo según género
    const genero = userData.genero?.toLowerCase();
    
    if (genero === 'femenino' || genero === 'f') {
      return `¡Bienvenida, ${fullName || 'Usuario'}!`;
    } else if (genero === 'masculino' || genero === 'm') {
      return `¡Bienvenido, ${fullName || 'Usuario'}!`;
    } else {
      // Saludo neutral si no hay género definido
      return `¡Bienvenido/a, ${fullName || 'Usuario'}!`;
    }
  };

  if (pathname === "/") {
    return (
      <header className="header">
        <div className="header-content">
          <h1>{getGreeting()}</h1>
          <div className="user-info">
            {userData?.photoURL ? (
              <img 
                src={userData.photoURL} 
                alt="Foto de perfil" 
                className="user-avatar"
              />
            ) : (
              <div className="user-avatar-placeholder">
                {userData?.nombre ? userData.nombre.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <DropdownUser />
          </div>
        </div>
      </header>
    );
  }

  if (pathname === "/Clinicas") {
    return (
      <header className="header">
        <Link href="/" className="back-link">
          <ArrowLeftIcon />
        </Link>
        <h1>Clínicas</h1>
      </header>
    );
  }

  if (pathname === "/Medicos") {
    return (
      <header className="header">
        <Link href="/" className="back-link">
          <ArrowLeftIcon />
        </Link>
        <h1>Medicos</h1>
      </header>
    );
  }

  if (pathname === "/Especialidades") {
    return (
      <header className="header">
        <Link href="/" className="back-link">
          <ArrowLeftIcon />
        </Link>
        <h1>Especialidades</h1>
      </header>
    );
  }

  if (pathname === "/Medicos") {
    return (
      <header className="header">
        <Link href="/">
          <ArrowLeftIcon />
        </Link>
        <h1>Médicos</h1>
      </header>
    );
  }

  if (pathname === "/Clinicas") {
    return (
      <header className="header">
        <Link href="/">
          <ArrowLeftIcon />
        </Link>
        <h1>Clinicas</h1>
      </header>
    );
  }

  if (pathname === "/Especialidades") {
    return (
      <header className="header">
        <Link href="/">
          <ArrowLeftIcon />
        </Link>
        <h1>Especialidades</h1>
      </header>
    );
  }

  return (
    <header className="header">
      <h1>Medical Salud</h1>
      <DropdownUser />
    </header>
  );
}
