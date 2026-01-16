'use client';

import * as React from 'react';
import { useErrorHandler } from '@/lib/utils/errorHandler';

const WordsPage: React.FC = () => {
  const { error, handleError, clearError } = useErrorHandler();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Vocabulary Library
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

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Search Words</h2>
            <input
              type="text"
              placeholder="Search for words..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { japanese: 'こんにちは', romaji: 'konnichiwa', english: 'Hello', category: 'Greetings' },
            { japanese: 'ありがとう', romaji: 'arigatou', english: 'Thank you', category: 'Common Phrases' },
            { japanese: '水', romaji: 'mizu', english: 'Water', category: 'Basic Nouns' },
            { japanese: '先生', romaji: 'sensei', english: 'Teacher', category: 'People' },
            { japanese: '食べる', romaji: 'taberu', english: 'To eat', category: 'Verbs' },
            { japanese: '学校', romaji: 'gakkou', english: 'School', category: 'Places' },
            { japanese: '時間', romaji: 'jikan', english: 'Time', category: 'Concepts' },
            { japanese: '日本', romaji: 'nihon', english: 'Japan', category: 'Countries' },
          ].map((word, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-900 mb-2">{word.japanese}</div>
                <div className="text-xl text-gray-500 mb-2">{word.romaji}</div>
                <div className="text-lg text-gray-700">{word.english}</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Category:</span>
                  <span className="text-sm font-medium">{word.category}</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                    Practice
                  </button>
                  <button className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
                    Add to List
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordsPage;
