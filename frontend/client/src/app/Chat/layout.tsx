
export const metadata = {
  title: 'CoordiSalud - Chats',
  description: 'Sistema de gestión médica y coordinación de salud',
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
