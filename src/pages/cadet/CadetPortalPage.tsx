import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, LogOut, ArrowRight, Shield, User, ExternalLink } from 'lucide-react';
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

      {/* Top Header */}
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

      {/* Main Choice Hub */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center max-w-2xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-military-blue border border-blue-200 mb-3">
            <Shield className="w-3.5 h-3.5 text-military-red" />
            <span>Личный кабинет курсанта</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-deep tracking-tight mb-2">
            Информационная образовательная система
          </h1>
          <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
            Выберите необходимый сервис для работы с учебными материалами или расписанием военной подготовки
          </p>
        </div>

        {/* 2 Primary Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
          {/* Card 1: Электронная библиотека (Переход на действующую библиотеку) */}
          <a
            href={libraryService.getLibraryUrl()}
            className="group relative bg-white border border-surface-border rounded-xl p-6 sm:p-7 shadow-card hover:shadow-cardHover hover:border-military-blue/60 transition-all duration-200 cursor-pointer flex flex-col justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-military-blue"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-military-blue flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-military-blue group-hover:text-white transition-all duration-200">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-navy-deep group-hover:text-military-blue transition-colors">
                  Электронная библиотека
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-blue-50 text-military-blue border border-blue-200 inline-flex items-center gap-1">
                  <span>библиотека.вуц21.рф</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
              <p className="text-xs sm:text-sm text-content-secondary leading-relaxed mb-6">
                Действующий электронный фонд учебных изданий, общевоинских уставов Вооруженных Сил РФ, наставлений по стрелковому делу и методических пособий.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-military-blue group-hover:text-navy-brand transition-colors pt-3 border-t border-surface-border/60">
              <span>Перейти в библиотеку</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>

          {/* Card 2: Учебная программа (LMS) */}
          <div
            onClick={() => navigate('/cadet/lms')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/cadet/lms')}
            className="group relative bg-white border border-surface-border rounded-xl p-6 sm:p-7 shadow-card hover:shadow-cardHover hover:border-military-red/60 transition-all duration-200 cursor-pointer flex flex-col justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-military-red"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-red-50 text-military-red flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-military-red group-hover:text-white transition-all duration-200">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-navy-deep group-hover:text-military-red transition-colors">
                  Учебная программа
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-blue-50 text-military-blue border border-blue-200">
                  LMS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-content-secondary leading-relaxed mb-6">
                Расписание учебного военного дня (1 день в неделю), курсы военной подготовки (ОВП, тактика, огневая), презентации лекций и учебные материалы.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-military-red group-hover:text-military-redHover transition-colors pt-3 border-t border-surface-border/60">
              <span>Открыть учебный процесс</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
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
