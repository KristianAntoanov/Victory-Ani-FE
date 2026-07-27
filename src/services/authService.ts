import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/services/apiClient';
import type { AdminSession } from '@/types';

export interface IdentityAuthResponse {
  token?: string;
  userName?: string;
  requiresTwoFactorSetup: boolean;
  requiresTwoFactorCode: boolean;
  twoFactorSetupToken?: string | null;
  twoFactorLoginToken?: string | null;
  requiresPasswordChange: boolean;
  passwordChangeToken?: string | null;
}

export interface TwoFactorSetupResponse {
  sharedKey: string;
  authenticatorUri: string;
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

  getTwoFactorSetup(twoFactorSetupToken: string): Promise<TwoFactorSetupResponse> {
    return apiClient.post<TwoFactorSetupResponse>(API_ENDPOINTS.identityTwoFactorSetup, {
      twoFactorSetupToken,
    });
  },

  enableTwoFactor(twoFactorSetupToken: string, code: string): Promise<IdentityAuthResponse> {
    return apiClient.post<IdentityAuthResponse>(API_ENDPOINTS.identityEnableTwoFactor, {
      twoFactorSetupToken,
      code,
    });
  },

  loginWithTwoFactor(twoFactorLoginToken: string, code: string): Promise<IdentityAuthResponse> {
    return apiClient.post<IdentityAuthResponse>(API_ENDPOINTS.identityLoginWithTwoFactor, {
      twoFactorLoginToken,
      code,
    });
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
