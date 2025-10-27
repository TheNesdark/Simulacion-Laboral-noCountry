 import { useAuth } from "@/context/AuthContext"; 
 
  // Función para obtener el saludo según el género
  export function getGreeting() {
    const { userData } = useAuth();

    if (!userData) return "¡Bienvenido!";
    const firstName = userData.nombre?.split(' ')[0] || '';
    const lastName = userData.apellido?.split(' ')[0] || userData.apellidos?.split(' ')[0] || '';
    const fullName = `${firstName} ${lastName}`.trim();

    const genero = userData.genero?.toLowerCase();
    
    if (genero === 'femenino' || genero === 'f') {
      return `¡Bienvenida, ${fullName || 'Usuario'}!`;
    } else if (genero === 'masculino' || genero === 'm') {
      return `¡Bienvenido, ${fullName || 'Usuario'}!`;
    } else {
      return `¡Bienvenido/a, ${fullName || 'Usuario'}!`;
    }
  };