 import { useAuth } from "@/context/AuthContext"; 
 
  // Función para obtener el saludo según el género
export function getGreeting() {
  const { userData } = useAuth();
    if (!userData) return "¡Bienvenido!";
    
    // Obtener primer nombre y primer apellido
    const firstName = userData.nombres?.split(' ')[0] || '';
    const lastName = userData.apellido?.split(' ')[0] || userData.apellidos?.split(' ')[0] || '';
    const fullName = `${firstName} ${lastName}`.trim();
    
    // Determinar saludo según género (asumiendo que hay un campo género en userData)
    const genero = userData.genero?.toLowerCase();
    
    if (genero === 'femenino' || genero === 'f') {
      return `¡Bienvenida, ${fullName || 'Usuario'}!`;
    } else if (genero === 'masculino' || genero === 'm') {
      return `¡Bienvenido, ${fullName || 'Usuario'}!`;
    } else {
      // Saludo neutral si no hay género definido
      return `¡Bienvenido/a, ${fullName || 'Usuario'}!`;
    }
  };