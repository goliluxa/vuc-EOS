import React from 'react';
import { User, Clock, Layers, FileText, Award, Shield } from 'lucide-react';
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
    <div className="bg-white border border-surface-border rounded-xl shadow-card p-5 sm:p-6 space-y-5">
      {/* Top Section: Title & Instructor */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
        <div className="max-w-3xl space-y-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-military-blue to-navy-deep text-white shadow-xs">
              <Shield className="w-3.5 h-3.5" />
              <span>{course.code}</span>
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold text-military-blue bg-blue-50 border border-blue-200">
              {course.department}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-navy-deep tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-l-2 border-military-blue/40 pl-3">
            {course.description}
          </p>
        </div>

        {/* Instructor Officer Badge */}
        <div className="shrink-0 bg-slate-50 border border-surface-border p-4 rounded-xl flex flex-col gap-2.5 min-w-[240px] shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-content-secondary">
            Ответственный преподаватель
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-military-blue/10 text-military-blue border border-military-blue/20 flex items-center justify-center font-bold text-sm shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-navy-deep truncate">
                {course.instructor}
              </span>
              <span className="text-xs text-content-secondary truncate">
                {course.department}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="p-4 bg-slate-50/80 rounded-xl border border-surface-border space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-navy-deep">Прогресс освоения программы курса:</span>
          <span className="text-military-blue font-extrabold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-military-blue to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-content-secondary">
          <span>
            Пройдено {course.completedHours} из {course.totalHours} академических часов
          </span>
          <span>1 из {course.lessons.length} тем освоена</span>
        </div>
      </div>

      {/* Stats and Quick Action Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-surface-border text-xs">
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-surface-border/60">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-military-blue flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-content-secondary text-[11px]">Нагрузка</div>
            <div className="font-bold text-navy-deep">{course.totalHours} акад. ч.</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-surface-border/60">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-content-secondary text-[11px]">Занятия</div>
            <div className="font-bold text-navy-deep">{course.lessons.length} тем</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-surface-border/60">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-content-secondary text-[11px]">Материалы</div>
            <div className="font-bold text-navy-deep">{totalMaterials} файл(ов)</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-surface-border/60">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-content-secondary text-[11px]">Контроль</div>
            <div className="font-bold text-navy-deep">Зачёт с оценкой</div>
          </div>
        </div>
      </div>
    </div>
  );
};
