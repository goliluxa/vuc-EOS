import React, { useState } from 'react';
import { Calendar, MapPin, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

interface VucEvent {
  id: string;
  title: string;
  type: 'смотр' | 'стрельбы' | 'инструктаж' | 'зачет';
  date: string;
  time: string;
  location: string;
  uniform: string;
  officer: string;
  description: string;
  isRequired: boolean;
}

const INITIAL_EVENTS: VucEvent[] = [
  {
    id: 'evt-1',
    title: 'Строевой смотр личного состава 1-го курса',
    type: 'смотр',
    date: '14 ноября 2026',
    time: '08:30 – 10:00',
    location: 'Строевой плац ВУЦ',
    uniform: 'Форма № 4 (полевая, установленного образца)',
    officer: 'Подполковник Морозов В. Н.',
    description: 'Проверка внешнего вида, наличия шевронов, удостоверений курсантов и закрепления предметов обмундирования.',
    isRequired: true,
  },
  {
    id: 'evt-2',
    title: 'Инструктаж по мерам безопасности при обращении с оружием',
    type: 'инструктаж',
    date: '18 ноября 2026',
    time: '13:45 – 15:15',
    location: 'Аудитория 108',
    uniform: 'Повседневная форма',
    officer: 'Майор Ковалёв Д. С.',
    description: 'Обязательный инструктаж под личную подпись в журнале перед практическими стрельбами на полигоне.',
    isRequired: true,
  },
  {
    id: 'evt-3',
    title: 'Контрольные стрельбы из АК-74 (1-е упражнение)',
    type: 'стрельбы',
    date: '21 ноября 2026',
    time: '09:00 – 14:00',
    location: 'Войсковой стрелковый полигон',
    uniform: 'Полевая форма, СИЗ, каска, вещмешок',
    officer: 'Майор Ковалёв Д. С.',
    description: 'Выполнение норматива начальных стрельб. Убытие централизованное от корпуса ВУЦ в 08:15.',
    isRequired: true,
  },
  {
    id: 'evt-4',
    title: 'Сдача зачетных нормативов по военно-медицинской подготовке',
    type: 'зачет',
    date: '28 ноября 2026',
    time: '11:45 – 13:15',
    location: 'Аудитория 204',
    uniform: 'Повседневная форма',
    officer: 'Капитан медслужбы Павлов С. А.',
    description: 'Нормативы: наложение жгута Эсмарха, ППИ-1, сердечно-легочная реанимация на тренажере.',
    isRequired: true,
  },
];

export const CadetEventsSection: React.FC = () => {
  const [events] = useState<VucEvent[]>(INITIAL_EVENTS);
  const [filterType, setFilterType] = useState<string>('all');
  const [confirmedEvents, setConfirmedEvents] = useState<Record<string, boolean>>({
    'evt-1': true,
  });

  const toggleConfirmation = (id: string) => {
    setConfirmedEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredEvents = events.filter((e) => {
    if (filterType === 'all') return true;
    return e.type === filterType;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Заголовок и фильтры */}
      <div className="bg-white border border-surface-border rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-navy-deep">
            План военных мероприятий и смотров
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary mt-0.5">
            Построения, контрольные зачёты, инструктажи и выезды на полигон
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Все' },
            { id: 'смотр', label: 'Смотры' },
            { id: 'инструктаж', label: 'Инструктажи' },
            { id: 'стрельбы', label: 'Стрельбы' },
            { id: 'зачет', label: 'Зачёты' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === tab.id
                  ? 'bg-military-blue text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Список событий */}
      <div className="space-y-4">
        {filteredEvents.map((evt) => {
          const isConfirmed = Boolean(confirmedEvents[evt.id]);

          return (
            <div
              key={evt.id}
              className="bg-white border border-surface-border rounded-xl p-5 sm:p-6 shadow-xs hover:border-blue-200 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              <div className="space-y-2.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                    {evt.type}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-navy-deep">
                    {evt.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {evt.description}
                </p>

                {/* Метки параметров */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-military-blue shrink-0" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-military-red shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="truncate">{evt.uniform}</span>
                  </div>
                </div>
              </div>

              {/* Блок подтверждения явки */}
              <div className="shrink-0 w-full md:w-auto flex md:flex-col items-center justify-between md:justify-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Ответственный:</span>
                  <span className="text-xs font-semibold text-slate-800">{evt.officer}</span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleConfirmation(evt.id)}
                  className={`w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-2xs ${
                    isConfirmed
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                      : 'bg-military-blue text-white hover:bg-navy-deep'
                  }`}
                >
                  {isConfirmed ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Явка подтверждена</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-white" />
                      <span>Подтвердить явку</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
