import React, { useState } from 'react';
import { User, Award, Key, CheckCircle, Building } from 'lucide-react';
import { CadetSessionUser } from '../../../types/cadet';

interface CadetProfileSectionProps {
  user: CadetSessionUser | null;
}

export const CadetProfileSection: React.FC<CadetProfileSectionProps> = ({ user }) => {
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
      {/* 1. Главная карточка личных данных курсанта */}
      <div className="bg-white border border-surface-border rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-surface-border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-military-blue shrink-0">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-navy-deep">
                  {user?.fullName || 'Смирнов Алексей Владимирович'}
                </h2>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Действующий курсант
                </span>
              </div>
              <p className="text-xs sm:text-sm text-content-secondary mt-0.5">
                {user?.unitOrDepartment || 'Взвод 141 (Связь)'} • ВУС-121800 (Применение подразделений со средствами радиосвязи)
              </p>
            </div>
          </div>
        </div>

        {/* Характеристики личного дела */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-1">Звание</span>
            <span className="font-semibold text-slate-800 text-sm">Курсант</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-1">Учебный взвод</span>
            <span className="font-semibold text-slate-800 text-sm">Взвод 141</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-1">Курс института</span>
            <span className="font-semibold text-slate-800 text-sm">3 курс (ФИВТ)</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block mb-1">Период обучения</span>
            <span className="font-semibold text-slate-800 text-sm">2024–2027 гг.</span>
          </div>
        </div>
      </div>

      {/* 2. Блок академической успеваемости и прогресса */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-surface-border rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-sm text-navy-deep">Успеваемость и допуск к занятиям</h3>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Тактическая подготовка</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Отлично (5)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Огневая подготовка</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Зачтено</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Военная топография</span>
                <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Хорошо (4)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Общевоинские уставы ВС РФ</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Отлично (5)</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Средний академический балл:</span>
            <span className="font-bold text-slate-900 text-sm">4.8 / 5.0</span>
          </div>
        </div>

        {/* 3. Служебная карточка взвода */}
        <div className="bg-white border border-surface-border rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-military-blue" />
            <h3 className="font-bold text-sm text-navy-deep">Командный состав взвода</h3>
          </div>
          <div className="space-y-3.5 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium">Куратор / Преподаватель взвода:</span>
              <span className="font-semibold text-slate-800 text-sm block mt-0.5">Майор Ковалёв Д. С.</span>
              <span className="text-slate-500 text-[11px] mt-1 block">Кабинет 204 • Вторник / Четверг (15:00 - 17:00)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-400 block font-medium">Командир взвода:</span>
              <span className="font-semibold text-slate-800 text-sm block mt-0.5">Курсант Васильев М. И.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Безопасность и смена пароля */}
      <div className="bg-white border border-surface-border rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Key className="w-5 h-5 text-navy-deep" />
          <h3 className="font-bold text-sm text-navy-deep">Безопасность учетной записи</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Для обеспечения защиты персональных и служебных данных регулярно обновляйте пароль доступа.
        </p>

        {isPasswordChanged && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Пароль успешно обновлён и сохранён в сессии.</span>
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
