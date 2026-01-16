# Frontend Technical Specifications
## Japanese Typing Tutor Web Application - React + Next.js

---

## 1. Overview

A modern, server-side rendered web application for learning Japanese typing built with React and Next.js. Features include user authentication, progress tracking, interactive typing exercises, and comprehensive learning analytics.

---

## 2. Technology Stack

### 2.1 Core Technologies
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5+
- **UI Library**: React 18+
- **Styling**: Tailwind CSS 3+
- **State Management**: Zustand / Redux Toolkit
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Authentication**: NextAuth.js

### 2.2 Additional Libraries
- **UI Components**: shadcn/ui or Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts or Chart.js
- **Date Handling**: date-fns
- **HTTP Client**: Axios
- **Toast Notifications**: React Hot Toast / Sonner
- **Japanese Input**: react-ime-component (if needed)

---

## 3. Project Structure

```
/japanese-typing-tutor
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── activities/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── words/
│   │   │   └── page.tsx
│   │   ├── groups/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── sessions/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── layout.tsx
│   ├── page.tsx           # Landing page
│   └── globals.css
├── components/
│   ├── ui/                # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── dashboard/
│   │   ├── StatsCard.tsx
│   │   ├── ProgressChart.tsx
│   │   └── RecentSessions.tsx
│   ├── activities/
│   │   ├── ActivityCard.tsx
│   │   ├── TypingInterface.tsx
│   │   └── ActivityResults.tsx
│   ├── words/
│   │   ├── WordList.tsx
│   │   ├── WordCard.tsx
│   │   └── WordSearch.tsx
│   └── common/
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       └── ProtectedRoute.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts      # Axios instance
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── words.ts
│   │   ├── groups.ts
│   │   ├── sessions.ts
│   │   └── activities.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useStats.ts
│   │   ├── useWords.ts
│   │   └── useTyping.ts
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── settingsStore.ts
│   │   └── typingStore.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── constants.ts
│   └── types/
│       ├── user.ts
│       ├── word.ts
│       ├── session.ts
│       └── activity.ts
├── public/
│   ├── fonts/
│   ├── sounds/
│   └── images/
├── styles/
│   └── globals.css
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Pages & Routes

### 4.1 Public Routes

#### **Landing Page** - `/`
- Hero section with animated Japanese characters
- Feature highlights
- Typing demo
- CTA button → redirects to `/login` or `/dashboard`

**Component Structure**:
```tsx
// app/page.tsx
export default function LandingPage() {
  return (
    <>
      <Hero />
      <TypingDemo />
      <Features />
      <CTA />
    </>
  );
}
```

#### **Login Page** - `/login`
- Email/password form
- "Remember me" checkbox
- "Forgot password" link
- "Sign up" link
- OAuth options (Google, optional)

#### **Register Page** - `/register`
- Username, email, password form
- Password strength indicator
- Terms & conditions checkbox
- "Already have account" link

---

### 4.2 Protected Routes (requires authentication)

#### **Dashboard** - `/dashboard`
- Overview stats (WPM, accuracy, streak, words learned)
- Recent sessions list
- Quick action cards
- Progress chart

**Data Requirements**:
- `GET /api/users/me/stats`
- `GET /api/sessions?limit=5`

---

#### **Study Activities** - `/activities`
- Activity cards grid
- Filter by difficulty
- Click card → `/activities/[id]`

**Data Requirements**:
- `GET /api/activities`

---

#### **Activity Practice** - `/activities/[id]`
- Full-screen typing interface
- Real-time WPM/accuracy display
- Timer
- Word/character display
- Keyboard hints
- Results modal on completion

**Data Requirements**:
- `GET /api/activities/:id`
- `GET /api/words/random?count=20&difficulty=`
- `POST /api/sessions` (on completion)

---

#### **Words** - `/words`
- Searchable word list
- Filter by difficulty
- Filter by group
- Pagination
- Japanese, romaji, English display

**Data Requirements**:
- `GET /api/words?page=1&limit=20`
- `GET /api/words/search?q=`

---

#### **Word Groups** - `/groups`
- Group cards grid
- Click card → `/groups/[id]`

**Data Requirements**:
- `GET /api/groups`

---

#### **Group Details** - `/groups/[id]`
- Group information
- Words in group
- "Practice this group" button

**Data Requirements**:
- `GET /api/groups/:id`
- `GET /api/groups/:id/words`

---

#### **Sessions History** - `/sessions`
- Session cards list
- Sort by date, score, WPM
- Filter by activity type
- View session details

**Data Requirements**:
- `GET /api/sessions?page=1&limit=10`

---

#### **Settings** - `/settings`
- Display settings
- Practice settings
- Notification settings
- Account settings
- Save button with optimistic updates

**Data Requirements**:
- `GET /api/users/me/settings`
- `PUT /api/users/me/settings`

---

## 5. Component Architecture

### 5.1 Component Patterns

#### **Server Components** (Default in Next.js 14)
Use for:
- Static pages
- Data fetching without interactivity
- SEO-critical content
- Initial page loads

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const stats = await fetchUserStats(); // Server-side
  
  return (
    <div>
      <h1>Dashboard</h1>
      <StatsGrid stats={stats} />
      <RecentSessions /> {/* Client component */}
    </div>
  );
}
```

