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

      {/* Large authentic VUC star emblem watermark centered behind the hero */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] sm:w-[42rem] sm:h-[42rem] lg:w-[48rem] lg:h-[48rem] opacity-[0.045] pointer-events-none">
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
