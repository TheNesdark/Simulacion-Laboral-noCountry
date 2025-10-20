import Header from './components/Header';
import NavBar from '../../components/layout/NavBar';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="profile-layout">
      <Header />
      <main className="profile-content">
        {children}
      </main>
      <NavBar />
    </div>
  );
}