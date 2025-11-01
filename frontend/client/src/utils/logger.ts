/**
 * Sistema de logging condicional
 * Solo loguea en desarrollo o cuando está habilitado
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const isLoggingEnabled = process.env.NEXT_PUBLIC_ENABLE_LOGGING === 'true';

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment || isLoggingEnabled) {
      console.log(...args);
    }
  },
  
  error: (...args: unknown[]) => {
    // Siempre loguear errores, pero solo en desarrollo mostrar detalles completos
    if (isDevelopment || isLoggingEnabled) {
      console.error(...args);
    } else {
      // En producción, solo loguear errores críticos
      console.error('[Error]', args[0]);
    }
  },
  
  warn: (...args: unknown[]) => {
    if (isDevelopment || isLoggingEnabled) {
      console.warn(...args);
    }
  },
  
  debug: (...args: unknown[]) => {
    if (isDevelopment || isLoggingEnabled) {
      console.debug(...args);
    }
  },
};

