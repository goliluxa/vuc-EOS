import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react';
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
