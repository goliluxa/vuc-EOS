import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle, Clock, GraduationCap } from 'lucide-react';
import { gradeService } from '../../../services/gradeService';
import { ZachetkaRecord, GradeValue } from '../../../types/cadet';

type SemesterTab = 'all' | 1 | 2 | 3 | 4 | 5;

export const CadetZachetkaSection: React.FC = () => {
  const [records] = useState<ZachetkaRecord[]>(() => gradeService.getRecords());
  const [activeTab, setActiveTab] = useState<SemesterTab>(3); // 3 семестр по умолчанию

  const filteredRecords = records.filter((r) => {
    if (activeTab === 'all') return true;
    return r.semester === activeTab;
  });

  // Расчёт среднего балла (только по сданным диф. зачётам и экзаменам)
  const passedGrades = records.filter((r) => r.numericGrade !== undefined);
  const avgGrade = passedGrades.length > 0
    ? (passedGrades.reduce((sum, r) => sum + (r.numericGrade || 0), 0) / passedGrades.length).toFixed(1)
    : '—';

  const totalHours = records.reduce((sum, r) => sum + r.hours, 0);
  const passedCount = records.filter((r) => r.grade !== 'Не зачтено').length;

  const getGradeBadge = (grade: GradeValue) => {
    switch (grade) {
      case 'Отлично':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Отлично (5)
          </span>
        );
      case 'Хорошо':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-military-blue border border-blue-200">
            Хорошо (4)
          </span>
        );
      case 'Удовлетворительно':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            Удовл. (3)
          </span>
        );
      case 'Зачтено':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Зачтено
          </span>
        );
      case 'Не зачтено':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-500 border border-slate-200">
            Не сдавалось
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 animate-fade-in pb-12">
      {/* Сводные показатели зачётки */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white border border-surface-border rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Средний балл</span>
          </div>
          <div className="text-xl font-bold text-navy-deep">{avgGrade} <span className="text-xs text-slate-400 font-normal">/ 5.0</span></div>
        </div>

        <div className="bg-white border border-surface-border rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Сдано дисциплин</span>
          </div>
          <div className="text-xl font-bold text-navy-deep">{passedCount} <span className="text-xs text-slate-400 font-normal">из {records.length}</span></div>
        </div>

        <div className="bg-white border border-surface-border rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
            <Clock className="w-4 h-4 text-military-blue" />
            <span>Учебных часов</span>
          </div>
          <div className="text-xl font-bold text-navy-deep">{totalHours} <span className="text-xs text-slate-400 font-normal">ч</span></div>
        </div>

        <div className="bg-white border border-surface-border rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            <span>Аттестация</span>
          </div>
          <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded inline-block mt-0.5">
            Допущен к сессии
          </div>
        </div>
      </div>

      {/* Табы выбора семестров */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {([
          { id: 1, label: '1 семестр' },
          { id: 2, label: '2 семестр' },
          { id: 3, label: '3 семестр (Текущий)' },
          { id: 4, label: '4 семестр' },
          { id: 5, label: 'Сборы и ИГА' },
          { id: 'all', label: 'Все семестры' },
        ] as const).map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-military-blue text-white border-military-blue shadow-2xs'
                  : 'bg-white text-content-secondary border-surface-border hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Академическая ведомость / Таблица дисциплин */}
      <div className="bg-white border border-surface-border rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-military-blue" />
            <h2 className="text-sm sm:text-base font-bold text-navy-deep">
              {activeTab === 'all'
                ? 'Сводная зачётная ведомость за весь период обучения'
                : activeTab === 5
                ? 'Учебные сборы и Государственная аттестация'
                : `Ведомость промежуточной аттестации (${activeTab} семестр)`}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Дисциплин: {filteredRecords.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-surface-border text-slate-500 uppercase text-[11px] font-semibold tracking-wider">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Наименование дисциплины</th>
                <th className="px-4 py-3">Семестр</th>
                <th className="px-4 py-3">Форма контроля</th>
                <th className="px-4 py-3">Часы</th>
                <th className="px-4 py-3">Оценка / Результат</th>
                <th className="px-4 py-3">Дата сдачи</th>
                <th className="px-4 py-3">Преподаватель</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border bg-white">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                    В выбранном семестре дисциплины не найдены
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r, idx) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">{idx + 1}</td>
                    <td className="px-4 py-3 font-semibold text-navy-deep">{r.subject}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {r.semester === 5 ? 'Сборы' : `${r.semester} сем.`}
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-medium">{r.controlKind}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{r.hours} ч</td>
                    <td className="px-4 py-3">{getGradeBadge(r.grade)}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{r.passedDate}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{r.instructor}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
