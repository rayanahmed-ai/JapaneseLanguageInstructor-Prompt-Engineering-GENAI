export interface Activity {
  id: number;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: string;
  icon: string;
  groupId?: number;
}

export interface ActivitySession {
  id: number;
  activityId: number;
  userId: string;
  startedAt: string;
  completedAt?: string;
  wpm?: number;
  accuracy?: number;
  score?: number;
  status: 'started' | 'completed' | 'abandoned';
}

export interface ActivityProgress {
  activityId: number;
  totalAttempts: number;
  bestWpm: number;
  averageAccuracy: number;
  bestScore: number;
  lastAttempt: string;
}
