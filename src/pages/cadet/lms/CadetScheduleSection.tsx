import React, { useState } from 'react';
import { CheckCircle2, Calendar, Sparkles, Clock } from 'lucide-react';
import { scheduleService, SEMESTER_MONTHS, MonthOption } from '../../../services/scheduleService';
import { CadetSessionRow } from './CadetSessionRow';

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
            ? 'bg-blue-500/25 text-blue-200 border border-blue-400/30'
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
            ? 'bg-white/20 text-white/90'
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
          ? 'bg-white/15 text-white/80'
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
  const isCurrentDayPast = (currentDay.isoDate || '') < '2026-10-14';

  const handleSelectMonth = (monthKey: MonthOption['key']) => {
    setSelectedMonth(monthKey);
    if (monthKey !== 'all') {
      const monthDays = allDays.filter((d) => d.monthKey === monthKey);
      if (!monthDays.some((d) => d.dayNumber === selectedDayNumber) && monthDays.length > 0) {
        setSelectedDayNumber(monthDays[0].dayNumber);
      }
    }
  };

  const handleJumpToNearest = () => {
    setSelectedDayNumber(nearestDay.dayNumber);
    setSelectedMonth((nearestDay.monthKey as MonthOption['key']) || 'oct');
  };

  return (
    <div className="space-y-3.5 animate-fade-in">
      {/* Top Period Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white border border-surface-border px-3.5 py-2.5 rounded-lg shadow-xs">
        {/* Month & Semester Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-navy-deep mr-2 shrink-0">
            <Calendar className="w-4 h-4 text-military-blue" />
            <span>Период:</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-100/80 p-0.5 rounded-lg">
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
                      ? 'bg-navy-deep text-white shadow-xs font-semibold'
                      : 'text-content-secondary hover:text-navy-deep hover:bg-white/60 font-medium'
                  }`}
                  title={m.fullName}
                >
                  <span>{m.label}</span>
                  {isOct && (
                    <span
                      className={`text-[10px] px-1 py-0.2 rounded font-semibold ${
                        isActive
                          ? 'bg-blue-500/30 text-blue-200'
                          : 'bg-blue-100 text-military-blue'
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

        {/* Right: Jump to Nearest Button */}
        {selectedDayNumber !== nearestDay.dayNumber && (
          <button
            type="button"
            onClick={handleJumpToNearest}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-military-blue bg-blue-50 hover:bg-blue-100 rounded-md border border-blue-200 transition-colors shrink-0 self-start sm:self-auto"
            title="Перейти к ближайшему будущему дню занятий"
          >
            <Sparkles className="w-3.5 h-3.5 text-military-blue" />
            <span>К ближайшему дню</span>
          </button>
        )}
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
                      ? 'bg-navy-deep text-white border-navy-deep shadow-sm ring-1 ring-navy-deep'
                      : isNearest
                      ? 'bg-blue-50/60 border-blue-300 text-navy-deep hover:bg-blue-100/60 shadow-xs'
                      : 'bg-white border-surface-border text-navy-deep hover:bg-slate-50 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span
                      className={`text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap shrink-0 ${
                        isSelected ? 'text-white' : 'text-navy-deep'
                      }`}
                    >
                      День&nbsp;{d.dayNumber}
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs font-medium whitespace-nowrap shrink-0 ${
                        isSelected ? 'text-blue-200' : 'text-content-secondary'
                      }`}
                    >
                      {shortDayOfWeek}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-xs sm:text-sm font-semibold whitespace-nowrap truncate ${
                        isSelected ? 'text-white/95' : 'text-slate-700'
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

      {/* Daily Schedule Detailed Table */}
      <div className="bg-white border border-surface-border rounded-lg shadow-card overflow-hidden">
        {/* Day Card Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-slate-50/80 border-b border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white border border-surface-border shadow-xs flex items-center justify-center text-military-blue shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-navy-deep">
                  {currentDay.date}, {currentDay.dayOfWeek}
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-military-blue border border-blue-200/80">
                  День {currentDay.dayNumber} из 16
                </span>
              </div>
              <p className="text-xs text-content-secondary mt-0.5">
                {platoon} • 5 занятий и мероприятий
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            {isNearestDay ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-blue-50 text-military-blue border border-blue-200 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ближайший учебный день</span>
              </span>
            ) : isCurrentDayPast ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>День проведён</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Запланировано</span>
              </span>
            )}
          </div>
        </div>

        {/* Sessions Timetable */}
        <div className="divide-y divide-surface-border">
          {currentDay.sessions.map((sess) => (
            <CadetSessionRow key={sess.id} session={sess} />
          ))}
        </div>
      </div>
    </div>
  );
};
