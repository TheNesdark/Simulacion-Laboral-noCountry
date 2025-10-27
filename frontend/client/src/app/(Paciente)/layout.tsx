import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import Providers from "@/components/providers";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <Providers>
            <Header />
            <main>{children}</main>
            <NavBar />
        </Providers>
      </body>
    </html>
  );
}
