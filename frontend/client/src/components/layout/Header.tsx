"use client";

import "@/styles/components/layout/Header.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
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

  return (
    <header className="header">
      <Image
        src="/assets/icons/logo-icon.svg"
        alt="Logo"
        width={40}
        height={40}
        priority
        fetchPriority="high"
        loading="eager"
        sizes="40px"
      />
      <h1>Medical Salud</h1>
    </header>
  );
}
