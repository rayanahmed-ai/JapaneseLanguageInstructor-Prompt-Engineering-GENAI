'use client';

import * as React from 'react';
import { useErrorHandler } from '@/lib/utils/errorHandler';

const ActivitiesPage: React.FC = () => {
  const { error, handleError, clearError } = useErrorHandler();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Learning Activities
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Hiragana Basics</h3>
            <p className="text-gray-600">
              Master the fundamental Japanese characters with guided lessons.
            </p>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Learning
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Speed Challenge</h3>
            <p className="text-gray-600">
              Test your typing speed and accuracy with timed challenges.
            </p>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Challenge
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Vocabulary Training</h3>
            <p className="text-gray-600">
              Build your Japanese vocabulary through interactive exercises.
            </p>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Training
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold mb-2">Common Phrases</h3>
            <p className="text-gray-600">
              Learn everyday Japanese phrases and expressions.
            </p>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Learning
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">🎋</div>
            <h3 className="text-xl font-semibold mb-2">Katakana Practice</h3>
            <p className="text-gray-600">
              Master the Katakana script with focused practice.
            </p>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Practice
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Mixed Practice</h3>
            <p className="text-gray-600">
              Combine Hiragana, Katakana, and Kanji in comprehensive lessons.
            </p>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
