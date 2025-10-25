"use client";

import "@/styles/components/layout/NavBar.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  EstudiosIcon,
  CalendarioIcon,
  ChatIcon,
} from "@/components/icons";

export default function NavBar() {
  const pathname = usePathname();
  const navItems = [
    {
      href: "/",
      icon: HomeIcon,
      label: "inicio",
      active: pathname === "/",
    },
    {
      href: "/Examenes",
      icon: EstudiosIcon,
      label: "Estudio",
      active: pathname === "/Examenes",
    },
    {
      href: "/Calendario",
      icon: CalendarioIcon,
      label: "Mis citas",
      active: pathname === "/Calendario",
    },
    {
      href: "/Chat",
      icon: ChatIcon,
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
          <item.icon width={30} height={30} />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
