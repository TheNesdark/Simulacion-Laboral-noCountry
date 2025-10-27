import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function useRegister() {
  const { register, error, setError } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nombres: "",
    apellidos: "",
    documento: "",
    telefono: "",
    fechaNacimiento: ""
  });


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register(formData);

    } catch (error: any) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };


  const nextStep = () => {
      setStep(2);
      setError(null); 
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    step,
    formData,
    loading,
    error,
    handleInputChange,
    handleRegister,
    nextStep,
    prevStep,
  };
}