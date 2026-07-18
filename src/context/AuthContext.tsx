import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authService } from '@/services/authService';
import { authSessionService } from '@/services/authSessionService';
import type { AdminSession } from '@/types';

interface AuthContextValue {
  isAuthenticated: boolean;
  session: AdminSession | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  authenticate: (session: AdminSession) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(() => authSessionService.read());

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      const newSession = authService.createSession(response, email);
      authSessionService.write(newSession);
      setSession(newSession);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Invalid email or password.' };
    }
  }, []);

  const authenticate = useCallback((newSession: AdminSession) => {
    authSessionService.write(newSession);
    setSession(newSession);
  }, []);

  const logout = useCallback(() => {
    authSessionService.clear();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ isAuthenticated: session !== null, session, login, authenticate, logout }),
    [session, login, authenticate, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
