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

      {/* Atmospheric soft static lighting gradients */}
      <div className="absolute -top-36 -left-36 w-[32rem] h-[32rem] bg-blue-100/50 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-8 w-[36rem] h-[36rem] bg-slate-200/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-28 left-1/3 w-[26rem] h-[26rem] bg-blue-50/60 rounded-full blur-3xl" />

      {/* Authentic VUC colored star emblem (compact, static, elegant) */}
      <div className="absolute right-6 sm:right-10 lg:right-16 xl:right-24 top-1/2 -translate-y-1/2 w-[15rem] h-[15rem] sm:w-[18rem] sm:h-[18rem] md:w-[21rem] md:h-[21rem] lg:w-[23rem] lg:h-[23rem] xl:w-[26rem] xl:h-[26rem] opacity-20 sm:opacity-25 lg:opacity-90 xl:opacity-95 pointer-events-none transition-opacity duration-300">
        <img
          src={vucEmblem}
          alt=""
          className="w-full h-full object-contain drop-shadow-[0_16px_36px_rgba(15,58,120,0.18)]"
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
