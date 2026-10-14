import React, { useState, useMemo } from 'react';
import {
  User,
  Clock,
  FileText,
  ArrowRight,
  Search,
  BookOpen,
  Filter,
  X,
} from 'lucide-react';
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
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const departments = useMemo(() => {
    const deps = Array.from(new Set(courses.map((c) => c.department)));
    return ['all', ...deps];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept =
        selectedDepartment === 'all' || course.department === selectedDepartment;

      return matchesSearch && matchesDept;
    });
  }, [courses, searchQuery, selectedDepartment]);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-surface-border rounded-xl p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по дисциплине, коду или преподавателю..."
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

        {/* Department Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1 hidden sm:block" />
          {departments.map((dept) => {
            const isAll = dept === 'all';
            const isActive = selectedDepartment === dept;
            const label = isAll ? 'Все кафедры' : dept.replace('Кафедра ', '');

            return (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDepartment(dept)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                  isActive
                    ? 'bg-military-blue text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-navy-deep'
                }`}
              >
                {label}
              </button>
            );
          })}
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
            Попробуйте изменить поисковую фразу или сбросить фильтр по кафедрам
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedDepartment('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-military-blue bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((course) => {
          const totalMaterials = course.lessons.reduce(
            (acc, l) => acc + l.materials.length,
            0
          );
          const progressPercent = Math.round((course.completedHours / course.totalHours) * 100);

          return (
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
              <div className="space-y-3">
                {/* Header row: Code badge and hours */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-50 text-military-blue border border-blue-200">
                    {course.code}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-military-blue" />
                    <span>{course.totalHours} ч.</span>
                  </div>
                </div>

                {/* Course Title and Dept */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-navy-deep group-hover:text-military-blue transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <span className="text-xs font-medium text-military-red block mt-0.5">
                    {course.department}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Mini Progress */}
                <div className="pt-1 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                    <span>Освоение программы:</span>
                    <span className="text-military-blue font-bold">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-military-blue rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Metadata & Action */}
              <div className="mt-5 pt-3.5 border-t border-surface-border flex items-center justify-between gap-3">
                {/* Instructor */}
                <div className="flex items-center gap-2 text-xs text-content-secondary min-w-0">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate font-semibold text-navy-deep">{course.instructor}</span>
                </div>

                {/* Materials & Action button */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-slate-500">
                    <FileText className="w-3 h-3 text-slate-400" />
                    <span>{totalMaterials} материалов</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-military-blue group-hover:translate-x-1 transition-transform">
                    <span>Открыть</span>
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
