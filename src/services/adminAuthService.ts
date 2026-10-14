const SESSION_KEY = 'vuc_admin_auth_session';

const getExpectedUsername = (): string => {
  return import.meta.env.VITE_ADMIN_USERNAME?.trim() || 'goliluha';
};

const getExpectedPassword = (): string => {
  return import.meta.env.VITE_ADMIN_PASSWORD?.trim() || 'P17133p17133';
};

export const adminAuthService = {
  getAdminUsername(): string {
    return getExpectedUsername();
  },

  isAuthenticated(): boolean {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  },

  login(username: string, password: string): boolean {
    const expectedUser = getExpectedUsername();
    const expectedPass = getExpectedPassword();

    if (username.trim() === expectedUser && password === expectedPass) {
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        // Fallback if sessionStorage is disabled
      }
      return true;
    }
    return false;
  },

  logout(): void {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore storage errors
    }
  },
};
