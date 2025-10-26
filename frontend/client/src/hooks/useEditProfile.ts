import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase/firebase';

export const useEditProfile = () => {
  const { userData, updateUserData, user } = useAuth();
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    nombres: userData?.nombre || '',
    apellidos: userData?.apellido || '',
    documento: userData?.documento || '',
    fechaNacimiento: userData?.fechaNacimiento || '',
    correo: userData?.email || '',
    telefono: userData?.telefono || '',
    genero: userData?.genero || ''
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setUserPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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

  const uploadPhotoToFirebase = async (): Promise<string | null> => {
    if (!user || !userPhoto) return null;

    try {
      const fileName = `${Date.now()}_${userPhoto.name}`;
      const storageRef = ref(storage, `profile-photos/${user.uid}/${fileName}`);
      const snapshot = await uploadBytes(storageRef, userPhoto);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error: any) {
      if (error.code === 'storage/unauthorized') {
        throw new Error('No tienes permisos para subir archivos. Contacta al administrador.');
      } else if (error.code === 'storage/canceled') {
        throw new Error('La carga de la imagen fue cancelada.');
      } else {
        throw new Error('Error al subir la imagen. Por favor, inténtalo de nuevo.');
      }
    }
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
        photoURL = await uploadPhotoToFirebase();
        if (!photoURL) {
          photoUploadSuccess = false;
        }
      }

      // Actualizar usando la función del contexto
      await updateUserData({
        nombre: formData.nombres,
        apellido: formData.apellidos,
        documento: formData.documento,
        fechaNacimiento: formData.fechaNacimiento,
        telefono: formData.telefono,
        email: formData.correo,
        genero: formData.genero,
        photoURL: photoURL,
      });

      return { success: true, photoUploadSuccess };
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      throw error;
    }
  };

  return {
    // Estados
    formData,
    photoPreview,
    fileInputRef,
    
    // Funciones
    handlePhotoChange,
    handleEditPhotoClick,
    handleInputChange,
    handleSubmit,
    
    // Datos del usuario
    userData,
    user
  };
};