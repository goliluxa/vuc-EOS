import React, { useState } from 'react';
import { Clock, MapPin, User, Info, CheckCircle2 } from 'lucide-react';
import { scheduleService } from '../../../services/scheduleService';

interface CadetScheduleSectionProps {
  initialPlatoon?: string;
}

export const CadetScheduleSection: React.FC<CadetScheduleSectionProps> = ({
  initialPlatoon = 'Взвод 141 (Связь)',
}) => {
  const [selectedPlatoon, setSelectedPlatoon] = useState(initialPlatoon);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);

  const days = scheduleService.getScheduleForPlatoon(selectedPlatoon);
  const currentDay = days.find((d) => d.dayNumber === selectedDayNumber) || days[0];

  const isMonday = !selectedPlatoon.includes('142');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Informative Banner */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-military-blue shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-navy-deep">
              Регламент военного дня ВУЦ (1 учебный день в неделю)
            </h2>
            <p className="text-xs text-content-secondary leading-relaxed">
              Обучение в ВУЦ проводится методом «военного дня». В месяце предусмотрено 4 полных учебных дня по расписанию взвода.
            </p>
          </div>
        </div>

        {/* Platoon Toggle */}
        <div className="flex items-center gap-1.5 bg-white border border-surface-border p-1 rounded-md shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setSelectedPlatoon('Взвод 141 (Связь)');
              setSelectedDayNumber(1);
            }}
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
            onClick={() => {
              setSelectedPlatoon('Взвод 142 (Командный)');
              setSelectedDayNumber(1);
            }}
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

      {/* Month Days Selector (4 Days) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {days.map((d) => {
          const isSelected = d.dayNumber === selectedDayNumber;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setSelectedDayNumber(d.dayNumber)}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                isSelected
                  ? 'bg-white border-military-blue shadow-card ring-2 ring-military-blue/20'
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
              <div className="text-[11px] text-content-secondary mt-1">
                {d.sessions.length} учебных мероприятий
              </div>
            </button>
          );
        })}
      </div>

      {/* Daily Schedule Detailed Table/Cards */}
      <div className="bg-white border border-surface-border rounded-lg shadow-card overflow-hidden">
        <div className="px-5 py-4 bg-surface-bg/60 border-b border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-navy-deep">
              Распорядок {selectedDayNumber}-го учебного дня ({currentDay.date}, {currentDay.dayOfWeek})
            </h3>
            <span className="text-xs text-content-secondary">
              Учебная группа: {selectedPlatoon}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-content-secondary">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Учебная программа утверждена</span>
          </div>
        </div>

        <div className="divide-y divide-surface-border">
          {currentDay.sessions.map((sess) => {
            const isInspection = sess.sessionNumber === 0;
            return (
              <div
                key={sess.id}
                className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                  isInspection ? 'bg-slate-50/50' : 'hover:bg-slate-50/40'
                }`}
              >
                {/* Left: Time and Pair */}
                <div className="flex items-start gap-3 md:w-56 shrink-0">
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
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
                <div className="flex flex-col sm:flex-row md:flex-col md:items-end gap-1.5 text-xs text-content-secondary shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-surface-border/50">
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
