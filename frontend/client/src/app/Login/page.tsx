'use client';

import Image from 'next/image';
import '@/styles/pages/Login.css';
import Login from './components/Login';
import Register from './components/Register';
import Initial from './components/Initial';
import { useState, useEffect } from 'react';

type AuthView = 'initial' | 'login' | 'register';

export default function LoginPage() {
  const [view, setView] = useState<AuthView>(() => {
    // Restaurar el view desde sessionStorage si existe
    if (typeof window !== 'undefined') {
      const savedView = sessionStorage.getItem('loginView') as AuthView | null;
      if (savedView && (savedView === 'login' || savedView === 'register')) {
        return savedView;
      }
    }
    return 'initial';
  });
  
  // Persistir el view en sessionStorage para evitar reset en errores
  useEffect(() => {
    if (view !== 'initial') {
      sessionStorage.setItem('loginView', view);
    } else {
      sessionStorage.removeItem('loginView');
    }
  }, [view]);

  const handleBack = () => {
    setView('initial');
  };

  const handleLoginView = () => {
    setView('login');
  };

  const handleRegisterView = () => {
    setView('register');
  };

  if (view === 'login') {
    return <Login onBack={handleBack} onChange={handleRegisterView} />;
  }

  if (view === 'register') {
    return <Register onBack={handleBack} onChange={handleLoginView} />;
  }

  if (view === 'initial') {
    return (
      <Initial onLogin={handleLoginView} onRegister={handleRegisterView} />
    );
  }
}
