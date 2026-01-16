'use client';

import * as React from 'react';
import { useErrorHandler } from '@/lib/utils/errorHandler';

const GroupsPage: React.FC = () => {
  const { error, handleError, clearError } = useErrorHandler();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Word Groups
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
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Basic Greetings</h2>
            <p className="text-gray-600 mb-4">Essential everyday Japanese greetings</p>
            <div className="text-sm text-gray-500">
              <p>• こんにちは (Konnichiwa) - Hello</p>
              <p>• ありがとう (Arigatou) - Thank you</p>
              <p>• おはようございます (Ohayou gozaimasu) - Good morning</p>
              <p>• こんばんは (Konbanwa) - Good evening</p>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Learning
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Food & Dining</h2>
            <p className="text-gray-600 mb-4">Vocabulary for restaurants and dining</p>
            <div className="text-sm text-gray-500">
              <p>• 水 (Mizu) - Water</p>
              <p>• ご飯 (Gohan) - Meal/Cooked rice</p>
              <p>• おいしい (Oishii) - Delicious</p>
              <p>• 食べる (Taberu) - To eat</p>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Learning
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Family Members</h2>
            <p className="text-gray-600 mb-4">Essential family vocabulary</p>
            <div className="text-sm text-gray-500">
              <p>• 家族 (Kazoku) - Family</p>
              <p>• 母 (Haha) - Mother</p>
              <p>• 父 (Chichi) - Father</p>
              <p>• 兄弟 (Kyoudai) - Siblings</p>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Learning
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Numbers</h2>
            <p className="text-gray-600 mb-4">Japanese numbers and counting</p>
            <div className="text-sm text-gray-500">
              <p>• 一 (Ichi) - One</p>
              <p>• 二 (Ni) - Two</p>
              <p>• 三 (San) - Three</p>
              <p>• 四 (Shi/Yon) - Four</p>
              <p>• 五 (Go) - Five</p>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
