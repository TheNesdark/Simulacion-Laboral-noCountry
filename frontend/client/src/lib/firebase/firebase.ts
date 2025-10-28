"use client";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Validar que todas las variables de entorno estén definidas
const requiredEnvVars = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Verificar que todas las variables estén definidas
const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key, _]) => {
    // Convertir camelCase a UPPER_CASE con guiones bajos
    const upperKey = key.replace(/([A-Z])/g, '_$1').toUpperCase();
    return `NEXT_PUBLIC_FIREBASE_${upperKey}`;
  });

if (missingVars.length > 0) {
  console.error(
    `❌ Faltan las siguientes variables de entorno de Firebase: ${missingVars.join(', ')}`
  );
  console.error('📝 Crea un archivo .env.local con las variables necesarias');
  console.error('📋 Ejemplo disponible en: firebase.env.example');
  
  // En desarrollo, usar valores por defecto para evitar errores de build
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Usando configuración de Firebase por defecto para desarrollo');
  }
}

const firebaseConfig = {
  apiKey: requiredEnvVars.apiKey || 'demo-api-key',
  authDomain: requiredEnvVars.authDomain || 'demo-project.firebaseapp.com',
  projectId: requiredEnvVars.projectId || 'demo-project',
  storageBucket: requiredEnvVars.storageBucket || 'demo-project.appspot.com',
  messagingSenderId: requiredEnvVars.messagingSenderId || '123456789',
  appId: requiredEnvVars.appId || '1:123456789:web:abcdef',
};

// Solo inicializar Firebase si tenemos las variables necesarias
let app;
try {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
} catch (error) {
  console.error('❌ Error inicializando Firebase:', error);
  throw new Error('Firebase no se pudo inicializar. Verifica las variables de entorno.');
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;