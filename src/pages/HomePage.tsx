import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, ShieldCheck, GraduationCap, Calendar, Lock } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { BackgroundPattern } from '../components/BackgroundPattern';
import vucBuilding from '../assets/images/vuc-building.jpg';

export const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-surface-bg text-content-primary overflow-x-hidden animate-fade-in">
      <BackgroundPattern />

      {/* Top Navigation Bar with authentic VUC emblem and system status */}
      <header className="w-full pt-5 sm:pt-7 pb-3 sm:pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <BrandLogo size="md" />

          {/* Institutional Status Badge */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-white/85 border border-surface-border rounded-full text-xs font-medium text-content-secondary shadow-xs backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span className="text-navy-brand font-semibold">Система активна</span>
            <span className="text-slate-300">•</span>
            <span>2026/2027</span>
          </div>
        </div>
      </header>

      {/* Main Single-Screen Hero Section */}
      <main className="flex-1 flex items-center py-4 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column: System Identity and Entry Action */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center animate-slide-up">
              {/* Overline Badge with pulsing indicator */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white border border-slate-200/90 rounded-full shadow-xs mb-4 sm:mb-5 w-fit">
                <span
                  className="w-2 h-2 rounded-full bg-military-red animate-pulse-glow shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-navy-brand">
                  ИНФОРМАЦИОННАЯ ОБРАЗОВАТЕЛЬНАЯ СИСТЕМА
                </span>
              </div>

              {/* Dominant Headline: ИОС */}
              <div className="relative mb-3 sm:mb-5">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-navy-deep tracking-tight leading-none">
                  ИОС
                </h1>
                {/* Subtle military accent baseline bar */}
                <div className="mt-2 w-20 sm:w-28 h-1 sm:h-1.5 bg-gradient-to-r from-military-red via-military-blue to-navy-brand rounded-full" />
              </div>

              {/* Concise, calm system description */}
              <p className="text-base sm:text-lg text-content-secondary max-w-xl leading-relaxed mb-6 font-normal">
                Единое цифровое пространство для образовательной деятельности
                Военного учебного центра Чувашского государственного университета.
              </p>

              {/* Compact Key Modules Chips */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8 sm:mb-10 text-xs text-slate-700">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 border border-slate-200 rounded-md shadow-xs">
                  <GraduationCap className="w-3.5 h-3.5 text-military-blue" aria-hidden="true" />
                  <span className="font-medium">Учебные программы</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 border border-slate-200 rounded-md shadow-xs">
                  <Calendar className="w-3.5 h-3.5 text-military-blue" aria-hidden="true" />
                  <span className="font-medium">Расписание и журнал</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 border border-slate-200 rounded-md shadow-xs">
                  <Lock className="w-3.5 h-3.5 text-military-red" aria-hidden="true" />
                  <span className="font-medium">Защищённый контур</span>
                </div>
              </div>

              {/* Primary Action Button with light sweep effect */}
              <div>
                <Link
                  to="/login"
                  className="group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 text-base font-semibold text-white bg-gradient-to-r from-military-red to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#991B1B] active:scale-[0.98] rounded-md transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-red-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-military-red focus-visible:ring-offset-2 overflow-hidden"
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

            {/* Right Column: Premium Framed Authentic VUC Building Photo */}
            <div className="lg:col-span-6 xl:col-span-6 animate-slide-in-right">
              <div className="group relative rounded-xl p-1.5 sm:p-2 bg-gradient-to-b from-white to-slate-100 border border-slate-200/90 shadow-xl shadow-slate-900/6 hover:shadow-2xl hover:shadow-navy-brand/10 transition-all duration-300">
                <div className="relative overflow-hidden rounded-lg bg-slate-900">
                  <img
                    src={vucBuilding}
                    alt="Здание Военного учебного центра ЧувГУ им. И. Н. Ульянова с вывеской над входом"
                    className="w-full h-auto max-h-[460px] sm:max-h-[520px] object-cover object-[center_30%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="eager"
                    width={2048}
                    height={788}
                  />

                  {/* Corner architectural badge */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 px-3 py-1.5 bg-[#071E3D]/90 backdrop-blur-md text-white text-xs font-semibold rounded-md flex items-center gap-2 border border-white/10 shadow-sm pointer-events-none">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                    <span>Учебный корпус «Ж» • ЧувГУ</span>
                  </div>

                  {/* Top corner institutional seal badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 bg-white/95 backdrop-blur-md text-navy-deep text-[11px] font-bold rounded-md shadow-xs flex items-center gap-1.5 border border-slate-200/80 pointer-events-none">
                    <ShieldCheck className="w-3.5 h-3.5 text-military-red" aria-hidden="true" />
                    <span>ВУЦ 21</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom spacer (redundant text removed per user feedback) */}
      <div className="h-4 sm:h-6" aria-hidden="true" />
    </div>
  );
};
