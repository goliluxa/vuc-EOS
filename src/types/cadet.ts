import { UserRole } from './admin';

export interface CadetSessionUser {
  id: string;
  login: string;
  fullName: string;
  role: UserRole;
  unitOrDepartment: string; // e.g. "Взвод 141 (Связь)", "Кафедра ОВП", "Учебная часть"
  militaryRank?: string; // e.g. "Курсант", "Преподаватель", "Начальник", "Администратор"
}

export interface LessonMaterial {
  id: string;
  title: string;
  type: 'presentation' | 'document' | 'manual' | 'test' | 'assignment' | 'lecture';
  fileName: string;
  fileSize: string;
  format: 'PPTX' | 'PDF' | 'DOCX' | 'TXT' | 'LINK';
  url?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

export interface CourseLesson {
  id: string;
  number: number;
  title: string;
  description: string;
  hours: number;
  instructor: string;
  materials: LessonMaterial[];
  status?: 'published' | 'draft' | 'scheduled';
  scheduledDate?: string;
  sectionId?: string;
  questions?: QuizQuestion[];
  assignmentText?: string;
  deadlineDate?: string;
}

export interface CourseSection {
  id: string;
  title: string;
  description?: string;
  order: number;
}

export interface CadetCourse {
  id: string;
  code: string;
  title: string;
  department: string;
  instructor: string;
  totalHours: number;
  completedHours: number;
  description: string;
  sections?: CourseSection[];
  lessons: CourseLesson[];
  isDraft?: boolean;
}

export interface ScheduleSession {
  id: string;
  sessionNumber: number;
  time: string;
  subject: string;
  topic: string;
  instructor: string;
  classroom: string;
  type: 'Лекция' | 'Практическое занятие' | 'Тренировка' | 'Самоподготовка';
}

export interface ScheduleDay {
  id: string;
  dayNumber: number; // 1 to 16
  date: string;
  isoDate?: string; // YYYY-MM-DD
  monthKey?: 'sep' | 'oct' | 'nov' | 'dec';
  monthName?: string;
  dayOfWeek: 'Понедельник' | 'Суббота';
  platoon: string;
  sessions: ScheduleSession[];
}

export type GradeControlKind = 'Экзамен' | 'Диф. зачёт' | 'Зачёт';
export type GradeValue = 'Отлично' | 'Хорошо' | 'Удовлетворительно' | 'Зачтено' | 'Не зачтено';

export interface ZachetkaRecord {
  id: string;
  subject: string;
  semester: 1 | 2 | 3 | 4 | 5; // 5 = Сборы / Итоговая аттестация
  controlKind: GradeControlKind;
  hours: number;
  grade: GradeValue;
  numericGrade?: 5 | 4 | 3;
  passedDate: string;
  instructor: string;
}
