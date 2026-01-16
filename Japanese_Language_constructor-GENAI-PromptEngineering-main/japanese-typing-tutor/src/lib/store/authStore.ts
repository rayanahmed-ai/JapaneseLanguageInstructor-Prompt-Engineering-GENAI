import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, UserSettings } from '../types/user';
import { AuthResponse } from '../api/auth';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Settings
  settings: UserSettings;
  
  // Actions
  login: (authData: AuthResponse, rememberMe?: boolean) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  refreshToken: (newToken: string) => void;
  setToken: (token: string) => void;
}

const defaultSettings: UserSettings = {
  showRomaji: true,
  showEnglish: true,
  theme: 'light',
  soundEffects: true,
  autoAdvance: false,
  difficulty: 'intermediate',
  dailyReminders: true,
  achievementAlerts: true,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      settings: defaultSettings,

      // Actions
      login: (authData, rememberMe = false) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        
        // Store in browser storage
        if (typeof window !== 'undefined') {
          storage.setItem('auth_token', authData.token);
          storage.setItem('auth_user', JSON.stringify(authData.user));
          if (authData.refreshToken) {
            storage.setItem('refresh_token', authData.refreshToken);
          }
        }

        set({
          user: authData.user,
          token: authData.token,
          refreshToken: authData.refreshToken || null,
          isAuthenticated: true,
          error: null,
          isLoading: false,
        });
      },

      logout: () => {
        // Clear browser storage
        if (typeof window !== 'undefined') {
          ['localStorage', 'sessionStorage'].forEach((storage) => {
            const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;
            storageObj.removeItem('auth_token');
            storageObj.removeItem('auth_user');
            storageObj.removeItem('refresh_token');
          });
        }

        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
          isLoading: false,
          // Keep settings as they might be useful for next login
        });
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          
          // Update stored user data
          if (typeof window !== 'undefined') {
            ['localStorage', 'sessionStorage'].forEach((storage) => {
              const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;
              const userStr = storageObj.getItem('auth_user');
              if (userStr) {
                storageObj.setItem('auth_user', JSON.stringify(updatedUser));
              }
            });
          }

          set({ user: updatedUser });
        }
      },

      updateSettings: (newSettings) => {
        const currentSettings = get().settings;
        const updatedSettings = { ...currentSettings, ...newSettings };
        
        set({ settings: updatedSettings });
        
        // Apply theme immediately if changed
        if (newSettings.theme && typeof window !== 'undefined') {
          const root = document.documentElement;
          root.classList.remove('light', 'dark');
          
          if (newSettings.theme === 'auto') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            root.classList.add(mediaQuery.matches ? 'dark' : 'light');
          } else {
            root.classList.add(newSettings.theme);
          }
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error, isLoading: false });
      },

      refreshToken: (newToken) => {
        const storage = typeof window !== 'undefined' && localStorage.getItem('auth_token') 
          ? localStorage 
          : sessionStorage;
        
        if (typeof window !== 'undefined') {
          storage.setItem('auth_token', newToken);
        }

        set({ token: newToken });
      },

      setToken: (token) => {
        set({ token });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => {
        // Use sessionStorage by default for better privacy
        if (typeof window !== 'undefined') {
          return sessionStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        settings: state.settings,
        // Don't persist sensitive auth data, let the auth middleware handle it
      }),
      onRehydrateStorage: () => (state) => {
        // Check if user is authenticated on rehydrate
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
          const userStr = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user');
          
          if (token && userStr) {
            try {
              const user = JSON.parse(userStr);
              return {
                ...state,
                user,
                token,
                isAuthenticated: true,
              };
            } catch {
              // Invalid stored data, clear it
              ['localStorage', 'sessionStorage'].forEach((storage) => {
                const storageObj = storage === 'localStorage' ? localStorage : sessionStorage;
                storageObj.removeItem('auth_token');
                storageObj.removeItem('auth_user');
                storageObj.removeItem('refresh_token');
              });
            }
          }
        }
        return state;
      },
    }
  )
);

// Selectors for common use cases
export const useAuth = () => {
  const authStore = useAuthStore();
  
  return {
    // State
    user: authStore.user,
    token: authStore.token,
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    error: authStore.error,
    settings: authStore.settings,
    
    // Computed values
    isAdmin: authStore.user?.email?.endsWith('@admin.com') || false,
    userName: authStore.user?.username || 'Guest',
    userAvatar: authStore.user?.id ? `https://api.dicebear.com/7.x/initials/svg?seed=${authStore.user.username}` : null,
    
    // Actions
    login: authStore.login,
    logout: authStore.logout,
    updateUser: authStore.updateUser,
    updateSettings: authStore.updateSettings,
    clearError: authStore.clearError,
    setLoading: authStore.setLoading,
    setError: authStore.setError,
    refreshToken: authStore.refreshToken,
    setToken: authStore.setToken,
  };
};

// Selectors for specific use cases
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useSettings = () => useAuthStore((state) => state.settings);
export const useAuthToken = () => useAuthStore((state) => state.token);
