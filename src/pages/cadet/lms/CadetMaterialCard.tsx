import React from 'react';
import { FileText, Download, Eye, Presentation, FileCheck } from 'lucide-react';
import { LessonMaterial } from '../../../types/cadet';

interface CadetMaterialCardProps {
  material: LessonMaterial;
  onPreview: (material: LessonMaterial) => void;
  onDownload: (material: LessonMaterial) => void;
}

export const CadetMaterialCard: React.FC<CadetMaterialCardProps> = ({
  material,
  onPreview,
  onDownload,
}) => {
  const isPresentation = material.type === 'presentation';
  const isTest = material.type === 'test';

  const getFormatBadgeStyle = (format: LessonMaterial['format']) => {
    switch (format) {
      case 'PPTX':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'PDF':
        return 'bg-red-50 text-military-red border-red-300';
      case 'DOCX':
        return 'bg-blue-50 text-military-blue border-blue-300';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-300';
    }
  };

  const getIconWrapper = () => {
    if (isPresentation) {
      return (
        <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-xs">
          <Presentation className="w-5 h-5" />
        </div>
      );
    }
    if (isTest) {
      return (
        <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-xs">
          <FileCheck className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-9 h-9 rounded-lg bg-blue-100 text-military-blue flex items-center justify-center shrink-0 shadow-xs">
        <FileText className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="bg-white border border-surface-border hover:border-military-blue/40 rounded-lg p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs hover:shadow-sm transition-all">
      <div className="flex items-start gap-3 min-w-0">
        {getIconWrapper()}
        <div className="min-w-0">
          <h4 className="text-xs sm:text-sm font-bold text-navy-deep leading-snug truncate">
            {material.title}
          </h4>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-content-secondary mt-1">
            <span className="font-mono text-slate-600 truncate max-w-[200px] sm:max-w-none">
              {material.fileName}
            </span>
            <span>•</span>
            <span className="font-medium text-slate-700">{material.fileSize}</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[10px] font-bold border uppercase tracking-wider ${getFormatBadgeStyle(
                material.format
              )}`}
            >
              {material.format}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
        <button
          type="button"
          onClick={() => onPreview(material)}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-navy-deep bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors"
          title="Быстрый просмотр описания материала"
        >
          <Eye className="w-3.5 h-3.5 text-slate-500" />
          <span>Просмотр</span>
        </button>

        <button
          type="button"
          onClick={() => onDownload(material)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-military-blue hover:bg-navy-deep rounded-md shadow-xs transition-colors"
          title={`Скачать файл «${material.fileName}»`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Скачать</span>
        </button>
      </div>
    </div>
  );
};
