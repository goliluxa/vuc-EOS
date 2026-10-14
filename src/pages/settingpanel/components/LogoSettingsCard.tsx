import React, { useState, useRef } from 'react';
import { Upload, RotateCcw, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { useSiteSettings } from '../../../context/SiteSettingsContext';

export const LogoSettingsCard: React.FC = () => {
  const { logoUrl, isCustomLogo, setCustomLogo, resetLogo } = useSiteSettings();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFeedback({ type: 'error', text: 'Пожалуйста, выберите файл изображения (PNG, SVG, JPG, WebP).' });
      return;
    }

    // Limit to 2.5 MB for performance
    if (file.size > 2.5 * 1024 * 1024) {
      setFeedback({ type: 'error', text: 'Размер файла не должен превышать 2.5 МБ.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomLogo(reader.result);
        setFeedback({ type: 'success', text: 'Логотип успешно обновлён и сохранён в настройках системы!' });
      }
    };
    reader.onerror = () => {
      setFeedback({ type: 'error', text: 'Ошибка при чтении файла изображения.' });
    };
    reader.readAsDataURL(file);

    // Clear input value so same file can be re-selected if needed
    e.target.value = '';
  };

  const handleReset = () => {
    resetLogo();
    setFeedback({ type: 'success', text: 'Восстановлен оригинальный стандартный логотип ВУЦ.' });
  };

  return (
    <div className="bg-white border border-surface-border rounded-lg shadow-card p-5 sm:p-7">
      <div className="flex items-center gap-3 pb-4 mb-5 border-b border-surface-border">
        <div className="w-9 h-9 rounded-md bg-blue-50 text-military-blue flex items-center justify-center shrink-0">
          <ImageIcon className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-navy-deep leading-snug">
            Управление логотипом сайта
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary">
            Настройте отображение эмблемы в шапке сайта и на страницах системы
          </p>
        </div>
      </div>

      {feedback && (
        <div
          role="status"
          className={`mb-5 p-3 rounded-md text-xs sm:text-sm flex items-start gap-2.5 animate-fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-military-red'
          }`}
        >
          {feedback.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <AlertCircle className="w-4 h-4 text-military-red shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <p className="leading-relaxed font-medium">{feedback.text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Preview */}
        <div className="bg-surface-bg/70 border border-surface-border/80 rounded-lg p-5 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-content-secondary mb-4">
            Текущий логотип
          </span>
          <div className="w-32 h-32 sm:w-36 sm:h-36 bg-white border border-surface-border rounded-lg shadow-xs flex items-center justify-center p-3 mb-4">
            <img
              src={logoUrl}
              alt="Предпросмотр текущего логотипа"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-white border-surface-border text-navy-deep">
            <span
              className={`w-2 h-2 rounded-full ${
                isCustomLogo ? 'bg-amber-500' : 'bg-military-blue'
              }`}
            />
            <span>{isCustomLogo ? 'Пользовательский логотип' : 'Стандартная эмблема ВУЦ'}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-semibold text-navy-deep mb-1">
              Загрузить собственное изображение
            </h3>
            <p className="text-xs text-content-secondary leading-relaxed mb-3">
              Рекомендуется изображение в формате PNG с прозрачным фоном или SVG, квадратной формы, разрешением от 256×256 px.
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              className="hidden"
              id="admin-logo-upload"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-military-blue hover:bg-navy-brand active:bg-navy-deep rounded-md transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-military-blue focus-visible:ring-offset-2"
            >
              <Upload className="w-4 h-4" aria-hidden="true" />
              <span>Выбрать файл и установить</span>
            </button>
          </div>

          <div className="pt-3 border-t border-surface-border">
            <h3 className="text-sm font-semibold text-navy-deep mb-1">
              Сброс к заводским настройкам
            </h3>
            <p className="text-xs text-content-secondary leading-relaxed mb-3">
              Вернуть официальную эмблему Военного учебного центра ЧувГУ.
            </p>

            <button
              type="button"
              onClick={handleReset}
              disabled={!isCustomLogo}
              className={`inline-flex items-center justify-center gap-2 w-full py-2 px-3 text-xs sm:text-sm font-medium rounded-md border transition-colors ${
                isCustomLogo
                  ? 'border-surface-border text-content-primary bg-white hover:bg-surface-bg focus-visible:ring-2 focus-visible:ring-military-blue'
                  : 'border-transparent text-content-secondary/40 bg-surface-bg cursor-not-allowed'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Сбросить к стандартному логотипу</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
