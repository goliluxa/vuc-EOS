import React, { useState } from 'react';
import { Users, UserPlus, Search, Trash2, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { ManagedUser, UserRole } from '../../../types/admin';

interface UsersTableProps {
  users: ManagedUser[];
  onOpenCreateModal: () => void;
  onDeleteUser: (id: string) => void;
  onResetUsers: () => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onOpenCreateModal,
  onDeleteUser,
  onResetUsers,
}) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Hidden role: System admin should never be displayed in the users management table
  const visibleUsers = users.filter((u) => u.role !== 'admin');

  const filteredUsers = visibleUsers.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.login.toLowerCase().includes(search.toLowerCase()) ||
      u.unitOrDepartment.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === 'all' || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'cadet':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-military-blue border border-blue-200">
            Курсант
          </span>
        );
      case 'teacher':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Преподаватель
          </span>
        );
      case 'officer':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            Начальник ВУЦ
          </span>
        );
      case 'methodist':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            Методист
          </span>
        );
      case 'deputy':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            Зам. начальника
          </span>
        );
      case 'admin':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            Администратор
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-surface-border rounded-xl shadow-xs p-5 sm:p-6 space-y-4">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-military-blue flex items-center justify-center shrink-0 font-bold border border-blue-200/60">
            <Users className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-navy-deep leading-snug">
                Пользователи и аккаунты
              </h2>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-surface-bg border border-surface-border text-navy-deep">
                {filteredUsers.length}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-content-secondary">
              Управление учётными записями курсантов, преподавателей и администрации
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={onResetUsers}
            title="Сбросить список к начальным демо-данным"
            className="p-2 text-content-secondary hover:text-navy-deep border border-surface-border rounded-lg hover:bg-surface-bg transition-colors"
            aria-label="Сбросить список пользователей"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-2 py-2 px-3.5 text-xs sm:text-sm font-semibold text-white bg-military-blue hover:bg-navy-deep rounded-lg transition-colors shadow-2xs cursor-pointer"
          >
            <UserPlus className="w-4 h-4" aria-hidden="true" />
            <span>Создать пользователя</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-content-secondary/60" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по ФИО, логину или группе..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm text-content-primary bg-white border border-surface-border rounded-lg placeholder:text-content-secondary/50 focus:border-military-blue focus:ring-1 focus:ring-military-blue outline-none"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'cadet', 'teacher', 'methodist', 'deputy', 'officer'] as const).map((r) => {
            const labels = {
              all: 'Все',
              cadet: 'Курсанты',
              teacher: 'Преподаватели',
              methodist: 'Методисты',
              deputy: 'Зам. начальника',
              officer: 'Начальник ВУЦ',
            };
            const active = roleFilter === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-military-blue text-white border-military-blue'
                    : 'bg-white text-content-secondary border-surface-border hover:bg-surface-bg'
                }`}
              >
                {labels[r]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-surface-border rounded-xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-surface-bg/80 border-b border-surface-border text-content-secondary uppercase text-[11px] font-semibold tracking-wider">
            <tr>
              <th className="px-4 py-3">ФИО / Пользователь</th>
              <th className="px-4 py-3">Логин</th>
              <th className="px-4 py-3">Роль</th>
              <th className="px-4 py-3">Пароль</th>
              <th className="px-4 py-3 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border bg-white">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-content-secondary">
                  Пользователи не найдены. Попробуйте изменить параметры поиска.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => {
                const isPassVisible = Boolean(visiblePasswords[u.id]);
                return (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3 font-medium text-navy-deep">
                      {u.fullName}
                    </td>
                    <td className="px-4 py-3 text-content-secondary font-mono text-xs">
                      {u.login}
                    </td>
                    <td className="px-4 py-3">{getRoleBadge(u.role)}</td>
                    <td className="px-4 py-3 font-mono text-xs text-content-secondary">
                      <div className="flex items-center gap-2">
                        <span>{isPassVisible ? u.password : '••••••••'}</span>
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(u.id)}
                          className="text-content-secondary/70 hover:text-navy-deep p-0.5"
                          title={isPassVisible ? 'Скрыть пароль' : 'Показать пароль'}
                        >
                          {isPassVisible ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {u.role !== 'admin' ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Удалить пользователя «${u.fullName}»?`)) {
                              onDeleteUser(u.id);
                            }
                          }}
                          className="text-content-secondary/70 hover:text-military-red p-1 rounded transition-colors"
                          title="Удалить аккаунт"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-[11px] text-content-secondary/50 italic">
                          Главный
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
