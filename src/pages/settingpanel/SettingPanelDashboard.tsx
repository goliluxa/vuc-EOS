import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Image as ImageIcon, ExternalLink, LogOut, Shield } from 'lucide-react';
import { BrandLogo } from '../../components/BrandLogo';
import { BackgroundPattern } from '../../components/BackgroundPattern';
import { UsersTable } from './components/UsersTable';
import { LogoSettingsCard } from './components/LogoSettingsCard';
import { CreateUserModal } from './components/CreateUserModal';
import { userStorageService } from '../../services/userStorageService';
import { CreateUserPayload } from '../../types/admin';

interface SettingPanelDashboardProps {
  onLogout: () => void;
  adminUsername: string;
}

export const SettingPanelDashboard: React.FC<SettingPanelDashboardProps> = ({
  onLogout,
  adminUsername,
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'logo'>('users');
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
    <div className="relative min-h-screen flex flex-col bg-surface-bg text-content-primary">
      <BackgroundPattern showStar={false} />

      {/* Top Admin Header */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-surface-border sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" asLink={false} />
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-navy-deep text-xs font-semibold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-military-red" />
              <span>Панель настроек</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-content-secondary hover:text-navy-brand px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>На сайт</span>
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-surface-border text-xs">
              <span className="font-semibold text-navy-deep">{adminUsername}</span>
              <span className="hidden sm:inline text-content-secondary/60">(Админ)</span>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-military-red hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md transition-colors"
              title="Выйти из панели управления"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-surface-border pb-px">
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`inline-flex items-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-b-2 -mb-px ${
              activeTab === 'users'
                ? 'border-military-blue text-navy-deep bg-white shadow-xs'
                : 'border-transparent text-content-secondary hover:text-content-primary hover:bg-white/50'
            }`}
          >
            <Users className="w-4 h-4 text-military-blue" />
            <span>Пользователи и аккаунты</span>
            <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-slate-100 text-navy-brand">
              {users.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('logo')}
            className={`inline-flex items-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-b-2 -mb-px ${
              activeTab === 'logo'
                ? 'border-military-blue text-navy-deep bg-white shadow-xs'
                : 'border-transparent text-content-secondary hover:text-content-primary hover:bg-white/50'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-military-blue" />
            <span>Логотип и оформление</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'users' && (
            <UsersTable
              users={users}
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
              onDeleteUser={handleDeleteUser}
              onResetUsers={handleResetUsers}
            />
          )}

          {activeTab === 'logo' && <LogoSettingsCard />}
        </div>
      </main>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateUser}
      />
    </div>
  );
};
