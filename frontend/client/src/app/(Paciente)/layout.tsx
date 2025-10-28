import { Roboto } from "next/font/google";
import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata = {
  title: "CoordiSalud - Paciente",
  description: "Sistema de gestión médica y coordinación de salud",
};

export default function PacienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <NavBar />
    </>
  );
}
