export interface Word {
  id: number;
  japanese: string;
  romaji: string;
  english: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  groupId?: number;
  parts?: string;
  partsJson?: any;
}

export interface WordGroup {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  wordCount: number;
}

export interface WordSearchResult {
  words: Word[];
  total: number;
  page: number;
  limit: number;
}
