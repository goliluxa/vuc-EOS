import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CadetSidebar, CadetLmsSection } from './CadetSidebar';
import { CadetTopbar } from './CadetTopbar';
import { CadetScheduleSection } from './CadetScheduleSection';
import { CadetCoursesSection } from './CadetCoursesSection';
import { cadetAuthService } from '../../../services/cadetAuthService';
import { courseService } from '../../../services/courseService';

export const CadetLmsPage: React.FC = () => {
  const navigate = useNavigate();
  const currentCadet = cadetAuthService.getCurrentCadet();

  const [activeSection, setActiveSection] = useState<CadetLmsSection>('schedule');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedCourse = selectedCourseId
    ? courseService.getCourseById(selectedCourseId)
    : null;

  const handleLogout = () => {
    cadetAuthService.logoutCadet();
    navigate('/login');
  };

  const handleSelectSection = (sec: CadetLmsSection) => {
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
        return 'Курсы военной подготовки и материалы';
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
            />
          )}
        </main>
      </div>
    </div>
  );
};
