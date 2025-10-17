import "@/styles/globals.css";
import Providers from "@/components/providers";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: ["400", "700"],
    subsets: ["latin"],
    display: "swap",
    preload: true,
    fallback: ["system-ui", "arial"],
});

export const metadata = {
    title: "CoordiSalud - Pacientes",
    description: "Sistema de gestión médica y coordinación de salud",
};

export default function ChatIdLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={roboto.className}>
                <Providers>
                    <header className="bg-green-500 p-3 text-white">Chat Individual</header>
                    <main className="flex-1">{children}</main>
                </Providers>
            </body>
        </html>
    );
}
