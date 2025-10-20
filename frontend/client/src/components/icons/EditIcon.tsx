import React from 'react';

interface EditIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function EditIcon({ width = 20, height = 20, className }: EditIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}