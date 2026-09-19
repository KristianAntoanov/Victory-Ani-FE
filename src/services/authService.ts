import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { AdminSession } from '@/types';

export interface IdentityAuthResponse {
  token?: string;
  userName?: string;
  requiresPasswordChange: boolean;
  passwordChangeToken?: string | null;
}

export const authService = {
  login(email: string, password: string): Promise<IdentityAuthResponse> {
    return apiClient.post<IdentityAuthResponse>(API_ENDPOINTS.identityLogin, { email, password });
  },

  changeTemporaryPassword(values: {
    passwordChangeToken: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }): Promise<IdentityAuthResponse> {
    return apiClient.post<IdentityAuthResponse>(API_ENDPOINTS.identityChangeTemporaryPassword, values);
  },

  createSession(response: IdentityAuthResponse, fallbackEmail: string): AdminSession {
    if (!response.token) {
      throw new Error('Authentication did not return an access token.');
    }
    return {
      email: response.userName ?? fallbackEmail,
      token: response.token,
      loggedInAt: new Date().toISOString(),
    };
  },
};
