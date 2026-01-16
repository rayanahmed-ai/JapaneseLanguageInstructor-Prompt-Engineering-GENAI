import { apiClient, ApiResponse } from './client';
import { API_ENDPOINTS } from '../utils/constants';
import { Word, WordGroup, WordSearchResult } from '../types/word';

// Word API interfaces
export interface GetWordsParams {
  page?: number;
  limit?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  groupId?: number;
  search?: string;
}

export interface CreateWordData {
  japanese: string;
  romaji: string;
  english: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  groupId?: number;
  parts?: string;
}

export interface UpdateWordData extends Partial<CreateWordData> {
  id: number;
}

export interface CreateGroupData {
  name: string;
  description?: string;
  icon?: string;
}

export interface UpdateGroupData extends Partial<CreateGroupData> {
  id: number;
}

// Words API functions
export const wordsAPI = {
  /**
   * Get list of words with pagination and filters
   */
  getWords: async (params?: GetWordsParams): Promise<ApiResponse<WordSearchResult>> => {
    return apiClient.get(API_ENDPOINTS.WORDS.LIST, { params });
  },

  /**
   * Get word by ID
   */
  getWordById: async (id: number): Promise<ApiResponse<Word>> => {
    return apiClient.get(API_ENDPOINTS.WORDS.BY_ID(id));
  },

  /**
   * Search words
   */
  searchWords: async (query: string, params?: Omit<GetWordsParams, 'search'>): Promise<ApiResponse<WordSearchResult>> => {
    return apiClient.get(API_ENDPOINTS.WORDS.SEARCH, { 
      params: { q: query, ...params } 
    });
  },

  /**
   * Get random words
   */
  getRandomWords: async (count: number, difficulty?: 'beginner' | 'intermediate' | 'advanced'): Promise<ApiResponse<Word[]>> => {
    return apiClient.get(API_ENDPOINTS.WORDS.RANDOM, { 
      params: { count, difficulty } 
    });
  },

  /**
   * Create new word
   */
  createWord: async (data: CreateWordData): Promise<ApiResponse<Word>> => {
    return apiClient.post(API_ENDPOINTS.WORDS.LIST, data);
  },

  /**
   * Update existing word
   */
  updateWord: async (data: UpdateWordData): Promise<ApiResponse<Word>> => {
    return apiClient.put(API_ENDPOINTS.WORDS.BY_ID(data.id), data);
  },

  /**
   * Delete word
   */
  deleteWord: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete(API_ENDPOINTS.WORDS.BY_ID(id));
  },

  /**
   * Batch create words
   */
  createWordsBatch: async (words: CreateWordData[]): Promise<ApiResponse<Word[]>> => {
    return apiClient.post(`${API_ENDPOINTS.WORDS.LIST}/batch`, { words });
  },

  /**
   * Import words from file
   */
  importWords: async (file: File): Promise<ApiResponse<{ imported: number; errors: string[] }>> => {
    return apiClient.uploadFile(`${API_ENDPOINTS.WORDS.LIST}/import`, file);
  },

  /**
   * Export words
   */
  exportWords: async (params?: GetWordsParams): Promise<ApiResponse<{ downloadUrl: string }>> => {
    return apiClient.get(`${API_ENDPOINTS.WORDS.LIST}/export`, { params });
  },
};

// Word Groups API functions
export const wordGroupsAPI = {
  /**
   * Get all word groups
   */
  getGroups: async (): Promise<ApiResponse<WordGroup[]>> => {
    return apiClient.get(API_ENDPOINTS.GROUPS.LIST);
  },

  /**
   * Get group by ID
   */
  getGroupById: async (id: number): Promise<ApiResponse<WordGroup>> => {
    return apiClient.get(API_ENDPOINTS.GROUPS.BY_ID(id));
  },

  /**
   * Get words in a group
   */
  getGroupWords: async (groupId: number, params?: Pick<GetWordsParams, 'page' | 'limit' | 'difficulty'>): Promise<ApiResponse<WordSearchResult>> => {
    return apiClient.get(API_ENDPOINTS.WORDS.BY_GROUP(groupId), { params });
  },

  /**
   * Create new word group
   */
  createGroup: async (data: CreateGroupData): Promise<ApiResponse<WordGroup>> => {
    return apiClient.post(API_ENDPOINTS.GROUPS.LIST, data);
  },

  /**
   * Update word group
   */
  updateGroup: async (data: UpdateGroupData): Promise<ApiResponse<WordGroup>> => {
    return apiClient.put(API_ENDPOINTS.GROUPS.BY_ID(data.id), data);
  },

  /**
   * Delete word group
   */
  deleteGroup: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete(API_ENDPOINTS.GROUPS.BY_ID(id));
  },

  /**
   * Add words to group
   */
  addWordsToGroup: async (groupId: number, wordIds: number[]): Promise<ApiResponse<{ added: number }>> => {
    return apiClient.post(`${API_ENDPOINTS.GROUPS.BY_ID(groupId)}/words`, { wordIds });
  },

  /**
   * Remove words from group
   */
  removeWordsFromGroup: async (groupId: number, wordIds: number[]): Promise<ApiResponse<{ removed: number }>> => {
    return apiClient.delete(`${API_ENDPOINTS.GROUPS.BY_ID(groupId)}/words`, { 
      data: { wordIds } 
    });
  },

  /**
   * Get group statistics
   */
  getGroupStats: async (groupId: number): Promise<ApiResponse<{
    totalWords: number;
    difficultyDistribution: Record<string, number>;
    recentlyAdded: Word[];
  }>> => {
    return apiClient.get(`${API_ENDPOINTS.GROUPS.BY_ID(groupId)}/stats`);
  },
};

// Helper functions for word management
export const wordHelpers = {
  /**
   * Convert Japanese text to romaji
   */
  japaneseToRomaji: (japanese: string): string => {
    // Basic conversion - in real app, use a proper library like wanakana
    const hiraganaMap: Record<string, string> = {
      'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
      'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
      'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
      'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
      'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
      'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
      'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
      'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
      'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
      'わ': 'wa', 'を': 'wo', 'ん': 'n',
    };

    return japanese.split('').map(char => hiraganaMap[char] || char).join('');
  },

  /**
   * Validate Japanese word
   */
  validateJapaneseWord: (word: string): boolean => {
    const japaneseRegex = /^[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\s]+$/;
    return japaneseRegex.test(word.trim());
  },

  /**
   * Validate romaji
   */
  validateRomaji: (romaji: string): boolean => {
    const romajiRegex = /^[a-zA-Z\s\-']+$/;
    return romajiRegex.test(romaji.trim());
  },

  /**
   * Get difficulty color
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
   * Sort words by difficulty
   */
  sortByDifficulty: (words: Word[]): Word[] => {
    const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
    return [...words].sort((a, b) => 
      difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
    );
  },

  /**
   * Filter words by difficulty
   */
  filterByDifficulty: (words: Word[], difficulty: 'beginner' | 'intermediate' | 'advanced'): Word[] => {
    return words.filter(word => word.difficulty === difficulty);
  },

  /**
   * Search words in multiple fields
   */
  searchInWords: (words: Word[], query: string): Word[] => {
    const lowerQuery = query.toLowerCase();
    return words.filter(word => 
      word.japanese.toLowerCase().includes(lowerQuery) ||
      word.romaji.toLowerCase().includes(lowerQuery) ||
      word.english.toLowerCase().includes(lowerQuery)
    );
  },
};

// Export types
export type { 
  GetWordsParams, 
  CreateWordData, 
  UpdateWordData, 
  CreateGroupData, 
  UpdateGroupData 
};
