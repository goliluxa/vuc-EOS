import { ManagedUser, CreateUserPayload } from '../types/admin';

const USERS_STORAGE_KEY = 'vuc_managed_users_list';

const INITIAL_USERS: ManagedUser[] = [
  {
    id: 'usr-1',
    login: 'smirnov_av',
    fullName: 'Смирнов Алексей Владимирович',
    role: 'cadet',
    unitOrDepartment: 'Взвод 141 (Связь)',
    password: 'cadet_pass_141',
    createdAt: '2026-09-01T08:00:00.000Z',
    status: 'active',
  },
  {
    id: 'usr-2',
    login: 'kovalev_ds',
    fullName: 'Майор Ковалёв Дмитрий Сергеевич',
    role: 'teacher',
    unitOrDepartment: 'Кафедра общевоенной подготовки',
    password: 'teach_vuc_2024',
    createdAt: '2026-08-25T10:30:00.000Z',
    status: 'active',
  },
  {
    id: 'usr-3',
    login: 'morozov_vn',
    fullName: 'Подполковник Морозов Виктор Николаевич',
    role: 'officer',
    unitOrDepartment: 'Учебная часть ВУЦ',
    password: 'officer_morozov',
    createdAt: '2026-08-20T09:15:00.000Z',
    status: 'active',
  },
  {
    id: 'usr-4',
    login: 'goliluha',
    fullName: 'Администратор системы (Главный профиль)',
    role: 'admin',
    unitOrDepartment: 'Администрация ИОС ВУЦ',
    password: '••••••••',
    createdAt: '2026-08-01T00:00:00.000Z',
    status: 'active',
  },
];

export const userStorageService = {
  getUsers(): ManagedUser[] {
    try {
      const raw = localStorage.getItem(USERS_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
        return INITIAL_USERS;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_USERS;
  },

  createUser(payload: CreateUserPayload): ManagedUser {
    const users = this.getUsers();
    const newUser: ManagedUser = {
      ...payload,
      id: `usr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    const updated = [newUser, ...users];
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
    return newUser;
  },

  deleteUser(id: string): void {
    const users = this.getUsers().filter((u) => u.id !== id);
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch {
      // Ignore storage errors
    }
  },

  resetToDefaults(): ManagedUser[] {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
    } catch {
      // Ignore storage errors
    }
    return INITIAL_USERS;
  },
};
