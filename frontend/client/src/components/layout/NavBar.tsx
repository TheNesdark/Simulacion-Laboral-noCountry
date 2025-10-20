"use client";

import "@/styles/components/layout/NavBar.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
  const pathname = usePathname();
  const navItems = [
    {
      href: "/",
      icon: "home-icon",
      label: "inicio",
      active: pathname === "/",
    },
    {
      href: "/Examenes",
      icon: "estudios-icon",
      label: "Estudio",
      active: pathname === "/Examenes",
    },
    {
      href: "/Calendario",
      icon: "calendario-icon",
      label: "Mis citas",
      active: pathname === "/Calendario",
    },
    {
      href: "/Chat",
      icon: "chat-icon",
      label: "Chat",
      active: pathname === "/Chat",
    },
  ];

  return (
    <nav className="bottom-navbar">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={item.active ? "active" : ""}
        >
          <svg width={30} height={30}>
            <use href={`/assets/icons/navbarIcon-sprites.svg#${item.icon}`} />
          </svg>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
