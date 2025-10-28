import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { RegisterProps, LoginProps, UserData } from "@/types";
import { auth, db } from "@/lib/firebase/firebase";

/**
 * Registra un nuevo usuario con email y contraseña
 * @param data - Datos del usuario a registrar
 * @returns Promise con el usuario creado
 */
export const registerUser = async (data: RegisterProps): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: data.email,
      nombres: data.nombres,
      apellidos: data.apellidos,
      documento: data.documento || "",
      telefono: data.telefono || "",
      fechaNacimiento: data.fechaNacimiento || "",
      photoURL: "",
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Error en registerUser:", error);
    throw error;
  }
};

/**
 * Inicia sesión con email y contraseña
 * @param email - Email del usuario
 * @param password - Contraseña del usuario
 */
export const loginUser = async (data: LoginProps) => {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
  } catch (error) {
    console.error("Error en loginUser:", error);
    throw error;
  }
};

/**
 * Cierra la sesión del usuario actual
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error en logoutUser:", error);
    throw error;
  }
};

/**
 * Actualiza los datos del usuario en Firestore
 * @param userId - ID del usuario
 * @param data - Datos a actualizar
 */
export const updateUserData = async (
  userId: string,
  data: Partial<UserData>
): Promise<void> => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, data as Partial<UserData>);
  } catch (error) {
    console.error("Error en updateUserData:", error);
    throw error;
  }
};

/**
 * Obtiene los datos del usuario desde Firestore
 * @param userId - ID del usuario
 * @returns Promise con los datos del usuario
 */
export const getUserData = async (userId: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    }
    return null;
    
  } catch (error) {
    console.error("Error en getUserData:", error);
    throw error;
  }
};

/**
 * Valida que los datos de registro sean correctos
 * @param data - Datos a validar
 * @returns Array con errores encontrados
 */
export const validateRegisterData = (data: RegisterProps): string[] => {
  const errors: string[] = [];

  if (!data.nombres?.trim()) errors.push("nombre");
  if (!data.apellidos?.trim()) errors.push("apellido");
  if (!data.email?.trim()) errors.push("correo electrónico");
  if (!data.password?.trim()) errors.push("contraseña");

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("correo electrónico válido");
  }

  // Validar longitud de contraseña
  if (data.password && data.password.length < 6) {
    errors.push("contraseña de al menos 6 caracteres");
  }

  return errors;
};

/**
 * Obtiene mensaje de error amigable según el código de error de Firebase
 * @param errorCode - Código de error de Firebase
 * @returns Mensaje de error amigable
 */
export const getErrorMessage = (errorCode: string): string => {
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
    case "auth/user-not-found":
      return "No se encontró una cuenta con ese correo electrónico.";
    case "auth/wrong-password":
      return "La contraseña es incorrecta.";
    case "auth/too-many-requests":
      return "Demasiados intentos fallidos. Por favor, inténtalo más tarde.";
    default:
      return "Ocurrió un error durante la operación. Por favor, inténtalo de nuevo.";
  }
};
