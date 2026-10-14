export interface CadetSessionUser {
  id: string;
  login: string;
  fullName: string;
  role: 'cadet';
  unitOrDepartment: string; // e.g. "Взвод 141 (Связь)"
  militaryRank?: string; // e.g. "Рядовой запаса"
}

export interface LessonMaterial {
  id: string;
  title: string;
  type: 'presentation' | 'document' | 'manual' | 'test';
  fileName: string;
  fileSize: string;
  format: 'PPTX' | 'PDF' | 'DOCX';
}

export interface CourseLesson {
  id: string;
  number: number;
  title: string;
  description: string;
  hours: number;
  instructor: string;
  materials: LessonMaterial[];
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
  lessons: CourseLesson[];
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
  dayNumber: number; // 1 to 4 (4 training days per month)
  date: string;
  dayOfWeek: 'Понедельник' | 'Суббота';
  platoon: string;
  sessions: ScheduleSession[];
}
