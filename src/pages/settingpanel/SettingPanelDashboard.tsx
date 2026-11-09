import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, LogOut, Shield, ArrowLeft } from 'lucide-react';
import { BrandLogo } from '../../components/BrandLogo';
import { UsersTable } from './components/UsersTable';
import { CreateUserModal } from './components/CreateUserModal';
import { userStorageService } from '../../services/userStorageService';
import { CreateUserPayload } from '../../types/admin';

interface SettingPanelDashboardProps {
  onLogout: () => void;
  adminUsername: string;
  adminRoleLabel?: string;
}

export const SettingPanelDashboard: React.FC<SettingPanelDashboardProps> = ({
  onLogout,
  adminUsername,
  adminRoleLabel,
}) => {
  const [activeTab] = useState<'users'>('users');
  const [users, setUsers] = useState(() => userStorageService.getUsers());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateUser = (payload: CreateUserPayload) => {
    userStorageService.createUser(payload);
    setUsers(userStorageService.getUsers());
  };

  const handleDeleteUser = (id: string) => {
    userStorageService.deleteUser(id);
    setUsers(userStorageService.getUsers());
  };

  const handleResetUsers = () => {
    if (window.confirm('Сбросить список пользователей к стандартным демонстрационным данным?')) {
      const reset = userStorageService.resetToDefaults();
      setUsers(reset);
    }
  };

  return (
    <div className="min-h-screen flex bg-surface-bg text-content-primary">
      {/* Left Sidebar for Officer */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-white border-r border-surface-border shrink-0 sticky top-0 h-screen z-30 select-none">
        <div>
          <div className="h-16 flex items-center px-4 border-b border-surface-border">
            <Link
              to="/portal"
              className="flex items-center gap-2.5 group"
              title="Вернуться на экран навигации"
            >
              <BrandLogo size="sm" asLink={false} />
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-military-red leading-tight">
                  ИОС ВУЦ
                </span>
                <span className="text-[11px] text-content-secondary leading-tight">
                  Панель управления
                </span>
              </div>
            </Link>
          </div>

          {/* Sidebar Navigation */}
          <nav className="p-2 space-y-1">
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-xs sm:text-sm bg-blue-50/90 text-military-blue font-semibold border border-blue-200/70 shadow-xs cursor-default"
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-military-blue" />
                <span>Управление пользователями</span>
              </div>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 text-slate-600 font-bold">
                {users.filter((u) => u.role !== 'admin').length}
              </span>
            </button>

          </nav>
        </div>

        {/* Bottom Navigation Link */}
        <div className="p-2 border-t border-surface-border">
          <Link
            to="/portal"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-xs text-content-secondary hover:text-navy-deep hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>В главное меню</span>
          </Link>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="w-full bg-white border-b border-surface-border sticky top-0 z-20 shadow-xs">
          <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-military-red" />
              <h1 className="text-sm sm:text-base font-bold text-navy-deep">
                {activeTab === 'users' ? 'Личный состав ВУЦ' : activeTab === 'courses' ? 'Единый фонд учебных курсов' : activeTab === 'events' ? 'План военных мероприятий' : 'Облачное хранилище документов'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-navy-deep">{adminUsername}</span>
                <span className="text-content-secondary/70 font-medium">({adminRoleLabel || 'Начальник ВУЦ'})</span>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-military-red hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-6 py-5 max-w-7xl w-full mx-auto space-y-6">
        <div className="animate-fade-in">
            <UsersTable
              users={users}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
              onDeleteUser={handleDeleteUser}
              onResetUsers={handleResetUsers}
            />
        </div>
      </main>
      </div>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateUser}
      />
    </div>
  );
};
