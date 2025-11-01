import Header from '@/components/layout/Header';

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

