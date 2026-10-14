import React from 'react';
import { BookOpen, User, Clock, FileText, ArrowRight, Layers } from 'lucide-react';
import { CadetCourse } from '../../../types/cadet';

interface CadetCoursesListProps {
  courses: CadetCourse[];
  onSelectCourse: (courseId: string) => void;
}

export const CadetCoursesList: React.FC<CadetCoursesListProps> = ({
  courses,
  onSelectCourse,
}) => {
  const totalLessons = courses.reduce((acc, c) => acc + c.lessons.length, 0);
  const totalMaterials = courses.reduce(
    (acc, c) => acc + c.lessons.reduce((mAcc, l) => mAcc + l.materials.length, 0),
    0
  );
  const totalHours = courses.reduce((acc, c) => acc + c.totalHours, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner / Summary */}
      <div className="bg-white border border-surface-border rounded-lg p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-navy-deep">
            Учебные дисциплины военной подготовки
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary mt-1">
            Выберите курс для просмотра программы, структуры занятий и скачивания лекционных презентаций
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-xs flex-wrap">
          <div className="px-3 py-1.5 rounded-md bg-surface-bg border border-surface-border flex items-center gap-1.5 text-navy-deep font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-military-blue" />
            <span>{courses.length} курса</span>
          </div>
          <div className="px-3 py-1.5 rounded-md bg-surface-bg border border-surface-border flex items-center gap-1.5 text-navy-deep font-semibold">
            <Layers className="w-3.5 h-3.5 text-military-blue" />
            <span>{totalLessons} занятий</span>
          </div>
          <div className="hidden sm:flex px-3 py-1.5 rounded-md bg-surface-bg border border-surface-border items-center gap-1.5 text-navy-deep font-semibold">
            <FileText className="w-3.5 h-3.5 text-military-blue" />
            <span>{totalMaterials} материалов</span>
          </div>
          <div className="px-3 py-1.5 rounded-md bg-surface-bg border border-surface-border flex items-center gap-1.5 text-navy-deep font-semibold">
            <Clock className="w-3.5 h-3.5 text-military-blue" />
            <span>{totalHours} ч.</span>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => {
          const courseMaterialsCount = course.lessons.reduce(
            (acc, l) => acc + l.materials.length,
            0
          );

          return (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className="group bg-white border border-surface-border hover:border-military-blue/50 rounded-lg p-5 shadow-card hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCourse(course.id);
                }
              }}
            >
              <div>
                {/* Header row: Code badge and hours */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-blue-50 text-military-blue border border-blue-200">
                    {course.code}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-medium text-content-secondary">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.totalHours} акад. ч.</span>
                  </div>
                </div>

                {/* Course Title */}
                <h3 className="text-base font-bold text-navy-deep group-hover:text-military-blue transition-colors">
                  {course.title}
                </h3>

                {/* Department */}
                <span className="inline-block text-xs font-medium text-military-red mt-0.5">
                  {course.department}
                </span>

                {/* Description */}
                <p className="text-xs sm:text-sm text-content-secondary mt-2 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-surface-border flex items-center justify-between gap-3">
                {/* Instructor */}
                <div className="flex items-center gap-1.5 text-xs text-content-secondary min-w-0">
                  <User className="w-3.5 h-3.5 shrink-0 text-content-secondary/70" />
                  <span className="truncate font-medium">{course.instructor}</span>
                </div>

                {/* Open Course Action */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-content-secondary">
                    <FileText className="w-3 h-3" />
                    <span>{courseMaterialsCount} матер.</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-military-blue group-hover:translate-x-0.5 transition-transform">
                    <span>Открыть курс</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
