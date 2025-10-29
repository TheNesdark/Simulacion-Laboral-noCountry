import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/providers';
import GlobalAuthGuard from '@/components/GlobalAuthGuard';
import { roboto } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'CoordiSalud - Simulación Laboral',
  description: 'Sistema de gestión de citas médicas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <body className={roboto.className}>
        <Providers>
          <GlobalAuthGuard>{children}</GlobalAuthGuard>
        </Providers>
      </body>
    </html>
  );
}
