export const ACTIVITY_TYPES = {
  HIRAGANA_BASICS: 'hiragana_basics',
  KATAKANA_PRACTICE: 'katakana_practice',
  COMMON_PHRASES: 'common_phrases',
  SPEED_CHALLENGE: 'speed_challenge',
  VOCABULARY_TRAINING: 'vocabulary_training',
} as const;

export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

export const WORD_GROUPS = {
  BASIC_GREETINGS: 1,
 _FOOD_DINING: 2,
  FAMILY_MEMBERS: 3,
  NUMBERS: 4,
  DAYS_TIME: 5,
  COLORS: 6,
  TRAVEL_PHRASES: 7,
  BUSINESS_TERMS: 8,
} as const;

export const JAPANESE_CHARACTERS = {
  HIRAGANA: {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',
  },
  KATAKANA: {
    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
    'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
    'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
    'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
    'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
    'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
    'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
    'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
    'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
    'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
    'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
    'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
    'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
    'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',
  }
} as const;

export const TYPING_MODES = {
  JAPANESE_TO_ROMAJI: 'japanese_to_romaji',
  ROMAJI_TO_JAPANESE: 'romaji_to_japanese',
  ENGLISH_TO_JAPANESE: 'english_to_japanese',
  JAPANESE_TO_ENGLISH: 'japanese_to_english',
} as const;

export const SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 75,
  AVERAGE: 60,
  POOR: 40,
} as const;

export const WPM_THRESHOLDS = {
  EXPERT: 80,
  ADVANCED: 60,
  INTERMEDIATE: 40,
  BEGINNER: 20,
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
  },
  USERS: {
    ME: '/users/me',
    STATS: '/users/me/stats',
    SETTINGS: '/users/me/settings',
    PROGRESS: '/users/me/progress',
  },
  WORDS: {
    LIST: '/words',
    BY_ID: (id: number) => `/words/${id}`,
    SEARCH: '/words/search',
    RANDOM: '/words/random',
    BY_GROUP: (groupId: number) => `/groups/${groupId}/words`,
  },
  GROUPS: {
    LIST: '/groups',
    BY_ID: (id: number) => `/groups/${id}`,
  },
  ACTIVITIES: {
    LIST: '/activities',
    BY_ID: (id: number) => `/activities/${id}`,
    START: (id: number) => `/activities/${id}/start`,
    COMPLETE: (id: number) => `/activities/${id}/complete`,
  },
  SESSIONS: {
    LIST: '/sessions',
    BY_ID: (id: string) => `/sessions/${id}`,
    CREATE: '/sessions',
  },
  DASHBOARD: {
    LAST_SESSION: '/dashboard/last_study_session',
    PROGRESS: '/dashboard/study_progress',
    QUICK_STATS: '/dashboard/quick-stats',
  },
} as const;

export const DEFAULT_SETTINGS = {
  showRomaji: true,
  showEnglish: true,
  theme: 'light' as const,
  soundEffects: true,
  autoAdvance: false,
  difficulty: 'intermediate' as const,
  dailyReminders: true,
  achievementAlerts: true,
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const DEBOUNCE_DELAY = 300;
export const TOAST_DURATION = 3000;
export const TYPING_TIMEOUT = 5000;
