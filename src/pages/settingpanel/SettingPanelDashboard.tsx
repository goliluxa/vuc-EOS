import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, LogOut, Shield, BookMarked, CalendarCheck, FolderArchive, ArrowRight, ArrowLeft } from 'lucide-react';
import { BrandLogo } from '../../components/BrandLogo';
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
                  Командный пульт
                </span>
              </div>
            </Link>
          </div>

          {/* Sidebar Navigation */}
          <nav className="p-2 space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs sm:text-sm transition-colors cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-blue-50/90 text-military-blue font-semibold border border-blue-200/70 shadow-xs'
                  : 'text-content-primary hover:bg-slate-100 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className={`w-4 h-4 ${activeTab === 'users' ? 'text-military-blue' : 'text-slate-500'}`} />
                <span>Личный состав</span>
              </div>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 text-slate-600 font-bold">
                {users.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs sm:text-sm transition-colors cursor-pointer ${
                activeTab === 'courses'
                  ? 'bg-blue-50/90 text-military-blue font-semibold border border-blue-200/70 shadow-xs'
                  : 'text-content-primary hover:bg-slate-100 font-medium'
              }`}
            >
              <BookMarked className={`w-4 h-4 ${activeTab === 'courses' ? 'text-military-blue' : 'text-slate-500'}`} />
              <span>Курсы ВУЦ</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs sm:text-sm transition-colors cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-blue-50/90 text-military-blue font-semibold border border-blue-200/70 shadow-xs'
                  : 'text-content-primary hover:bg-slate-100 font-medium'
              }`}
            >
              <CalendarCheck className={`w-4 h-4 ${activeTab === 'events' ? 'text-military-blue' : 'text-slate-500'}`} />
              <span>Мероприятия</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('storage')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs sm:text-sm transition-colors cursor-pointer ${
                activeTab === 'storage'
                  ? 'bg-blue-50/90 text-military-blue font-semibold border border-blue-200/70 shadow-xs'
                  : 'text-content-primary hover:bg-slate-100 font-medium'
              }`}
            >
              <FolderArchive className={`w-4 h-4 ${activeTab === 'storage' ? 'text-military-blue' : 'text-slate-500'}`} />
              <span>Хранилище</span>
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
