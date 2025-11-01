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
      return;
    }

    // Si está autenticado y está en login o register, redirigir al home según rol
    if (!loading && user && (pathname === '/Login' || pathname === '/Register')) {
      if (isMedico) {
        router.push('/Profesional');
        return;
      } else if (isPaciente) {
        router.push('/');
        return;
      }
    }

    // Verificar acceso a rutas según rol
    if (!loading && user && role && !isPublicRoute) {
      // Si es médico, redirigir a /Profesional si está en rutas de paciente o en la raíz
      if (isMedico) {
        if (pathname === '/' || pathname.startsWith('/Calendario') || pathname.startsWith('/Examenes')) {
          console.log('Médico intentando acceder a rutas de paciente, redirigiendo a /Profesional');
          router.push('/Profesional');
          return;
        }
      }
      
      // Si es paciente pero está en rutas de médico, redirigir
      if (isPaciente && pathname.startsWith('/Profesional')) {
        console.log('Paciente intentando acceder a rutas de médico, redirigiendo a /');
        router.push('/');
        return;
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

  // Si está autenticado y está en login, no renderizar el login
  if (user && pathname === '/Login') {
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
        <div>Redirigiendo...</div>
      </div>
    );
  }

  // Si no hay usuario y no es una ruta pública, no renderizar contenido
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
        <div>Redirigiendo...</div>
      </div>
    );
  }

  // Renderizar el contenido si está autenticado o es una ruta pública
  return <>{children}</>;
}
