import React from 'react';
import vucEmblem from '../assets/images/vuc-emblem.png';

export const BackgroundPattern: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden -z-10 select-none"
      aria-hidden="true"
    >
      {/* Top subtle tricolor accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-military-red/70 via-military-blue/60 to-transparent" />

      {/* Atmospheric lighting gradients */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-blue-100/60 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-0 w-[42rem] h-[42rem] bg-slate-200/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 w-[28rem] h-[28rem] bg-blue-50/70 rounded-full blur-3xl" />

      {/* Large authentic VUC star emblem watermark positioned on the right side */}
      <div className="absolute -right-16 sm:right-0 lg:right-4 xl:right-12 top-1/2 -translate-y-1/2 w-[32rem] h-[32rem] sm:w-[40rem] sm:h-[40rem] lg:w-[46rem] lg:h-[46rem] xl:w-[50rem] xl:h-[50rem] opacity-[0.065] pointer-events-none">
        <img
          src={vucEmblem}
          alt=""
          className="w-full h-full object-contain filter grayscale contrast-125"
        />
      </div>

      {/* Architectural technical grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.045]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="vuc-cad-grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="#0F3A78"
              strokeWidth="0.75"
            />
            <circle cx="0" cy="0" r="1.5" fill="#0F3A78" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vuc-cad-grid)" />
      </svg>
    </div>
  );
};
