import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAuthService } from '../../services/adminAuthService';
import { cadetAuthService } from '../../services/cadetAuthService';
import { SettingPanelLoginPage } from './SettingPanelLoginPage';
import { SettingPanelDashboard } from './SettingPanelDashboard';

export const SettingPanelPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    adminAuthService.isAuthenticated()
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    adminAuthService.logout();
    cadetAuthService.logout();
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return <SettingPanelLoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <SettingPanelDashboard
      onLogout={handleLogout}
      adminUsername={adminAuthService.getAdminUsername()}
      adminRoleLabel={adminAuthService.getCurrentAdminRoleLabel()}
    />
  );
};
