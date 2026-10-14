import React from 'react';
import { User, Clock, BookOpen, FileText, Award } from 'lucide-react';
import { CadetCourse } from '../../../types/cadet';

interface CadetCourseHeroProps {
  course: CadetCourse;
  totalMaterials: number;
}

export const CadetCourseHero: React.FC<CadetCourseHeroProps> = ({
  course,
  totalMaterials,
}) => {
  const progressPercent = Math.round((course.completedHours / course.totalHours) * 100);

  return (
    <div className="bg-white border border-surface-border rounded-xl shadow-card p-5 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 pb-5 border-b border-surface-border">
        {/* Left: Course details */}
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-content-secondary">
            <span className="font-mono font-bold text-military-blue tracking-wide">
              {course.code}
            </span>
            <span className="text-slate-300">•</span>
            <span>{course.department}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-navy-deep tracking-tight">
            {course.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            {course.description}
          </p>
        </div>

        {/* Right: Instructor & Compact Progress */}
        <div className="shrink-0 flex sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 lg:gap-3 lg:border-l lg:border-surface-border lg:pl-6 min-w-[220px]">
          <div className="text-left lg:text-right">
            <div className="text-[11px] font-semibold text-content-secondary uppercase tracking-wider">
              Преподаватель курса
            </div>
            <div className="flex items-center lg:justify-end gap-1.5 text-xs sm:text-sm font-bold text-navy-deep mt-0.5">
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0 lg:hidden" />
              <span>{course.instructor}</span>
            </div>
          </div>

          <div className="w-full sm:w-48 lg:w-44 text-left lg:text-right space-y-1">
            <div className="flex items-center justify-between lg:justify-end gap-2 text-xs">
              <span className="text-content-secondary text-[11px]">Освоение:</span>
              <span className="font-bold text-military-blue">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-military-blue rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-content-secondary truncate">
              {course.completedHours} из {course.totalHours} акад. часов
            </div>
          </div>
        </div>
      </div>

      {/* Bottom specs line: simple, professional, no bulky colored boxes */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Общая нагрузка: <strong className="text-navy-deep font-semibold">{course.totalHours} ч.</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Учебные темы: <strong className="text-navy-deep font-semibold">{course.lessons.length}</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span>
            Материалы: <strong className="text-navy-deep font-semibold">{totalMaterials} файл(ов)</strong>
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
