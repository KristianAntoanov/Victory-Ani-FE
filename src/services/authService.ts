import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { AdminSession } from '@/types';

interface LoginResponse {
  email?: string;
  token?: string;
  accessToken?: string;
  jwtToken?: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AdminSession> {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.authLogin, { email, password });
    const token = response.token ?? response.accessToken ?? response.jwtToken;

    return {
      email: response.email ?? email,
      token,
      loggedInAt: new Date().toISOString(),
    };
  },
};
