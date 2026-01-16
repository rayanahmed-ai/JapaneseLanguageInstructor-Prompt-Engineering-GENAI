'use client';

import * as React from 'react';
import { useErrorHandler } from '@/lib/utils/errorHandler';

const DashboardPage: React.FC = () => {
  const { error, handleError, clearError } = useErrorHandler();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Dashboard
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
            <h2 className="text-xl font-semibold mb-4">Welcome Back!</h2>
            <p className="text-gray-600">
              Your Japanese typing progress dashboard is coming soon. Track your learning journey, view statistics, and access personalized lessons.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Progress Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Lessons Completed:</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average WPM:</span>
                <span className="font-bold">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Accuracy:</span>
                <span className="font-bold">-</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-600">No recent activity to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
