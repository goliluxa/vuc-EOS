import React, { useState, useEffect, useRef } from 'react';
import { FolderPlus, X, AlertCircle } from 'lucide-react';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (folderName: string) => Promise<void> | void;
}

const FORBIDDEN_CHARS_REGEX = /[/\\:*?"<>|]/;

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setFolderName('');
      setError(null);
      setIsSubmitting(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = folderName.trim();

    if (!trimmed) {
      setError('Название папки не может быть пустым');
      return;
    }

    if (FORBIDDEN_CHARS_REGEX.test(trimmed)) {
      setError('Название содержит недопустимые символы (/ \\ : * ? " < > |)');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await onCreate(trimmed);
      onClose();
    } catch {
      setError('Не удалось создать папку. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/40 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white border border-surface-border rounded-xl shadow-xl overflow-hidden animate-scale-up"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <FolderPlus className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-navy-deep">Создать новую папку</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-1.5">
              Название папки
            </label>
            <input
              ref={inputRef}
              type="text"
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Например: Методические материалы по тактике"
              className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg outline-none focus:border-military-blue focus:ring-1 focus:ring-military-blue transition-colors text-navy-deep"
            />
            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-military-red animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !folderName.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-military-blue hover:bg-navy-deep rounded-lg transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? 'Создание...' : 'Создать папку'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
