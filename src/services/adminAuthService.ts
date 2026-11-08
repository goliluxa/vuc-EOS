import { userStorageService } from './userStorageService';

const SESSION_KEY = 'vuc_admin_auth_session';
const CURRENT_ADMIN_KEY = 'vuc_current_admin_user';

const getExpectedUsername = (): string => {
  return import.meta.env.VITE_ADMIN_USERNAME?.trim() || 'goliluha';
};

const getExpectedPassword = (): string => {
  return import.meta.env.VITE_ADMIN_PASSWORD?.trim() || 'P17133p17133';
};

export const adminAuthService = {
  getAdminUsername(): string {
    const current = this.getCurrentAdminInfo();
    if (current) {
      return current.fullName ? `${current.fullName}` : current.login;
    }
    return getExpectedUsername();
  },

  getCurrentAdminInfo(): { login: string; fullName: string; role: string } | null {
    try {
      const raw = sessionStorage.getItem(CURRENT_ADMIN_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  getCurrentAdminRoleLabel(): string {
    const current = this.getCurrentAdminInfo();
    if (current) {
      if (current.role === 'officer') return 'Начальник ВУЦ';
      if (current.role === 'admin') return 'Администратор';
    }
    return 'Администратор';
  },

  isAuthenticated(): boolean {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  },

  login(username: string, password: string): boolean {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    const expectedUser = getExpectedUsername().toLowerCase();
    const expectedPass = getExpectedPassword();

    // 1. Direct master credentials check
    if (cleanUser === expectedUser && cleanPass === expectedPass) {
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
        sessionStorage.setItem(
          CURRENT_ADMIN_KEY,
          JSON.stringify({
            login: 'goliluha',
            fullName: 'Администратор системы',
            role: 'admin',
          })
        );
      } catch {
        // Fallback if sessionStorage is disabled
      }
      return true;
    }

    // 2. Check managed users (admin or officer/начальник)
    const users = userStorageService.getUsers();
    const found = users.find(
      (u) =>
        u.login.toLowerCase() === cleanUser &&
        (u.role === 'admin' || u.role === 'officer')
    );

    if (found) {
      const isPasswordValid =
        found.password === cleanPass ||
        (found.role === 'admin' && cleanPass === expectedPass);

      if (isPasswordValid) {
        try {
          sessionStorage.setItem(SESSION_KEY, 'true');
          sessionStorage.setItem(
            CURRENT_ADMIN_KEY,
            JSON.stringify({
              login: found.login,
              fullName: found.fullName,
              role: found.role,
            })
          );
        } catch {
          // Fallback
        }
        return true;
      }
    }

    return false;
  },

  logout(): void {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(CURRENT_ADMIN_KEY);
    } catch {
      // Ignore storage errors
    }
  },
};
