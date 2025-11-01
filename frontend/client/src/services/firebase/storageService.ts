import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase/firebase';
import { logger } from '@/utils/logger';

/**
 * Sube una foto a Firebase Storage y retorna la URL de descarga
 * @param file - Archivo de imagen a subir
 * @param userId - ID del usuario para crear la ruta de almacenamiento
 * @returns URL de descarga de la imagen subida
 */
export const uploadPhotoToFirebase = async (
  file: File,
  userId: string
): Promise<string> => {
  if (!file || !userId) {
    throw new Error('Se requiere el archivo y el ID del usuario');
  }

  try {
    const storageRef = ref(
      storage,
      `profile-photos/${userId}/${Date.now()}-${file.name}`
    );
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    logger.error('Error al subir la foto a Firebase:', error);
    throw new Error('No se pudo subir la foto. Por favor, intente nuevamente.');
  }
};

/**
 * Elimina una foto de Firebase Storage
 * @param photoUrl - URL de la foto a eliminar
 */
export const deletePhotoFromFirebase = async (
  photoUrl: string
): Promise<void> => {
  try {
    logger.debug('Función de eliminación de fotos no implementada aún');
  } catch (error) {
    logger.error('Error al eliminar la foto de Firebase:', error);
    throw new Error('No se pudo eliminar la foto.');
  }
};

/**
 * Valida que un archivo sea una imagen aceptable
 * @param file - Archivo a validar
 * @returns true si el archivo es válido
 */
export const validateImageFile = (file: File): boolean => {
  const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!acceptedTypes.includes(file.type)) {
    throw new Error('Solo se permiten archivos JPG, PNG o WebP');
  }

  if (file.size > maxSize) {
    throw new Error('El tamaño máximo permitido es de 5MB');
  }

  return true;
};
