import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CadetSidebar, CadetLmsSection } from './CadetSidebar';
import { CadetTopbar } from './CadetTopbar';
import { CadetScheduleSection } from './CadetScheduleSection';
import { CadetCoursesSection } from './CadetCoursesSection';
import { CadetProfileSection } from './CadetProfileSection';
import { TeacherProfileSection } from './TeacherProfileSection';
import { CadetEventsSection } from './CadetEventsSection';
import { CadetStorageSection } from './CadetStorageSection';
import { CadetZachetkaSection } from './CadetZachetkaSection';
import { UsersTable } from '../../settingpanel/components/UsersTable';
import { CreateUserModal } from '../../settingpanel/components/CreateUserModal';
import { userStorageService } from '../../../services/userStorageService';
import { cadetAuthService } from '../../../services/cadetAuthService';
import { courseService } from '../../../services/courseService';

export const CadetLmsPage: React.FC = () => {
  const navigate = useNavigate();
  const currentCadet = cadetAuthService.getCurrentCadet();
  const isTeacher = currentCadet?.role === 'teacher';
  const isMethodist = currentCadet?.role === 'methodist';
  const isDeputy = currentCadet?.role === 'deputy';
  const isOfficer = currentCadet?.role === 'officer';
  const isCadet = currentCadet?.role === 'cadet';
  const canManageCourses = isTeacher || isMethodist || isDeputy || isOfficer;

  const [activeSection, setActiveSection] = useState<CadetLmsSection>(() =>
    isCadet ? 'schedule' : 'courses'
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [users, setUsers] = useState(() => userStorageService.getUsers());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const selectedCourse = selectedCourseId
    ? courseService.getCourseById(selectedCourseId)
    : null;

  const handleLogout = () => {
    cadetAuthService.logoutCadet();
    navigate('/');
  };

  const handleSelectSection = (sec: CadetLmsSection) => {
    if (isCadet && sec === 'storage') {
      setActiveSection('schedule');
      return;
    }
    setActiveSection(sec);
    if (sec === 'courses') {
      setSelectedCourseId(null);
    }
  };

  const getSectionTitle = () => {
    if (activeSection === 'courses' && selectedCourse) {
      return selectedCourse.title;
    }
    switch (activeSection) {
      case 'schedule':
        return 'Расписание учебного военного дня';
      case 'courses':
        return 'Курсы военной подготовки';
      case 'grades':
        return 'Электронная зачётная книжка и успеваемость';
      case 'storage':
        return 'Облачное файловое хранилище ВУЦ';
      case 'profile':
        return isDeputy ? 'Профиль заместителя начальника ВУЦ' : isTeacher ? 'Личный профиль преподавателя' : isMethodist ? 'Профиль методиста учебной части' : 'Личный профиль курсанта';
      case 'events':
        return 'Военные мероприятия и смотры';
      case 'personnel':
        return 'Реестр личного состава ВУЦ';
      default:
        return 'Учебный процесс';
    }
  };

  const getSectionDescription = () => {
    if (activeSection === 'courses' && selectedCourse) {
      return 'Учебная программа и материалы дисциплины';
    }
    return '';
  };

  return (
    <div className="min-h-screen flex bg-surface-bg text-content-primary">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen z-30">
        <CadetSidebar
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          userRole={currentCadet?.role}
        />
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Мобильное меню LMS"
        >
          <div
            className="fixed inset-0 bg-navy-deep/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative z-10 h-full w-64 bg-white animate-slide-up">
            <CadetSidebar
              activeSection={activeSection}
              userRole={currentCadet?.role}
              onSelectSection={(sec) => {
                handleSelectSection(sec);
                setIsMobileMenuOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <CadetTopbar
          title={getSectionTitle()}
          description={getSectionDescription()}
          cadet={currentCadet}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onLogout={handleLogout}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-3 sm:py-4">
          {activeSection === 'schedule' && (
            <CadetScheduleSection initialPlatoon={currentCadet?.unitOrDepartment} />
          )}
          {activeSection === 'courses' && (
            <CadetCoursesSection
              selectedCourseId={selectedCourseId}
              onSelectCourse={(id) => setSelectedCourseId(id)}
              isTeacher={canManageCourses}
              instructorName={currentCadet?.fullName}
            />
          )}
          {activeSection === 'grades' && (
            <CadetZachetkaSection />
          )}
          {activeSection === 'storage' && !isCadet && (
            <CadetStorageSection />
          )}
          {activeSection === 'events' && (
            <CadetEventsSection />
          )}
          {activeSection === 'personnel' && isOfficer && (
            <div className="space-y-4">
              <UsersTable
                users={users}
                onOpenCreateModal={() => setIsCreateModalOpen(true)}
                onDeleteUser={(id) => {
                  userStorageService.deleteUser(id);
                  setUsers(userStorageService.getUsers());
                }}
                onResetUsers={() => {
                  const reset = userStorageService.resetToDefaults();
                  setUsers(reset);
                }}
              />
              <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={(payload) => {
                  userStorageService.createUser(payload);
                  setUsers(userStorageService.getUsers());
                }}
              />
            </div>
          )}
          {activeSection === 'profile' && (
            isTeacher ? (
              <TeacherProfileSection
                user={currentCadet}
                onNavigateToCourses={() => handleSelectSection('courses')}
              />
            ) : (
              <CadetProfileSection user={currentCadet} />
            )
          )}
        </main>
      </div>
    </div>
  );
};
