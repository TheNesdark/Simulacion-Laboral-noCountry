'use client';
import { useState } from 'react';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
  className?: string;
  fallbackText?: string;
}

export default function Avatar({ 
  src, 
  alt = 'Avatar', 
  size = 48, 
  className = '',
  fallbackText 
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const getInitials = () => {
    if (fallbackText) {
      return fallbackText.split(' ')
        .filter(word => word.length > 0)
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return alt.split(' ')
      .filter(word => word.length > 0)
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  if (src && !imageError) {
    return (
      <>
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          className={`rounded-full object-cover ${className}`}
          style={{ width: size, height: size }}
          onError={() => setImageError(true)}
        />
      </>
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center font-medium ${className}`}
      style={{ 
        width: size, 
        height: size, 
        fontSize: size * 0.4,
        minWidth: size,
        minHeight: size,
        backgroundColor: '#e5e7eb',
        color: '#374151'
      }}
    >
      {getInitials()}
    </div>
  );
}