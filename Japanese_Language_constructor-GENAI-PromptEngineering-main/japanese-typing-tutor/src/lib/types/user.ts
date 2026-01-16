export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  wpmAverage: number;
  accuracy: number;
  wordsLearned: number;
  dayStreak: number;
  totalSessions: number;
  totalTime: number;
}

export interface UserSettings {
  showRomaji: boolean;
  showEnglish: boolean;
  theme: 'light' | 'dark' | 'auto';
  soundEffects: boolean;
  autoAdvance: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  dailyReminders: boolean;
  achievementAlerts: boolean;
}
