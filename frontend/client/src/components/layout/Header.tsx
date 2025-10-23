"use client";

import "@/styles/components/layout/Header.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import DropdownUser from "@components/ui/DropdownUser"

export default function Header() {
  const pathname = usePathname();
  const user = "Valentina";

  if (pathname === "/") {
    return (
      <header className="header">
        <h1>¡Bienvenida, {user}!</h1>
        <DropdownUser />
      </header>
    );
  }

  if (pathname === "/Clinicas") {
    return (
      <header className="header">
        <Link href="/" className="back-link">
          <img src="/assets/icons/back-icon.svg" alt="Volver al inicio"/>
        </Link>
        <h1>Clínicas</h1>
      </header>
    );
  }

  if (pathname === "/Medicos") {
    return (
      <header className="header">
        <Link href="/" className="back-link">
          <img src="/assets/icons/back-icon.svg" alt="Volver al inicio" />
        </Link>
        <h1>Medicos</h1>
      </header>
    );
  }

  if (pathname === "/Especialidades") {
    return (
      <header className="header">
        <Link href="/" className="back-link">
          <img src="/assets/icons/back-icon.svg" alt="Volver al inicio" />
        </Link>
        <h1>Especialidades</h1>
      </header>
    );
  }

  return (
    <header className="header">
      <h1>Medical Salud</h1>
      <DropdownUser/>
    </header>
  );
}
