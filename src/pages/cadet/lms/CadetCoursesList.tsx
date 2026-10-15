import React, { useState, useMemo } from 'react';
import { ArrowRight, Search, BookOpen, X } from 'lucide-react';
import { CadetCourse } from '../../../types/cadet';

interface CadetCoursesListProps {
  courses: CadetCourse[];
  onSelectCourse: (courseId: string) => void;
}

export const CadetCoursesList: React.FC<CadetCoursesListProps> = ({
  courses,
  onSelectCourse,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return courses;
    return courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q)
      );
    });
  }, [courses, searchQuery]);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Search Toolbar */}
      <div className="bg-white border border-surface-border rounded-xl p-3 sm:p-4 shadow-card">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по дисциплине..."
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-surface-border rounded-lg text-xs sm:text-sm focus:outline-hidden focus:border-military-blue focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded"
              aria-label="Очистить поиск"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="bg-white border border-surface-border rounded-xl p-8 text-center space-y-3 shadow-card">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-deep">По вашему запросу ничего не найдено</h3>
          <p className="text-xs text-content-secondary max-w-sm mx-auto">
            Попробуйте изменить поисковую фразу
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 text-xs font-semibold text-military-blue bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            Сбросить поиск
          </button>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((course) => (
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
