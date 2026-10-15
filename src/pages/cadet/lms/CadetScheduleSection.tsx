import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronDown, Info } from 'lucide-react';
import { scheduleService } from '../../../services/scheduleService';
import { CadetSessionRow, CadetLunchRow } from './CadetSessionRow';

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

  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(nearestDay.dayNumber);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    if (!isDatePickerOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setIsDatePickerOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDatePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDatePickerOpen]);

  // Currently inspected day
  const currentDay = allDays.find((d) => d.dayNumber === selectedDayNumber) || nearestDay;

  const isNearestDay = currentDay.dayNumber === nearestDay.dayNumber;

  const handlePrevDay = () => {
    if (currentDay.dayNumber > 1) {
      setSelectedDayNumber(currentDay.dayNumber - 1);
    }
  };

  const handleNextDay = () => {
    if (currentDay.dayNumber < allDays.length) {
      setSelectedDayNumber(currentDay.dayNumber + 1);
    }
  };

  const handleJumpToNearest = () => {
    setSelectedDayNumber(nearestDay.dayNumber);
  };

  return (
    <div className="space-y-3.5 animate-fade-in">
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
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Предыдущий учебный день"
              aria-label="Предыдущий учебный день"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Date Selector Popover */}
            <div className="relative" ref={datePickerRef}>
              <button
                type="button"
                onClick={() => setIsDatePickerOpen((prev) => !prev)}
                className="group px-3 py-2 border border-slate-200 hover:border-slate-300 rounded-lg font-semibold text-xs sm:text-sm text-navy-deep flex items-center gap-2 bg-white hover:bg-slate-50/80 shadow-xs transition-colors cursor-pointer"
                title="Выбрать учебный день за семестр"
                aria-expanded={isDatePickerOpen}
                aria-haspopup="listbox"
              >
                <Calendar className="w-4 h-4 text-military-blue shrink-0" />
                <span>{currentDay.date}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-navy-deep transition-transform duration-200 ${isDatePickerOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDatePickerOpen && (
                <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-1.5 w-72 sm:w-80 bg-white border border-surface-border rounded-xl shadow-xl z-30 p-2.5 animate-in fade-in zoom-in-95 duration-100">
                  <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100 mb-1.5 text-xs">
                    <span className="font-bold text-navy-deep">Учебные дни семестра</span>
                    <span className="text-[11px] text-content-secondary">16 дней</span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
                    {allDays.map((d) => {
                      const isSelected = d.dayNumber === currentDay.dayNumber;
                      const isNearest = d.dayNumber === nearestDay.dayNumber;
                      const isPast = (d.isoDate || '') < '2026-10-14';

                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => {
                            setSelectedDayNumber(d.dayNumber);
                            setIsDatePickerOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 text-military-blue font-bold border border-blue-200/80'
                              : 'hover:bg-slate-50 text-navy-deep border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0 ${
                              isSelected ? 'bg-military-blue text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {d.dayNumber}
                            </span>
                            <div className="flex flex-col">
                              <span className="font-semibold">{d.date}</span>
                              <span className="text-[10px] text-content-secondary">{d.dayOfWeek}</span>
                            </div>
                          </div>

                          <div>
                            {isNearest ? (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-military-blue border border-blue-200 uppercase tracking-wider">
                                Ближайший
                              </span>
                            ) : isPast ? (
                              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                Проведён
                              </span>
                            ) : (
                              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-200/50">
                                План
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleNextDay}
              disabled={currentDay.dayNumber >= allDays.length}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
