import { apiClient, ApiResponse } from './client';
import { API_ENDPOINTS } from '../utils/constants';
import { Session, SessionResults } from '../types/session';

// Sessions API interfaces
export interface GetSessionsParams {
  page?: number;
  limit?: number;
  activityId?: number;
  userId?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'date' | 'score' | 'wpm' | 'accuracy';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateSessionData {
  activityId: number;
  wpm: number;
  accuracy: number;
  duration: number;
  score: number;
  wordsTyped: number;
  errors: number;
  correctWords: number;
}

export interface SessionStats {
  totalSessions: number;
  averageWPM: number;
  averageAccuracy: number;
  totalWords: number;
  totalTime: number;
  bestWPM: number;
  bestScore: number;
  currentStreak: number;
  longestStreak: number;
}

// Sessions API functions
export const sessionsAPI = {
  /**
   * Get list of sessions with pagination and filters
   */
  getSessions: async (params?: GetSessionsParams): Promise<ApiResponse<{
    sessions: Session[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>> => {
    return apiClient.get(API_ENDPOINTS.SESSIONS.LIST, { params });
  },

  /**
   * Get session by ID
   */
  getSessionById: async (id: string): Promise<ApiResponse<Session>> => {
    return apiClient.get(API_ENDPOINTS.SESSIONS.BY_ID(id));
  },

  /**
   * Create new session
   */
  createSession: async (data: CreateSessionData): Promise<ApiResponse<Session>> => {
    return apiClient.post(API_ENDPOINTS.SESSIONS.CREATE, data);
  },

  /**
   * Update session
   */
  updateSession: async (id: string, data: Partial<CreateSessionData>): Promise<ApiResponse<Session>> => {
    return apiClient.put(API_ENDPOINTS.SESSIONS.BY_ID(id), data);
  },

  /**
   * Delete session
   */
  deleteSession: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete(API_ENDPOINTS.SESSIONS.BY_ID(id));
  },

  /**
   * Get session statistics
   */
  getSessionStats: async (params?: Pick<GetSessionsParams, 'startDate' | 'endDate' | 'activityId'>): Promise<ApiResponse<SessionStats>> => {
    return apiClient.get(`${API_ENDPOINTS.SESSIONS.LIST}/stats`, { params });
  },

  /**
   * Get recent sessions
   */
  getRecentSessions: async (limit: number = 5): Promise<ApiResponse<Session[]>> => {
    return apiClient.get(`${API_ENDPOINTS.SESSIONS.LIST}/recent`, { 
      params: { limit } 
    });
  },

  /**
   * Get sessions by activity
   */
  getSessionsByActivity: async (activityId: number, params?: Pick<GetSessionsParams, 'page' | 'limit' | 'sortBy' | 'sortOrder'>): Promise<ApiResponse<{
    sessions: Session[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>> => {
    return apiClient.get(`${API_ENDPOINTS.SESSIONS.LIST}/activity/${activityId}`, { params });
  },

  /**
   * Export sessions data
   */
  exportSessions: async (params?: GetSessionsParams): Promise<ApiResponse<{ downloadUrl: string }>> => {
    return apiClient.get(`${API_ENDPOINTS.SESSIONS.LIST}/export`, { params });
  },
};

// Helper functions for session management
export const sessionHelpers = {
  /**
   * Calculate WPM from time and words
   */
  calculateWPM: (timeInSeconds: number, wordsTyped: number): number => {
    if (timeInSeconds === 0) return 0;
    const timeInMinutes = timeInSeconds / 60;
    return Math.round(wordsTyped / timeInMinutes);
  },

  /**
   * Calculate accuracy from correct and total attempts
   */
  calculateAccuracy: (correct: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  },

  /**
   * Calculate score from WPM and accuracy
   */
  calculateScore: (wpm: number, accuracy: number, baseScore: number = 100): number => {
    const wpmWeight = 0.6;
    const accuracyWeight = 0.4;
    
    const normalizedWPM = Math.min(wpm / 100, 1); // Normalize to 0-1 scale (100 WPM = perfect)
    const normalizedAccuracy = accuracy / 100; // Normalize to 0-1 scale
    
    return Math.round(baseScore * (normalizedWPM * wpmWeight + normalizedAccuracy * accuracyWeight));
  },

  /**
   * Determine performance level from score
   */
  getPerformanceLevel: (score: number): 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Needs Improvement' => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Average';
    if (score >= 40) return 'Poor';
    return 'Needs Improvement';
  },

  /**
   * Format session duration
   */
  formatDuration: (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes === 0) {
      return `${remainingSeconds}s`;
    }
    
    return remainingSeconds === 0 
      ? `${minutes}m` 
      : `${minutes}m ${remainingSeconds}s`;
  },

  /**
   * Get sessions from last N days
   */
  getSessionsFromLastDays: (sessions: Session[], days: number): Session[] => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return sessions.filter(session => 
      new Date(session.completedAt) >= cutoffDate
    );
  },

  /**
   * Calculate streak from sessions
   */
  calculateStreak: (sessions: Session[]): number => {
    if (sessions.length === 0) return 0;
    
    const sortedSessions = sessions.sort((a, b) => 
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (const session of sortedSessions) {
      const sessionDate = new Date(session.completedAt);
      sessionDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  },

  /**
   * Get best session by metric
   */
  getBestSession: (sessions: Session[], metric: 'wpm' | 'accuracy' | 'score'): Session | null => {
    if (sessions.length === 0) return null;
    
    return sessions.reduce((best, current) => 
      current[metric] > best[metric] ? current : best
    );
  },

  /**
   * Group sessions by date
   */
  groupByDate: (sessions: Session[]): Record<string, Session[]> => {
    return sessions.reduce((groups, session) => {
      const date = new Date(session.completedAt).toISOString().split('T')[0];
      
      if (!groups[date]) {
        groups[date] = [];
      }
      
      groups[date].push(session);
      return groups;
    }, {} as Record<string, Session[]>);
  },

  /**
   * Validate session data
   */
  validateSessionData: (data: CreateSessionData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (data.wpm < 0 || data.wpm > 300) {
      errors.push('WPM must be between 0 and 300');
    }
    
    if (data.accuracy < 0 || data.accuracy > 100) {
      errors.push('Accuracy must be between 0 and 100');
    }
    
    if (data.duration < 0) {
      errors.push('Duration must be positive');
    }
    
    if (data.score < 0) {
      errors.push('Score must be positive');
    }
    
    if (data.wordsTyped < 0) {
      errors.push('Words typed must be positive');
    }
    
    if (data.errors < 0 || data.errors > data.wordsTyped) {
      errors.push('Errors must be between 0 and words typed');
    }
    
    if (data.correctWords < 0 || data.correctWords > data.wordsTyped) {
      errors.push('Correct words must be between 0 and words typed');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
};

// Export types
export type { 
  GetSessionsParams, 
  CreateSessionData, 
  SessionStats 
};
