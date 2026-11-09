import React, { useState } from 'react';
import { X, BookPlus } from 'lucide-react';

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCourse: (data: {
    code: string;
    title: string;
    department: string;
    instructor: string;
    description: string;
    totalHours: number;
  }) => void;
  defaultInstructor?: string;
}

export const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  isOpen,
  onClose,
  onCreateCourse,
  defaultInstructor = 'Преподаватель',
}) => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Военная подготовка');
  const [instructor, setInstructor] = useState(defaultInstructor);
  const [totalHours, setTotalHours] = useState(72);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;
    onCreateCourse({
      code: code.trim(),
      title: title.trim(),
      department: department.trim() || 'Военная подготовка',
      instructor: instructor.trim() || defaultInstructor,
      totalHours: Number(totalHours) || 72,
      description: description.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-surface-border rounded-xl shadow-2xl max-w-lg w-full p-6 animate-slide-up space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <BookPlus className="w-5 h-5 text-military-blue" />
            <h3 className="font-bold text-base text-navy-deep">
              Создать новый курс
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Шифр <span className="text-military-red">*</span>
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="СПП-101"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-military-blue font-mono uppercase"
              />
            </div>
            <div className="col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Название курса <span className="text-military-red">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Специальная подготовка"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-military-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Преподаватель
              </label>
              <input
                type="text"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                placeholder="Майор Ковалёв Д. С."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-military-blue"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Академические часы
              </label>
              <input
                type="number"
                min={12}
                max={240}
                value={totalHours}
                onChange={(e) => setTotalHours(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-military-blue font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Направление подготовки
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Военная подготовка"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-military-blue"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Описание дисциплины и учебные цели
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Изучение теории, материальной части и практических навыков..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-military-blue"
            />
          </div>

          <div className="pt-3 border-t border-surface-border flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-semibold cursor-pointer"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-military-blue hover:bg-navy-deep text-white rounded-lg font-semibold shadow-2xs cursor-pointer"
            >
              Создать курс
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
