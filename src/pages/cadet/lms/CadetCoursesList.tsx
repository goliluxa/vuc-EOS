import React, { useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { CadetCourse } from '../../../types/cadet';
import { CreateCourseModal } from './CreateCourseModal';
import { courseService } from '../../../services/courseService';

interface CadetCoursesListProps {
  courses: CadetCourse[];
  onSelectCourse: (courseId: string) => void;
  isTeacher?: boolean;
  instructorName?: string;
}

export const CadetCoursesList: React.FC<CadetCoursesListProps> = ({
  courses: initialCourses,
  onSelectCourse,
  isTeacher = false,
  instructorName = 'Преподаватель',
}) => {
  const [courseList, setCourseList] = useState<CadetCourse[]>(initialCourses);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Top action bar for teachers & management */}
      {isTeacher && (
        <div className="bg-white border border-surface-border rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-navy-deep">Управление фондом дисциплин</h2>
            <p className="text-xs text-slate-500 mt-0.5">Создавайте новые курсы, структурируйте модули и публикуйте занятия</p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-military-blue hover:bg-navy-deep rounded-lg transition-colors shadow-2xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Создать курс</span>
          </button>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courseList.map((course) => (
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

            {/* Компактный прогресс-бар освоения курса для курсанта */}
            {!isTeacher && (
              <div className="mt-3.5 pt-3 border-t border-slate-100">
                {(() => {
                  const totalLessons = course.lessons.length;
                  const completedHours = course.completedHours || 0;
                  const totalHours = course.totalHours || (totalLessons * 4) || 1;
                  const progressPercent = Math.min(100, Math.max(0, Math.round((completedHours / totalHours) * 100)));
                  return (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">Прогресс освоения:</span>
                        <span className="font-bold text-military-blue">{progressPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-military-blue to-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            <div className="mt-4 pt-3.5 border-t border-surface-border flex items-center justify-end">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-military-blue group-hover:translate-x-1 transition-transform">
                <span>Открыть материалы</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        defaultInstructor={instructorName}
        onCreateCourse={(data) => {
          const newC = courseService.createCourse(data);
          setCourseList((prev) => [...prev, newC]);
          onSelectCourse(newC.id);
        }}
      />
    </div>
  );
};
