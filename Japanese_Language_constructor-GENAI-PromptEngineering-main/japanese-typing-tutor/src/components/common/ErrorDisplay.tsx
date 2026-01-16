'use client';

import * as React from 'react';
import { AppError, ErrorHandler } from '../../lib/utils/errorHandler';

interface ErrorDisplayProps {
  error: AppError | null;
  onDismiss?: () => void;
  onRetry?: () => void;
  showDetails?: boolean;
  className?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onDismiss,
  onRetry,
  showDetails = false,
  className = '',
}) => {
  if (!error) return null;

  const userMessage = ErrorHandler.getUserMessage(error);
  const suggestedAction = ErrorHandler.getSuggestedAction(error);
  const isRecoverable = ErrorHandler.isRecoverable(error);

  const getErrorIcon = (errorCode: string) => {
    switch (errorCode) {
      case 'NETWORK_ERROR':
        return '🌐';
      case 'AUTHENTICATION_ERROR':
        return '🔐';
      case 'AUTHORIZATION_ERROR':
        return '🚫';
      case 'VALIDATION_ERROR':
        return '⚠️';
      case 'NOT_FOUND_ERROR':
        return '🔍';
      case 'SERVER_ERROR':
        return '🔥';
      default:
        return '❌';
    }
  };

  const getErrorColor = (errorCode: string) => {
    switch (errorCode) {
      case 'NETWORK_ERROR':
      case 'SERVER_ERROR':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'AUTHENTICATION_ERROR':
      case 'AUTHORIZATION_ERROR':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'VALIDATION_ERROR':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'NOT_FOUND_ERROR':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className={`rounded-lg border p-4 ${getErrorColor(error.code)} ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 text-2xl mr-3">
          {getErrorIcon(error.code)}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium mb-1">
            {userMessage}
          </h3>
          
          {suggestedAction && (
            <p className="text-sm opacity-75 mb-3">
              💡 {suggestedAction}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 mb-3">
            {isRecoverable && onRetry && (
              <button
                onClick={onRetry}
                className="px-3 py-1 text-xs font-medium rounded bg-white/20 hover:bg-white/30 transition-colors"
              >
                Try Again
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="px-3 py-1 text-xs font-medium rounded bg-white/20 hover:bg-white/30 transition-colors"
              >
                Dismiss
              </button>
            )}
          </div>

          {/* Error details (development or when explicitly requested) */}
          {(showDetails || process.env.NODE_ENV === 'development') && (
            <details className="text-xs">
              <summary className="cursor-pointer font-medium mb-1">
                Error Details
              </summary>
              <div className="mt-2 space-y-1">
                <div><strong>Code:</strong> {error.code}</div>
                {error.statusCode && <div><strong>Status:</strong> {error.statusCode}</div>
                {error.context && Object.keys(error.context).length > 0 && (
                  <div>
                    <strong>Context:</strong>
                    <pre className="mt-1 p-2 bg-black/10 rounded text-xs overflow-auto">
                      {JSON.stringify(error.context, null, 2)}
                    </pre>
                  </div>
                )}
                {error.stack && (
                  <div>
                    <strong>Stack Trace:</strong>
                    <pre className="mt-1 p-2 bg-black/10 rounded text-xs overflow-auto max-h-32">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

interface ToastErrorProps {
  error: AppError | null;
  onDismiss: () => void;
  autoHide?: boolean;
  duration?: number;
}

export const ToastError: React.FC<ToastErrorProps> = ({
  error,
  onDismiss,
  autoHide = true,
  duration = 5000,
}) => {
  React.useEffect(() => {
    if (error && autoHide) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [error, autoHide, duration, onDismiss]);

  if (!error) return null;

  const userMessage = ErrorHandler.getUserMessage(error);

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
        <div className="flex-shrink-0 text-xl mr-3">⚠️</div>
        <div className="flex-1">
          <p className="text-sm font-medium">{userMessage}</p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-3 flex-shrink-0 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

interface ErrorPageProps {
  error: AppError;
  onRetry?: () => void;
  onGoHome?: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  error,
  onRetry,
  onGoHome,
}) => {
  const userMessage = ErrorHandler.getUserMessage(error);
  const suggestedAction = ErrorHandler.getSuggestedAction(error);
  const isRecoverable = ErrorHandler.isRecoverable(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h1>
          
          <p className="text-gray-600 mb-6">
            {userMessage}
          </p>

          {suggestedAction && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>What to do:</strong> {suggestedAction}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {isRecoverable && onRetry && (
              <button
                onClick={onRetry}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            )}
            
            {onGoHome && (
              <button
                onClick={onGoHome}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Go Home
              </button>
            )}

            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Refresh Page
            </button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                Developer Info
              </summary>
              <div className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                <div className="mb-2">
                  <strong>Error Code:</strong> {error.code}
                </div>
                {error.statusCode && (
                  <div className="mb-2">
                    <strong>Status Code:</strong> {error.statusCode}
                  </div>
                )}
                {error.context && (
                  <div className="mb-2">
                    <strong>Context:</strong>
                    <pre className="mt-1">
                      {JSON.stringify(error.context, null, 2)}
                    </pre>
                  </div>
                )}
                {error.stack && (
                  <div>
                    <strong>Stack Trace:</strong>
                    <pre className="mt-1 whitespace-pre-wrap">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
