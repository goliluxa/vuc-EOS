import React from 'react';
import {
  FileText,
  Download,
  ChevronDown,
  ChevronRight,
  Presentation,
} from 'lucide-react';
import { CourseLesson, LessonMaterial } from '../../../types/cadet';

interface CadetLessonItemProps {
  lesson: CourseLesson;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onDownloadMaterial: (material: LessonMaterial) => void;
}

export const CadetLessonItem: React.FC<CadetLessonItemProps> = ({
  lesson,
  isExpanded,
  onToggleExpand,
  onDownloadMaterial,
}) => {
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
    <div className="border border-surface-border rounded-lg overflow-hidden transition-all bg-white">
      {/* Lesson Header */}
      <button
        type="button"
        onClick={onToggleExpand}
        className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left hover:bg-slate-50/70 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-blue-50 text-military-blue font-bold text-xs flex items-center justify-center shrink-0">
            {lesson.number}
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-navy-deep">
              Занятие {lesson.number}. {lesson.title}
            </h3>
            <p className="text-[11px] text-content-secondary line-clamp-1 mt-0.5">
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
                    onClick={() => onDownloadMaterial(mat)}
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
};
