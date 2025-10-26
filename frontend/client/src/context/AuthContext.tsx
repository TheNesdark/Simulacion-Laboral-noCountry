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
import { doc, setDoc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<User | undefined>;
  logout: () => Promise<void>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log(user, 'user')
    setUser(user);
    setLoading(false);
  });

  useEffect(() => {
    unsubscribe();
    return () => {
      unsubscribe();
    };
  }, []);

  const register = async (name: string, email: string, password: string) => {
    setError(null)
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        name,
        email
      });
      console.log("Usuario registrado exitosamente", user.uid);
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

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/Login");
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, logout, error, setError }}>
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
