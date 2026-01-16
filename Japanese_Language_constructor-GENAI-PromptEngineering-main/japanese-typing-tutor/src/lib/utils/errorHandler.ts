import { ApiError } from '../api/client';

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  additionalInfo?: Record<string, any>;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly context?: ErrorContext;
  public readonly originalError?: Error;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    statusCode?: number,
    context?: ErrorContext,
    originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.context = context;
    this.originalError = originalError;
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error occurred', context?: ErrorContext) {
    super(message, 'NETWORK_ERROR', 0, context);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed', context?: ErrorContext) {
    super(message, 'AUTHENTICATION_ERROR', 401, context);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied', context?: ErrorContext) {
    super(message, 'AUTHORIZATION_ERROR', 403, context);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', context?: ErrorContext) {
    super(message, 'VALIDATION_ERROR', 400, context);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found', context?: ErrorContext) {
    super(message, 'NOT_FOUND_ERROR', 404, context);
  }
}

export class ServerError extends AppError {
  constructor(message: string = 'Server error occurred', context?: ErrorContext) {
    super(message, 'SERVER_ERROR', 500, context);
  }
}

export const ErrorHandler = {
  /**
   * Handle API errors and convert them to appropriate AppError instances
   */
  handleApiError: (error: ApiError | Error, context?: ErrorContext): AppError => {
    // If it's already an AppError, return it
    if (error instanceof AppError) {
      return error;
    }

    // Handle API client errors
    if ('status' in error && 'message' in error) {
      const apiError = error as ApiError;
      
      switch (apiError.status) {
        case 400:
          return new ValidationError(apiError.message, context);
        case 401:
          return new AuthenticationError(apiError.message, context);
        case 403:
          return new AuthorizationError(apiError.message, context);
        case 404:
          return new NotFoundError(apiError.message, context);
        case 500:
        case 502:
        case 503:
        case 504:
          return new ServerError(apiError.message, context);
        default:
          return new AppError(apiError.message, 'API_ERROR', apiError.status, context);
      }
    }

    // Handle network errors (no response)
    if (error.message.includes('Network error') || error.message.includes('ERR_NETWORK')) {
      return new NetworkError(error.message, context);
    }

    // Handle timeout errors
    if (error.message.includes('timeout') || (error as any).code === 'ECONNABORTED') {
      return new NetworkError('Request timeout. Please try again.', context);
    }

    // Generic error
    return new AppError(error.message || 'An unexpected error occurred', 'UNKNOWN_ERROR', undefined, context, error);
  },

  /**
   * Log error for debugging and monitoring
   */
  logError: (error: AppError, context?: ErrorContext) => {
    const logData = {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      context: error.context || context,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
      url: typeof window !== 'undefined' ? window.location.href : 'Server',
    };

    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error: ${error.code}`);
      console.error('Error Details:', logData);
      if (error.originalError) {
        console.error('Original Error:', error.originalError);
      }
      console.groupEnd();
    }

    // In production, you would send this to an error monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: sendToErrorMonitoring(logData);
    }
  },

  /**
   * Get user-friendly error message
   */
  getUserMessage: (error: AppError): string => {
    switch (error.code) {
      case 'NETWORK_ERROR':
        return 'Unable to connect. Please check your internet connection and try again.';
      case 'AUTHENTICATION_ERROR':
        return 'Please log in to continue.';
      case 'AUTHORIZATION_ERROR':
        return 'You don\'t have permission to perform this action.';
      case 'VALIDATION_ERROR':
        return 'Please check your input and try again.';
      case 'NOT_FOUND_ERROR':
        return 'The requested resource was not found.';
      case 'SERVER_ERROR':
        return 'Something went wrong on our end. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  },

  /**
   * Check if error is recoverable
   */
  isRecoverable: (error: AppError): boolean => {
    const recoverableErrors = [
      'NETWORK_ERROR',
      'VALIDATION_ERROR',
    ];
    return recoverableErrors.includes(error.code);
  },

  /**
   * Get suggested action for error
   */
  getSuggestedAction: (error: AppError): string => {
    switch (error.code) {
      case 'NETWORK_ERROR':
        return 'Check your internet connection and try again.';
      case 'AUTHENTICATION_ERROR':
        return 'Please log in again.';
      case 'AUTHORIZATION_ERROR':
        return 'Contact support if you believe this is an error.';
      case 'VALIDATION_ERROR':
        return 'Please correct the highlighted fields.';
      case 'NOT_FOUND_ERROR':
        return 'Go back to the previous page or try searching.';
      case 'SERVER_ERROR':
        return 'Wait a moment and try again, or contact support if the problem persists.';
      default:
        return 'Try refreshing the page or contact support if the problem continues.';
    }
  },
};

/**
 * Higher-order function to wrap async functions with error handling
 */
export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context?: ErrorContext
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      const appError = ErrorHandler.handleApiError(error as Error, context);
      ErrorHandler.logError(appError, context);
      throw appError;
    }
  };
}

/**
 * React hook for error handling
 */
export function useErrorHandler() {
  const [error, setError] = React.useState<AppError | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleError = React.useCallback((error: Error | ApiError, context?: ErrorContext) => {
    const appError = ErrorHandler.handleApiError(error as Error, context);
    ErrorHandler.logError(appError, context);
    setError(appError);
    return appError;
  }, []);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  const executeWithErrorHandling = React.useCallback(
    async <T>(fn: () => Promise<T>, context?: ErrorContext): Promise<T | null> => {
      setIsLoading(true);
      clearError();
      
      try {
        const result = await fn();
        setIsLoading(false);
        return result;
      } catch (error) {
        const appError = handleError(error as Error, context);
        setIsLoading(false);
        return null;
      }
    },
    [handleError, clearError]
  );

  return {
    error,
    isLoading,
    handleError,
    clearError,
    executeWithErrorHandling,
  };
}

// Import React for the hook
import * as React from 'react';
