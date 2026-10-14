import { ScheduleDay, ScheduleSession } from '../types/cadet';

export interface MonthOption {
  key: 'all' | 'sep' | 'oct' | 'nov' | 'dec';
  label: string;
  fullName: string;
}

export const SEMESTER_MONTHS: MonthOption[] = [
  { key: 'all', label: 'Весь семестр', fullName: 'Осенний семестр (16 дней)' },
  { key: 'sep', label: 'Сентябрь', fullName: 'Сентябрь 2026' },
  { key: 'oct', label: 'Октябрь', fullName: 'Октябрь 2026' },
  { key: 'nov', label: 'Ноябрь', fullName: 'Ноябрь 2026' },
  { key: 'dec', label: 'Декабрь', fullName: 'Декабрь 2026' },
];

// Helper to build realistic 5 sessions per day
function buildDaySessions(dayNum: number, dayId: string): ScheduleSession[] {
  const inspectionTopics = [
    'Утренний осмотр, проверка внешнего вида и построение личного состава',
    'Утренний осмотр, строевая стойка и приветствие командиров',
    'Утренний осмотр, доведение оперативной и военно-политической сводки',
    'Итоговое построение месяца, проверка готовности к контрольным занятиям',
  ];
  const inspectionTopic = inspectionTopics[(dayNum - 1) % inspectionTopics.length];

  const curriculumBlocks: Array<Array<{ subject: string; topic: string; instructor: string; classroom: string; type: ScheduleSession['type'] }>> = [
    // Month 1: Basic military & tactics foundation
    [
      { subject: 'Общая военная подготовка', topic: 'Тема №1. Вооруженные Силы РФ: назначение, структура и рода войск', instructor: 'Майор Ковалёв Д. С.', classroom: 'Ауд. 204', type: 'Лекция' },
      { subject: 'Огневая подготовка', topic: 'Тема №1. Назначение, ТТХ и устройство автомата АК-74М', instructor: 'Подполковник Морозов В. Н.', classroom: 'Ауд. 108', type: 'Практическое занятие' },
      { subject: 'Тактическая подготовка', topic: 'Тема №1. Основы общевойскового боя. Сигналы управления', instructor: 'Майор Ковалёв Д. С.', classroom: 'Ауд. 206', type: 'Лекция' },
      { subject: 'Самостоятельная подготовка', topic: 'Изучение статей Устава внутренней службы ВС РФ', instructor: 'Командир взвода', classroom: 'Читальный зал', type: 'Самоподготовка' },
    ],
    [
      { subject: 'Общая военная подготовка', topic: 'Тема №2. Общевоинские уставы ВС РФ. Суточный наряд роты', instructor: 'Майор Ковалёв Д. С.', classroom: 'Ауд. 204', type: 'Лекция' },
      { subject: 'Огневая подготовка', topic: 'Тема №2. Неполная разборка и сборка автомата АК-74М. Норматив №1', instructor: 'Подполковник Морозов В. Н.', classroom: 'Ауд. 108', type: 'Практическое занятие' },
      { subject: 'Военная топография', topic: 'Тема №1. Ориентирование на местности по компасу и карте', instructor: 'Капитан Ильин С. А.', classroom: 'Ауд. 210', type: 'Практическое занятие' },
      { subject: 'Строевая подготовка', topic: 'Тема №1. Выполнение строевых приемов без оружия на месте', instructor: 'Командир взвода', classroom: 'Строевой плац', type: 'Практическое занятие' },
    ],
    [
      { subject: 'Военная связь', topic: 'Тема №1. ТТХ войсковых радиостанций УКВ-диапазона (Р-168)', instructor: 'Подполковник Васильев П. И.', classroom: 'Класс радиосвязи №301', type: 'Лекция' },
      { subject: 'Военная связь', topic: 'Тема №2. Развертывание антенных устройств и радиообмен', instructor: 'Подполковник Васильев П. И.', classroom: 'Класс радиосвязи №301', type: 'Практическое занятие' },
      { subject: 'РХБ защита', topic: 'Тема №1. Нормативы надевания противогаза и ОЗК (Нормативы №1, 4)', instructor: 'Майор Ковалёв Д. С.', classroom: 'Ауд. 104', type: 'Практическое занятие' },
      { subject: 'Самостоятельная подготовка', topic: 'Правила радиообмена и кодовые таблицы сигналов', instructor: 'Командир взвода', classroom: 'Ауд. 204', type: 'Самоподготовка' },
    ],
    [
      { subject: 'Тактическая подготовка', topic: 'Тема №2. Мотострелковое отделение в обороне опорного пункта', instructor: 'Майор Ковалёв Д. С.', classroom: 'Ауд. 206', type: 'Лекция' },
      { subject: 'Огневая подготовка', topic: 'Тема №3. Стрельба на электронно-лазерном стрелковом тренажере', instructor: 'Подполковник Морозов В. Н.', classroom: 'Лазерный тир', type: 'Практическое занятие' },
      { subject: 'Военная топография', topic: 'Тема №2. Движение по азимутам. Составление карточки маршрута', instructor: 'Капитан Ильин С. А.', classroom: 'Ауд. 210', type: 'Практическое занятие' },
      { subject: 'Контрольное занятие', topic: 'Сдача нормативов по итогам 1-го месяца военной подготовки', instructor: 'Преподаватели ВУЦ', classroom: 'Плац / Тир', type: 'Практическое занятие' },
    ],
  ];

  const currentCurriculum = curriculumBlocks[(dayNum - 1) % curriculumBlocks.length];

  return [
    {
      id: `${dayId}-s0`,
      sessionNumber: 0,
      time: '08:30 – 08:50',
      subject: 'Распорядок дня',
      topic: inspectionTopic,
      instructor: 'Дежурный по ВУЦ',
      classroom: 'Строевой плац',
      type: 'Тренировка',
    },
    ...currentCurriculum.map((c, idx) => ({
      id: `${dayId}-s${idx + 1}`,
      sessionNumber: idx + 1,
      time: ['09:00 – 10:35', '10:45 – 12:20', '13:15 – 14:50', '15:00 – 16:35'][idx],
      subject: c.subject,
      topic: c.topic,
      instructor: c.instructor,
      classroom: c.classroom,
      type: c.type,
    })),
  ];
}