#### **Client Components** (`'use client'`)
Use for:
- Interactive elements
- Event handlers
- React hooks (useState, useEffect)
- Browser APIs

```tsx
'use client';

export function TypingInterface() {
  const [input, setInput] = useState('');
  const [wpm, setWpm] = useState(0);
  
  const handleKeyPress = (e: KeyboardEvent) => {
    // Handle typing logic
  };
  
  return <div>...</div>;
}
```

---

### 5.2 Key Components

#### **Navbar Component**
```tsx
// components/layout/Navbar.tsx
'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

export function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-blue-600">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            日本語 Typing Tutor
          </Link>
          
          <div className="flex gap-2">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/activities">Activities</NavLink>
            <NavLink href="/words">Words</NavLink>
            <NavLink href="/groups">Groups</NavLink>
            <NavLink href="/sessions">Sessions</NavLink>
            <NavLink href="/settings">Settings</NavLink>
          </div>
          
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
```

#### **StatsCard Component**
```tsx
// components/dashboard/StatsCard.tsx
interface StatsCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: number;
}

export function StatsCard({ icon, label, value, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
      <div className="text-gray-600 text-lg">{label}</div>
      {trend && (
        <div className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}
```

#### **ActivityCard Component**
```tsx
// components/activities/ActivityCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Activity } from '@/lib/types/activity';

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const router = useRouter();
  
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };
  
  return (
    <div 
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
      onClick={() => router.push(`/activities/${activity.id}`)}
    >
      <h3 className="text-2xl font-bold text-blue-900 mb-3">
        {activity.icon} {activity.name}
      </h3>
      <p className="text-gray-600 mb-4">{activity.description}</p>
      <span className={`px-4 py-1 rounded-full text-sm font-bold ${difficultyColors[activity.difficulty]}`}>
        {activity.difficulty}
      </span>
    </div>
  );
}
```

#### **TypingInterface Component**
```tsx
// components/activities/TypingInterface.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTyping } from '@/lib/hooks/useTyping';

interface TypingInterfaceProps {
  words: string[];
  onComplete: (results: SessionResults) => void;
}

export function TypingInterface({ words, onComplete }: TypingInterfaceProps) {
  const {
    currentWord,
    input,
    wpm,
    accuracy,
    isComplete,
    handleInput,
    results
  } = useTyping(words);
  
  useEffect(() => {
    if (isComplete) {
      onComplete(results);
    }
  }, [isComplete, results, onComplete]);
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Stats Display */}
      <div className="flex justify-between mb-8">
        <div className="text-xl">WPM: <span className="font-bold text-blue-600">{wpm}</span></div>
        <div className="text-xl">Accuracy: <span className="font-bold text-green-600">{accuracy}%</span></div>
      </div>
      
      {/* Word Display */}
      <div className="bg-white rounded-xl p-12 shadow-2xl mb-8">
        <div className="text-6xl font-bold text-center text-blue-900 mb-4">
          {currentWord}
        </div>
        <div className="text-2xl text-center text-gray-500">
          {/* Romaji hint if enabled */}
        </div>
      </div>
      
      {/* Input Field */}
      <input
        type="text"
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        className="w-full text-4xl text-center p-6 border-4 border-blue-500 rounded-xl focus:outline-none focus:border-blue-700"
        autoFocus
      />
    </div>
  );
}
```

---

## 6. State Management

### 6.1 Zustand Store Example

```tsx
// lib/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: (user, token) => 
        set({ user, token, isAuthenticated: true }),
      
      logout: () => 
        set({ user: null, token: null, isAuthenticated: false }),
      
      updateUser: (userData) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }))
    }),
    {
      name: 'auth-storage'
    }
  )
);
```

