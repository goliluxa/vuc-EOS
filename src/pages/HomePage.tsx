import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BackgroundPattern } from '../components/BackgroundPattern';

export const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-surface-bg text-content-primary overflow-x-hidden animate-fade-in">
      <BackgroundPattern />

      {/* Top spacer (header logo removed per user request) */}
      <div className="w-full pt-6 sm:pt-10" aria-hidden="true" />

      {/* Main Single-Screen Hero Section - Left Aligned */}
      <main className="flex-1 flex items-center py-6 sm:py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-left flex flex-col items-start animate-slide-up">
            {/* Overline Badge with pulsing indicator */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 bg-white border border-slate-200/90 rounded-full shadow-xs mb-4 sm:mb-6 max-w-full">
              <span
                className="w-2 h-2 rounded-full bg-military-red animate-pulse-glow shrink-0"
                aria-hidden="true"
              />
              <span className="text-[9.5px] sm:text-[11px] font-bold tracking-wider sm:tracking-widest uppercase text-navy-brand whitespace-nowrap">
                ИНФОРМАЦИОННАЯ ОБРАЗОВАТЕЛЬНАЯ СИСТЕМА
              </span>
            </div>

            {/* Dominant Headline: ИОС */}
            <div className="mb-4 sm:mb-6">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-navy-deep tracking-tight leading-none">
                ИОС
              </h1>
              {/* Subtle military accent baseline bar */}
              <div className="mt-3 sm:mt-4 w-20 sm:w-28 h-1 sm:h-1.5 bg-gradient-to-r from-military-red via-military-blue to-navy-brand rounded-full" />
            </div>

            {/* Concise, calm system description */}
            <p className="text-base sm:text-lg text-content-secondary max-w-xl leading-relaxed mb-8 sm:mb-10 font-normal">
              Единое цифровое пространство для образовательной деятельности
              Военного учебного центра Чувашского государственного университета.
            </p>

            {/* Primary Action Button with light sweep effect */}
            <div>
              <Link
                to="/login"
                className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 text-base font-semibold text-white bg-gradient-to-r from-military-red to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] active:scale-[0.98] rounded-md transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-red-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-military-red focus-visible:ring-offset-2 overflow-hidden"
              >
                {/* Subtle shine sweep */}
                <span
                  className="absolute inset-0 w-1/2 h-full bg-white/15 skew-x-12 -translate-x-full group-hover:animate-shimmer pointer-events-none"
                  aria-hidden="true"
                />
                <span>Войти в систему</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom spacer */}
      <div className="h-6 sm:h-8" aria-hidden="true" />
    </div>
  );
};
