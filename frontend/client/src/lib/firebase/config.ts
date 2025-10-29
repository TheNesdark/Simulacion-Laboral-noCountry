import dotenv from 'dotenv';

// Cargar variables de entorno desde .env.local o .env
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Solo validar en el lado del cliente o cuando las variables estén disponibles
const isClientSide = typeof window !== 'undefined';
const isBuildTime = process.env.NODE_ENV === 'production' && !isClientSide;

if (!isBuildTime) {
  const requiredEnvVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn(
      `Advertencia: Faltan las siguientes variables de entorno de Firebase: ${missingVars.join(', ')}\n` +
        'Asegúrate de configurarlas en tu archivo .env.local o .env'
    );
  }
}

export default firebaseConfig;
