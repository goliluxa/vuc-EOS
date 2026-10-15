import React from 'react';
import { ArrowRight } from 'lucide-react';
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
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => onSelectCourse(course.id)}
            className="group bg-white border border-surface-border hover:border-military-blue/50 rounded-xl p-5 shadow-card hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectCourse(course.id);
              }
            }}
          >
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-navy-deep group-hover:text-military-blue transition-colors leading-snug">
                {course.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="mt-4 pt-3.5 border-t border-surface-border flex items-center justify-end">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-military-blue group-hover:translate-x-1 transition-transform">
                <span>Открыть материалы</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
