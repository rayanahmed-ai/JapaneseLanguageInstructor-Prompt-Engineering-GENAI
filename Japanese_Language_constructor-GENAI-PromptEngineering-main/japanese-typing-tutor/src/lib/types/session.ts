export interface Session {
  id: string;
  userId: string;
  activityId: number;
  activity: {
    id: number;
    name: string;
    type: string;
  };
  wpm: number;
  accuracy: number;
  duration: number;
  score: number;
  completedAt: string;
  wordsTyped: number;
  errors: number;
}

export interface SessionResults {
  wpm: number;
  accuracy: number;
  duration: number;
  score: number;
  wordsTyped: number;
  errors: number;
  correctWords: number;
}

export interface StudySession {
  id: number;
  groupId: number;
  createdAt: string;
  studyActivityId: number;
  wordReviewItems: WordReviewItem[];
}

export interface WordReviewItem {
  wordId: number;
  studySessionId: number;
  correct: boolean;
  createdAt: string;
  word?: {
    id: number;
    japanese: string;
    romaji: string;
    english: string;
  };
}

export interface StudyActivity {
  id: number;
  studySessionId: number;
  groupId: number;
  createdAt: string;
  group?: {
    id: number;
    name: string;
  };
}
