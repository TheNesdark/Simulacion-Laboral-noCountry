import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import AuthGuard from "@/components/AuthGuard";
import Providers from "@/components/providers";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata = {
  title: "CoordiSalud - Chats",
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
                {children}
              </AuthGuard>
            </Providers>
          </body>
        </html>
  );
}
