import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ExternalLink, LogOut, Shield, BookMarked, CalendarCheck, FolderArchive, ArrowRight } from 'lucide-react';
import { BrandLogo } from '../../components/BrandLogo';
import { BackgroundPattern } from '../../components/BackgroundPattern';
import { UsersTable } from './components/UsersTable';
import { CreateUserModal } from './components/CreateUserModal';
import { CadetStorageSection } from '../cadet/lms/CadetStorageSection';
import { userStorageService } from '../../services/userStorageService';
import { courseService } from '../../services/courseService';
import { CreateUserPayload } from '../../types/admin';
import { Plus, CheckCircle } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'users' | 'courses' | 'events' | 'storage'>('users');
  const [users, setUsers] = useState(() => userStorageService.getUsers());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [officerEvents, setOfficerEvents] = useState([
    { id: 'ev-1', title: 'Строевой смотр личного состава 1-го курса', date: '14 ноября 2026', time: '08:30', location: 'Строевой плац ВУЦ', status: 'Утверждено' },
    { id: 'ev-2', title: 'Контрольные стрельбы из АК-74', date: '21 ноября 2026', time: '09:00', location: 'Войсковой полигон', status: 'Планируется' },
    { id: 'ev-3', title: 'Торжественное принятие Военной присяги', date: '05 декабря 2026', time: '10:00', location: 'Мемориальный комплекс', status: 'Утверждено' },
  ]);
  const [isEventNotice, setIsEventNotice] = useState(false);

  const handleAddOfficerEvent = () => {
    const title = window.prompt('Название нового мероприятия:');
    if (title && title.trim()) {
      const newEv = {
        id: `ev-${Date.now()}`,
        title: title.trim(),
        date: '28 ноября 2026',
        time: '10:00',
        location: 'Строевой плац ВУЦ',
        status: 'Утверждено',
      };
      setOfficerEvents((prev) => [newEv, ...prev]);
      setIsEventNotice(true);
      setTimeout(() => setIsEventNotice(false), 3000);
    }
  };

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

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/portal"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-military-blue hover:text-navy-brand px-2.5 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
              title="Перейти в меню навигации"
            >
              <span>Навигация</span>
            </Link>

            <Link
              to="/"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-content-secondary hover:text-navy-brand px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>На сайт</span>
            </Link>

            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-surface-border text-xs">
              <span className="font-semibold text-navy-deep truncate max-w-[160px] sm:max-w-none">{adminUsername}</span>
              <span className="hidden sm:inline text-content-secondary/60">({adminRoleLabel || 'Админ'})</span>
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
            <span>Личный состав</span>
            <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-slate-100 text-navy-brand">
              {users.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('courses')}
            className={`inline-flex items-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-b-2 -mb-px ${
              activeTab === 'courses'
                ? 'border-military-blue text-navy-deep bg-white shadow-xs'
                : 'border-transparent text-content-secondary hover:text-content-primary hover:bg-white/50'
            }`}
          >
            <BookMarked className="w-4 h-4 text-military-blue" />
            <span>Курсы ВУЦ</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('events')}
            className={`inline-flex items-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-b-2 -mb-px ${
              activeTab === 'events'
                ? 'border-military-blue text-navy-deep bg-white shadow-xs'
                : 'border-transparent text-content-secondary hover:text-content-primary hover:bg-white/50'
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-military-blue" />
            <span>Мероприятия</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('storage')}
            className={`inline-flex items-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-b-2 -mb-px ${
              activeTab === 'storage'
                ? 'border-military-blue text-navy-deep bg-white shadow-xs'
                : 'border-transparent text-content-secondary hover:text-content-primary hover:bg-white/50'
            }`}
          >
            <FolderArchive className="w-4 h-4 text-emerald-700" />
            <span>Облако</span>
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

          {activeTab === 'courses' && (
            <div className="bg-white border border-surface-border rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <div>
                  <h3 className="text-base font-bold text-navy-deep">Единый фонд учебных курсов ВУЦ</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Инспекция и руководство учебными дисциплинами кафедр</p>
                </div>
                <Link
                  to="/cadet/lms"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-military-blue hover:bg-navy-deep rounded-lg shadow-2xs"
                >
                  <span>Открыть каталог LMS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {courseService.getCadetCourses().map((c) => (
                  <div key={c.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-military-blue">
                          {c.code}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{c.totalHours} ч.</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-xs mt-1">{c.title}</h4>
                      <span className="text-slate-500 text-[11px] block mt-0.5">{c.instructor}</span>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Тем: {c.lessons.length}</span>
                      <Link to="/cadet/lms" className="text-military-blue hover:underline font-bold">
                        Инспектировать →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="bg-white border border-surface-border rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                <div>
                  <h3 className="text-base font-bold text-navy-deep">План мероприятий и боевой готовности</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Общевуцевские построения, стрельбы, смотры</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddOfficerEvent}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-military-blue hover:bg-navy-deep rounded-lg shadow-2xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Создать приказ / мероприятие</span>
                </button>
              </div>
              {isEventNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Мероприятие успешно добавлено в общевуцевский план.</span>
                </div>
              )}
              <div className="space-y-2 text-xs">
                {officerEvents.map((ev) => (
                  <div key={ev.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 block">{ev.title}</span>
                      <span className="text-slate-500 text-[11px]">{ev.date} • {ev.time} • {ev.location}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                      ev.status === 'Утверждено'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-military-blue border border-blue-200'
                    }`}>
                      {ev.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-4">
              <div className="bg-white border border-surface-border rounded-xl p-5 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-navy-deep">Командный доступ к облачному хранилищу ВУЦ</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Супервайзер-управление директивами, приказами, фондами кафедр и взводов</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Полный доступ руководителя
                </span>
              </div>
              <CadetStorageSection />
            </div>
          )}
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
