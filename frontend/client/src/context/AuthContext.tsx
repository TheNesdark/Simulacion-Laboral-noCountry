"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import { doc, setDoc, getDoc, updateDoc, DocumentData } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  userData: any;
  loading: boolean;
  register: (data: registerProps) => Promise<User | undefined>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<userData>) => Promise<void>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

interface registerProps {
  documento: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  password: string;
}

export type userData = DocumentData

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<userData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, "users", user?.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setUser(user);
        setUserData(data)
      }
    } else {
      setUser(null);
      setUserData(null);
    }
    setLoading(false);
  });

  useEffect(() => {
    unsubscribe();
    return () => {
      unsubscribe();
    };
  }, []);

  const register = async (data: registerProps) => {
    setError(null)
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        nombres: data.nombres,
        apellidos: data.apellidos,
        documento: data.documento,
        fechaNacimiento: data.fechaNacimiento,
        telefono: data.telefono,
        email: data.email,
      });

      router.push("/");
      return user;

    } catch (error: any) {
      console.error("Error al registrar usuario:", error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  }

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "El correo electrónico ya está en uso.";
      case "auth/invalid-email":
        return "El correo electrónico no es válido.";
      case "auth/operation-not-allowed":
        return "El registro de usuarios está deshabilitado.";
      case "auth/weak-password":
        return "La contraseña es muy débil. Debe tener al menos 6 caracteres.";
      case "auth/configuration-not-found":
        return "Error de configuración. Por favor, verifica la configuración de Firebase.";
      default:
        return "Ocurrió un error durante el registro. Por favor, inténtalo de nuevo.";
    }
  };

  const login = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return setError("No se encontraron datos del usuario.");
      setUser(user);
      setUserData(userData);
      router.push("/");
    } catch (error: any) {
      setError("Tus credenciales son incorrectos.")
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/Login");
  }

  const updateUserData = async (data: Partial<userData>) => {
    if (!user) {
      throw new Error("No hay usuario autenticado");
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, data);
      
      // Actualizar el estado local
      setUserData(prev => ({
        ...prev,
        ...data
      }));
    } catch (error) {
      console.error("Error al actualizar datos del usuario:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, userData, loading, register, login, logout, updateUserData, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
