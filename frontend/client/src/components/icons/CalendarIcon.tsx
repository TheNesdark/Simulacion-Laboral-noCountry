import React from 'react';

interface CalendarIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function CalendarIcon({
  width = 24,
  height = 24,
  className,
}: CalendarIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_344_454)'>
        <path
          d='M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8ZM12 13H17V18H12V13Z'
          fill='#979797'
        />
      </g>
      <defs>
        <clipPath id='clip0_344_454'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
