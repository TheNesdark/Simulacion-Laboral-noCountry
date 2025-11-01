'use client';
import { useAuth } from '@/context/AuthContext';
import Avatar from '@/components/ui/Avatar';

interface UserPhotoProps {
  className?: string;
  width?: number;
  height?: number;
  altText?: string;
}

export default function UserPhoto({
  className = '',
  width = 40,
  height = 40,
  altText = 'Foto de perfil',
}: UserPhotoProps) {
  const { userData } = useAuth();

  const fallbackText = userData?.nombres && userData?.apellidos 
    ? `${userData.nombres} ${userData.apellidos}`
    : userData?.email || 'Usuario';

  return (
    <Avatar
      src={userData?.photoURL}
      alt={altText}
      size={width}
      className={className}
      fallbackText={fallbackText}
    />
  );
}
