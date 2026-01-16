'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  user?: {
    id: string;
    username: string;
    email: string;
  } | null;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const router = useRouter();
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-blue-600 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-white hover:opacity-90 transition-opacity"
          >
            日本語 Typing Tutor
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex gap-2">
            <Link 
              href="/dashboard" 
              className="nav-link"
            >
              Dashboard
            </Link>
            <Link 
              href="/activities" 
              className="nav-link"
            >
              Activities
            </Link>
            <Link 
              href="/words" 
              className="nav-link"
            >
              Words
            </Link>
            <Link 
              href="/groups" 
              className="nav-link"
            >
              Groups
            </Link>
            <Link 
              href="/sessions" 
              className="nav-link"
            >
              Sessions
            </Link>
            <Link 
              href="/settings" 
              className="nav-link"
            >
              Settings
            </Link>
          </div>
          
          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-white font-medium">
                  Welcome, {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2 text-sm text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
