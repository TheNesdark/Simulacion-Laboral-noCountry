import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import GlobalAuthGuard from "@/components/GlobalAuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoordiSalud - Simulación Laboral",
  description: "Sistema de gestión de citas médicas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <GlobalAuthGuard>
            {children}
          </GlobalAuthGuard>
        </Providers>
      </body>
    </html>
  );
}
