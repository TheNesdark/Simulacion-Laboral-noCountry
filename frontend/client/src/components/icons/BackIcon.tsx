import React from 'react';

interface ArrowLeftIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function ArrowLeftIcon({
  width = 24,
  height = 25,
  className,
}: ArrowLeftIconProps) {
  return (
    <svg
      width='30'
      height='31'
      viewBox='0 0 30 31'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_449_93)'>
        <path
          d='M25 14.25H9.7875L16.775 7.2625L15 5.5L5 15.5L15 25.5L16.7625 23.7375L9.7875 16.75H25V14.25Z'
          fill='#00579B'
        />
      </g>
      <defs>
        <clipPath id='clip0_449_93'>
          <rect
            width='30'
            height='30'
            fill='white'
            transform='translate(0 0.5)'
          />
        </clipPath>
      </defs>
    </svg>
  );
}
