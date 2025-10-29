'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserData,
  updateUserData as updateUserDataService,
  getErrorMessage,
} from '@/services/firebase/authService';
import type { UserData, RegisterProps, LoginProps } from '@/types';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  register: (data: RegisterProps) => Promise<void | undefined>;
  login: (data: LoginProps) => Promise<void | undefined>;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void | null>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        setUser(user);
        try {
          const data = await getUserData(user.uid);
          setUserData(data as UserData);
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
          setError('Error al obtener datos del usuario.');
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const register = async (data: RegisterProps) => {
    setError(null);
    setLoading(true);
    try {
      await registerUser(data);
      router.push('/');
    } catch (error: any) {
      setError(getErrorMessage(error.code));
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginProps) => {
    setError(null);
    setLoading(true);
    try {
      await loginUser(data);
      router.push('/');
    } catch (error: any) {
      setError('Tus credenciales son incorrectos.');
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setUserData(null);
    router.push('/Login');
  };

  const updateUserData = async (data: Partial<UserData>) => {
    if (!user) return null;

    setError(null);
    try {
      await updateUserDataService(user.uid, data);
      setUserData(prev => {
        if (!prev) return null;
        return {
          ...prev,
          ...data,
        };
      });
    } catch (error) {
      console.error('Error al actualizar datos del usuario:', error);
      setError('Error al actualizar datos del usuario.');
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        register,
        login,
        logout,
        updateUserData,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
