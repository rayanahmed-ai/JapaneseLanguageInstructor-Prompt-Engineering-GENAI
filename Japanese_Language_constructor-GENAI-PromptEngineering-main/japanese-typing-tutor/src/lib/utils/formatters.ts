import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { SCORE_THRESHOLDS, WPM_THRESHOLDS } from './constants';

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM d, yyyy');
};

export const formatTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'h:mm a');
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM d, yyyy h:mm a');
};

export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  
  return remainingSeconds === 0 
    ? `${minutes}m` 
    : `${minutes}m ${remainingSeconds}s`;
};

export const formatWPM = (wpm: number): string => {
  return Math.round(wpm).toString();
};

export const formatAccuracy = (accuracy: number): string => {
  return `${Math.round(accuracy)}%`;
};

export const formatScore = (score: number): string => {
  return Math.round(score).toString();
};

export const getPerformanceLevel = (score: number): string => {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'Excellent';
  if (score >= SCORE_THRESHOLDS.GOOD) return 'Good';
  if (score >= SCORE_THRESHOLDS.AVERAGE) return 'Average';
  if (score >= SCORE_THRESHOLDS.POOR) return 'Poor';
  return 'Needs Improvement';
};

export const getWPMLevel = (wpm: number): string => {
  if (wpm >= WPM_THRESHOLDS.EXPERT) return 'Expert';
  if (wpm >= WPM_THRESHOLDS.ADVANCED) return 'Advanced';
  if (wpm >= WPM_THRESHOLDS.INTERMEDIATE) return 'Intermediate';
  if (wpm >= WPM_THRESHOLDS.BEGINNER) return 'Beginner';
  return 'Novice';
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str: string): string => {
  return str.split(' ').map(word => capitalizeFirst(word)).join(' ');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const formatJapaneseText = (text: string): string => {
  // Add proper spacing and formatting for Japanese text
  return text.trim().replace(/\s+/g, '');
};

export const formatRomaji = (romaji: string): string => {
  // Standardize romaji formatting
  return romaji.toLowerCase().trim();
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'text-green-600 bg-green-100';
    case 'intermediate':
      return 'text-yellow-600 bg-yellow-100';
    case 'advanced':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getScoreColor = (score: number): string => {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'text-green-600';
  if (score >= SCORE_THRESHOLDS.GOOD) return 'text-blue-600';
  if (score >= SCORE_THRESHOLDS.AVERAGE) return 'text-yellow-600';
  if (score >= SCORE_THRESHOLDS.POOR) return 'text-orange-600';
  return 'text-red-600';
};

export const getWPMColor = (wpm: number): string => {
  if (wpm >= WPM_THRESHOLDS.EXPERT) return 'text-green-600';
  if (wpm >= WPM_THRESHOLDS.ADVANCED) return 'text-blue-600';
  if (wpm >= WPM_THRESHOLDS.INTERMEDIATE) return 'text-yellow-600';
  if (wpm >= WPM_THRESHOLDS.BEGINNER) return 'text-orange-600';
  return 'text-red-600';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const formatStreak = (days: number): string => {
  if (days === 0) return 'No streak';
  if (days === 1) return '1 day';
  return `${days} days`;
};
