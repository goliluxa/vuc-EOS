import React from 'react';
import { MapPin, User, Coffee } from 'lucide-react';
import { ScheduleSession } from '../../../types/cadet';

interface CadetSessionRowProps {
  session: ScheduleSession;
}

const getSessionTypeBadgeClass = (type: ScheduleSession['type']) => {
  switch (type) {
    case 'Лекция':
      return 'bg-blue-50 text-blue-700 border-blue-200/80';
    case 'Практическое занятие':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    case 'Самоподготовка':
      return 'bg-purple-50 text-purple-700 border-purple-200/80';
    case 'Тренировка':
      return 'bg-amber-50 text-amber-800 border-amber-200/80';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const CadetSessionRow: React.FC<CadetSessionRowProps> = ({ session }) => {
  const isInspection = session.sessionNumber === 0;

  return (
    <>
      <div
        className={`px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col md:flex-row md:items-start gap-3 md:gap-6 transition-colors border-b border-surface-border last:border-b-0 ${
          isInspection ? 'bg-slate-50/50' : 'hover:bg-slate-50/60'
        }`}
      >
        {/* Column 1: Time & Session Index */}
        <div className="md:w-36 shrink-0 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-1">
          <span className="font-mono text-sm sm:text-base font-bold text-navy-deep tracking-tight">
            {session.time}
          </span>
          <span className="text-[11px] font-semibold tracking-wide text-content-secondary bg-slate-100 border border-slate-200/70 px-2 py-0.5 rounded">
            {isInspection ? 'Построение' : `${session.sessionNumber}-я пара`}
          </span>
        </div>

        {/* Column 2: Subject, Type Badge & Topic */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4 className="text-sm sm:text-base font-bold text-navy-deep leading-snug">
              {session.subject}
            </h4>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded border ${getSessionTypeBadgeClass(
                session.type
              )}`}
            >
              {session.type}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {session.topic}
          </p>
        </div>

        {/* Column 3: Location & Instructor (Grouped metadata) */}
        <div className="shrink-0 md:w-60 flex flex-col justify-center gap-1.5 pt-2 md:pt-0 border-t border-slate-100 md:border-t-0 text-xs">
          <div className="flex items-center gap-2 text-slate-800 font-medium">
            <div className="w-5 h-5 rounded bg-blue-50 text-military-blue flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="truncate">{session.classroom}</span>
          </div>

          <div className="flex items-center gap-2 text-content-secondary">
            <div className="w-5 h-5 rounded bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="truncate text-slate-600">{session.instructor}</span>
          </div>
        </div>
      </div>

      {/* Lunch Break Intermission between 2nd pair and 3rd pair */}
      {session.sessionNumber === 2 && (
        <div className="py-2.5 px-4 sm:px-6 bg-amber-50/50 border-y border-amber-200/60 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-amber-950">
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
              <Coffee className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold">Обеденный перерыв</span>
            <span className="text-amber-800/80 text-xs sm:text-sm hidden sm:inline">• 55 минут</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-amber-800/80 text-xs hidden md:inline">Столовая ВУЦ</span>
            <span className="font-mono text-xs sm:text-sm font-bold text-amber-900 bg-white/80 border border-amber-200/80 px-2.5 py-0.5 rounded">
              12:20 — 13:15
            </span>
          </div>
        </div>
      )}
    </>
  );
};
