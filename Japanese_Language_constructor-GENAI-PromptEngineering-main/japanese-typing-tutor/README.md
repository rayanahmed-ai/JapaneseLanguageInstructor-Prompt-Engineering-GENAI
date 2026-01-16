# Japanese Typing Tutor

A modern, server-side rendered web application for learning Japanese typing built with React and Next.js.

## 🚀 Features

- **Interactive Typing Practice**: Learn Hiragana, Katakana, and Romaji with real-time feedback
- **Progress Tracking**: Monitor WPM, accuracy, and learning streaks
- **Multiple Difficulty Levels**: Beginner, Intermediate, and Advanced content
- **Gamified Learning**: Engaging activities and achievement system
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Analytics**: Track performance metrics and improvement over time

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Authentication**: NextAuth.js
- **UI Components**: shadcn/ui components
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Charts**: Recharts

## 📁 Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd japanese-typing-tutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 🗂️ Project Structure

```
japanese-typing-tutor/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/           # Authentication routes
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── api/               # API routes
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Landing page
│   ├── components/             # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layout/         # Layout components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── activities/      # Activity components
│   │   └── words/          # Word components
│   ├── lib/                    # Core utilities
│   │   ├── api/             # API services
│   │   ├── hooks/           # React hooks
│   │   ├── store/           # Zustand stores
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Helper functions
│   ├── styles/                 # Global styles
│   └── public/                 # Static assets
├── package.json               # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts        # Tailwind configuration
├── next.config.js           # Next.js configuration
└── .env.local               # Environment variables
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build         # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
npm run type-check     # Run TypeScript type checking

# Testing
npm run test           # Run unit tests
npm run test:e2e       # Run end-to-end tests
```

## 🎯 Key Features

### Authentication
- User registration and login
- Token-based authentication
- Password reset functionality
- Remember me option
- Two-factor authentication support

### Learning Modes
- **Hiragana Basics**: Learn fundamental Japanese characters
- **Katakana Practice**: Master Katakana script
- **Common Phrases**: Practice everyday Japanese expressions
- **Speed Challenge**: Test your typing speed
- **Vocabulary Training**: Learn new words and their meanings

### Progress Tracking
- Real-time WPM calculation
- Accuracy percentage tracking
- Session history and statistics
- Achievement badges and milestones
- Learning streaks and daily goals

### User Settings
- Display preferences (romaji, English translations)
- Theme selection (light, dark, auto)
- Sound effects toggle
- Difficulty level selection
- Notification preferences

## 🔒 Security Features

- JWT-based authentication
- Password strength requirements
- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure HTTP headers

## 📱 Responsive Design

- Mobile-first approach
- Touch-friendly interfaces
- Progressive enhancement
- Accessible navigation
- Optimized performance

## 🎨 UI/UX

- Modern, clean interface
- Smooth animations and transitions
- Japanese typography support
- Consistent design system
- Interactive feedback

## 🧪 Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error boundaries
- Write unit tests for components
- Follow accessibility standards

## 📊 Analytics & Monitoring

- Performance metrics tracking
- User behavior analytics
- Error monitoring integration
- Progress visualization

## 🚀 Deployment

The application is designed to be easily deployable to various platforms:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```bash
docker build -t japanese-typing-tutor .
docker run -p 3001:3001 japanese-typing-tutor
```

### Static Export
```bash
npm run build
npm run export
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact us at support@japanesetypingtutor.com
