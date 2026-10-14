import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CadetSidebar, CadetLmsSection } from './CadetSidebar';
import { CadetTopbar } from './CadetTopbar';
import { CadetScheduleSection } from './CadetScheduleSection';
import { CadetCoursesSection } from './CadetCoursesSection';
import { cadetAuthService } from '../../../services/cadetAuthService';

export const CadetLmsPage: React.FC = () => {
  const navigate = useNavigate();
  const currentCadet = cadetAuthService.getCurrentCadet();

  const [activeSection, setActiveSection] = useState<CadetLmsSection>('schedule');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    cadetAuthService.logoutCadet();
    navigate('/login');
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'schedule':
        return 'Расписание учебного военного дня';
      case 'courses':
        return 'Курсы военной подготовки и презентации';
      default:
        return 'Учебный процесс';
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case 'schedule':
        return '1 учебный день в неделю (4 занятия в месяц по графику взвода)';
      case 'courses':
        return 'Учебные программы, тематические занятия и презентации лекций';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex bg-surface-bg text-content-primary">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen z-30">
        <CadetSidebar
          activeSection={activeSection}
          onSelectSection={(sec) => setActiveSection(sec)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
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
              onSelectSection={(sec) => {
                setActiveSection(sec);
                setIsMobileMenuOpen(false);
              }}
              isCollapsed={false}
              onToggleCollapse={() => {}}
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

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {activeSection === 'schedule' && (
            <CadetScheduleSection initialPlatoon={currentCadet?.unitOrDepartment} />
          )}
          {activeSection === 'courses' && <CadetCoursesSection />}
        </main>

        <footer className="border-t border-surface-border bg-white/70 py-3 text-center text-xs text-content-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Военный учебный центр ЧГУ им. И. Н. Ульянова</span>
            <span className="text-[11px] font-mono text-content-secondary/70">
              ИОС ВУЦ LMS • Этап 1.0
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};
