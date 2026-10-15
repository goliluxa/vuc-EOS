import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, LogOut, ArrowRight, User, Compass } from 'lucide-react';
import { BrandLogo } from '../../components/BrandLogo';
import { BackgroundPattern } from '../../components/BackgroundPattern';
import { cadetAuthService } from '../../services/cadetAuthService';
import { libraryService } from '../../services/libraryService';

export const CadetPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const currentCadet = cadetAuthService.getCurrentCadet();

  const handleLogout = () => {
    cadetAuthService.logoutCadet();
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-surface-bg text-content-primary">
      <BackgroundPattern showStar={false} />

      {/* Top Header with Navigation */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-surface-border sticky top-0 z-20 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <BrandLogo size="sm" asLink={false} />

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-surface-border text-xs">
              <div className="w-7 h-7 rounded-full bg-blue-50 text-military-blue flex items-center justify-center font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-navy-deep leading-tight">
                  {currentCadet?.fullName || 'Курсант ВУЦ'}
                </span>
                <span className="text-[11px] text-content-secondary leading-tight">
                  {currentCadet?.unitOrDepartment || 'Взвод 141'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-military-red hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md transition-colors"
              title="Завершить сеанс"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation Hub */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-2xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full bg-white border border-surface-border rounded-xl shadow-card p-5 sm:p-7">
          <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-military-blue" />
              <h1 className="text-sm sm:text-base font-bold text-navy-deep tracking-tight">
                Навигация по сервисам
              </h1>
            </div>
            <span className="text-[11px] text-content-secondary">
              Выберите раздел для работы
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Учебная программа (LMS) */}
            <button
              type="button"
              onClick={() => navigate('/cadet/lms')}
              className="group flex flex-col justify-between p-4 sm:p-5 rounded-lg border border-surface-border bg-slate-50/50 hover:bg-white hover:border-military-red/60 hover:shadow-cardHover transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-military-red"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-red-50 text-military-red flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-military-red group-hover:text-white transition-all">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="text-sm sm:text-base font-bold text-navy-deep group-hover:text-military-red transition-colors mb-1">
                  Учебная программа
                </div>
                <p className="text-xs text-content-secondary leading-relaxed">
                  Расписание военного дня, курсы военной подготовки и презентации
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-military-red mt-4 pt-2.5 border-t border-surface-border/60">
                <span>Перейти к программе</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            {/* Card 2: Электронная библиотека */}
            <a
              href={libraryService.getLibraryUrl()}
              className="group flex flex-col justify-between p-4 sm:p-5 rounded-lg border border-surface-border bg-slate-50/50 hover:bg-white hover:border-military-blue/60 hover:shadow-cardHover transition-all text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-military-blue"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-military-blue flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-military-blue group-hover:text-white transition-all">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-sm sm:text-base font-bold text-navy-deep group-hover:text-military-blue transition-colors mb-1">
                  Электронная библиотека
                </div>
                <p className="text-xs text-content-secondary leading-relaxed">
                  Фонд учебных изданий, общевоинских уставов и методических пособий
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-military-blue mt-4 pt-2.5 border-t border-surface-border/60">
                <span>Перейти в библиотеку</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-content-secondary/60 border-t border-surface-border/80">
        Военный учебный центр Чувашского государственного университета им. И. Н. Ульянова
      </footer>
    </div>
  );
};
