import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Japanese Typing Tutor - Master Hiragana, Katakana & Romaji',
  description:
    'Learn to type in Japanese with interactive lessons, real-time feedback, and personalized progress tracking.',
  keywords: [
    'japanese',
    'typing',
    'tutor',
    'hiragana',
    'katakana',
    'romaji',
    'language learning',
  ],
  authors: [{ name: 'Japanese Typing Tutor Team' }],
  creator: 'Japanese Typing Tutor',
  publisher: 'Japanese Typing Tutor',
  metadataBase: new URL('https://japanesetypingtutor.com'),
  openGraph: {
    title: 'Japanese Typing Tutor',
    description: 'Interactive Japanese typing tutor',
    url: 'https://japanesetypingtutor.com',
    siteName: 'Japanese Typing Tutor',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Japanese Typing Tutor',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Japanese Typing Tutor',
    description: 'Master Japanese typing with interactive lessons',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>
        </div>
      </body>
    </html>
  );
}
