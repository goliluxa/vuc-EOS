import React from 'react';
import { MapPin, User, Utensils } from 'lucide-react';
import { ScheduleSession } from '../../../types/cadet';

interface CadetSessionRowProps {
  session: ScheduleSession;
  isFirst?: boolean;
  isLast?: boolean;
}

export const CadetSessionRow: React.FC<CadetSessionRowProps> = ({
  session,
  isFirst = false,
  isLast = false,
}) => {
  const isInspection = session.sessionNumber === 0;

  return (
    <div className="flex items-start gap-3 sm:gap-6 py-4 sm:py-5 border-b border-slate-100 last:border-b-0 group">
      {/* 1. Left Column: Time & Duration */}
      <div className="w-28 sm:w-36 shrink-0 text-left">
        <div className="font-mono text-sm sm:text-base font-bold tracking-tight text-navy-deep">
          {session.time}
        </div>
        <div className="text-xs text-slate-500 font-medium mt-0.5">
          {isInspection ? '20 минут' : `${session.sessionNumber}-я пара  •  1 ч 35 мин`}
        </div>
      </div>

      {/* 2. Timeline Track: Vertical connector & Dot */}
      <div className="relative self-stretch flex flex-col items-center justify-start w-6 shrink-0">
        {/* Connector line above dot */}
        {!isFirst && (
          <div className="w-0.5 absolute top-0 h-4.5 bg-slate-200" />
        )}
        {/* Connector line below dot */}
        {!isLast && (
          <div className="w-0.5 absolute top-4.5 bottom-0 bg-slate-200" />
        )}
        {/* Dot bullet */}
        <div className="relative z-10 mt-2">
          {isInspection ? (
            <span className="block w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
          ) : (
            <span className="block w-2.5 h-2.5 rounded-full bg-military-blue ring-4 ring-white" />
          )}
        </div>
      </div>

      {/* 3. Middle & Right: Subject, Topic & Location/Instructor */}
      <div className="flex-1 min-w-0 flex flex-col lg:flex-row lg:items-start justify-between gap-3 lg:gap-6">
        {/* Middle: Subject & Topic */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm sm:text-base font-bold text-navy-deep leading-snug mb-1">
            {session.subject}
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 leading-normal font-normal">
            {session.topic}
          </p>
        </div>

        {/* Right: Location & Instructor */}
        <div className="lg:w-60 shrink-0 flex flex-col justify-center gap-1.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-medium text-slate-800">
            <MapPin className="w-4 h-4 text-military-blue shrink-0" />
            <span className="truncate">{session.classroom}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <User className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{session.instructor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CadetLunchRow: React.FC = () => {
  return (
    <div className="flex items-start gap-3 sm:gap-6 py-4 sm:py-5 border-b border-slate-100">
      {/* 1. Left: Time & Duration */}
      <div className="w-28 sm:w-36 shrink-0 text-left">
        <div className="font-mono text-sm sm:text-base font-bold text-navy-deep tracking-tight">
          12:20 — 13:15
        </div>
        <div className="text-xs text-slate-500 font-medium mt-0.5">
          55 минут
        </div>
      </div>

      {/* 2. Timeline bullet */}
      <div className="relative self-stretch flex flex-col items-center justify-start w-6 shrink-0">
        <div className="w-0.5 absolute top-0 h-4.5 bg-slate-200" />
        <div className="w-0.5 absolute top-4.5 bottom-0 bg-slate-200" />
        <div className="relative z-10 mt-2">
          <span className="block w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
        </div>
      </div>

      {/* 3. Middle: Lunch title & cafeteria */}
      <div className="flex-1 min-w-0 flex flex-col lg:flex-row lg:items-start justify-between gap-3 lg:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 font-bold text-navy-deep text-sm sm:text-base mb-1">
            <Utensils className="w-4 h-4 text-slate-600 shrink-0" />
            <span>Обеденный перерыв</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-500 font-normal">
            Столовая ВУЦ
          </div>
        </div>

        {/* Empty right column to keep timeline column alignment */}
        <div className="lg:w-60 shrink-0 hidden lg:block" />
      </div>
    </div>
  );
};