```tsx
// lib/store/settingsStore.ts
import { create } from 'zustand';

interface Settings {
  showRomaji: boolean;
  showEnglish: boolean;
  theme: 'light' | 'dark' | 'auto';
  soundEffects: boolean;
  autoAdvance: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  dailyReminders: boolean;
  achievementAlerts: boolean;
}

interface SettingsState extends Settings {
  updateSettings: (settings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  showRomaji: true,
  showEnglish: true,
  theme: 'light',
  soundEffects: true,
  autoAdvance: false,
  difficulty: 'intermediate',
  dailyReminders: true,
  achievementAlerts: true
};

export const useSettingsStore = create<SettingsState>((set) => ({
  ...defaultSettings,
  
  updateSettings: (newSettings) => 
    set((state) => ({ ...state, ...newSettings })),
  
  resetSettings: () => 
    set(defaultSettings)
}));
```

---

## 7. Data Fetching with React Query

### 7.1 Query Client Setup

```tsx
// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false
      }
    }
  }));
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 7.2 Custom Hooks with React Query

```tsx
// lib/hooks/useStats.ts
import { useQuery } from '@tanstack/react-query';
import { getUserStats } from '@/lib/api/users';

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: getUserStats,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
}
```

```tsx
// lib/hooks/useWords.ts
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getWords, searchWords } from '@/lib/api/words';

export function useWords(filters?: { difficulty?: string; groupId?: number }) {
  return useInfiniteQuery({
    queryKey: ['words', filters],
    queryFn: ({ pageParam = 1 }) => getWords({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1
  });
}

export function useWordSearch(query: string) {
  return useQuery({
    queryKey: ['words', 'search', query],
    queryFn: () => searchWords(query),
    enabled: query.length > 0
  });
}
```

```tsx
// lib/hooks/useSessions.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSessions, createSession } from '@/lib/api/sessions';

export function useSessions() {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    }
  });
}
```

---

## 8. API Client Implementation

### 8.1 Axios Instance

```tsx
// lib/api/client.ts
import axios from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 8.2 API Service Functions

```tsx
// lib/api/auth.ts
import apiClient from './client';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    return apiClient.post('/auth/login', credentials);
  },
  
  register: async (data: RegisterData) => {
    return apiClient.post('/auth/register', data);
  },
  
  logout: async () => {
    return apiClient.post('/auth/logout');
  },
  
  verify: async () => {
    return apiClient.get('/auth/verify');
  }
};
```

```tsx
// lib/api/users.ts
import apiClient from './client';

export const getUserStats = async () => {
  return apiClient.get('/users/me/stats');
};

export const updateSettings = async (settings: any) => {
  return apiClient.put('/users/me/settings', settings);
};

export const getUserProgress = async () => {
  return apiClient.get('/users/me/progress');
};
```

```tsx
// lib/api/words.ts
import apiClient from './client';

interface GetWordsParams {
  page?: number;
  limit?: number;
  difficulty?: string;
  groupId?: number;
}

export const getWords = async (params: GetWordsParams) => {
  return apiClient.get('/words', { params });
};

export const getWordById = async (id: number) => {
  return apiClient.get(`/words/${id}`);
};

export const searchWords = async (query: string) => {
  return apiClient.get('/words/search', { params: { q: query } });
};

export const getRandomWords = async (count: number, difficulty?: string) => {
  return apiClient.get('/words/random', { params: { count, difficulty } });
};
```

```tsx
// lib/api/sessions.ts
import apiClient from './client';

export const getSessions = async (params?: any) => {
  return apiClient.get('/sessions', { params });
};

export const createSession = async (sessionData: any) => {
  return apiClient.post('/sessions', sessionData);
};

export const getSessionById = async (id: string) => {
  return apiClient.get(`/sessions/${id}`);
};
```

```tsx
// lib/api/activities.ts
import apiClient from './client';

export const getActivities = async () => {
  return apiClient.get('/activities');
};

export const getActivityById = async (id: number) => {
  return apiClient.get(`/activities/${id}`);
};

export const startActivity = async (id: number) => {
  return apiClient.post(`/activities/${id}/start`);
};

export const completeActivity = async (id: number, data: any) => {
  return apiClient.post(`/activities/${id}/complete`, data);
};
```

---

## 9. TypeScript Types

```tsx
// lib/types/user.ts
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
```

```tsx
// lib/types/word.ts
export interface Word {
  id: number;
  japanese: string;
  romaji: string;
  english: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  groupId?: number;
}

export interface WordGroup {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  wordCount: number;
}
```

```tsx
// lib/types/session.ts
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
}

export interface SessionResults {
  wpm: number;
  accuracy: number;
  duration: number;
  score: number;
  wordsTyped: number;
  errors: number;
}
```

```tsx
// lib/types/activity.ts
export interface Activity {
  id: number;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: string;
  icon: string;
}
```

---

## 10. Authentication with NextAuth.js

