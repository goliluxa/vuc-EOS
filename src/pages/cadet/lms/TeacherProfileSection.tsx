import React, { useState } from 'react';
import { User, Key, CheckCircle, BookMarked, Users } from 'lucide-react';
import { CadetSessionUser } from '../../../types/cadet';

interface TeacherProfileSectionProps {
  user: CadetSessionUser | null;
  onNavigateToCourses: () => void;
}

export const TeacherProfileSection: React.FC<TeacherProfileSectionProps> = ({
  user,
  onNavigateToCourses,
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length >= 4) {
      setIsPasswordChanged(true);
      setOldPassword('');
      setNewPassword('');
      setTimeout(() => setIsPasswordChanged(false), 4000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* 1. Главная карточка преподавателя */}
      <div className="bg-white border border-surface-border rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-surface-border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-navy-deep">
                  {user?.fullName || 'Майор Ковалёв Дмитрий Сергеевич'}
                </h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Преподавательский состав
                </span>
              </div>
              <p className="text-xs sm:text-sm text-content-secondary mt-0.5">
                {user?.unitOrDepartment || 'Кафедра общевоенной подготовки'} • Старший преподаватель цикла тактики
              </p>
            </div>
          </div>
        </div>

        {/* Служебные параметры */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-1">Воинское звание</span>
            <span className="font-semibold text-slate-800 text-sm">Майор</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-1">Кафедра</span>
            <span className="font-semibold text-slate-800 text-sm">ОВП</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-1">Аудитория</span>
            <span className="font-semibold text-slate-800 text-sm">Кабинет 204</span>
          </div>
        </div>
      </div>

      {/* 2. Читаемые дисциплины и кураторство */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-surface-border rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-military-blue" />
                <h3 className="font-bold text-sm text-navy-deep">Преподаваемые дисциплины</h3>
              </div>
              <button
                type="button"
                onClick={onNavigateToCourses}
                className="text-xs text-military-blue hover:underline font-medium"
              >
                К курсам →
              </button>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 block">Тактическая подготовка</span>
                  <span className="text-[11px] text-slate-400">108 академических часов • 14 тем</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-military-blue border border-blue-200">
                  Активен
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 block">Огневая подготовка</span>
                  <span className="text-[11px] text-slate-400">72 академических часа • 8 тем</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-military-blue border border-blue-200">
                  Активен
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 block">Общевоинские уставы ВС РФ</span>
                  <span className="text-[11px] text-slate-400">54 академических часа • 6 тем</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-military-blue border border-blue-200">
                  Активен
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Закрепленные подразделения */}
        <div className="bg-white border border-surface-border rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-sm text-navy-deep">Курируемые учебные взводы</h3>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-800">Взвод 141 (Связь)</span>
                <span className="text-[11px] text-slate-500">28 курсантов</span>
              </div>
              <span className="text-slate-500 block text-[11px]">Командир: Курсант Васильев М. И.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-800">Взвод 142 (Связь)</span>
                <span className="text-[11px] text-slate-500">30 курсантов</span>
              </div>
              <span className="text-slate-500 block text-[11px]">Командир: Курсант Николаев Д. С.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Безопасность учетной записи преподавателя */}
      <div className="bg-white border border-surface-border rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Key className="w-5 h-5 text-navy-deep" />
          <h3 className="font-bold text-sm text-navy-deep">Безопасность учетной записи преподавателя</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Служебная безопасность: пароль используется для доступа к ведомостям и публикациям материалов.
        </p>

        {isPasswordChanged && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Служебный пароль успешно изменен.</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Текущий пароль
            </label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-military-blue"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Новый пароль
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Новый пароль"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-military-blue"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 px-4 text-xs font-semibold text-white bg-military-blue hover:bg-navy-deep rounded-lg transition-colors shadow-2xs"
            >
              Обновить пароль
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
