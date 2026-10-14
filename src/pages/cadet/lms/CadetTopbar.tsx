import React from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { CadetSessionUser } from '../../../types/cadet';

interface CadetTopbarProps {
  title: string;
  description?: string;
  cadet: CadetSessionUser | null;
  onOpenMobileMenu: () => void;
  onLogout: () => void;
}

export const CadetTopbar: React.FC<CadetTopbarProps> = ({
  title,
  description,
  cadet,
  onOpenMobileMenu,
  onLogout,
}) => {
  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-surface-border sticky top-0 z-20 shadow-xs flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-content-secondary hover:text-navy-deep rounded-md hover:bg-slate-100"
          aria-label="Открыть меню"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-sm sm:text-base font-bold text-navy-deep leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-[11px] sm:text-xs text-content-secondary hidden sm:block leading-tight">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-7 h-7 rounded-full bg-blue-50 text-military-blue flex items-center justify-center font-bold">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-semibold text-navy-deep leading-tight">
              {cadet?.fullName || 'Курсант'}
            </span>
            <span className="text-[11px] text-content-secondary leading-tight">
              {cadet?.unitOrDepartment || 'Взвод 141'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-military-red hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md transition-colors"
          title="Завершить сеанс"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Выйти</span>
        </button>
      </div>
    </header>
  );
};
