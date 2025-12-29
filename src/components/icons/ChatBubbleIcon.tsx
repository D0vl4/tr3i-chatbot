import React from 'react';

export default function ChatBubbleIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <g filter="url(#filter0_d_32_8)">
        <path
          d="M0 3V19.0606C0 20.7175 1.34315 22.0606 3 22.0606H7V26.992C7 27.3896 7.46542 27.6051 7.76859 27.3479L13.8134 22.2189C13.9339 22.1167 14.0867 22.0606 14.2447 22.0606H25C26.6569 22.0606 28 20.7175 28 19.0606V3C28 1.34315 26.6569 0 25 0H3C1.34315 0 0 1.34315 0 3Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_32_8"
          x="-4"
          y="0"
          width="36"
          height="35.4595"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_32_8" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_32_8" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

