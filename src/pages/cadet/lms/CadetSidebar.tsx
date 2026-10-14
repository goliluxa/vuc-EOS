import React from 'react';
import { Calendar, BookMarked, UserCircle, CalendarCheck, ChevronLeft, ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export type CadetLmsSection = 'schedule' | 'courses' | 'profile' | 'events';

interface CadetSidebarProps {
  activeSection: CadetLmsSection;
  onSelectSection: (section: CadetLmsSection) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const CadetSidebar: React.FC<CadetSidebarProps> = ({
  activeSection,
  onSelectSection,
  isCollapsed,
  onToggleCollapse,
}) => {
  return (
    <aside
      className={`h-full bg-white border-r border-surface-border flex flex-col justify-between transition-all duration-200 select-none ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-3.5 border-b border-surface-border">
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-military-red">
                ИОС ВУЦ LMS
              </span>
              <span className="text-[11px] text-content-secondary truncate">
                Учебный портал курсанта
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1.5 rounded text-content-secondary hover:text-navy-deep hover:bg-slate-100 transition-colors mx-auto"
            title={isCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1">
          {/* 1. Расписание занятий (Active) */}
          <button
            type="button"
            onClick={() => onSelectSection('schedule')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              activeSection === 'schedule'
                ? 'bg-military-blue text-white shadow-xs'
                : 'text-content-primary hover:bg-slate-100'
            }`}
            title="Расписание занятий"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Расписание занятий</span>}
          </button>

          {/* 2. Курсы (Active) */}
          <button
            type="button"
            onClick={() => onSelectSection('courses')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              activeSection === 'courses'
                ? 'bg-military-blue text-white shadow-xs'
                : 'text-content-primary hover:bg-slate-100'
            }`}
            title="Курсы военной подготовки"
          >
            <BookMarked className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Курсы и материалы</span>}
          </button>

          {/* 3. Профиль (В разработке - Disabled / Gray) */}
          <div
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs sm:text-sm text-slate-400 bg-slate-50/60 cursor-not-allowed ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Раздел «Личный профиль» находится в разработке"
          >
            <div className="flex items-center gap-3">
              <UserCircle className="w-4 h-4 shrink-0 text-slate-400" />
              {!isCollapsed && <span>Профиль</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded">
                Скоро
              </span>
            )}
          </div>

          {/* 4. Мероприятия (В разработке - Disabled / Gray) */}
          <div
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs sm:text-sm text-slate-400 bg-slate-50/60 cursor-not-allowed ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Раздел «Мероприятия» (отметка посещаемости) находится в разработке"
          >
            <div className="flex items-center gap-3">
              <CalendarCheck className="w-4 h-4 shrink-0 text-slate-400" />
              {!isCollapsed && <span>Мероприятия</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded">
                Скоро
              </span>
            )}
          </div>
        </nav>
      </div>

      {/* Bottom Hub & Library links */}
      <div className="p-2 border-t border-surface-border space-y-1">
        <Link
          to="/library"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-xs text-content-secondary hover:text-military-blue hover:bg-blue-50/60 transition-colors"
          title="Открыть библиотеку"
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Библиотека ВУЦ</span>}
        </Link>

        <Link
          to="/portal"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-xs text-content-secondary hover:text-navy-deep hover:bg-slate-100 transition-colors"
          title="Вернуться на экран выбора"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>В главное меню</span>}
        </Link>
      </div>
    </aside>
  );
};
