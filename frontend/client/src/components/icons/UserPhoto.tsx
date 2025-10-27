"use client";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

interface UserPhotoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  showFallback?: boolean;
  altText?: string;
}

export default function UserPhoto({ 
  className = "", 
  width = 40, 
  height = 40, 
  priority = true,
  showFallback = true,
  altText = "Foto de perfil"
}: UserPhotoProps) {
  const { userData } = useAuth();

  const getUserInitial = () => {
    if (userData?.nombres) return userData.nombres.charAt(0).toUpperCase();
    if (userData?.email) return userData.email.charAt(0).toUpperCase();
    return 'U';
  };

  if (userData?.photoURL) {
    return (
      <Image
        src={userData.photoURL} 
        alt={altText}
        className={`${className} user-avatar`}
        width={width}
        height={height}
        onError={(e) => {
          // Si la imagen falla al cargar, mostrar placeholder
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const placeholder = document.createElement('div');
          placeholder.className = `${className} user-avatar-placeholder`;
          placeholder.style.display = 'flex';
          placeholder.textContent = getUserInitial();
          target.parentNode?.appendChild(placeholder);
        }}
      />
    );
  }

  return (
    <div className={`${className} user-avatar-placeholder`} style={{ display: 'flex' }}>
      {getUserInitial()}
    </div>
  );
}