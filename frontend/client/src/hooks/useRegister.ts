import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function useRegister() {
  const { register, error, setError } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombres: '',
    apellidos: '',
    documento: '',
    telefono: '',
    fechaNacimiento: '',
    genero: '',
  });
  const [validationError, setValidationError] = useState<string>('');

  const validateStep1 = (): boolean => {
    if (!formData.nombres.trim() || !formData.apellidos.trim() || 
        !formData.email.trim() || !formData.password.trim()) {
      setValidationError('Completa todos los campos');
      return false;
    }

    if (formData.nombres.trim().length < 2 || formData.apellidos.trim().length < 2) {
      setValidationError('El nombre y apellido deben tener al menos 2 caracteres');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setValidationError('Ingrese un correo electrónico válido');
      return false;
    }

    if (formData.password.length < 6) {
      setValidationError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    setValidationError('');
    return true;
  };

  const validateStep2 = (): boolean => {
    if (formData.telefono && !/^[0-9+\-\s()]+$/.test(formData.telefono)) {
      setValidationError('Ingrese un número de teléfono válido');
      return false;
    }

    if (formData.documento && formData.documento.length < 5) {
      setValidationError('El documento debe tener al menos 5 caracteres');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateStep2()) {
      return;
    }

    setLoading(true);
    setError(null);
    setValidationError('');

    try {
      await register(formData);
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'message' in error
        ? String(error.message)
        : "Error al registrar usuario";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (!validateStep1()) {
      return;
    }
    setStep(2);
    setError(null);
    setValidationError('');
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar errores cuando el usuario empiece a escribir
    if (validationError) {
      setValidationError('');
    }
    if (error) {
      setError(null);
    }
  };

  const clearErrors = () => {
    setValidationError('');
    setError(null);
  };

  return {
    step,
    formData,
    loading,
    error,
    validationError,
    setError,
    clearErrors,
    handleInputChange,
    handleRegister,
    nextStep,
    prevStep,
  };
}
