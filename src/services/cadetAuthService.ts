import { CadetSessionUser } from '../types/cadet';
import { UserRole } from '../types/admin';
import { userStorageService } from './userStorageService';

const SESSION_USER_KEY = 'vuc_cadet_session_user';
const ADMIN_SESSION_KEY = 'vuc_admin_auth_session';
const CURRENT_ADMIN_KEY = 'vuc_current_admin_user';

const ROLE_LABELS: Record<UserRole, string> = {
  cadet: 'Курсант',
  teacher: 'Преподаватель',
  officer: 'Начальник',
  methodist: 'Методист',
  deputy: 'Зам. начальника',
  admin: 'Администратор',
};

export const cadetAuthService = {
  getCurrentCadet(): CadetSessionUser | null {
    return this.getCurrentUser();
  },

  getCurrentUser(): CadetSessionUser | null {
    try {
      const raw = sessionStorage.getItem(SESSION_USER_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  loginUser(
    loginInput: string,
    passwordInput: string
  ): { success: boolean; user?: CadetSessionUser; error?: string } {
    // Clear previous sessions to prevent role or name contamination
    this.logout();

    const cleanLogin = loginInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    // Attempt asynchronous API sync in background
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: cleanLogin, password: cleanPass })
    }).catch(() => {});

    const users = userStorageService.getUsers();

    const found = users.find(
      (u) => u.login.toLowerCase() === cleanLogin
    );

    // Support master admin credentials
    const isMasterAdmin =
      cleanLogin === 'goliluha' && cleanPass === 'P17133p17133';

    if (!found && !isMasterAdmin) {
      return {
        success: false,
        error: 'Пользователь с указанным логином не найден. Проверьте правильность ввода.',
      };
    }

    if (found) {
      const isPasswordValid =
        found.password === cleanPass ||
        (found.role === 'admin' && cleanPass === 'P17133p17133');

      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Неверный пароль. Проверьте правильность введённых данных.',
        };
      }

      const sessionUser: CadetSessionUser = {
        id: found.id,
        login: found.login,
        fullName: found.fullName,
        role: found.role,
        unitOrDepartment: found.unitOrDepartment,
        militaryRank: ROLE_LABELS[found.role] || 'Пользователь',
      };

      try {
        sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(sessionUser));
        if (found.role === 'admin' || found.role === 'officer') {
          sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
          sessionStorage.setItem(CURRENT_ADMIN_KEY, JSON.stringify(sessionUser));
        }
      } catch {
        // Ignore storage errors
      }

      return { success: true, user: sessionUser };
    }

    if (isMasterAdmin) {
      const adminUser: CadetSessionUser = {
        id: 'usr-admin-master',
        login: 'goliluha',
        fullName: 'Администратор системы (Главный профиль)',
        role: 'admin',
        unitOrDepartment: 'Администрация ИОС ВУЦ',
        militaryRank: 'Администратор',
      };
      try {
        sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(adminUser));
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
        sessionStorage.setItem(CURRENT_ADMIN_KEY, JSON.stringify(adminUser));
      } catch {
        // Ignore storage errors
      }
      return { success: true, user: adminUser };
    }

    return { success: false, error: 'Ошибка авторизации.' };
  },

  loginCadet(
    loginInput: string,
    passwordInput: string
  ): { success: boolean; user?: CadetSessionUser; error?: string } {
    return this.loginUser(loginInput, passwordInput);
  },

  setManualSession(user: CadetSessionUser): void {
    try {
      sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
      if (user.role === 'admin' || user.role === 'officer') {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
        sessionStorage.setItem(CURRENT_ADMIN_KEY, JSON.stringify(user));
      }
    } catch {
      // Ignore
    }
  },

  logout(): void {
    try {
      sessionStorage.removeItem(SESSION_USER_KEY);
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      sessionStorage.removeItem(CURRENT_ADMIN_KEY);
    } catch {
      // Ignore
    }
  },

  logoutCadet(): void {
    this.logout();
  },
};