// 16 training days for Mondays (Platoon 141) and Saturdays (Platoon 142)
const SEMESTER_DATES_PLATOON_141 = [
  // Сентябрь
  { date: '07 сентября 2026', isoDate: '2026-09-07', monthKey: 'sep', monthName: 'Сентябрь' },
  { date: '14 сентября 2026', isoDate: '2026-09-14', monthKey: 'sep', monthName: 'Сентябрь' },
  { date: '21 сентября 2026', isoDate: '2026-09-21', monthKey: 'sep', monthName: 'Сентябрь' },
  { date: '28 сентября 2026', isoDate: '2026-09-28', monthKey: 'sep', monthName: 'Сентябрь' },
  // Октябрь (сегодня 14 октября 2026 -> 19 окт ближайший!)
  { date: '05 октября 2026', isoDate: '2026-10-05', monthKey: 'oct', monthName: 'Октябрь' },
  { date: '12 октября 2026', isoDate: '2026-10-12', monthKey: 'oct', monthName: 'Октябрь' },
  { date: '19 октября 2026', isoDate: '2026-10-19', monthKey: 'oct', monthName: 'Октябрь' },
  { date: '26 октября 2026', isoDate: '2026-10-26', monthKey: 'oct', monthName: 'Октябрь' },
  // Ноябрь
  { date: '02 ноября 2026', isoDate: '2026-11-02', monthKey: 'nov', monthName: 'Ноябрь' },
  { date: '09 ноября 2026', isoDate: '2026-11-09', monthKey: 'nov', monthName: 'Ноябрь' },
  { date: '16 ноября 2026', isoDate: '2026-11-16', monthKey: 'nov', monthName: 'Ноябрь' },
  { date: '23 ноября 2026', isoDate: '2026-11-23', monthKey: 'nov', monthName: 'Ноябрь' },
  // Декабрь
  { date: '07 декабря 2026', isoDate: '2026-12-07', monthKey: 'dec', monthName: 'Декабрь' },
  { date: '14 декабря 2026', isoDate: '2026-12-14', monthKey: 'dec', monthName: 'Декабрь' },
  { date: '21 декабря 2026', isoDate: '2026-12-21', monthKey: 'dec', monthName: 'Декабрь' },
  { date: '28 декабря 2026', isoDate: '2026-12-28', monthKey: 'dec', monthName: 'Декабрь' },
] as const;

