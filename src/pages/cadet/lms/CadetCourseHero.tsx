import React from 'react';
import { BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { CadetCourse } from '../../../types/cadet';

interface CadetCourseHeroProps {
  course: CadetCourse;
  totalMaterials?: number;
}

export const CadetCourseHero: React.FC<CadetCourseHeroProps> = ({ course }) => {
  const totalLessons = course.lessons.length;
  const completedHours = course.completedHours || 0;
  const totalHours = course.totalHours || (totalLessons * 4) || 1;
  const progressPercent = Math.min(100, Math.max(0, Math.round((completedHours / totalHours) * 100)));
  const completedLessons = Math.min(totalLessons, Math.round((progressPercent / 100) * totalLessons));

  return (
    <div className="bg-white border border-surface-border rounded-xl shadow-card p-5 sm:p-6">
      <div className="space-y-2 max-w-3xl pb-4 border-b border-surface-border">
        <h1 className="text-xl sm:text-2xl font-bold text-navy-deep tracking-tight">
          {course.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
          {course.description}
        </p>
      </div>

      {/* Прогресс освоения курса */}
      <div className="pt-4 pb-1">
        <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-navy-deep">
            <CheckCircle2 className="w-4 h-4 text-military-blue" />
            <span>Прогресс освоения дисциплины</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[11px]">
              {completedLessons} из {totalLessons} тем ({completedHours} из {totalHours} ч)
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-military-blue border border-blue-200/80 shadow-2xs">
              {progressPercent}%
            </span>
          </div>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-military-blue to-blue-500 rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3.5 text-xs text-slate-600 border-t border-slate-100 mt-3">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Учебные темы: <strong className="text-navy-deep font-semibold">{course.lessons.length}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Форма контроля: <strong className="text-navy-deep font-semibold">Зачёт с оценкой</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
