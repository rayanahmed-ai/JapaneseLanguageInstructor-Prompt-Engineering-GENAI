'use client';

import * as React from 'react';
import { useErrorHandler } from '@/lib/utils/errorHandler';

const SessionsPage: React.FC = () => {
  const { error, handleError, clearError } = useErrorHandler();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Study Sessions
        </h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error.message}</p>
            <button
              onClick={clearError}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear Error
            </button>
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Start New Session</h2>
            <p className="text-gray-600 mb-4">
              Choose your learning activity and difficulty level to begin practicing.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500">
                  <option>Hiragana Basics</option>
                  <option>Katakana Practice</option>
                  <option>Common Phrases</option>
                  <option>Speed Challenge</option>
                  <option>Vocabulary Training</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
            
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Start Session
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
          <p className="text-gray-600">No recent sessions to display.</p>
          
          <div className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <div className="text-6xl mb-2">📚</div>
              <p>Complete your first study session to see your progress here!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Session Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600">Total Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">-</div>
              <div className="text-sm text-gray-600">Average WPM</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">-</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;
