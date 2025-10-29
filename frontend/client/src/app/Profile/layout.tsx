import { Roboto } from 'next/font/google';
import Header from './components/Header';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata = {
  title: 'CoordiSalud - Profile',
  description:
    'Sistema de gestión médica y coordinación de salud para profesionales de la salud y pacientes.',
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
