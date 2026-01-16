import { apiClient, ApiResponse } from './client';
import { API_ENDPOINTS } from '../utils/constants';
import { Activity, ActivitySession, ActivityProgress } from '../types/activity';
import { Word } from '../types/word';

// Activities API interfaces
export interface GetActivitiesParams {
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  type?: string;
  groupId?: number;
  page?: number;
  limit?: number;
}

export interface CreateActivityData {
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: string;
  icon: string;
  groupId?: number;
}

export interface UpdateActivityData extends Partial<CreateActivityData> {
  id: number;
}

export interface StartActivityData {
  activityId: number;
  settings?: {
    showRomaji?: boolean;
    showEnglish?: boolean;
    soundEffects?: boolean;
    timeLimit?: number;
    wordCount?: number;
  };
}

export interface CompleteActivityData {
  activityId: number;
  sessionId: string;
  results: {
    wpm: number;
    accuracy: number;
    duration: number;
    score: number;
    wordsTyped: number;
    errors: number;
    correctWords: number;
  };
}

// Activities API functions
export const activitiesAPI = {
  /**
   * Get list of activities with filters
   */
  getActivities: async (params?: GetActivitiesParams): Promise<ApiResponse<{
    activities: Activity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>> => {
    return apiClient.get(API_ENDPOINTS.ACTIVITIES.LIST, { params });
  },

  /**
   * Get activity by ID
   */
  getActivityById: async (id: number): Promise<ApiResponse<Activity & {
    words?: Word[];
    averageScore?: number;
    totalAttempts?: number;
    bestWPM?: number;
  }>> => {
    return apiClient.get(API_ENDPOINTS.ACTIVITIES.BY_ID(id));
  },

  /**
   * Create new activity
   */
  createActivity: async (data: CreateActivityData): Promise<ApiResponse<Activity>> => {
    return apiClient.post(API_ENDPOINTS.ACTIVITIES.LIST, data);
  },

  /**
   * Update activity
   */
  updateActivity: async (data: UpdateActivityData): Promise<ApiResponse<Activity>> => {
    return apiClient.put(API_ENDPOINTS.ACTIVITIES.BY_ID(data.id), data);
  },

  /**
   * Delete activity
   */
  deleteActivity: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete(API_ENDPOINTS.ACTIVITIES.BY_ID(id));
  },

  /**
   * Start activity
   */
  startActivity: async (data: StartActivityData): Promise<ApiResponse<{
    sessionId: string;
    words: Word[];
    settings: any;
  }>> => {
    return apiClient.post(API_ENDPOINTS.ACTIVITIES.START(data.activityId), data);
  },

  /**
   * Complete activity
   */
  completeActivity: async (data: CompleteActivityData): Promise<ApiResponse<{
    session: ActivitySession;
    progress: ActivityProgress;
    achievements?: string[];
  }>> => {
    return apiClient.post(API_ENDPOINTS.ACTIVITIES.COMPLETE(data.activityId), data);
  },

  /**
   * Get activity sessions
   */
  getActivitySessions: async (activityId: number, params?: {
    page?: number;
    limit?: number;
    sortBy?: 'date' | 'score' | 'wpm';
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<{
    sessions: ActivitySession[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>> => {
    return apiClient.get(`${API_ENDPOINTS.ACTIVITIES.BY_ID(activityId)}/sessions`, { params });
  },

  /**
   * Get user activity progress
   */
  getActivityProgress: async (activityId?: number): Promise<ApiResponse<ActivityProgress[]>> => {
    const url = activityId 
      ? `${API_ENDPOINTS.ACTIVITIES.BY_ID(activityId)}/progress`
      : `${API_ENDPOINTS.ACTIVITIES.LIST}/progress`;
    return apiClient.get(url);
  },

  /**
   * Get recommended activities
   */
  getRecommendedActivities: async (params?: {
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    limit?: number;
  }): Promise<ApiResponse<Activity[]>> => {
    return apiClient.get(`${API_ENDPOINTS.ACTIVITIES.LIST}/recommended`, { params });
  },

  /**
   * Get activity statistics
   */
  getActivityStats: async (activityId?: number): Promise<ApiResponse<{
    totalActivities: number;
    averageScore: number;
    totalSessions: number;
    averageWPM: number;
    averageAccuracy: number;
    difficultyDistribution: Record<string, number>;
    typeDistribution: Record<string, number>;
    recentPerformance: Array<{
      date: string;
      score: number;
      wpm: number;
      accuracy: number;
    }>;
  }>> => {
    const url = activityId 
      ? `${API_ENDPOINTS.ACTIVITIES.BY_ID(activityId)}/stats`
      : `${API_ENDPOINTS.ACTIVITIES.LIST}/stats`;
    return apiClient.get(url);
  },

  /**
   * Clone activity
   */
  cloneActivity: async (id: number, name?: string): Promise<ApiResponse<Activity>> => {
    return apiClient.post(`${API_ENDPOINTS.ACTIVITIES.BY_ID(id)}/clone`, { name });
  },

  /**
   * Export activity
   */
  exportActivity: async (id: number): Promise<ApiResponse<{ downloadUrl: string }>> => {
    return apiClient.get(`${API_ENDPOINTS.ACTIVITIES.BY_ID(id)}/export`);
  },

  /**
   * Import activity
   */
  importActivity: async (file: File): Promise<ApiResponse<Activity>> => {
    return apiClient.uploadFile(`${API_ENDPOINTS.ACTIVITIES.LIST}/import`, file);
  },
};

// Helper functions for activity management
export const activityHelpers = {
  /**
   * Get activity difficulty color
   */
  getDifficultyColor: (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  },

  /**
   * Get activity type icon
   */
  getActivityTypeIcon: (type: string): string => {
    const iconMap: Record<string, string> = {
      hiragana_basics: 'ひらがな',
      katakana_practice: 'カタカナ',
      common_phrases: '💬',
      speed_challenge: '⚡',
      vocabulary_training: '📚',
      kanji_practice: '漢字',
      listening_practice: '🎧',
      speaking_practice: '🗣️',
    };
    return iconMap[type] || '📝';
  },

  /**
   * Get activity type label
   */
  getActivityTypeLabel: (type: string): string => {
    const labelMap: Record<string, string> = {
      hiragana_basics: 'Hiragana Basics',
      katakana_practice: 'Katakana Practice',
      common_phrases: 'Common Phrases',
      speed_challenge: 'Speed Challenge',
      vocabulary_training: 'Vocabulary Training',
      kanji_practice: 'Kanji Practice',
      listening_practice: 'Listening Practice',
      speaking_practice: 'Speaking Practice',
    };
    return labelMap[type] || type;
  },

  /**
   * Filter activities by difficulty
   */
  filterByDifficulty: (activities: Activity[], difficulty: 'beginner' | 'intermediate' | 'advanced'): Activity[] => {
    return activities.filter(activity => activity.difficulty === difficulty);
  },

  /**
   * Filter activities by type
   */
  filterByType: (activities: Activity[], type: string): Activity[] => {
    return activities.filter(activity => activity.type === type);
  },

  /**
   * Sort activities by difficulty
   */
  sortByDifficulty: (activities: Activity[]): Activity[] => {
    const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
    return [...activities].sort((a, b) => 
      difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
    );
  },

  /**
   * Get next recommended activity
   */
  getNextRecommendedActivity: (activities: Activity[], completedActivityIds: number[]): Activity | null => {
    const uncompletedActivities = activities.filter(
      activity => !completedActivityIds.includes(activity.id)
    );
    
    if (uncompletedActivities.length === 0) return null;
    
    // Prioritize beginner activities, then by name
    return uncompletedActivities.sort((a, b) => {
      const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
      const diffCompare = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      
      if (diffCompare !== 0) return diffCompare;
      
      return a.name.localeCompare(b.name);
    })[0];
  },

  /**
   * Calculate activity completion rate
   */
  calculateCompletionRate: (activities: Activity[], progress: ActivityProgress[]): number => {
    if (activities.length === 0) return 0;
    
    const completedCount = progress.filter(p => p.totalAttempts > 0).length;
    return Math.round((completedCount / activities.length) * 100);
  },

  /**
   * Validate activity data
   */
  validateActivityData: (data: CreateActivityData): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!data.name || data.name.trim().length < 3) {
      errors.push('Activity name must be at least 3 characters');
    }
    
    if (!data.description || data.description.trim().length < 10) {
      errors.push('Description must be at least 10 characters');
    }
    
    if (!data.type || data.type.trim().length === 0) {
      errors.push('Activity type is required');
    }
    
    if (!data.icon || data.icon.trim().length === 0) {
      errors.push('Activity icon is required');
    }
    
    if (!['beginner', 'intermediate', 'advanced'].includes(data.difficulty)) {
      errors.push('Invalid difficulty level');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },
};

// Export types
export type { 
  GetActivitiesParams, 
  CreateActivityData, 
  UpdateActivityData, 
  StartActivityData, 
  CompleteActivityData 
};
