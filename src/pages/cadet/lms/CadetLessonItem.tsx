import React from 'react';
import { ChevronDown, ChevronRight, Clock, User, CheckCircle2 } from 'lucide-react';
import { CourseLesson, LessonMaterial } from '../../../types/cadet';
import { CadetMaterialCard } from './CadetMaterialCard';

interface CadetLessonItemProps {
  lesson: CourseLesson;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onPreviewMaterial: (material: LessonMaterial, lessonTitle: string) => void;
  onDownloadMaterial: (material: LessonMaterial) => void;
}

export const CadetLessonItem: React.FC<CadetLessonItemProps> = ({
  lesson,
  isExpanded,
  onToggleExpand,
  onPreviewMaterial,
  onDownloadMaterial,
}) => {
  const isCompleted = lesson.number === 1;
  const isCurrent = lesson.number === 2;

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 bg-white ${
        isExpanded
          ? 'border-military-blue/40 shadow-sm'
          : 'border-surface-border hover:border-slate-300 shadow-xs'
      }`}
    >
      {/* Lesson Header Button */}
      <button
        type="button"
        onClick={onToggleExpand}
        className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-slate-50/80 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-8 h-8 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : isCurrent
                ? 'bg-blue-100 text-military-blue border border-blue-200 font-extrabold'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {lesson.number}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-bold text-navy-deep">
                Занятие {lesson.number}. {lesson.title}
              </h3>
              {isCompleted && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Изучено</span>
                </span>
              )}
              {isCurrent && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-military-blue bg-blue-50 px-2 py-0.2 rounded border border-blue-200">
                  <span>Текущее занятие</span>
                </span>
              )}
            </div>

            <p className="text-[11px] sm:text-xs text-content-secondary line-clamp-1 mt-0.5">
              {lesson.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md hidden sm:inline-block">
            {lesson.materials.length} файл(ов)
          </span>

          <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-200 transition-colors">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-military-blue" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded Details and Materials */}
      {isExpanded && (
        <div className="px-4 sm:px-5 py-4 bg-slate-50/60 border-t border-surface-border space-y-4 animate-slide-up">
          {/* Metadata banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 bg-white p-3 rounded-lg border border-surface-border">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 font-medium text-navy-deep">
                <Clock className="w-3.5 h-3.5 text-military-blue" />
                <span>{lesson.hours} академических часа</span>
              </div>
              <div className="flex items-center gap-1.5 text-content-secondary">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Преподаватель: {lesson.instructor}</span>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-military-blue">
              Всего материалов: {lesson.materials.length}
            </span>
          </div>

          {/* Materials List */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-navy-deep uppercase tracking-wider">
              Учебные файлы к занятию:
            </div>
            {lesson.materials.map((mat) => (
              <CadetMaterialCard
                key={mat.id}
                material={mat}
                onPreview={(m) => onPreviewMaterial(m, `Занятие ${lesson.number}. ${lesson.title}`)}
                onDownload={onDownloadMaterial}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
