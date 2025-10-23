"use client";

import "@/styles/components/layout/Header.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DropdownUser from "@components/ui/DropdownUser"

export default function Header() {
  const pathname = usePathname();
  const user = "Valentina";
  const userImage =
    "/assets/example-photos/fadbb3fb1c636000b153327245aafd5c73dccc90.png";

  if (pathname === "/") {
    return (
      <header className="header">
        <img src={userImage} alt="Logo" width={40} height={40} />
        <h1>¡Bienvenida, {user}!</h1>
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
