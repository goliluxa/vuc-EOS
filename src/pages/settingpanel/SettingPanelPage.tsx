import React, { useState } from 'react';
import { adminAuthService } from '../../services/adminAuthService';
import { SettingPanelLoginPage } from './SettingPanelLoginPage';
import { SettingPanelDashboard } from './SettingPanelDashboard';

export const SettingPanelPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    adminAuthService.isAuthenticated()
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    adminAuthService.logout();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <SettingPanelLoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <SettingPanelDashboard
      onLogout={handleLogout}
      adminUsername={adminAuthService.getAdminUsername()}
    />
  );
};
