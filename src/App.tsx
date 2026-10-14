import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SettingPanelPage } from './pages/settingpanel/SettingPanelPage';
import { CadetPortalPage } from './pages/cadet/CadetPortalPage';
import { CadetLmsPage } from './pages/cadet/lms/CadetLmsPage';
import { libraryService } from './services/libraryService';

const LibraryRedirect: React.FC = () => {
  React.useEffect(() => {
    window.location.href = libraryService.getLibraryUrl();
  }, []);
  return null;
};

export const App: React.FC = () => {
  return (
    <SiteSettingsProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portal" element={<CadetPortalPage />} />
        <Route path="/cadet" element={<Navigate to="/portal" replace />} />
        <Route path="/cadet/lms" element={<CadetLmsPage />} />
        <Route path="/lms" element={<Navigate to="/cadet/lms" replace />} />
        <Route path="/library" element={<LibraryRedirect />} />
        <Route path="/settingpanel" element={<SettingPanelPage />} />
        <Route path="/settingspanel" element={<Navigate to="/settingpanel" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteSettingsProvider>
  );
};
