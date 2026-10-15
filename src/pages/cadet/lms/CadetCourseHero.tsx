import React from 'react';
import { BookOpen, Award } from 'lucide-react';
import { CadetCourse } from '../../../types/cadet';

interface CadetCourseHeroProps {
  course: CadetCourse;
  totalMaterials?: number;
}

export const CadetCourseHero: React.FC<CadetCourseHeroProps> = ({ course }) => {
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

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3.5 text-xs text-slate-600">
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