const SEMESTER_DATES_PLATOON_142 = [
  // Сентябрь
  { date: '05 сентября 2026', isoDate: '2026-09-05', monthKey: 'sep', monthName: 'Сентябрь' },
  { date: '12 сентября 2026', isoDate: '2026-09-12', monthKey: 'sep', monthName: 'Сентябрь' },
  { date: '19 сентября 2026', isoDate: '2026-09-19', monthKey: 'sep', monthName: 'Сентябрь' },
  { date: '26 сентября 2026', isoDate: '2026-09-26', monthKey: 'sep', monthName: 'Сентябрь' },
  // Октябрь (сегодня 14 октября 2026 -> 17 окт ближайший!)
  { date: '03 октября 2026', isoDate: '2026-10-03', monthKey: 'oct', monthName: 'Октябрь' },
  { date: '10 октября 2026', isoDate: '2026-10-10', monthKey: 'oct', monthName: 'Октябрь' },
  { date: '17 октября 2026', isoDate: '2026-10-17', monthKey: 'oct', monthName: 'Октябрь' },
  { date: '24 октября 2026', isoDate: '2026-10-24', monthKey: 'oct', monthName: 'Октябрь' },
  // Ноябрь
  { date: '07 ноября 2026', isoDate: '2026-11-07', monthKey: 'nov', monthName: 'Ноябрь' },
  { date: '14 ноября 2026', isoDate: '2026-11-14', monthKey: 'nov', monthName: 'Ноябрь' },
  { date: '21 ноября 2026', isoDate: '2026-11-21', monthKey: 'nov', monthName: 'Ноябрь' },
  { date: '28 ноября 2026', isoDate: '2026-11-28', monthKey: 'nov', monthName: 'Ноябрь' },
  // Декабрь
  { date: '05 декабря 2026', isoDate: '2026-12-05', monthKey: 'dec', monthName: 'Декабрь' },
  { date: '12 декабря 2026', isoDate: '2026-12-12', monthKey: 'dec', monthName: 'Декабрь' },
  { date: '19 декабря 2026', isoDate: '2026-12-19', monthKey: 'dec', monthName: 'Декабрь' },
  { date: '26 декабря 2026', isoDate: '2026-12-26', monthKey: 'dec', monthName: 'Декабрь' },
] as const;

export const scheduleService = {
  getSemesterSchedule(platoonName: string): ScheduleDay[] {
    const isSaturday = platoonName.includes('142') || platoonName.includes('Командный');
    const dayOfWeek = isSaturday ? 'Суббота' : 'Понедельник';
    const datesList = isSaturday ? SEMESTER_DATES_PLATOON_142 : SEMESTER_DATES_PLATOON_141;

    return datesList.map((item, index) => {
      const dayNumber = index + 1;
      const dayId = `day-${dayNumber}`;
      return {
        id: dayId,
        dayNumber,
        date: item.date,
        isoDate: item.isoDate,
        monthKey: item.monthKey as 'sep' | 'oct' | 'nov' | 'dec',
        monthName: item.monthName,
        dayOfWeek,
        platoon: platoonName,
        sessions: buildDaySessions(dayNumber, dayId),
      };
    });
  },

  // Backward-compatible alias
  getScheduleForPlatoon(platoonName: string): ScheduleDay[] {
    return this.getSemesterSchedule(platoonName);
  },

  // Determines the nearest upcoming training day relative to current date (defaults to 2026-10-14 in current context)
  getNearestUpcomingDay(days: ScheduleDay[], referenceIso: string = '2026-10-14'): ScheduleDay {
    if (!days.length) {
      throw new Error('Schedule days list cannot be empty');
    }
    // Find the first training day on or after referenceIso
    const upcoming = days.find((d) => (d.isoDate || '') >= referenceIso);
    if (upcoming) {
      return upcoming;
    }
    // If all days are in the past, return the last one
    return days[days.length - 1];
  },
};
