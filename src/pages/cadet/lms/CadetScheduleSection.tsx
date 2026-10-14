import React, { useState } from 'react';
import { MapPin, User, CheckCircle2, Calendar, Sparkles, Coffee } from 'lucide-react';
import { scheduleService, SEMESTER_MONTHS, MonthOption } from '../../../services/scheduleService';

interface CadetScheduleSectionProps {
  initialPlatoon?: string;
}

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
    <div className="space-y-2.5 animate-fade-in">
      {/* Top Controls: Month / Semester Selector and Jump to Nearest */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white border border-surface-border px-3 py-1.5 rounded-lg shadow-xs">
        {/* Month & Semester Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0">
          <div className="flex items-center gap-1 text-xs font-semibold text-navy-deep mr-1.5 shrink-0">
            <Calendar className="w-3.5 h-3.5 text-military-blue" />
            <span>Период:</span>
          </div>

          {SEMESTER_MONTHS.map((m) => {
            const isActive = selectedMonth === m.key;
            const isOct = m.key === 'oct';
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => handleSelectMonth(m.key)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors shrink-0 ${
                  isActive
                    ? 'bg-military-blue text-white shadow-xs font-semibold'
                    : 'text-content-secondary hover:text-navy-deep hover:bg-slate-100'
                }`}
                title={m.fullName}
              >
                <span>{m.label}</span>
                {isOct && (
                  <span className={`ml-1 text-[10px] px-1 py-0.2 rounded ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-military-blue font-semibold'
                  }`}>
                    тек.
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Jump to Nearest Button */}
        {selectedDayNumber !== nearestDay.dayNumber && (
          <button
            type="button"
            onClick={handleJumpToNearest}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-military-blue bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors shrink-0 self-start sm:self-auto"
            title="Перейти к ближайшему будущему дню занятий"
          >
            <Sparkles className="w-3 h-3 text-military-blue" />
            <span>К ближайшему</span>
          </button>
        )}
      </div>

      {/* Days Strip */}
      <div
        className={`grid gap-2 ${
          visibleDays.length > 8
            ? 'grid-cols-4 sm:grid-cols-8'
            : visibleDays.length > 4
            ? 'grid-cols-4 sm:grid-cols-6'
            : 'grid-cols-2 sm:grid-cols-4'
        }`}
      >
        {visibleDays.map((d) => {
          const isSelected = d.dayNumber === selectedDayNumber;
          const isNearest = d.dayNumber === nearestDay.dayNumber;
          const isPast = (d.isoDate || '') < '2026-10-14';

          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setSelectedDayNumber(d.dayNumber)}
              className={`px-3 py-1.5 rounded-md border text-left flex items-center justify-between gap-1.5 transition-all ${
                isSelected
                  ? 'bg-military-blue text-white border-military-blue shadow-xs font-semibold'
                  : isNearest
                  ? 'bg-blue-50/80 border-blue-300 text-navy-deep hover:bg-blue-100/60'
                  : 'bg-white border-surface-border text-navy-deep hover:bg-slate-50'
              }`}
            >
              <div className="flex items-baseline gap-1.5 min-w-0">
                <span className={`text-xs font-bold shrink-0 ${isSelected ? 'text-white' : 'text-navy-deep'}`}>
                  День {d.dayNumber}
                </span>
                <span className={`text-[11px] truncate ${isSelected ? 'text-white/85' : 'text-content-secondary'}`}>
                  {d.date.replace(' 2026', '')}
                </span>
              </div>

              {isNearest ? (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-military-blue'
                  }`}
                >
                  Ближайший
                </span>
              ) : isPast ? (
                <span
                  className={`text-[9px] px-1 py-0.2 rounded shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  Проведён
                </span>
              ) : (
                <span
                  className={`text-[9px] px-1 py-0.2 rounded shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-400'
                  }`}
                >
                  План
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Daily Schedule Detailed Table */}
      <div className="bg-white border border-surface-border rounded-lg shadow-card overflow-hidden">
        {/* Header */}
        <div className="px-4 py-2 bg-slate-50/70 border-b border-surface-border flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-navy-deep">
              {currentDay.date}, {currentDay.dayOfWeek}
            </h3>
            <span className="text-[11px] font-semibold px-1.5 py-0.2 rounded bg-white border border-surface-border text-military-blue">
              День {currentDay.dayNumber}
            </span>
            <span className="text-[11px] text-content-secondary hidden sm:inline">
              • {platoon}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {isNearestDay ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-military-blue border border-blue-200">
                <Sparkles className="w-3 h-3" />
                <span>Ближайший учебный день</span>
              </span>
            ) : isCurrentDayPast ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>День проведён</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200">
                <span>Запланировано</span>
              </span>
            )}
          </div>
        </div>

        {/* Sessions Timetable */}
        <div className="divide-y divide-surface-border">
          {currentDay.sessions.map((sess) => {
            const isInspection = sess.sessionNumber === 0;

            return (
              <React.Fragment key={sess.id}>
                <div
                  className={`px-4 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 transition-colors ${
                    isInspection ? 'bg-slate-50/40' : 'hover:bg-slate-50/50'
                  }`}
                >
                  {/* Left: Time & Session Name */}
                  <div className="sm:w-28 shrink-0 flex sm:flex-col items-baseline sm:items-start justify-between sm:justify-start">
                    <span className="font-mono text-xs sm:text-sm font-bold text-navy-deep tracking-tight">
                      {sess.time}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-medium text-content-secondary">
                      {isInspection ? 'Построение' : `${sess.sessionNumber}-я пара`}
                    </span>
                  </div>

                  {/* Right: Subject, Type, Classroom, Topic, Instructor */}
                  <div className="flex-1 min-w-0">
                    {/* Line 1: Subject + Type + Classroom */}
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-xs sm:text-sm font-bold text-navy-deep">
                          {sess.subject}
                        </h4>
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.2 rounded ${
                            sess.type === 'Лекция'
                              ? 'bg-blue-50 text-military-blue border border-blue-200/60'
                              : sess.type === 'Практическое занятие'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                              : 'bg-slate-100 text-slate-700 border border-slate-200/60'
                          }`}
                        >
                          {sess.type}
                        </span>
                      </div>

                      {/* Classroom */}
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        <MapPin className="w-3 h-3 text-military-blue" />
                        <span>{sess.classroom}</span>
                      </div>
                    </div>

                    {/* Line 2: Topic & Instructor */}
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-xs text-slate-600 mt-0.5">
                      <p className="line-clamp-1 leading-normal">
                        {sess.topic}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-content-secondary shrink-0">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>{sess.instructor}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lunch Break banner between pair 2 (ends 12:20) and pair 3 (starts 13:15) */}
                {sess.sessionNumber === 2 && (
                  <div className="py-1 px-4 sm:px-5 bg-amber-50/50 border-y border-amber-200/50 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Coffee className="w-3 h-3 text-amber-700" />
                      <span className="font-semibold text-amber-950">Обеденный перерыв</span>
                      <span className="text-amber-800/80">• 55 минут</span>
                    </div>
                    <span className="font-mono text-[11px] font-medium text-amber-900">12:20 – 13:15</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
