import { apiClient, ApiResponse } from './client';
import { API_ENDPOINTS } from '../utils/constants';
import { User } from '../types/user';
import { ErrorHandler, withErrorHandling } from '../utils/errorHandler';

// Auth interfaces
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface VerifyResponse {
  user: User;
  valid: boolean;
}

// Auth API functions
export const authAPI = {
  /**
   * Login user with email and password
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials, { skipAuth: true });
  },

  /**
   * Register new user
   */
  register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data, { skipAuth: true });
  },

  /**
   * Logout user
   */
  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    // Clear stored auth data
    apiClient.removeAuthToken();
    return response;
  },

  /**
   * Verify current authentication status
   */
  verify: async (): Promise<ApiResponse<VerifyResponse>> => {
    return apiClient.get(API_ENDPOINTS.AUTH.VERIFY);
  },

  /**
   * Refresh authentication token
   */
  refreshToken: async (refreshToken: string): Promise<ApiResponse<{ token: string }>> => {
    return apiClient.post('/auth/refresh', { refreshToken }, { skipAuth: true });
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (email: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post('/auth/reset-password', { email }, { skipAuth: true });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post('/auth/confirm-reset', { token, newPassword }, { skipAuth: true });
  },

  /**
   * Change password (authenticated)
   */
  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post('/auth/change-password', { currentPassword, newPassword });
  },

  /**
   * Enable two-factor authentication
   */
  enable2FA: async (): Promise<ApiResponse<{ qrCode: string; secret: string }>> => {
    return apiClient.post('/auth/2fa/enable');
  },

  /**
   * Verify two-factor authentication
   */
  verify2FA: async (token: string): Promise<ApiResponse<{ backupCodes: string[] }>> => {
    return apiClient.post('/auth/2fa/verify', { token });
  },

  /**
   * Disable two-factor authentication
   */
  disable2FA: async (password: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post('/auth/2fa/disable', { password });
  },

  /**
   * Login with two-factor authentication
   */
  loginWith2FA: async (credentials: LoginCredentials, twoFactorToken: string): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { ...credentials, twoFactorToken }, { skipAuth: true });
  },
};

// Helper functions for auth management
export const authHelpers = {
  /**
   * Store authentication data
   */
  storeAuthData: (authData: AuthResponse, storage: 'localStorage' | 'sessionStorage' = 'localStorage'): void => {
    if (typeof window !== 'undefined') {
      const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;
      
      storageObj.setItem('auth_token', authData.token);
      storageObj.setItem('auth_user', JSON.stringify(authData.user));
      
      if (authData.refreshToken) {
        storageObj.setItem('refresh_token', authData.refreshToken);
      }
      
      // Store in api client
      apiClient.setAuthToken(authData.token, storage);
    }
  },

  /**
   * Get stored authentication data
   */
  getStoredAuthData: (storage: 'localStorage' | 'sessionStorage' = 'localStorage'): AuthResponse | null => {
    if (typeof window !== 'undefined') {
      const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;
      
      const token = storageObj.getItem('auth_token');
      const userStr = storageObj.getItem('auth_user');
      const refreshToken = storageObj.getItem('refresh_token');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          return {
            user,
            token,
            refreshToken: refreshToken || undefined,
          };
        } catch {
          return null;
        }
      }
    }
    return null;
  },

  /**
   * Clear stored authentication data
   */
  clearStoredAuthData: (): void => {
    if (typeof window !== 'undefined') {
      ['localStorage', 'sessionStorage'].forEach((storage) => {
        const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;
        storageObj.removeItem('auth_token');
        storageObj.removeItem('auth_user');
        storageObj.removeItem('refresh_token');
      });
      
      // Clear from api client
      apiClient.removeAuthToken();
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    const authData = authHelpers.getStoredAuthData();
    return !!authData?.token;
  },

  /**
   * Get current user
   */
  getCurrentUser: (): User | null => {
    const authData = authHelpers.getStoredAuthData();
    return authData?.user || null;
  },

  /**
   * Get current token
   */
  getCurrentToken: (): string | null => {
    const authData = authHelpers.getStoredAuthData();
    return authData?.token || null;
  },
};
