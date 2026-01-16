import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Word } from '../types/word';
import { SessionResults } from '../types/session';

interface TypingState {
  // Current typing session
  isActive: boolean;
  isPaused: boolean;
  startTime: number | null;
  endTime: number | null;
  currentWordIndex: number;
  words: Word[];
  currentWord: string;
  userInput: string;
  correctWords: number;
  incorrectWords: number;
  totalWords: number;
  errors: number;
  
  // Performance metrics
  currentWPM: number;
  averageWPM: number;
  currentAccuracy: number;
  averageAccuracy: number;
  score: number;
  
  // Settings for current session
  showRomaji: boolean;
  showEnglish: boolean;
  soundEffects: boolean;
  timeLimit: number | null;
  wordCount: number;
  
  // History
  typingHistory: Array<{
    word: string;
    input: string;
    correct: boolean;
    time: number;
  }>;
  
  // Actions
  startSession: (words: Word[], settings?: {
    showRomaji?: boolean;
    showEnglish?: boolean;
    soundEffects?: boolean;
    timeLimit?: number;
  }) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  endSession: () => void;
  resetSession: () => void;
  
  // Typing actions
  handleInput: (input: string) => void;
  submitWord: () => void;
  skipWord: () => void;
  nextWord: () => void;
  previousWord: () => void;
  
  // Settings actions
  updateSessionSettings: (settings: {
    showRomaji?: boolean;
    showEnglish?: boolean;
    soundEffects?: boolean;
    timeLimit?: number;
  }) => void;
  
  // History actions
  clearHistory: () => void;
  getTypingStats: () => {
    totalWords: number;
    correctWords: number;
    accuracy: number;
    wpm: number;
    score: number;
  };
}

