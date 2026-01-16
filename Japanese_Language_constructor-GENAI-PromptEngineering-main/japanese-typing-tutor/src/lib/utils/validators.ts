import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Settings schemas
export const settingsSchema = z.object({
  showRomaji: z.boolean(),
  showEnglish: z.boolean(),
  theme: z.enum(['light', 'dark', 'auto']),
  soundEffects: z.boolean(),
  autoAdvance: z.boolean(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  dailyReminders: z.boolean(),
  achievementAlerts: z.boolean(),
});

// Word schemas
export const wordSchema = z.object({
  japanese: z.string().min(1, 'Japanese text is required'),
  romaji: z.string().min(1, 'Romaji is required'),
  english: z.string().min(1, 'English translation is required'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  groupId: z.number().optional(),
});

export const wordGroupSchema = z.object({
  name: z.string().min(1, 'Group name is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
});

// Activity schemas
export const activitySchema = z.object({
  name: z.string().min(1, 'Activity name is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  type: z.string().min(1, 'Activity type is required'),
  icon: z.string().min(1, 'Icon is required'),
  groupId: z.number().optional(),
});

// Session schemas
export const sessionResultsSchema = z.object({
  wpm: z.number().min(0, 'WPM must be positive'),
  accuracy: z.number().min(0).max(100, 'Accuracy must be between 0 and 100'),
  duration: z.number().min(0, 'Duration must be positive'),
  score: z.number().min(0, 'Score must be positive'),
  wordsTyped: z.number().min(0, 'Words typed must be positive'),
  errors: z.number().min(0, 'Errors must be positive'),
  correctWords: z.number().min(0, 'Correct words must be positive'),
});

// Search schemas
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  groupId: z.number().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

// Pagination schemas
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

// Utility validation functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateJapaneseText = (text: string): boolean => {
  // Check if text contains Japanese characters (Hiragana, Katakana, or Kanji)
  const japaneseRegex = /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/;
  return japaneseRegex.test(text);
};

export const validateRomaji = (romaji: string): boolean => {
  // Basic romaji validation
  const romajiRegex = /^[a-zA-Z\s\-']+$/;
  return romajiRegex.test(romaji);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type SettingsFormData = z.infer<typeof settingsSchema>;
export type WordFormData = z.infer<typeof wordSchema>;
export type WordGroupFormData = z.infer<typeof wordGroupSchema>;
export type ActivityFormData = z.infer<typeof activitySchema>;
export type SessionResultsFormData = z.infer<typeof sessionResultsSchema>;
export type SearchFormData = z.infer<typeof searchSchema>;
export type PaginationFormData = z.infer<typeof paginationSchema>;
