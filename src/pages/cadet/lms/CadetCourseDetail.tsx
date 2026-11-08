import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, ChevronsUpDown, Plus } from 'lucide-react';
import { CadetCourse, LessonMaterial } from '../../../types/cadet';
import { CadetCourseHero } from './CadetCourseHero';
import { CadetLessonItem } from './CadetLessonItem';
import { CadetMaterialPreviewModal } from './CadetMaterialPreviewModal';
import { AddLessonModal } from './AddLessonModal';
import { courseService } from '../../../services/courseService';

interface CadetCourseDetailProps {
  course: CadetCourse;
  onBack: () => void;
  isTeacher?: boolean;
  instructorName?: string;
}

export const CadetCourseDetail: React.FC<CadetCourseDetailProps> = ({
  course,
  onBack,
  isTeacher = false,
  instructorName = 'Преподаватель',
}) => {
  const [currentCourse, setCurrentCourse] = useState<CadetCourse>(course);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [expandedLessonId, setExpandedLessonId] = useState<string>(
    course.lessons[0]?.id || ''
  );
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [previewMaterial, setPreviewMaterial] = useState<{
    material: LessonMaterial;
    lessonTitle: string;
  } | null>(null);

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

  const handleToggleAll = () => {
    if (expandedLessonId) {
      setExpandedLessonId('');
    } else {
      setExpandedLessonId(course.lessons[0]?.id || '');
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-navy-deep bg-white hover:bg-slate-50 border border-surface-border hover:border-slate-300 rounded-lg shadow-xs transition-colors self-start"
          title="Вернуться к каталогу курсов"
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

      {/* Hero Course Card */}
      <CadetCourseHero
        course={course}
        totalMaterials={totalMaterials}
      />

      {/* Action Notification Toast */}
      {actionNotice && (
        <div
          role="status"
          className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs sm:text-sm flex items-center justify-between gap-2 shadow-xs animate-slide-up"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{actionNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionNotice(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold px-2 py-0.5"
          >
            Закрыть
          </button>
        </div>
      )}

      {/* Lessons and Materials Section */}
      <div className="bg-white border border-surface-border rounded-xl shadow-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-border">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-navy-deep">
              Тематический план и учебные материалы курса
            </h2>
            <p className="text-xs text-content-secondary mt-0.5">
              Нажмите на занятие для просмотра лекционных презентаций, методичек и вопросов самоконтроля
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {isTeacher && (
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-military-blue hover:bg-navy-deep rounded-md transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Добавить занятие</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleToggleAll}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-navy-deep bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors"
            >
              <ChevronsUpDown className="w-3.5 h-3.5" />
              <span>{expandedLessonId ? 'Свернуть' : 'Развернуть'}</span>
            </button>

            <span className="text-xs font-semibold text-military-blue bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              {currentCourse.lessons.length} занятий
            </span>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-3">
          {currentCourse.lessons.map((lesson) => (
            <CadetLessonItem
              key={lesson.id}
              lesson={lesson}
              isTeacher={isTeacher}
              onStatusChange={(newStatus) => {
                courseService.updateLessonStatus(currentCourse.id, lesson.id, newStatus);
                setCurrentCourse((prev) => ({
                  ...prev,
                  lessons: prev.lessons.map((l) =>
                    l.id === lesson.id ? { ...l, status: newStatus } : l
                  ),
                }));
                setActionNotice(`Статус занятия «${lesson.title}» изменен на «${newStatus === 'published' ? 'Открыто' : newStatus === 'scheduled' ? 'По расписанию' : 'Черновик'}»`);
                setTimeout(() => setActionNotice(null), 3000);
              }}
              isExpanded={lesson.id === expandedLessonId}
              onToggleExpand={() =>
                setExpandedLessonId(
                  lesson.id === expandedLessonId ? '' : lesson.id
                )
              }
              onPreviewMaterial={(material, lessonTitle) =>
                setPreviewMaterial({ material, lessonTitle })
              }
              onDownloadMaterial={handleDownload}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation & Summary Bar */}
      <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-surface-border shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          <span>Вернуться к списку курсов</span>
        </button>

        <div className="text-xs text-content-secondary font-medium">
          Всего тем в дисциплине: <span className="font-bold text-navy-deep">{course.lessons.length}</span> (108 акад. часов)
        </div>
      </div>

      {/* Quick Preview Modal */}
      {previewMaterial && (
        <CadetMaterialPreviewModal
          material={previewMaterial.material}
          lessonTitle={previewMaterial.lessonTitle}
          onClose={() => setPreviewMaterial(null)}
          onDownload={handleDownload}
        />
      )}

      {/* Modal for adding lesson (Teacher / Management) */}
      {isTeacher && (
        <AddLessonModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          instructorName={instructorName}
          onAddLesson={(lessonData) => {
            const newLesson = courseService.addLessonToCourse(currentCourse.id, lessonData);
            setCurrentCourse((prev) => ({
              ...prev,
              lessons: [...prev.lessons, newLesson],
            }));
            setExpandedLessonId(newLesson.id);
            setActionNotice(`Занятие «${newLesson.title}» успешно создано и сохранено!`);
            setTimeout(() => setActionNotice(null), 4000);
          }}
        />
      )}
    </div>
  );
};
