import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { scheduleService, SEMESTER_MONTHS, MonthOption } from '../../../services/scheduleService';
import { CadetSessionRow, CadetLunchRow } from './CadetSessionRow';

interface CadetScheduleSectionProps {
  initialPlatoon?: string;
}

const renderDayCardBadge = (
  isNearest: boolean,
  isPast: boolean,
  isSelected: boolean,
  isCompact: boolean
) => {
  if (isNearest) {
    return (
      <span
        className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 whitespace-nowrap ${
          isSelected
            ? 'bg-blue-100 text-military-blue border border-blue-300'
            : 'bg-blue-50 text-military-blue border border-blue-200'
        }`}
      >
        {isCompact ? 'Ближ.' : 'Ближайший'}
      </span>
    );
  }

  if (isPast) {
    return (
      <span
        className={`text-[9px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap ${
          isSelected
            ? 'bg-white text-slate-700 border border-slate-200'
            : 'bg-slate-100 text-slate-600'
        }`}
      >
        {isCompact ? 'Пров.' : 'Проведён'}
      </span>
    );
  }

  return (
    <span
      className={`text-[9px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap ${
        isSelected
          ? 'bg-white text-slate-500 border border-slate-200'
          : 'bg-slate-50 text-slate-500 border border-slate-200/50'
      }`}
    >
      План
    </span>
  );
};

export const CadetScheduleSection: React.FC<CadetScheduleSectionProps> = ({
  initialPlatoon = 'Взвод 141 (Связь)',
}) => {
  const platoon = initialPlatoon;

  // All 16 semester days for the cadet's platoon
  const allDays = scheduleService.getSemesterSchedule(platoon);
  const nearestDay = scheduleService.getNearestUpcomingDay(allDays);

  const [selectedMonth, setSelectedMonth] = useState<MonthOption['key']>(
    (nearestDay.monthKey as MonthOption['key']) || 'oct'
  );
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(nearestDay.dayNumber);

  // Filter visible days according to the selected month tab
  const visibleDays =
    selectedMonth === 'all'
      ? allDays
      : allDays.filter((d) => d.monthKey === selectedMonth);

  // Currently inspected day
  const currentDay = allDays.find((d) => d.dayNumber === selectedDayNumber) || nearestDay;

  const isNearestDay = currentDay.dayNumber === nearestDay.dayNumber;

  const handleSelectMonth = (monthKey: MonthOption['key']) => {
    setSelectedMonth(monthKey);
    if (monthKey !== 'all') {
      const monthDays = allDays.filter((d) => d.monthKey === monthKey);
      if (!monthDays.some((d) => d.dayNumber === selectedDayNumber) && monthDays.length > 0) {
        setSelectedDayNumber(monthDays[0].dayNumber);
      }
    }
  };

  const handlePrevDay = () => {
    if (currentDay.dayNumber > 1) {
      const prevNum = currentDay.dayNumber - 1;
      setSelectedDayNumber(prevNum);
      const prevDayObj = allDays.find((d) => d.dayNumber === prevNum);
      if (prevDayObj && prevDayObj.monthKey && selectedMonth !== 'all') {
        setSelectedMonth(prevDayObj.monthKey as MonthOption['key']);
      }
    }
  };

  const handleNextDay = () => {
    if (currentDay.dayNumber < allDays.length) {
      const nextNum = currentDay.dayNumber + 1;
      setSelectedDayNumber(nextNum);
      const nextDayObj = allDays.find((d) => d.dayNumber === nextNum);
      if (nextDayObj && nextDayObj.monthKey && selectedMonth !== 'all') {
        setSelectedMonth(nextDayObj.monthKey as MonthOption['key']);
      }
    }
  };

  const handleJumpToNearest = () => {
    setSelectedDayNumber(nearestDay.dayNumber);
    if (nearestDay.monthKey && selectedMonth !== 'all') {
      setSelectedMonth(nearestDay.monthKey as MonthOption['key']);
    }
  };

  return (
    <div className="space-y-3.5 animate-fade-in">
      {/* Top Period Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white border border-surface-border px-3.5 py-2 rounded-lg shadow-xs">
        {/* Month & Semester Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-navy-deep mr-2 shrink-0">
            <Calendar className="w-4 h-4 text-military-blue" />
            <span>Период:</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
            {SEMESTER_MONTHS.map((m) => {
              const isActive = selectedMonth === m.key;
              const isOct = m.key === 'oct';
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => handleSelectMonth(m.key)}
                  className={`px-3 py-1.5 text-xs sm:text-sm rounded-md transition-all shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-navy-deep shadow-xs font-semibold border border-slate-200/80'
                      : 'text-content-secondary hover:text-navy-deep hover:bg-white/50 font-medium'
                  }`}
                  title={m.fullName}
                >
                  <span>{m.label}</span>
                  {isOct && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        isActive
                          ? 'bg-blue-50 text-military-blue border border-blue-200/60'
                          : 'bg-slate-200/70 text-slate-600'
                      }`}
                    >
                      тек.
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Days Grid */}
      {(() => {
        const isCompact = visibleDays.length > 4;
        return (
          <div
            className={`grid gap-2 sm:gap-2.5 ${
              visibleDays.length > 8
                ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8'
                : visibleDays.length > 4
                ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
                : 'grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {visibleDays.map((d) => {
              const isSelected = d.dayNumber === selectedDayNumber;
              const isNearest = d.dayNumber === nearestDay.dayNumber;
              const isPast = (d.isoDate || '') < '2026-10-14';

              const shortDate = isCompact
                ? d.date
                    .replace(' 2026', '')
                    .replace('сентября', 'сен')
                    .replace('октября', 'окт')
                    .replace('ноября', 'ноя')
                    .replace('декабря', 'дек')
                : d.date.replace(' 2026', '');

              const shortDayOfWeek = isCompact
                ? d.dayOfWeek === 'Суббота'
                  ? 'Сб'
                  : 'Пн'
                : d.dayOfWeek;

              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDayNumber(d.dayNumber)}
                  className={`rounded-lg border text-left transition-all ${
                    isCompact ? 'p-2 sm:p-2.5' : 'p-3 sm:p-3.5'
                  } ${
                    isSelected
                      ? 'bg-blue-50/80 border-military-blue ring-2 ring-military-blue/20 text-navy-deep shadow-xs'
                      : isNearest
                      ? 'bg-white border-blue-200 text-navy-deep hover:bg-blue-50/40 shadow-xs'
                      : 'bg-white border-surface-border text-navy-deep hover:bg-slate-50 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span
                      className={`text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap shrink-0 ${
                        isSelected ? 'text-military-blue' : 'text-navy-deep'
                      }`}
                    >
                      День&nbsp;{d.dayNumber}
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs font-medium whitespace-nowrap shrink-0 ${
                        isSelected ? 'text-military-blue/80' : 'text-content-secondary'
                      }`}
                    >
                      {shortDayOfWeek}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-xs sm:text-sm font-semibold whitespace-nowrap truncate ${
                        isSelected ? 'text-navy-deep' : 'text-slate-700'
                      }`}
                    >
                      {shortDate}
                    </span>

                    {renderDayCardBadge(isNearest, isPast, isSelected, isCompact)}
                  </div>
                </button>
              );
            })}
          </div>
        );
      })()}

      {/* Daily Schedule Timeline Card (matching reference) */}
      <div className="bg-white border border-surface-border rounded-2xl shadow-card p-5 sm:p-7 space-y-4">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          {/* Left: Day Title and Platoon Breadcrumb */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-navy-deep tracking-tight">
              {currentDay.dayOfWeek}, {currentDay.date}
            </h2>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mt-1">
              <span>{platoon.split(' ')[0]} {platoon.split(' ')[1]}</span>
              <span className="text-slate-300">/</span>
              <span>{platoon.includes('Связь') ? 'Связь' : 'ВУЦ'}</span>
              <span className="text-slate-300">/</span>
              <span className="text-military-blue font-semibold">
                День {currentDay.dayNumber} из 16
              </span>
              <Info className="w-3.5 h-3.5 text-military-blue inline shrink-0" />
            </div>
          </div>

          {/* Right: Date Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={handlePrevDay}
              disabled={currentDay.dayNumber <= 1}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Предыдущий учебный день"
              aria-label="Предыдущий учебный день"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="px-3 py-2 border border-slate-200 rounded-lg font-semibold text-xs sm:text-sm text-navy-deep flex items-center gap-2 bg-white shadow-xs">
              <Calendar className="w-4 h-4 text-military-blue" />
              <span>{currentDay.date}</span>
            </div>

            <button
              type="button"
              onClick={handleNextDay}
              disabled={currentDay.dayNumber >= allDays.length}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Следующий учебный день"
              aria-label="Следующий учебный день"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleJumpToNearest}
              className="px-3.5 py-2 bg-blue-50 text-military-blue font-semibold text-xs sm:text-sm rounded-lg hover:bg-blue-100 transition-colors border border-blue-200/60 shadow-xs"
              title="Перейти к ближайшему дню"
            >
              Сегодня
            </button>
          </div>
        </div>

        {/* Vertical Timeline Sessions */}
        <div>
          {currentDay.sessions.map((sess, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === currentDay.sessions.length - 1;
            // On nearestDay (Day 7), pair 2 (10:45 - 12:20) is marked as "Сейчас"
            const isCurrentSession = isNearestDay && sess.sessionNumber === 2;

            return (
              <React.Fragment key={sess.id}>
                <CadetSessionRow
                  session={sess}
                  isCurrentSession={isCurrentSession}
                  isFirst={isFirst}
                  isLast={isLast}
                />
                {/* Lunch Break between 2nd and 3rd pair */}
                {sess.sessionNumber === 2 && <CadetLunchRow />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
