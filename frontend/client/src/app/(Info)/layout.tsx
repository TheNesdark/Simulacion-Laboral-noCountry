import Header from '@/components/layout/Header';

export const metadata = {
  title: 'CoordiSalud - Info',
  description: 'Sistema de gestión médica y coordinación de salud',
};

export default function InfoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
