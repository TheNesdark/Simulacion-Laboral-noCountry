import React from 'react';

interface MonitorIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function MonitorIcon({
  width = 24,
  height = 25,
  className,
}: MonitorIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_449_174)'>
        <path d='M22 8.5L18 4.5V7.5H3V9.5H18V12.5L22 8.5Z' fill='#323232' />
        <path d='M2 16.5L6 20.5V17.5H21V15.5H6V12.5L2 16.5Z' fill='#323232' />
      </g>
      <defs>
        <clipPath id='clip0_449_174'>
          <rect
            width={width}
            height={height}
            fill='white'
            transform='translate(0 0.5)'
          />
        </clipPath>
      </defs>
    </svg>
  );
}
