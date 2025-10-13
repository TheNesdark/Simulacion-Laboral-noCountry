import Image from "next/image";
import "@/styles/components/layout/Header.css";
export default function Header() {
  const user = "Valentina"
  return (
    <header className="header">
      <Image
        src="/assets/icons/logo-icon.svg"
        alt="Logo"
        width={40}
        height={40}
        priority
      />
      <h1>¡Bienvenida, {user}!</h1>
    </header>
  );
}
