import React, { useState } from 'react';
import { X, Plus, FileText, Upload, Clock } from 'lucide-react';
import { LessonMaterial } from '../../../types/cadet';

interface AddLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLesson: (data: {
    title: string;
    description: string;
    hours: number;
    instructor: string;
    status: 'published' | 'draft' | 'scheduled';
    scheduledDate?: string;
    materials: LessonMaterial[];
  }) => void;
  instructorName: string;
}

export const AddLessonModal: React.FC<AddLessonModalProps> = ({
  isOpen,
  onClose,
  onAddLesson,
  instructorName,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState(4);
  const [status, setStatus] = useState<'published' | 'draft' | 'scheduled'>('published');
  const [scheduledDate, setScheduledDate] = useState('2026-11-21');
  const [materials, setMaterials] = useState<LessonMaterial[]>([
    {
      id: 'm-new-1',
      title: 'Презентация к занятию (лекционные слайды)',
      type: 'presentation',
      fileName: 'Лекционные_материалы.pptx',
      fileSize: '12.4 МБ',
      format: 'PPTX',
    },
  ]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddLesson({
      title: title.trim(),
      description: description.trim(),
      hours,
      instructor: instructorName,
      status,
      scheduledDate: status === 'scheduled' ? scheduledDate : undefined,
      materials,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-surface-border rounded-xl shadow-2xl max-w-lg w-full p-6 animate-slide-up space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-military-blue" />
            <h3 className="font-bold text-base text-navy-deep">
              Добавить занятие в курс
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Тема занятия <span className="text-military-red">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Порядок развертывания командно-штабной машины"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-military-blue text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Краткий конспект / описание темы
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Основные положения, изучаемые вопросы и учебные цели..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-military-blue text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Академические часы
              </label>
              <input
                type="number"
                min={1}
                max={12}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-military-blue text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Режим доступа курсантам
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-military-blue text-xs"
              >
                <option value="published">Опубликовано (доступно)</option>
                <option value="scheduled">По расписанию пары</option>
                <option value="draft">Черновик (скрыто)</option>
              </select>
            </div>
          </div>

          {status === 'scheduled' && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Дата открытия занятия:</span>
              </div>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="px-2 py-1 bg-white border border-amber-300 rounded text-xs outline-none"
              />
            </div>
          )}

          {/* Прикрепленные файлы */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-700 uppercase tracking-wider">Прикреплённые материалы ({materials.length})</span>
              <button
                type="button"
                onClick={() => {
                  setMaterials((prev) => [
                    ...prev,
                    {
                      id: `m-user-${Date.now()}`,
                      title: 'Методическое пособие (PDF)',
                      type: 'manual',
                      fileName: 'Методические_указания.pdf',
                      fileSize: '3.1 МБ',
                      format: 'PDF',
                    },
                  ]);
                }}
                className="inline-flex items-center gap-1 text-[11px] text-military-blue hover:underline font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Добавить файл</span>
              </button>
            </div>
            <div className="space-y-1.5">
              {materials.map((m) => (
                <div key={m.id} className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <Upload className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-700 truncate">{m.fileName}</span>
                    <span className="text-[10px] text-slate-400">({m.fileSize})</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                    {m.format}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-surface-border flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-semibold"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-military-blue hover:bg-navy-deep text-white rounded-lg font-semibold shadow-2xs"
            >
              Сохранить тему
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
