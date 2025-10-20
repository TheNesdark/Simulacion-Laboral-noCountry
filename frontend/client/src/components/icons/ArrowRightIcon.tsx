import React from 'react';

interface ArrowRightIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function ArrowRightIcon({ width = 24, height = 25, className }: ArrowRightIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_449_195)">
        <path d="M8.59009 17.09L13.1701 12.5L8.59009 7.91L10.0001 6.5L16.0001 12.5L10.0001 18.5L8.59009 17.09Z" fill="#323232" />
      </g>
      <defs>
        <clipPath id="clip0_449_195">
          <rect width={width} height={height} fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}