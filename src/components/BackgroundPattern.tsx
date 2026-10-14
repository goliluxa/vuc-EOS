import React from 'react';
import vucEmblem from '../assets/images/vuc-emblem.png';

export const BackgroundPattern: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden -z-10 select-none"
      aria-hidden="true"
    >
      {/* Top subtle tricolor accent line with gentle shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-military-red/70 via-military-blue/60 to-transparent bg-[length:200%_100%] animate-subtle-gradient" />

      {/* Living iridescent aurora gradient shimmering wash */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/40 via-indigo-100/35 via-rose-100/25 to-sky-200/40 animate-aurora pointer-events-none" />

      {/* Atmospheric lighting gradients with organic drift */}
      <div className="absolute -top-36 -left-36 w-[34rem] h-[34rem] bg-gradient-to-br from-blue-300/45 via-indigo-200/35 to-transparent rounded-full blur-3xl animate-ambient-slow" />
      <div className="absolute top-1/4 right-4 w-[42rem] h-[42rem] bg-gradient-to-bl from-sky-300/40 via-blue-200/40 to-rose-200/25 rounded-full blur-3xl animate-ambient-reverse" />
      <div className="absolute -bottom-28 left-1/4 w-[30rem] h-[30rem] bg-gradient-to-tr from-indigo-200/40 via-blue-100/45 to-transparent rounded-full blur-3xl animate-ambient-slow" />

      {/* Authentic VUC colored star emblem (compact, static, perfectly proportioned) */}
      <div className="absolute right-4 sm:right-8 lg:right-12 xl:right-20 top-1/2 -translate-y-1/2 w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] md:w-[26rem] md:h-[26rem] lg:w-[29rem] lg:h-[29rem] xl:w-[33rem] xl:h-[33rem] opacity-20 sm:opacity-25 lg:opacity-90 xl:opacity-95 pointer-events-none transition-opacity duration-500">
        <img
          src={vucEmblem}
          alt=""
          className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(15,58,120,0.20)]"
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
