import "@styles/globals.css";
import Header from "./components/Header";
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="profile-content">
          {children}
        </main>
      </body>
    </html>
  );
}