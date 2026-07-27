import { STORAGE_KEYS } from '@/constants';
import type { AdminSession } from '@/types';

export const authSessionService = {
  read(): AdminSession | null {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEYS.adminSession);
      return raw ? (JSON.parse(raw) as AdminSession) : null;
    } catch {
      return null;
    }
  },

  write(session: AdminSession): void {
    window.sessionStorage.setItem(STORAGE_KEYS.adminSession, JSON.stringify(session));
  },

  clear(): void {
    window.sessionStorage.removeItem(STORAGE_KEYS.adminSession);
  },

  getToken(): string | undefined {
    return this.read()?.token;
  },
};
