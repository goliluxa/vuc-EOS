import React, { useState } from 'react';
import { X, UserPlus, Key, Shield, User, Sparkles } from 'lucide-react';
import { CreateUserPayload, UserRole } from '../../../types/admin';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payload: CreateUserPayload) => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [fullName, setFullName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('cadet');
  const [unitOrDepartment, setUnitOrDepartment] = useState('');

  if (!isOpen) return null;

  const handleGeneratePassword = () => {
    const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$';
    let generated = '';
    for (let i = 0; i < 10; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !login.trim() || !password.trim()) return;

    onCreate({
      fullName: fullName.trim(),
      login: login.trim().toLowerCase(),
      password: password.trim(),
      role,
      unitOrDepartment: unitOrDepartment.trim() || 'Основное подразделение',
    });

    setFullName('');
    setLogin('');
    setPassword('');
    setRole('cadet');
    setUnitOrDepartment('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/60 backdrop-blur-xs animate-fade-in"
    >
      <div className="bg-white rounded-lg border border-surface-border shadow-modal w-full max-w-lg overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border bg-surface-bg/50">
          <div className="flex items-center gap-2 text-navy-deep">
            <UserPlus className="w-5 h-5 text-military-red" aria-hidden="true" />
            <h2 id="modal-title" className="text-base font-bold">
              Создание новой учётной записи
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-content-secondary hover:text-navy-deep p-1 rounded-md transition-colors"
            aria-label="Закрыть модальное окно"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1">
              ФИО пользователя <span className="text-military-red">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-content-secondary/60" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Иванов Иван Иванович"
                className="w-full pl-9 pr-3 py-2 text-sm text-content-primary bg-white border border-surface-border rounded-md placeholder:text-content-secondary/40 focus:border-military-blue focus:ring-1 focus:ring-military-blue outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1">
                Логин <span className="text-military-red">*</span>
              </label>
              <input
                type="text"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="ivanov_ii"
                className="w-full px-3 py-2 text-sm text-content-primary bg-white border border-surface-border rounded-md placeholder:text-content-secondary/40 focus:border-military-blue focus:ring-1 focus:ring-military-blue outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1">
                Роль в системе
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 w-4 h-4 text-content-secondary/60" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full pl-9 pr-8 py-2 text-sm text-content-primary bg-white border border-surface-border rounded-md focus:border-military-blue focus:ring-1 focus:ring-military-blue outline-none appearance-none"
                >
                  <option value="cadet">Курсант</option>
                  <option value="teacher">Преподаватель</option>
                  <option value="officer">Офицер-воспитатель</option>
                  <option value="admin">Администратор</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-content-secondary">
                Пароль <span className="text-military-red">*</span>
              </label>
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="text-xs text-military-blue hover:text-navy-brand font-medium inline-flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Сгенерировать</span>
              </button>
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-3 w-4 h-4 text-content-secondary/60" />
              <input
                type="text"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль пользователя"
                className="w-full pl-9 pr-3 py-2 text-sm text-content-primary bg-white border border-surface-border rounded-md placeholder:text-content-secondary/40 focus:border-military-blue focus:ring-1 focus:ring-military-blue outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-content-secondary mb-1">
              Взвод / Кафедра / Подразделение
            </label>
            <input
              type="text"
              value={unitOrDepartment}
              onChange={(e) => setUnitOrDepartment(e.target.value)}
              placeholder="Взвод 141 или Кафедра общевоенной подготовки"
              className="w-full px-3 py-2 text-sm text-content-primary bg-white border border-surface-border rounded-md placeholder:text-content-secondary/40 focus:border-military-blue focus:ring-1 focus:ring-military-blue outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-surface-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-content-secondary hover:text-content-primary border border-surface-border rounded-md bg-white hover:bg-surface-bg transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-military-red hover:bg-military-redHover active:bg-red-800 rounded-md shadow-xs transition-colors"
            >
              Создать пользователя
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
