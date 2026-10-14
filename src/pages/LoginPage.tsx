import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, User, Eye, EyeOff, Info } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { BackgroundPattern } from '../components/BackgroundPattern';

export const LoginPage: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // На первом этапе Backend отсутствует — реальная авторизация будет подключена позднее.
    // Никаких фиктивных администраторов, имитаций входа или токенов в localStorage.
    setNotice(
      'Модуль авторизации находится на стадии разработки. Подключение учётных записей курсантов и преподавателей будет выполнено на следующем этапе.'
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-surface-bg text-content-primary overflow-x-hidden animate-fade-in">
      <BackgroundPattern showStar={false} />

      {/* Top Header */}
      <header className="w-full pt-6 sm:pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <BrandLogo size="md" />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-content-secondary hover:text-navy-brand transition-colors focus-visible:rounded-md"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>На главную</span>
          </Link>
        </div>
      </header>

      {/* Main Form Center Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md bg-white border border-surface-border rounded-lg shadow-card p-6 sm:p-8 animate-slide-up">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-navy-deep tracking-tight mb-1.5">
              Вход в систему
            </h1>
            <p className="text-xs sm:text-sm text-content-secondary font-medium">
              ИОС ВУЦ
            </p>
          </div>

          {/* Neutral Stage 1 Notice */}
          {notice && (
            <div
              role="status"
              className="mb-6 p-3.5 bg-blue-50/70 border border-blue-200 rounded-md text-xs sm:text-sm text-navy-brand flex items-start gap-2.5 animate-fade-in"
            >
              <Info className="w-4 h-4 text-military-blue shrink-0 mt-0.5" aria-hidden="true" />
              <p className="leading-relaxed">{notice}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login"
                className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5"
              >
                Логин
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-content-secondary">
                  <User className="w-4 h-4" aria-hidden="true" />
                </div>
                <input
                  id="login"
                  name="login"
                  type="text"
                  required
                  autoComplete="username"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Введите логин или табельный номер"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm text-content-primary bg-white border border-surface-border rounded-md placeholder:text-content-secondary/50 focus:border-military-blue focus:ring-1 focus:ring-military-blue transition-colors outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5"
              >
                Пароль
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-content-secondary">
                  <Lock className="w-4 h-4" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="w-full pl-9 pr-10 py-2.5 text-sm text-content-primary bg-white border border-surface-border rounded-md placeholder:text-content-secondary/50 focus:border-military-blue focus:ring-1 focus:ring-military-blue transition-colors outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-content-secondary hover:text-content-primary focus:outline-none"
                  aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Eye className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-military-red hover:bg-military-redHover active:bg-red-800 rounded-md transition-colors duration-150 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-military-red focus-visible:ring-offset-2"
              >
                Войти
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-surface-border text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-military-blue hover:text-navy-brand transition-colors focus-visible:rounded-md"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Вернуться на главную</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom spacer */}
      <div className="h-4 sm:h-6" aria-hidden="true" />
    </div>
  );
};
