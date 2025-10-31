'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface GlobalAuthGuardProps {
  children: React.ReactNode;
}

export default function GlobalAuthGuard({ children }: GlobalAuthGuardProps) {
  const { user, loading, userData, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Rutas que no requieren autenticación
  const publicRoutes = ['/Login', '/Register'];
  const isPublicRoute = pathname ? publicRoutes.includes(pathname) : false;

  useEffect(() => {
    const isMedico = role === 'medico';
    const isPaciente = role === 'paciente';
    
    // Solo redirigir si no está cargando y no es una ruta pública
    if (!loading && !user && !isPublicRoute) {
      console.log('Redirecting to login from:', pathname);
      router.push('/Login');
    }

    // Si está autenticado y está en login, redirigir al home según rol
    if (!loading && user && pathname === '/Login') {
      console.log('User already authenticated, redirecting to home');
      if (isMedico) {
        router.push('/Profesional');
      } else if (isPaciente) {
        router.push('/');
      } else {
        // Si no tiene rol definido, redirigir a página principal
        router.push('/');
      }
    }

    // Verificar acceso a rutas según rol
    if (!loading && user && role && !isPublicRoute) {
      // Si es paciente pero está en rutas de médico, redirigir
      if (isPaciente && pathname.startsWith('/Profesional')) {
        console.log('Paciente intentando acceder a rutas de médico, redirigiendo a /');
        router.push('/');
      }
    }
  }, [user, loading, userData, role, isPublicRoute, pathname, router]);

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
          color: '#666',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div>Cargando...</div>
        <div style={{ fontSize: '14px', color: '#999' }}>
          Verificando autenticación
        </div>
      </div>
    );
  }

  // Si no hay usuario y no es una ruta pública, mostrar mensaje de redirección
  if (!user && !isPublicRoute) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
          color: '#666',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div>Redirigiendo al login...</div>
        <div style={{ fontSize: '14px', color: '#999' }}>
          Debes iniciar sesión para acceder a esta página
        </div>
      </div>
    );
  }

  // Renderizar el contenido si está autenticado o es una ruta pública
  return <>{children}</>;
}
