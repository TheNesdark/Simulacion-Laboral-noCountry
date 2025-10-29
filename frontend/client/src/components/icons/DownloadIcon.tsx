import React from 'react';

interface DownloadIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function DownloadIcon({
  width = 25,
  height = 24,
  className,
}: DownloadIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_343_337)'>
        <path
          d='M19.5 9H15.5V3H9.5V9H5.5L12.5 16L19.5 9ZM11.5 11V5H13.5V11H14.67L12.5 13.17L10.33 11H11.5ZM5.5 18H19.5V20H5.5V18Z'
          fill='#FAFAFA'
        />
      </g>
      <defs>
        <clipPath id='clip0_343_337'>
          <rect
            width='24'
            height='24'
            fill='white'
            transform='translate(0.5)'
          />
        </clipPath>
      </defs>
    </svg>
  );
}
