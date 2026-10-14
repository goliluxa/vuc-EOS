import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import defaultEmblem from '../assets/images/vuc-emblem.png';

const CUSTOM_LOGO_STORAGE_KEY = 'vuc_custom_logo_data';

interface SiteSettingsContextValue {
  logoUrl: string;
  isCustomLogo: boolean;
  setCustomLogo: (dataUrl: string) => void;
  resetLogo: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customLogo, setCustomLogoState] = useState<string | null>(() => {
    try {
      return localStorage.getItem(CUSTOM_LOGO_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const setCustomLogo = (dataUrl: string) => {
    setCustomLogoState(dataUrl);
    try {
      localStorage.setItem(CUSTOM_LOGO_STORAGE_KEY, dataUrl);
    } catch (e) {
      console.warn('Не удалось сохранить логотип в localStorage:', e);
    }
  };

  const resetLogo = () => {
    setCustomLogoState(null);
    try {
      localStorage.removeItem(CUSTOM_LOGO_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  // Sync state if modified in another tab
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CUSTOM_LOGO_STORAGE_KEY) {
        setCustomLogoState(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const logoUrl = customLogo || defaultEmblem;
  const isCustomLogo = Boolean(customLogo);

  return (
    <SiteSettingsContext.Provider
      value={{
        logoUrl,
        isCustomLogo,
        setCustomLogo,
        resetLogo,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = (): SiteSettingsContextValue => {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return ctx;
};
