import React from 'react';
import { Calendar, BookMarked, UserCircle, CalendarCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../../../context/SiteSettingsContext';

export type CadetLmsSection = 'schedule' | 'courses' | 'profile' | 'events';

interface CadetSidebarProps {
  activeSection: CadetLmsSection;
  onSelectSection: (section: CadetLmsSection) => void;
}

export const CadetSidebar: React.FC<CadetSidebarProps> = ({
  activeSection,
  onSelectSection,
}) => {
  const { logoUrl } = useSiteSettings();

  return (
    <aside className="h-full w-64 bg-white border-r border-surface-border flex flex-col justify-between select-none">
      {/* Top Header with VUC Logo */}
      <div>
        <div className="h-16 flex items-center border-b border-surface-border px-4">
          <Link
            to="/portal"
            className="flex items-center gap-2.5 min-w-0 group"
            title="Перейти в главное меню"
          >
            <img
              src={logoUrl}
              alt="Эмблема Военного учебного центра"
              className="w-8 h-8 object-contain shrink-0 drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
              width={32}
              height={32}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-military-red leading-tight truncate">
                ИОС ВУЦ
              </span>
              <span className="text-[11px] text-content-secondary leading-tight truncate">
                Учебный портал
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1">
          {/* 1. Расписание занятий */}
          <button
            type="button"
            onClick={() => onSelectSection('schedule')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs sm:text-sm transition-colors cursor-pointer ${
              activeSection === 'schedule'
                ? 'bg-blue-50/90 text-military-blue font-semibold border border-blue-200/70 shadow-xs'
                : 'text-content-primary hover:bg-slate-100 font-medium'
            }`}
            title="Расписание занятий"
          >
            <Calendar
              className={`w-4 h-4 shrink-0 ${
                activeSection === 'schedule' ? 'text-military-blue' : 'text-slate-500'
              }`}
            />
            <span>Расписание занятий</span>
          </button>

          {/* 2. Курсы */}
          <button
            type="button"
            onClick={() => onSelectSection('courses')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs sm:text-sm transition-colors cursor-pointer ${
              activeSection === 'courses'
                ? 'bg-blue-50/90 text-military-blue font-semibold border border-blue-200/70 shadow-xs'
                : 'text-content-primary hover:bg-slate-100 font-medium'
            }`}
            title="Курсы военной подготовки"
          >
            <BookMarked
              className={`w-4 h-4 shrink-0 ${
                activeSection === 'courses' ? 'text-military-blue' : 'text-slate-500'
              }`}
            />
            <span>Курсы и материалы</span>
          </button>

          {/* 3. Профиль (В разработке - Disabled / Gray) */}
          <div
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs sm:text-sm text-slate-400 bg-slate-50/60 cursor-not-allowed"
            title="Раздел «Личный профиль» находится в разработке"
          >
            <div className="flex items-center gap-3">
              <UserCircle className="w-4 h-4 shrink-0 text-slate-400" />
              <span>Профиль</span>
            </div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded">
              Скоро
            </span>
          </div>

          {/* 4. Мероприятия (В разработке - Disabled / Gray) */}
          <div
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs sm:text-sm text-slate-400 bg-slate-50/60 cursor-not-allowed"
            title="Раздел «Мероприятия» (отметка посещаемости) находится в разработке"
          >
            <div className="flex items-center gap-3">
              <CalendarCheck className="w-4 h-4 shrink-0 text-slate-400" />
              <span>Мероприятия</span>
            </div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded">
              Скоро
            </span>
          </div>
        </nav>
      </div>

      {/* Bottom Main Menu link */}
      <div className="p-2 border-t border-surface-border">
        <Link
          to="/portal"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-xs text-content-secondary hover:text-navy-deep hover:bg-slate-100 transition-colors"
          title="Вернуться на экран выбора"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>В главное меню</span>
        </Link>
      </div>
    </aside>
  );
};
