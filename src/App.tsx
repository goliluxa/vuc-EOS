import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SettingPanelPage } from './pages/settingpanel/SettingPanelPage';

export const App: React.FC = () => {
  return (
    <SiteSettingsProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settingpanel" element={<SettingPanelPage />} />
        <Route path="/settingspanel" element={<Navigate to="/settingpanel" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteSettingsProvider>
  );
};
