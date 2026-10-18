import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { BrandLogo } from '../../components/BrandLogo';
import { BackgroundPattern } from '../../components/BackgroundPattern';
import { adminAuthService } from '../../services/adminAuthService';

interface SettingPanelLoginPageProps {
  onLoginSuccess: () => void;
}

export const SettingPanelLoginPage: React.FC<SettingPanelLoginPageProps> = ({
  onLoginSuccess,
}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const success = adminAuthService.login(login, password);
    if (success) {
      onLoginSuccess();
    } else {
      setErrorMessage(
        'Неверный логин или пароль администратора. Проверьте введённые данные.'
      );
    }
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
              Вход в настройки
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
                htmlFor="setting-login"
                className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5"
              >
                Логин
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-content-secondary">
                  <User className="w-4 h-4" aria-hidden="true" />
                </div>
                <input
                  id="setting-login"
                  name="login"
                  type="text"
                  required
                  autoComplete="username"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Введите логин администратора"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm text-content-primary bg-white border border-surface-border rounded-md placeholder:text-content-secondary/50 focus:border-military-blue focus:ring-1 focus:ring-military-blue transition-colors outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="setting-password"
                className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1.5"
              >
                Пароль
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-content-secondary">
                  <Lock className="w-4 h-4" aria-hidden="true" />
                </div>
                <input
                  id="setting-password"
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

            <div className="pt-3 border-t border-surface-border">
              <p className="text-[11px] text-content-secondary mb-2 text-center font-medium">
                Быстрый вход для тестирования:
              </p>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setLogin('goliluha');
                    setPassword('P17133p17133');
                    setErrorMessage(null);
                  }}
                  className="px-2.5 py-1.5 bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 rounded text-left transition-colors font-medium flex items-center justify-between"
                  title="Сисадмин: goliluha / P17133p17133"
                >
                  <span>Сисадмин</span>
                  <span className="text-[10px] text-slate-400 font-mono">ROOT</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLogin('morozov_vn');
                    setPassword('officer_morozov');
                    setErrorMessage(null);
                  }}
                  className="px-2.5 py-1.5 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 rounded text-left transition-colors font-medium flex items-center justify-between"
                  title="Начальник: morozov_vn / officer_morozov"
                >
                  <span>Начальник</span>
                  <span className="text-[10px] text-slate-400 font-mono">УЧ</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Bottom spacer */}
      <div className="h-4 sm:h-6" aria-hidden="true" />
    </div>
  );
};
