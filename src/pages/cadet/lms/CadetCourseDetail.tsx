import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  User,
  Clock,
  Layers,
  Award,
  FileText,
} from 'lucide-react';
import { CadetCourse, LessonMaterial } from '../../../types/cadet';
import { CadetLessonItem } from './CadetLessonItem';

interface CadetCourseDetailProps {
  course: CadetCourse;
  onBack: () => void;
}

export const CadetCourseDetail: React.FC<CadetCourseDetailProps> = ({
  course,
  onBack,
}) => {
  const [expandedLessonId, setExpandedLessonId] = useState<string>(
    course.lessons[0]?.id || ''
  );
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const totalMaterials = course.lessons.reduce(
    (acc, l) => acc + l.materials.length,
    0
  );

  const handleDownload = (material: LessonMaterial) => {
    setActionNotice(`Файл «${material.fileName}» (${material.fileSize}) подготовлен к загрузке.`);
    setTimeout(() => {
      setActionNotice(null);
    }, 4000);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-navy-deep bg-white hover:bg-slate-50 border border-surface-border hover:border-slate-300 rounded-md shadow-xs transition-colors self-start"
          title="Вернуться к списку всех учебных курсов"
        >
          <ArrowLeft className="w-4 h-4 text-military-blue" />
          <span>Назад ко всем курсам</span>
        </button>

        <nav aria-label="Хлебные крошки" className="flex items-center gap-1.5 text-xs text-content-secondary">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-navy-deep hover:underline transition-colors"
          >
            Курсы военной подготовки
          </button>
          <span>/</span>
          <span className="font-semibold text-navy-deep truncate max-w-[240px] sm:max-w-none">
            {course.title}
          </span>
        </nav>
      </div>

      {/* Course Hero Banner */}
      <div className="bg-white border border-surface-border rounded-lg shadow-card p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-military-blue border border-blue-200 mb-2">
              <span>{course.code}</span>
              <span>•</span>
              <span>{course.department}</span>
            </div>

            <h1 className="text-lg sm:text-xl font-bold text-navy-deep leading-snug">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-content-secondary mt-2 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="shrink-0 bg-surface-bg/70 border border-surface-border p-3.5 rounded-lg flex flex-col gap-2 min-w-[220px]">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-content-secondary">
              Ответственный преподаватель
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-military-blue flex items-center justify-center font-bold text-xs shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-bold text-navy-deep truncate">
                  {course.instructor}
                </span>
                <span className="text-[11px] text-content-secondary truncate">
                  {course.department}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-surface-border text-xs">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-military-blue shrink-0" />
            <div>
              <div className="text-content-secondary text-[11px]">Нагрузка</div>
              <div className="font-bold text-navy-deep">{course.totalHours} ч. (пройдено {course.completedHours} ч.)</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-military-blue shrink-0" />
            <div>
              <div className="text-content-secondary text-[11px]">Учебные занятия</div>
              <div className="font-bold text-navy-deep">{course.lessons.length} тем</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-military-blue shrink-0" />
            <div>
              <div className="text-content-secondary text-[11px]">Материалы</div>
              <div className="font-bold text-navy-deep">{totalMaterials} файл(ов)</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-military-blue shrink-0" />
            <div>
              <div className="text-content-secondary text-[11px]">Форма контроля</div>
              <div className="font-bold text-navy-deep">Зачёт с оценкой</div>
            </div>
          </div>
        </div>
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

      {/* Lessons and Materials Section */}
      <div className="bg-white border border-surface-border rounded-lg shadow-card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-surface-border">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-navy-deep">
              Тематический план и учебные материалы курса
            </h2>
            <p className="text-xs text-content-secondary mt-0.5">
              Нажмите на занятие для просмотра и скачивания лекционных материалов
            </p>
          </div>
          <span className="text-xs font-semibold text-military-blue bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            {course.lessons.length} занятий
          </span>
        </div>

        <div className="space-y-3">
          {course.lessons.map((lesson) => (
            <CadetLessonItem
              key={lesson.id}
              lesson={lesson}
              isExpanded={lesson.id === expandedLessonId}
              onToggleExpand={() =>
                setExpandedLessonId(
                  lesson.id === expandedLessonId ? '' : lesson.id
                )
              }
              onDownloadMaterial={handleDownload}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
