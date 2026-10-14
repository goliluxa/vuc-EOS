import { CadetSessionUser } from '../types/cadet';
import { userStorageService } from './userStorageService';

const CADET_SESSION_KEY = 'vuc_cadet_session_user';

export const cadetAuthService = {
  getCurrentCadet(): CadetSessionUser | null {
    try {
      const raw = sessionStorage.getItem(CADET_SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getCurrentCadet() !== null;
  },

  loginCadet(
    loginInput: string,
    passwordInput: string
  ): { success: boolean; user?: CadetSessionUser; error?: string } {
    const cleanLogin = loginInput.trim().toLowerCase();
    const users = userStorageService.getUsers();

    const found = users.find(
      (u) => u.login.toLowerCase() === cleanLogin && u.role === 'cadet'
    );

    if (!found) {
      return {
        success: false,
        error: 'Пользователь с указанным логином курсанта не найден.',
      };
    }

    if (found.password !== passwordInput.trim()) {
      return {
        success: false,
        error: 'Неверный пароль курсанта. Проверьте правильность ввода.',
      };
    }

    const cadetUser: CadetSessionUser = {
      id: found.id,
      login: found.login,
      fullName: found.fullName,
      role: 'cadet',
      unitOrDepartment: found.unitOrDepartment,
      militaryRank: 'Курсант',
    };

    try {
      sessionStorage.setItem(CADET_SESSION_KEY, JSON.stringify(cadetUser));
    } catch {
      // Ignore storage errors
    }

    return { success: true, user: cadetUser };
  },

  setManualSession(user: CadetSessionUser): void {
    try {
      sessionStorage.setItem(CADET_SESSION_KEY, JSON.stringify(user));
    } catch {
      // Ignore
    }
  },

  logoutCadet(): void {
    try {
      sessionStorage.removeItem(CADET_SESSION_KEY);
    } catch {
      // Ignore
    }
  },
};
