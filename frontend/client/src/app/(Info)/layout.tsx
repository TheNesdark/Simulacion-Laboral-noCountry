import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import Header from "@/components/layout/Header";
import Providers from "@/components/providers";
import AuthGuard from "@/components/AuthGuard";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata = {
  title: "CoordiSalud - Info",
  description: "Sistema de gestión médica y coordinación de salud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <Providers>
          <AuthGuard>
            <Header />
            {children}
          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
}
