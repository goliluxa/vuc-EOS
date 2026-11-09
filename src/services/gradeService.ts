import { ZachetkaRecord } from '../types/cadet';

export const DEFAULT_ZACHETKA_RECORDS: ZachetkaRecord[] = [
  // 1 семестр (Осень 2024)
  {
    id: 'z-1-1',
    subject: 'Общая военная подготовка',
    semester: 1,
    controlKind: 'Диф. зачёт',
    hours: 72,
    grade: 'Отлично',
    numericGrade: 5,
    passedDate: '24.12.2024',
    instructor: 'Майор Ковалёв Д. С.',
  },
  {
    id: 'z-1-2',
    subject: 'Общевоинские уставы ВС РФ',
    semester: 1,
    controlKind: 'Зачёт',
    hours: 36,
    grade: 'Зачтено',
    passedDate: '20.12.2024',
    instructor: 'Майор Ковалёв Д. С.',
  },
  {
    id: 'z-1-3',
    subject: 'Строевая подготовка',
    semester: 1,
    controlKind: 'Зачёт',
    hours: 36,
    grade: 'Зачтено',
    passedDate: '22.12.2024',
    instructor: 'Капитан Белов С. А.',
  },
  // 2 семестр (Весна 2025)
  {
    id: 'z-2-1',
    subject: 'Военная топография',
    semester: 2,
    controlKind: 'Диф. зачёт',
    hours: 54,
    grade: 'Хорошо',
    numericGrade: 4,
    passedDate: '28.05.2025',
    instructor: 'Подполковник Семёнов И. П.',
  },
  {
    id: 'z-2-2',
    subject: 'Радиационная, химическая и биологическая защита (РХБЗ)',
    semester: 2,
    controlKind: 'Зачёт',
    hours: 36,
    grade: 'Зачтено',
    passedDate: '25.05.2025',
    instructor: 'Майор Ковалёв Д. С.',
  },
  {
    id: 'z-2-3',
    subject: 'Военно-медицинская подготовка',
    semester: 2,
    controlKind: 'Зачёт',
    hours: 36,
    grade: 'Зачтено',
    passedDate: '30.05.2025',
    instructor: 'Капитан м/с Ильина О. В.',
  },
  // 3 семестр (Осень 2025 - Текущий)
  {
    id: 'z-3-1',
    subject: 'Тактическая подготовка',
    semester: 3,
    controlKind: 'Экзамен',
    hours: 108,
    grade: 'Отлично',
    numericGrade: 5,
    passedDate: '15.10.2025',
    instructor: 'Подполковник Морозов В. Н.',
  },
  {
    id: 'z-3-2',
    subject: 'Огневая подготовка',
    semester: 3,
    controlKind: 'Диф. зачёт',
    hours: 64,
    grade: 'Зачтено',
    passedDate: '28.10.2025',
    instructor: 'Подполковник Морозов В. Н.',
  },
  {
    id: 'z-3-3',
    subject: 'Военная связь и телекоммуникационные системы (ВУС-121800)',
    semester: 3,
    controlKind: 'Диф. зачёт',
    hours: 72,
    grade: 'Отлично',
    numericGrade: 5,
    passedDate: '02.11.2025',
    instructor: 'Майор Ковалёв Д. С.',
  },
  // 4 семестр (Весна 2026 - Планируется)
  {
    id: 'z-4-1',
    subject: 'Эксплуатация военной техники связи',
    semester: 4,
    controlKind: 'Экзамен',
    hours: 120,
    grade: 'Не зачтено',
    passedDate: 'Июнь 2026 (План)',
    instructor: 'Майор Ковалёв Д. С.',
  },
  {
    id: 'z-4-2',
    subject: 'Управление подразделениями связи в бою',
    semester: 4,
    controlKind: 'Диф. зачёт',
    hours: 72,
    grade: 'Не зачтено',
    passedDate: 'Июнь 2026 (План)',
    instructor: 'Подполковник Семёнов И. П.',
  },
  // 5: Учебные сборы и Гос. аттестация
  {
    id: 'z-5-1',
    subject: 'Учебные сборы в войсковой части (Лагерный сбор)',
    semester: 5,
    controlKind: 'Зачёт',
    hours: 144,
    grade: 'Не зачтено',
    passedDate: 'Июль 2026 (План)',
    instructor: 'Командование войсковой части',
  },
  {
    id: 'z-5-2',
    subject: 'Итоговая междисциплинарная государственная аттестация',
    semester: 5,
    controlKind: 'Экзамен',
    hours: 72,
    grade: 'Не зачтено',
    passedDate: 'Август 2026 (План)',
    instructor: 'Государственная экзаменационная комиссия',
  },
];

const ZACHETKA_STORAGE_KEY = 'vuc_cadet_zachetka_records';

export const gradeService = {
  getRecords(): ZachetkaRecord[] {
    try {
      const raw = localStorage.getItem(ZACHETKA_STORAGE_KEY);
      if (!raw) {
        this.saveRecords(DEFAULT_ZACHETKA_RECORDS);
        return DEFAULT_ZACHETKA_RECORDS;
      }
      return JSON.parse(raw);
    } catch {
      return DEFAULT_ZACHETKA_RECORDS;
    }
  },

  saveRecords(records: ZachetkaRecord[]): void {
    try {
      localStorage.setItem(ZACHETKA_STORAGE_KEY, JSON.stringify(records));
    } catch {
      // Ignore
    }
  },
};
