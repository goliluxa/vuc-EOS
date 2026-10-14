import React from 'react';
import { User, Clock, FileText, ArrowRight } from 'lucide-react';
import { CadetCourse } from '../../../types/cadet';

interface CadetCoursesListProps {
  courses: CadetCourse[];
  onSelectCourse: (courseId: string) => void;
}

export const CadetCoursesList: React.FC<CadetCoursesListProps> = ({
  courses,
  onSelectCourse,
}) => {
  return (
    <div className="space-y-4 animate-fade-in">

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
