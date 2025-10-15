"use client";

import { usePathname } from "next/navigation";
import "@/styles/components/layout/NavBar.css";

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
      href: "/Reports",
      icon: "estudios-icon",
      label: "Estudio",
      active: pathname === "/Reports",
    },
    {
      href: "/Calendar",
      icon: "calendario-icon",
      label: "Mis citas",
      active: pathname === "/Calendar",
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
        <a key={index} href={item.href} className={item.active ? "active" : ""}>
          <svg width={30} height={30}>
            <use
              href={`/assets/icons/navbarIcon-sprites.svg#${item.icon}`}
            />
          </svg>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
