import React from 'react';
import { Calendar, BookMarked, UserCircle, CalendarCheck, ArrowLeft, FolderArchive, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../../../context/SiteSettingsContext';

export type CadetLmsSection = 'schedule' | 'courses' | 'grades' | 'storage' | 'personnel' | 'profile' | 'events';

interface CadetSidebarProps {
  activeSection: CadetLmsSection;
  onSelectSection: (section: CadetLmsSection) => void;
  userRole?: string;
}

export const CadetSidebar: React.FC<CadetSidebarProps> = ({
  activeSection,
  onSelectSection,
  userRole = 'cadet',
}) => {
  const { logoUrl } = useSiteSettings();
  const isCadet = userRole === 'cadet';
  const isMethodist = userRole === 'methodist';
  const isDeputy = userRole === 'deputy';
  const isOfficer = userRole === 'officer';

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
          {/* 1. Расписание занятий (только для курсантов) */}
          {isCadet && (
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
          )}

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
            <span>Курсы</span>
          </button>

          {/* 2.1 Успеваемость (Зачётка) - только для курсантов */}
          {isCadet && (
            <button
              type="button"
              onClick={() => onSelectSection('grades')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs sm:text-sm transition-colors cursor-pointer ${
                activeSection === 'grades'
                  ? 'bg-blue-50/90 text-military-blue font-semibold border border-blue-200/70 shadow-xs'
                  : 'text-content-primary hover:bg-slate-100 font-medium'
              }`}
              title="Электронная зачётная книжка и успеваемость"
            >
              <Award
                className={`w-4 h-4 shrink-0 ${
                  activeSection === 'grades' ? 'text-military-blue' : 'text-slate-500'
                }`}
              />
              <span>Успеваемость</span>
            </button>
          )}

          {/* 2.5 Хранилище файлов (внутренняя секция LMS) */}
          {!isCadet && (
          <button
            type="button"
            onClick={() => onSelectSection('storage')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs sm:text-sm transition-colors cursor-pointer ${
              activeSection === 'storage'
                ? 'bg-blue-50/90 text-military-blue font-semibold border border-blue-200/70 shadow-xs'
                : 'text-content-primary hover:bg-slate-100 font-medium'
            }`}
            title="Облачное файловое хранилище"
          >
            <FolderArchive
              className={`w-4 h-4 shrink-0 ${
                activeSection === 'storage' ? 'text-military-blue' : 'text-slate-500'
              }`}
            />
            <span>Хранилище</span>
          </button>
          )}

          {/* 3. Профиль */}
          {isOfficer && (
            <button
              type="button"
              onClick={() => onSelectSection('personnel')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs sm:text-sm transition-colors cursor-pointer ${
                activeSection === 'personnel'
                  ? 'bg-blue-50/90 text-military-blue font-semibold border border-blue-200/70 shadow-xs'
                  : 'text-content-primary hover:bg-slate-100 font-medium'
              }`}
              title="Реестр личного состава"
            >
              <Users
                className={`w-4 h-4 shrink-0 ${
                  activeSection === 'personnel' ? 'text-military-blue' : 'text-slate-500'
                }`}
              />
              <span>Личный состав</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => onSelectSection('profile')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs sm:text-sm transition-colors cursor-pointer ${
              activeSection === 'profile'
                ? 'bg-blue-50/90 text-military-blue font-semibold border border-blue-200/70 shadow-xs'
                : 'text-content-primary hover:bg-slate-100 font-medium'
            }`}
            title="Личный профиль курсанта"
          >
            <UserCircle
              className={`w-4 h-4 shrink-0 ${
                activeSection === 'profile' ? 'text-military-blue' : 'text-slate-500'
              }`}
            />
            <span>Профиль</span>
          </button>

          {/* 4. Мероприятия (В разработке - Disabled / Gray) */}
          {(isCadet || isMethodist || isDeputy || isOfficer) && (
          <button
            type="button"
            onClick={() => onSelectSection('events')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs sm:text-sm transition-colors cursor-pointer ${
              activeSection === 'events'
                ? 'bg-blue-50/90 text-military-blue font-semibold border border-blue-200/70 shadow-xs'
                : 'text-content-primary hover:bg-slate-100 font-medium'
            }`}
            title="План военных мероприятий и смотров"
          >
            <CalendarCheck
              className={`w-4 h-4 shrink-0 ${
                activeSection === 'events' ? 'text-military-blue' : 'text-slate-500'
              }`}
            />
            <span>Мероприятия</span>
          </button>
          )}
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
