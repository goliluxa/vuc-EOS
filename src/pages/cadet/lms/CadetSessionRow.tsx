import React from 'react';
import { MapPin, User, Coffee } from 'lucide-react';
import { ScheduleSession } from '../../../types/cadet';

interface CadetSessionRowProps {
  session: ScheduleSession;
}

const getSessionTypeBadgeClass = (type: string) => {
  switch (type) {
    case 'Лекция':
      return 'bg-blue-50 text-military-blue border-blue-200/60';
    case 'Практическое занятие':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200/60';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200/60';
  }
};

export const CadetSessionRow: React.FC<CadetSessionRowProps> = ({ session }) => {
  const isInspection = session.sessionNumber === 0;

  return (
    <>
      <div
        className={`px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-5 transition-colors ${
          isInspection ? 'bg-slate-50/40' : 'hover:bg-slate-50/50'
        }`}
      >
        {/* Left: Time & Session Name */}
        <div className="sm:w-36 shrink-0 flex sm:flex-col items-baseline sm:items-start justify-between sm:justify-start gap-0.5">
          <span className="font-mono text-sm sm:text-base font-bold text-navy-deep tracking-tight">
            {session.time}
          </span>
          <span className="text-xs font-medium text-content-secondary">
            {isInspection ? 'Построение' : `${session.sessionNumber}-я пара`}
          </span>
        </div>

        {/* Right: Subject, Type, Classroom, Topic, Instructor */}
        <div className="flex-1 min-w-0 space-y-1">
          {/* Top Row: Subject + Type + Classroom */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm sm:text-base font-bold text-navy-deep">
                {session.subject}
              </h4>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-md border ${getSessionTypeBadgeClass(
                  session.type
                )}`}
              >
                {session.type}
              </span>
            </div>

            {/* Classroom */}
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
              <MapPin className="w-3.5 h-3.5 text-military-blue" />
              <span>{session.classroom}</span>
            </div>
          </div>

          {/* Bottom Row: Topic & Instructor */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-600">
            <p className="line-clamp-1 leading-snug text-slate-700">
              {session.topic}
            </p>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-content-secondary shrink-0">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{session.instructor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lunch Break banner between pair 2 (ends 12:20) and pair 3 (starts 13:15) */}
      {session.sessionNumber === 2 && (
        <div className="py-2 px-4 sm:px-6 bg-amber-50/60 border-y border-amber-200/60 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-amber-700" />
            <span className="font-semibold text-amber-950">Обеденный перерыв</span>
            <span className="text-amber-800/80">• 55 минут</span>
          </div>
          <span className="font-mono text-xs sm:text-sm font-semibold text-amber-900">
            12:20 – 13:15
          </span>
        </div>
      )}
    </>
  );
};
