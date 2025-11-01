import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';

export const metadata = {
  title: 'CoordiSalud - Paciente',
  description: 'Sistema de gestión médica y coordinación de salud',
};

export default function PacienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className='paciente-page'>{children}</main>
      <NavBar />
    </>
  );
}
