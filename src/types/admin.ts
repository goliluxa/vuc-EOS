export type UserRole = 'cadet' | 'teacher' | 'officer' | 'admin';

export interface ManagedUser {
  id: string;
  login: string;
  fullName: string;
  role: UserRole;
  unitOrDepartment: string;
  password: string;
  createdAt: string;
  status: 'active' | 'suspended';
}

export type CreateUserPayload = Omit<ManagedUser, 'id' | 'createdAt' | 'status'>;

export interface SiteSettings {
  customLogoUrl: string | null;
  customOrgNameUpper: string;
  customOrgNameLower: string;
}
