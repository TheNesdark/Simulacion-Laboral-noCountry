import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { uploadPhotoToFirebase, validateImageFile } from '@/services/firebase';

export default function useEditProfile() {
  const { userData, updateUserData, user } = useAuth();
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    nombres: userData?.nombres || '',
    apellidos: userData?.apellidos || '',
    documento: userData?.documento || '',
    fechaNacimiento: userData?.fechaNacimiento || '',
    correo: userData?.email || '',
    telefono: userData?.telefono || '',
    genero: userData?.genero || ''
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      try {
        validateImageFile(file);
        setUserPhoto(file);
        const reader = new FileReader();
        reader.onloadend = () => { 
          setPhotoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error al validar la imagen:', error);
      }
    } 
  };

  const handleEditPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      throw new Error('Debes estar autenticado para guardar cambios');
    }

    try {
      let photoURL = userData?.photoURL || null;
      let photoUploadSuccess = true;
      
      if (userPhoto) {
        photoURL = await uploadPhotoToFirebase(userPhoto, user.uid);
        if (!photoURL) {
          photoUploadSuccess = false;
        }
      }
      if (userData) {
        await updateUserData({
          ...userData,
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          documento: formData.documento,
          fechaNacimiento: formData.fechaNacimiento,
          telefono: formData.telefono,
          email: formData.correo,
          genero: formData.genero,
          photoURL: photoURL || '',
          createdAt: userData.createdAt,
        });
      }

      return { success: true, photoUploadSuccess };
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      throw error;
    }
  };

  return {
    formData,
    photoPreview,
    fileInputRef,
    handlePhotoChange,
    handleEditPhotoClick,
    handleInputChange,
    handleSubmit,
    userData,
    user
  };
}