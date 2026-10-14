import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { BackgroundPattern } from '../components/BackgroundPattern';
import { cadetAuthService } from '../services/cadetAuthService';
import { adminAuthService } from '../services/adminAuthService';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. If admin credentials entered
    if (adminAuthService.login(login, password)) {
      navigate('/settingpanel');
      return;
    }

    // 2. Cadet login check
    const result = cadetAuthService.loginCadet(login, password);
    if (result.success) {
      navigate('/portal');
      return;
    }

    setErrorMessage(
      result.error || 'Неверный логин или пароль. Проверьте правильность введённых данных.'
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
              ИОС ВУЦ
            </h1>
            <p className="text-xs sm:text-sm text-content-secondary font-medium">
              Вход в систему
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-md text-xs sm:text-sm text-military-red flex items-start gap-2.5 animate-fade-in"
            >
              <AlertCircle className="w-4 h-4 text-military-red shrink-0 mt-0.5" aria-hidden="true" />
              <p className="leading-relaxed font-medium">{errorMessage}</p>
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

            <div className="pt-3 border-t border-surface-border text-center">
              <p className="text-[11px] text-content-secondary mb-1">
                Тестовый аккаунт курсанта:{' '}
                <span className="font-mono font-medium text-navy-deep">smirnov_av</span> /{' '}
                <span className="font-mono font-medium text-navy-deep">cadet_pass_141</span>
              </p>
              <button
                type="button"
                onClick={() => {
                  setLogin('smirnov_av');
                  setPassword('cadet_pass_141');
                  setErrorMessage(null);
                }}
                className="text-xs font-semibold text-military-blue hover:text-navy-brand underline transition-colors"
              >
                Заполнить данные курсанта
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Bottom spacer */}
      <div className="h-4 sm:h-6" aria-hidden="true" />
    </div>
  );
};
