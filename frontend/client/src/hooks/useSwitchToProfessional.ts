import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { crearMedico, obtenerMedico, actualizarMedico } from '@/services/backend/UserService';
import { getAllClinics } from '@/services/backend/clinicsService';
import { getAllSpecialties } from '@/services/backend/specialtiesService';
import { Specialty, Clinic } from '@/types';
import { useNotifications } from '@/utils/notifications';

export default function useSwitchToProfessional() {
  const { user, userData, updateUserData, medicoId } = useAuth();
  const router = useRouter();
  const notifications = useNotifications();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [isReturningMedico, setIsReturningMedico] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    nombre: "",
    apellido: "",
    telefono: "",
    genero: "M" as "M" | "F" | "O",
    numeroDocumento: "",
    fechaNacimiento: "",
    matricula: 0,
    email: "",
    clinicaId: 0,
    especialidadId: 0,
    role: "medico",
  });

  // Cargar datos del usuario actual y del médico existente si aplica
  useEffect(() => {
    const loadData = async () => {
      if (user && userData) {
        // Si ya tiene medicoId, significa que fue médico antes
        if (medicoId) {
          setIsReturningMedico(true);
          try {
            // Cargar datos del médico existente para prellenar el formulario
            const medicoExistente = await obtenerMedico(medicoId);
            setFormData((prev) => ({
              ...prev,
              userId: user.uid,
              nombre: medicoExistente.nombre || userData.nombres || "",
              apellido: medicoExistente.apellido || userData.apellidos || "",
              telefono: medicoExistente.telefono || userData.telefono || "",
              genero: medicoExistente.genero === "MASCULINO" ? "M" : 
                      medicoExistente.genero === "FEMENINO" ? "F" : 
                      medicoExistente.genero === "OTRO" ? "O" : 
                      (userData.genero as "M" | "F" | "O") || "M",
              numeroDocumento: medicoExistente.numeroDocumento || userData.documento || "",
              fechaNacimiento: medicoExistente.fechaNacimiento || userData.fechaNacimiento || "",
              email: medicoExistente.email || userData.email || user.email || "",
              matricula: medicoExistente.matricula || 0,
              clinicaId: medicoExistente.clinica?.id || 0,
              especialidadId: medicoExistente.especialidad?.id || 0,
              role: "medico",
            }));
          } catch (err) {
            // Si no se puede cargar el médico, usar datos del usuario
            setFormData((prev) => ({
              ...prev,
              userId: user.uid,
              nombre: userData.nombres || "",
              apellido: userData.apellidos || "",
              telefono: userData.telefono || "",
              genero: (userData.genero as "M" | "F" | "O") || "M",
              numeroDocumento: userData.documento || "",
              fechaNacimiento: userData.fechaNacimiento || "",
              email: userData.email || user.email || "",
              role: "medico",
            }));
          }
        } else {
          // Es un nuevo médico
          setIsReturningMedico(false);
          setFormData((prev) => ({
            ...prev,
            userId: user.uid,
            nombre: userData.nombres || "",
            apellido: userData.apellidos || "",
            telefono: userData.telefono || "",
            genero: (userData.genero as "M" | "F" | "O") || "M",
            numeroDocumento: userData.documento || "",
            fechaNacimiento: userData.fechaNacimiento || "",
            email: userData.email || user.email || "",
            role: "medico",
          }));
        }
      }
    };
    
    loadData();
  }, [user, userData, medicoId]);

  // Cargar clínicas y especialidades
  useEffect(() => {
    const loadData = async () => {
      try {
        const [clinicsData, specialtiesData] = await Promise.all([
          getAllClinics(),
          getAllSpecialties()
        ]);
        setClinics(clinicsData);
        setSpecialties(specialtiesData);
      } catch (err) {
        setError("Error al cargar datos de clínicas y especialidades");
      }
    };

    loadData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validar que todos los campos requeridos estén completos
      if (
        !formData.nombre ||
        !formData.apellido ||
        !formData.email ||
        !formData.matricula
      ) {
        throw new Error("Por favor complete todos los campos requeridos");
      }

      if (!formData.clinicaId || !formData.especialidadId) {
        throw new Error("Por favor seleccione una clínica y una especialidad");
      }

      // Preparar los datos en el formato esperado por el backend
      const generoMap: Record<string, "MASCULINO" | "FEMENINO" | "OTRO"> = {
        "M": "MASCULINO",
        "F": "FEMENINO",
        "O": "OTRO"
      };
      
      // Si ya es un médico que vuelve, solo actualizar el rol
      if (isReturningMedico && medicoId) {
        const medicoData = {
          nombre: formData.nombre,
          apellido: formData.apellido,
          telefono: formData.telefono,
          genero: generoMap[formData.genero] || "OTRO",
          numeroDocumento: formData.numeroDocumento,
          fechaNacimiento: formData.fechaNacimiento,
          matricula: formData.matricula,
          email: formData.email,
          clinicaId: formData.clinicaId,
          especialidadId: formData.especialidadId,
        };

        // Actualizar los datos del médico existente
        await actualizarMedico(medicoId, medicoData);
        
        // Solo actualizar el rol (el medicoId ya existe)
        await updateUserData({ role: "medico" });
        
        notifications.success(
          "¡Bienvenido de vuelta! Has vuelto a ser un profesional de la salud."
        );
      } else {
        // Crear nuevo médico
        const medicoData = {
          userId: formData.userId,
          nombre: formData.nombre,
          apellido: formData.apellido,
          telefono: formData.telefono,
          genero: generoMap[formData.genero] || "OTRO",
          numeroDocumento: formData.numeroDocumento,
          fechaNacimiento: formData.fechaNacimiento,
          matricula: formData.matricula,
          email: formData.email,
          clinicaId: formData.clinicaId,
          especialidadId: formData.especialidadId,
        };

        // Crear el médico en el backend
        const medicoCreado = await crearMedico(medicoData);
        
        // Actualizar el rol y medicoId del usuario en Firebase
        await updateUserData({ role: "medico", medicoId: medicoCreado.id });
        
        notifications.success(
          "¡Felicitaciones! Ahora eres un profesional de la salud en nuestra plataforma."
        );
      }
      
      // Redirigir a la página de profesional
      router.push('/Profesional');
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'message' in error
        ? String(error.message)
        : "Error al procesar la solicitud";
      setError(errorMessage);
      notifications.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    clinics,
    specialties,
    isReturningMedico,
    handleInputChange,
    handleSubmit,
  };
}
