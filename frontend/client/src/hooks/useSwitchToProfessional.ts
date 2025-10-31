import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { crearMedico } from '@/services/backend/UserService';
import { getAllClinics } from '@/api/clinicsApi';
import { getAllSpecialties } from '@/api/specialtiesApi';
import {  Specialty } from '@/types';

export default function useSwitchToProfessional() {
  const { user, userData, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clinics, setClinics] = useState<any[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
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

  // Cargar datos del usuario actual
  useEffect(() => {
    if (user && userData) {
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
  }, [user, userData]);

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
        console.error("Error cargando datos:", err);
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
      const medicoData = {
        userId: formData.userId,
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono,
        genero: formData.genero,
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
      
      alert(
        "¡Felicitaciones! Ahora eres un profesional de la salud en nuestra plataforma.",
      );
    } catch (error: any) {
      console.error("Error al cambiar a profesional:", error);
      const errorMessage = error.message || "Error al procesar la solicitud";
      setError(errorMessage);
      alert(errorMessage);
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
    handleInputChange,
    handleSubmit,
  };
}
