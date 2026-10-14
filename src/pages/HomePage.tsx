import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { BackgroundPattern } from '../components/BackgroundPattern';
import vucBuilding from '../assets/images/vuc-building.jpg';

export const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-surface-bg text-content-primary overflow-x-hidden animate-fade-in">
      <BackgroundPattern />

      {/* Top Bar with authentic VUC star logo */}
      <header className="w-full pt-6 sm:pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <BrandLogo size="md" />
        </div>
      </header>

      {/* Main Single-Screen Hero Section */}
      <main className="flex-1 flex items-center py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column: System Identity and Entry Action */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center animate-slide-up">
              {/* Overline with short red accent line */}
              <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                <span
                  className="w-6 h-0.5 bg-military-red rounded-full shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-content-secondary">
                  ИНФОРМАЦИОННАЯ ОБРАЗОВАТЕЛЬНАЯ СИСТЕМА
                </span>
              </div>

              {/* Dominant Headline: ИОС */}
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-navy-deep tracking-tight leading-none mb-4 sm:mb-6">
                ИОС
              </h1>

              {/* Concise, calm system description */}
              <p className="text-base sm:text-lg text-content-secondary max-w-xl leading-relaxed mb-8 sm:mb-10 font-normal">
                Единое цифровое пространство для образовательной деятельности
                Военного учебного центра.
              </p>

              {/* Primary Action Button */}
              <div>
                <Link
                  to="/login"
                  className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 text-base font-semibold text-white bg-military-red hover:bg-military-redHover active:bg-red-800 rounded-md transition-colors duration-150 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-military-red focus-visible:ring-offset-2"
                >
                  <span>Войти в систему</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            {/* Right Column: Authentic VUC Building Photo */}
            <div className="lg:col-span-6 xl:col-span-7 animate-slide-in-right">
              <div className="relative w-full rounded-lg overflow-hidden border border-surface-border shadow-card bg-white">
                <img
                  src={vucBuilding}
                  alt="Здание Военного учебного центра ЧувГУ им. И. Н. Ульянова с вывеской над входом"
                  className="w-full h-auto max-h-[460px] sm:max-h-[520px] object-cover object-[center_30%]"
                  loading="eager"
                  width={2048}
                  height={788}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clean minimal bottom bar */}
      <footer className="w-full py-4 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-content-secondary/70">
            Военный учебный центр Чувашского государственного университета им.
            И. Н. Ульянова
          </p>
        </div>
      </footer>
    </div>
  );
};
