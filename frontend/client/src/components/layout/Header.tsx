"use client";

import "@/styles/components/layout/Header.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getGreeting } from "@/utils";
import ArrowLeftIcon from "../icons/BackIcon";
import DropdownUser from "../ui/DropdownUser";

export default function Header() {
  const { userData } = useAuth();
  const pathname = usePathname();
  if (pathname === "/") {
    return (
      <header className="header">
        <div className="header-content">
          <h1>{getGreeting()}</h1>
          <div className="user-info">
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