```tsx
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authAPI } from '@/lib/api/auth';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await authAPI.login({
            email: credentials?.email!,
            password: credentials?.password!
          });
          
          if (response.success) {
            return {
              id: response.data.userId,
              email: response.data.email,
              name: response.data.username,
              token: response.data.token
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.userId = token.userId;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
```

---

## 11. Form Handling with React Hook Form

```tsx
// app/(auth)/login/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });
  
  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });
    
    if (result?.ok) {
      router.push('/dashboard');
    } else {
      // Show error toast
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-cyan-600">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
          Login
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

## 12. Styling with Tailwind CSS

### 12.1 Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 13. Performance Optimization

### 13.1 Next.js Optimizations
- **Image Optimization**: Use `next/image` for automatic optimization
- **Font Optimization**: Use `next/font` for Google Fonts
- **Code Splitting**: Automatic with Next.js App Router
- **Lazy Loading**: Use `dynamic()` for heavy components
- **Prefetching**: Automatic for Link components

```tsx
// Lazy load heavy components
import dynamic from 'next/dynamic';

const TypingInterface = dynamic(
  () => import('@/components/activities/TypingInterface'),
  { ssr: false, loading: () => <LoadingSpinner /> }
);
```

### 13.2 React Query Optimizations
- Prefetch data on hover
- Cache invalidation strategies
- Optimistic updates
- Background refetching

```tsx
// Prefetch on hover
const queryClient = useQueryClient();

<Link 
  href="/activities/1"
  onMouseEnter={() => {
    queryClient.prefetchQuery({
      queryKey: ['activity', 1],
      queryFn: () => getActivityById(1)
    });
  }}
>
  Start Activity
</Link>
```

---

## 14. Testing Strategy

### 14.1 Unit Tests (Jest + React Testing Library)

```tsx
// components/__tests__/StatsCard.test.tsx
import { render, screen } from '@testing-library/react';
import { StatsCard } from '../dashboard/StatsCard';

describe('StatsCard', () => {
  it('renders stats correctly', () => {
    render(
      <StatsCard 
        icon="⚡" 
        label="WPM Average" 
        value={45} 
      />
    );
    
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('WPM Average')).toBeInTheDocument();
  });
});
```

### 14.2 Integration Tests

```tsx
// app/__tests__/dashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '../dashboard/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('Dashboard Page', () => {
  it('loads and displays user stats', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DashboardPage />
      </QueryClientProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });
});
```

### 14.3 E2E Tests (Playwright)

```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('user can login successfully', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
});
```

---

## 15. Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Japanese Typing Tutor
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-here
```

---

## 16. Deployment

### 16.1 Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Type checking
npm run type-check

# Linting
npm run lint
```

### 16.2 Vercel Deployment (Recommended)
- Connect GitHub repository
- Auto-deploy on push to main
- Environment variables in Vercel dashboard
- Preview deployments for PRs

### 16.3 Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3001
CMD ["node", "server.js"]
```

---

## 17. Development Guidelines

### 17.1 Code Style
- Use TypeScript for type safety
- Functional components with hooks
- Use async/await over promises
- Descriptive variable and function names
- Extract reusable logic into custom hooks

### 17.2 Component Guidelines
- One component per file
- Props interface above component
- Use composition over prop drilling
- Keep components focused and small
- Use React.memo for expensive renders

### 17.3 Naming Conventions
- Components: PascalCase (UserProfile.tsx)
- Hooks: camelCase with 'use' prefix (useAuth.ts)
- Utils: camelCase (formatDate.ts)
- Types: PascalCase (User.ts)
- Constants: UPPER_SNAKE_CASE

---

## 18. Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Screen reader testing
- Color contrast compliance (WCAG AA)
- Alternative text for images
- Error announcements

---

## 19. SEO Optimization

```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Japanese Typing Tutor - Master Hiragana, Katakana & Romaji',
  description: 'Learn to type in Japanese with interactive lessons...',
  keywords: ['japanese', 'typing', 'tutor', 'hiragana', 'katakana'],
  openGraph: {
    title: 'Japanese Typing Tutor',
    description: 'Master Japanese typing skills',
    images: ['/og-image.png'],
  },
};
```

---

## 20. Future Enhancements

- Progressive Web App (PWA)
- Offline mode
- Dark mode toggle
- Internationalization (i18n)
- Real-time multiplayer
- Voice pronunciation
- Mobile app (React Native)
- Advanced analytics dashboard
- Social features (leaderboards, sharing)

---

**Version**: 1.0.0  
**Last Updated**: December 21, 2025  
**Tech Stack**: React 18 + Next.js 14 + TypeScript 5 + Tailwind CSS  
**Author**: Development Team