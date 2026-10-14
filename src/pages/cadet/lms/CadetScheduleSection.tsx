import React, { useState } from 'react';
import { Clock, MapPin, User, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import { scheduleService, SEMESTER_MONTHS, MonthOption } from '../../../services/scheduleService';

interface CadetScheduleSectionProps {
  initialPlatoon?: string;
}

export const CadetScheduleSection: React.FC<CadetScheduleSectionProps> = ({
  initialPlatoon = 'Взвод 141 (Связь)',
}) => {
  const [selectedPlatoon, setSelectedPlatoon] = useState(initialPlatoon);

  // All 16 semester days for the selected platoon
  const allDays = scheduleService.getSemesterSchedule(selectedPlatoon);
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

  const isMonday = !selectedPlatoon.includes('142');
  const isNearestDay = currentDay.dayNumber === nearestDay.dayNumber;
  const isCurrentDayPast = (currentDay.isoDate || '') < '2026-10-14';

  const handlePlatoonChange = (platoon: string) => {
    setSelectedPlatoon(platoon);
    const newDays = scheduleService.getSemesterSchedule(platoon);
    const newNearest = scheduleService.getNearestUpcomingDay(newDays);
    setSelectedDayNumber(newNearest.dayNumber);
    setSelectedMonth((newNearest.monthKey as MonthOption['key']) || 'oct');
  };

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
    <div className="space-y-4 animate-fade-in">
      {/* Top Controls: Platoon Toggle and Month / Semester Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white border border-surface-border p-3 rounded-lg shadow-xs">
        {/* Month & Semester Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <div className="flex items-center gap-1 text-xs font-semibold text-navy-deep mr-2 shrink-0">
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
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors shrink-0 ${
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

        {/* Right: Platoon Switcher and Jump to Nearest Button */}
        <div className="flex items-center gap-2 shrink-0 self-start lg:self-auto">
          {selectedDayNumber !== nearestDay.dayNumber && (
            <button
              type="button"
              onClick={handleJumpToNearest}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-military-blue bg-blue-50 hover:bg-blue-100 rounded-md border border-blue-200 transition-colors"
              title="Перейти к ближайшему будущему дню занятий"
            >
              <Sparkles className="w-3 h-3 text-military-blue" />
              <span>К ближайшему</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-50 border border-surface-border p-0.5 rounded-md">
            <button
              type="button"
              onClick={() => handlePlatoonChange('Взвод 141 (Связь)')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                isMonday
                  ? 'bg-military-blue text-white shadow-xs'
                  : 'text-content-secondary hover:text-navy-deep'
              }`}
            >
              Взвод 141 (Пн)
            </button>
            <button
              type="button"
              onClick={() => handlePlatoonChange('Взвод 142 (Командный)')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                !isMonday
                  ? 'bg-military-blue text-white shadow-xs'
                  : 'text-content-secondary hover:text-navy-deep'
              }`}
            >
              Взвод 142 (Сб)
            </button>
          </div>
        </div>
      </div>

      {/* Days Grid: 4 days of month OR all 16 days of semester */}
      <div>
        <div className="flex items-center justify-between text-xs text-content-secondary mb-2 px-1">
          <span>
            Показано дней: <strong className="text-navy-deep font-semibold">{visibleDays.length}</strong>
            {selectedMonth === 'all' ? ' (весь осенний семестр 2026)' : ` (${SEMESTER_MONTHS.find((m) => m.key === selectedMonth)?.fullName})`}
          </span>
          <span className="text-[11px]">
            Ближайшее занятие: <strong className="text-military-blue font-semibold">{nearestDay.date}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {visibleDays.map((d) => {
            const isSelected = d.dayNumber === selectedDayNumber;
            const isNearest = d.dayNumber === nearestDay.dayNumber;
            const isPast = (d.isoDate || '') < '2026-10-14';

            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDayNumber(d.dayNumber)}
                className={`p-3 rounded-lg border text-left transition-all relative ${
                  isSelected
                    ? 'bg-white border-military-blue shadow-card ring-2 ring-military-blue/20'
                    : isNearest
                    ? 'bg-blue-50/40 border-blue-300 hover:border-military-blue hover:bg-white'
                    : 'bg-white/80 border-surface-border hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-military-red">
                    День {d.dayNumber}
                  </span>
                  <span className="text-xs font-medium text-content-secondary">
                    {d.dayOfWeek}
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-bold text-navy-deep">
                  {d.date}
                </div>

                <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-surface-border/50 text-[11px]">
                  <span className="text-content-secondary">
                    {d.sessions.length} пар
                  </span>

                  {isNearest ? (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-military-blue border border-blue-200">
                      Ближайший
                    </span>
                  ) : isPast ? (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-500 bg-slate-100">
                      Проведён
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-400 bg-slate-50">
                      План
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Schedule Detailed Table */}
      <div className="bg-white border border-surface-border rounded-lg shadow-card overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 bg-surface-bg/60 border-b border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-navy-deep">
              Распорядок {currentDay.dayNumber}-го учебного дня ({currentDay.date}, {currentDay.dayOfWeek})
            </h3>
            <span className="text-xs text-content-secondary">
              Учебная группа: {selectedPlatoon} • {currentDay.monthName}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {isNearestDay ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-military-blue border border-blue-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ближайший учебный день</span>
              </span>
            ) : isCurrentDayPast ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Учебный день проведён</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200">
                <span>Запланировано по учебному плану</span>
              </span>
            )}
          </div>
        </div>

        <div className="divide-y divide-surface-border">
          {currentDay.sessions.map((sess) => {
            const isInspection = sess.sessionNumber === 0;
            return (
              <div
                key={sess.id}
                className={`p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3.5 transition-colors ${
                  isInspection ? 'bg-slate-50/50' : 'hover:bg-slate-50/40'
                }`}
              >
                {/* Left: Time and Pair */}
                <div className="flex items-start gap-3 md:w-52 shrink-0">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                      isInspection
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-blue-50 text-military-blue'
                    }`}
                  >
                    {isInspection ? '★' : `${sess.sessionNumber}`}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-navy-deep">
                      <Clock className="w-3.5 h-3.5 text-content-secondary" />
                      <span>{sess.time}</span>
                    </div>
                    <span className="text-[11px] text-content-secondary">
                      {isInspection ? 'Построение' : `${sess.sessionNumber} пара`}
                    </span>
                  </div>
                </div>

                {/* Center: Subject and Topic */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold text-navy-deep">
                      {sess.subject}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        sess.type === 'Лекция'
                          ? 'bg-blue-50 text-military-blue border-blue-200'
                          : sess.type === 'Практическое занятие'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {sess.type}
                    </span>
                  </div>
                  <p className="text-xs text-content-secondary leading-relaxed">
                    {sess.topic}
                  </p>
                </div>

                {/* Right: Classroom and Instructor */}
                <div className="flex flex-col sm:flex-row md:flex-col md:items-end gap-1 text-xs text-content-secondary shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-surface-border/50">
                  <div className="flex items-center gap-1.5 font-medium text-navy-deep">
                    <MapPin className="w-3.5 h-3.5 text-military-red" />
                    <span>{sess.classroom}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-content-secondary/70" />
                    <span>{sess.instructor}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
