
export const metadata = {
  title: 'CoordiSalud - Inicio de Sesion',
  description: 'Sistema de gestión médica y coordinación de salud',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