export const useTypingStore = create<TypingState>()(
  persist(
    (set, get) => ({
      // Initial state
      isActive: false,
      isPaused: false,
      startTime: null,
      endTime: null,
      currentWordIndex: 0,
      words: [],
      currentWord: '',
      userInput: '',
      correctWords: 0,
      incorrectWords: 0,
      totalWords: 0,
      errors: 0,
      currentWPM: 0,
      averageWPM: 0,
      currentAccuracy: 0,
      averageAccuracy: 0,
      score: 0,
      showRomaji: true,
      showEnglish: true,
      soundEffects: true,
      timeLimit: null,
      wordCount: 20,
      typingHistory: [],

      // Session actions
      startSession: (words, settings = {}) => {
        const sessionSettings = {
          showRomaji: true,
          showEnglish: true,
          soundEffects: true,
          timeLimit: null,
          ...settings,
        };

        set({
          isActive: true,
          isPaused: false,
          startTime: Date.now(),
          endTime: null,
          currentWordIndex: 0,
          words,
          currentWord: words[0]?.japanese || '',
          userInput: '',
          correctWords: 0,
          incorrectWords: 0,
          totalWords: words.length,
          errors: 0,
          currentWPM: 0,
          averageWPM: 0,
          currentAccuracy: 0,
          averageAccuracy: 0,
          score: 0,
          ...sessionSettings,
          typingHistory: [],
        });
      },

      pauseSession: () => {
        set({ isPaused: true });
      },

      resumeSession: () => {
        set({ isPaused: false });
      },

      endSession: () => {
        const state = get();
        const sessionResults: SessionResults = {
          wpm: state.averageWPM,
          accuracy: state.averageAccuracy,
          duration: state.endTime && state.startTime 
            ? Math.floor((state.endTime - state.startTime) / 1000)
            : 0,
          score: state.score,
          wordsTyped: state.totalWords,
          errors: state.errors,
          correctWords: state.correctWords,
        };

        set({
          isActive: false,
          isPaused: false,
          endTime: Date.now(),
        });

        return sessionResults;
      },

      resetSession: () => {
        set({
          isActive: false,
          isPaused: false,
          startTime: null,
          endTime: null,
          currentWordIndex: 0,
          words: [],
          currentWord: '',
          userInput: '',
          correctWords: 0,
          incorrectWords: 0,
          totalWords: 0,
          errors: 0,
          currentWPM: 0,
          averageWPM: 0,
          currentAccuracy: 0,
          averageAccuracy: 0,
          score: 0,
          typingHistory: [],
        });
      },

      // Typing actions
      handleInput: (input) => {
        const state = get();
        if (!state.isActive || state.isPaused) return;

        const currentWord = state.currentWord;
        const isCorrect = input.toLowerCase().trim() === currentWord.toLowerCase();
        
        // Calculate metrics for current word
        const timeSpent = Date.now() - (state.startTime || Date.now());
        const wpm = timeSpent > 0 ? (input.length / 5) / (timeSpent / 60000) : 0;
        const accuracy = input.length > 0 ? (input.length - state.errors) / input.length * 100 : 100;

        set({
          userInput: input,
          currentWPM: Math.round(wpm),
          currentAccuracy: Math.round(accuracy),
        });
      },

      submitWord: () => {
        const state = get();
        if (!state.isActive || state.isPaused) return;

        const currentWord = state.currentWord;
        const userInput = state.userInput.trim();
        const isCorrect = userInput.toLowerCase() === currentWord.toLowerCase();

        const newHistoryItem = {
          word: currentWord,
          input: userInput,
          correct: isCorrect,
          time: Date.now(),
        };

        const nextIndex = state.currentWordIndex + 1;
        const nextWord = state.words[nextIndex]?.japanese || '';

        // Calculate running averages
        const newCorrectWords = isCorrect ? state.correctWords + 1 : state.correctWords;
        const newIncorrectWords = !isCorrect ? state.incorrectWords + 1 : state.incorrectWords;
        const newTotalCorrect = newCorrectWords + newIncorrectWords;
        const newAccuracy = newTotalCorrect > 0 ? (newCorrectWords / newTotalCorrect) * 100 : 0;

        // Calculate average WPM
        const totalTime = Date.now() - (state.startTime || Date.now());
        const totalWordsTyped = nextIndex;
        const averageWPM = totalTime > 0 ? (totalWordsTyped / 5) / (totalTime / 60000) : 0;

        // Calculate score
        const score = Math.round((newAccuracy * 0.4 + Math.min(averageWPM / 100, 1) * 60));

        set({
          currentWordIndex: nextIndex,
          currentWord: nextWord,
          userInput: '',
          correctWords: newCorrectWords,
          incorrectWords: newIncorrectWords,
          averageWPM: Math.round(averageWPM),
          averageAccuracy: Math.round(newAccuracy),
          score,
          typingHistory: [...state.typingHistory, newHistoryItem],
        });

        // Check if session is complete
        if (nextIndex >= state.words.length) {
          get().endSession();
        }
      },

      skipWord: () => {
        const state = get();
        if (!state.isActive || state.isPaused) return;

        const nextIndex = state.currentWordIndex + 1;
        const nextWord = state.words[nextIndex]?.japanese || '';

        const newHistoryItem = {
          word: state.currentWord,
          input: '[SKIPPED]',
          correct: false,
          time: Date.now(),
        };

        set({
          currentWordIndex: nextIndex,
          currentWord: nextWord,
          userInput: '',
          incorrectWords: state.incorrectWords + 1,
          typingHistory: [...state.typingHistory, newHistoryItem],
        });

        if (nextIndex >= state.words.length) {
          get().endSession();
        }
      },

      nextWord: () => {
        const state = get();
        if (!state.isActive || state.isPaused) return;

        const nextIndex = Math.min(state.currentWordIndex + 1, state.words.length - 1);
        const nextWord = state.words[nextIndex]?.japanese || '';

        set({
          currentWordIndex: nextIndex,
          currentWord: nextWord,
          userInput: '',
        });
      },

      previousWord: () => {
        const state = get();
        if (!state.isActive || state.isPaused) return;

        const prevIndex = Math.max(state.currentWordIndex - 1, 0);
        const prevWord = state.words[prevIndex]?.japanese || '';

        set({
          currentWordIndex: prevIndex,
          currentWord: prevWord,
          userInput: '',
        });
      },

      // Settings actions
      updateSessionSettings: (settings) => {
        set((state) => ({
          ...state,
          ...settings,
        }));
      },

      // History actions
      clearHistory: () => {
        set({ typingHistory: [] });
      },

      getTypingStats: () => {
        const state = get();
        return {
          totalWords: state.totalWords,
          correctWords: state.correctWords,
          accuracy: state.averageAccuracy,
          wpm: state.averageWPM,
          score: state.score,
        };
      },
    }),
    {
      name: 'typing-storage',
      storage: createJSONStorage(() => sessionStorage), // Don't persist typing state across sessions
      partialize: (state) => ({}), // Don't persist anything
    }
  )
);

// Selectors for specific use cases
export const useTypingSession = () => {
  const store = useTypingStore();
  
  return {
    isActive: store.isActive,
    isPaused: store.isPaused,
    startTime: store.startTime,
    endTime: store.endTime,
    progress: store.totalWords > 0 ? (store.currentWordIndex / store.totalWords) * 100 : 0,
    currentWord: store.currentWord,
    currentWordIndex: store.currentWordIndex,
    totalWords: store.totalWords,
    userInput: store.userInput,
  };
};

export const useTypingMetrics = () => {
  const store = useTypingStore();
  
  return {
    currentWPM: store.currentWPM,
    averageWPM: store.averageWPM,
    currentAccuracy: store.currentAccuracy,
    averageAccuracy: store.averageAccuracy,
    score: store.score,
    correctWords: store.correctWords,
    incorrectWords: store.incorrectWords,
    errors: store.errors,
  };
};

export const useTypingSettings = () => {
  const store = useTypingStore();
  
  return {
    showRomaji: store.showRomaji,
    showEnglish: store.showEnglish,
    soundEffects: store.soundEffects,
    timeLimit: store.timeLimit,
    wordCount: store.wordCount,
  };
};

export const useTypingHistory = () => {
  const store = useTypingStore();
  
  return {
    history: store.typingHistory,
    clearHistory: store.clearHistory,
  };
};
