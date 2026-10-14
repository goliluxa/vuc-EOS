import React, { useEffect } from 'react';
import { X, Download, FileText, Presentation, BookOpen, CheckCircle } from 'lucide-react';
import { LessonMaterial } from '../../../types/cadet';

interface CadetMaterialPreviewModalProps {
  material: LessonMaterial | null;
  lessonTitle: string;
  onClose: () => void;
  onDownload: (material: LessonMaterial) => void;
}

export const CadetMaterialPreviewModal: React.FC<CadetMaterialPreviewModalProps> = ({
  material,
  lessonTitle,
  onClose,
  onDownload,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!material) return null;

  const isPresentation = material.type === 'presentation';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="material-preview-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-deep/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-surface-border overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-surface-border flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                isPresentation
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-blue-100 text-military-blue'
              }`}
            >
              {isPresentation ? (
                <Presentation className="w-5 h-5" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </div>
            <div className="min-w-0">
              <h3
                id="material-preview-title"
                className="text-sm sm:text-base font-bold text-navy-deep truncate"
              >
                {material.title}
              </h3>
              <p className="text-xs text-content-secondary truncate">{lessonTitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-content-secondary hover:text-navy-deep hover:bg-slate-200/60 rounded-md transition-colors shrink-0"
            aria-label="Закрыть предпросмотр"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body / Preview */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-700">
          <div className="p-4 rounded-lg bg-blue-50/60 border border-blue-200/60 flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-military-blue shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <span className="font-semibold text-navy-deep">
                Официальный учебный материал кафедры ВУЦ.
              </span>
              <p className="text-content-secondary mt-0.5">
                Материал проверен учебно-методическим отделом и допущен к изучению курсантами
                в соответствии с программой военной подготовки.
              </p>
            </div>
          </div>

          <div className="border border-surface-border rounded-lg p-4 bg-slate-50/50 space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-navy-deep">Характеристики документа:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-content-secondary">Имя файла:</span>{' '}
                <span className="font-mono font-medium text-navy-deep">{material.fileName}</span>
              </div>
              <div>
                <span className="text-content-secondary">Размер:</span>{' '}
                <span className="font-medium text-navy-deep">{material.fileSize}</span>
              </div>
              <div>
                <span className="text-content-secondary">Формат:</span>{' '}
                <span className="font-bold text-military-blue">{material.format}</span>
              </div>
              <div>
                <span className="text-content-secondary">Статус проверки:</span>{' '}
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" /> Актуален (2026/2027)
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs sm:text-sm leading-relaxed text-slate-600 bg-white border border-surface-border p-4 rounded-lg shadow-inner">
            <h4 className="font-bold text-navy-deep mb-2">Аннотация к материалу:</h4>
            <p>
              В данном файле содержатся ключевые теоретические положения, нормативные таблицы, схемы
              и практические рекомендации к занятию. Рекомендуется изучить материал перед началом
              практической отработки нормативов на занятиях взвода.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-surface-border flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-navy-deep hover:bg-slate-200/60 rounded-md transition-colors"
          >
            Закрыть
          </button>

          <button
            type="button"
            onClick={() => {
              onDownload(material);
              onClose();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-military-blue hover:bg-navy-deep rounded-md shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Скачать оригинал ({material.fileSize})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
