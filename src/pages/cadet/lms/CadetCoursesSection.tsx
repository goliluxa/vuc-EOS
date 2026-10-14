import React, { useState } from 'react';
import { FileText, Download, CheckCircle, ChevronDown, ChevronRight, Presentation, User } from 'lucide-react';
import { courseService } from '../../../services/courseService';
import { LessonMaterial } from '../../../types/cadet';

export const CadetCoursesSection: React.FC = () => {
  const courses = courseService.getCadetCourses();
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [expandedLessonId, setExpandedLessonId] = useState<string>(courses[0]?.lessons[0]?.id || '');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleDownload = (material: LessonMaterial) => {
    setActionNotice(`Файл «${material.fileName}» (${material.fileSize}) подготовлен к загрузке.`);
    setTimeout(() => {
      setActionNotice(null);
    }, 4000);
  };

  const getFormatBadge = (format: LessonMaterial['format']) => {
    switch (format) {
      case 'PPTX':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'PDF':
        return 'bg-red-50 text-military-red border-red-200';
      case 'DOCX':
        return 'bg-blue-50 text-military-blue border-blue-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Course Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {courses.map((course) => {
          const isSelected = course.id === selectedCourseId;
          return (
            <button
              key={course.id}
              type="button"
              onClick={() => {
                setSelectedCourseId(course.id);
                setExpandedLessonId(course.lessons[0]?.id || '');
              }}
              className={`p-4 rounded-lg border text-left transition-all ${
                isSelected
                  ? 'bg-white border-military-blue shadow-card ring-2 ring-military-blue/20'
                  : 'bg-white/80 border-surface-border hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-military-red">
                  {course.code}
                </span>
                <span className="text-[11px] text-content-secondary font-medium">
                  {course.totalHours} ч.
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-navy-deep leading-snug line-clamp-2 mb-2">
                {course.title}
              </h3>
              <div className="flex items-center gap-1.5 text-[11px] text-content-secondary">
                <User className="w-3 h-3 text-content-secondary/60" />
                <span className="truncate">{course.instructor}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Notification */}
      {actionNotice && (
        <div
          role="status"
          className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs sm:text-sm flex items-center justify-between gap-2 animate-fade-in"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionNotice(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold"
          >
            Закрыть
          </button>
        </div>
      )}

      {/* Selected Course Header Banner */}
      <div className="bg-white border border-surface-border rounded-lg shadow-card p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-military-blue border border-blue-200 mb-1.5">
              <span>{currentCourse.code}</span>
              <span>•</span>
              <span>{currentCourse.department}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-navy-deep">
              {currentCourse.title}
            </h2>
            <p className="text-xs sm:text-sm text-content-secondary mt-1">
              {currentCourse.description}
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 bg-surface-bg/60 p-3 rounded-lg border border-surface-border/60">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-content-secondary">
              Преподаватель
            </span>
            <span className="text-xs sm:text-sm font-bold text-navy-deep">
              {currentCourse.instructor}
            </span>
          </div>
        </div>

        {/* Lessons Accordion */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-deep">
              Учебные занятия и материалы курса ({currentCourse.lessons.length})
            </span>
            <span className="text-xs text-content-secondary">
              Нажмите на занятие для просмотра презентаций
            </span>
          </div>

          {currentCourse.lessons.map((lesson) => {
            const isExpanded = lesson.id === expandedLessonId;
            return (
              <div
                key={lesson.id}
                className="border border-surface-border rounded-lg overflow-hidden transition-all bg-white"
              >
                {/* Lesson Header */}
                <button
                  type="button"
                  onClick={() => setExpandedLessonId(isExpanded ? '' : lesson.id)}
                  className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-blue-50 text-military-blue font-bold text-xs flex items-center justify-center shrink-0">
                      {lesson.number}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-navy-deep">
                        Занятие {lesson.number}. {lesson.title}
                      </h4>
                      <p className="text-[11px] text-content-secondary line-clamp-1">
                        {lesson.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-content-secondary font-medium">
                      {lesson.materials.length} файл(ов)
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-content-secondary" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-content-secondary" />
                    )}
                  </div>
                </button>

                {/* Lesson Materials (Expanded Content) */}
                {isExpanded && (
                  <div className="px-4 py-4 bg-surface-bg/40 border-t border-surface-border space-y-2.5 animate-slide-up">
                    <p className="text-xs text-content-secondary mb-3">
                      {lesson.description}
                    </p>

                    <div className="space-y-2">
                      {lesson.materials.map((mat) => {
                        const isPresentation = mat.type === 'presentation';
                        return (
                          <div
                            key={mat.id}
                            className="bg-white border border-surface-border rounded-md p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs hover:border-slate-300 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                                  isPresentation
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-blue-100 text-military-blue'
                                }`}
                              >
                                {isPresentation ? (
                                  <Presentation className="w-4 h-4" />
                                ) : (
                                  <FileText className="w-4 h-4" />
                                )}
                              </div>
                              <div>
                                <div className="text-xs sm:text-sm font-semibold text-navy-deep">
                                  {mat.title}
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-content-secondary mt-0.5">
                                  <span className="font-mono">{mat.fileName}</span>
                                  <span>•</span>
                                  <span>{mat.fileSize}</span>
                                  <span
                                    className={`px-1.5 py-0.2 rounded text-[10px] font-bold border uppercase ${getFormatBadge(
                                      mat.format
                                    )}`}
                                  >
                                    {mat.format}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDownload(mat)}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-navy-deep bg-slate-100 hover:bg-slate-200 border border-slate-300/80 rounded transition-colors shrink-0 self-start sm:self-auto"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>{isPresentation ? 'Скачать презентацию' : 'Скачать'}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
