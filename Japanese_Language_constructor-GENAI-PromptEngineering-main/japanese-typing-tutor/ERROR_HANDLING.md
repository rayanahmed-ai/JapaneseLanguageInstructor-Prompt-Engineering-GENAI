# Error Handling Implementation

This document outlines the comprehensive error handling system implemented for the Japanese Typing Tutor application.

## Overview

A robust error handling system has been implemented to handle all types of errors that can occur in the application, including:

1. **Client-side React errors** (handled by ErrorBoundary)
2. **API/network errors** (handled by ErrorHandler utility)
3. **Authentication/authorization errors** (handled by API client interceptors)
4. **Server-side errors** (handled by error boundaries and logging)

## Components

### 1. ErrorBoundary (`src/components/common/ErrorBoundary.tsx`)

A React Error Boundary component that catches and handles React component errors.

**Features:**
- Catches all React component rendering errors
- Provides user-friendly error UI
- Logs errors for debugging
- Supports custom fallback components
- Auto-refresh functionality
- Development mode with detailed error information

**Usage:**
```tsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### 2. ErrorDisplay Components (`src/components/common/ErrorDisplay.tsx`)

Multiple components for displaying errors to users:

- **ErrorDisplay**: Inline error display with context and actions
- **ToastError**: Floating toast notification for temporary errors
- **ErrorPage**: Full-page error display for critical errors

**Features:**
- User-friendly error messages
- Contextual suggestions for resolution
- Retry/dismiss actions
- Development mode with detailed debugging info
- Color-coded error types

### 3. ErrorHandler Utility (`src/lib/utils/errorHandler.ts`)

Centralized error handling utility for consistent error management.

**Features:**
- Error classification (Network, Auth, Validation, Server, etc.)
- User-friendly message translation
- Error logging with context
- Recovery assessment
- Suggested action recommendations

**Error Classes:**
- `AppError`: Base error class with context
- `NetworkError`: Connection/network issues
- `AuthenticationError`: Login/auth failures
- `AuthorizationError`: Permission issues
- `ValidationError`: Input validation failures
- `NotFoundError`: Resource not found
- `ServerError`: Server-side errors

**Usage:**
```typescript
import { ErrorHandler, useErrorHandler } from '@/lib/utils/errorHandler';

// Handle API errors
try {
  await apiCall();
} catch (error) {
  const appError = ErrorHandler.handleApiError(error, {
    component: 'UserLogin',
    action: 'login'
  });
  ErrorHandler.logError(appError);
}

// React hook
const { error, handleError, clearError } = useErrorHandler();
```

### 4. Enhanced API Client (`src/lib/api/client.ts`)

Improved API client with comprehensive error handling.

**Features:**
- Automatic error formatting
- Request/response interceptors for error handling
- Authentication token management
- Timeout handling
- Network error detection
- Status code classification

**Error Interceptors:**
- 401 Unauthorized: Clear auth and redirect to login
- 403 Forbidden: Log access denied
- Network errors: User-friendly messaging
- Timeouts: Specific timeout messaging

### 5. Layout Integration (`src/app/layout.tsx`)

Error boundary integrated at the root level to catch all application errors.

## Error Handling Flow

1. **Component Error Occurs**
   - Caught by ErrorBoundary
   - User sees friendly error UI
   - Error logged for debugging
   - Recovery options provided

2. **API Call Fails**
   - Caught by API client interceptors
   - Converted to AppError by ErrorHandler
   - Logged with context
   - User-friendly message displayed

3. **Network Issues**
   - Detected as NetworkError
   - User informed of connection problems
   - Retry suggestions provided

4. **Authentication Issues**
   - 401 errors clear stored auth
   - User redirected to login
   - Session state updated

## Error Types and Handling

| Error Type | HTTP Status | User Message | Recovery Action |
|-------------|--------------|---------------|------------------|
| Network Error | 0/N/A | "Unable to connect. Please check your internet connection." | Check connection, retry |
| Validation Error | 400 | "Please check your input and try again." | Fix input errors |
| Authentication Error | 401 | "Please log in to continue." | Redirect to login |
| Authorization Error | 403 | "You don't have permission to perform this action." | Contact support |
| Not Found | 404 | "The requested resource was not found." | Go back, search |
| Server Error | 5xx | "Something went wrong on our end. Please try again later." | Retry, contact support |

## Development vs Production

**Development Mode:**
- Detailed error information displayed
- Stack traces visible
- Error boundaries with debugging info
- Console logging with full context

**Production Mode:**
- User-friendly messages only
- Error logging for monitoring
- No stack traces exposed
- Graceful degradation

## Best Practices Implemented

1. **Fail Fast**: Errors caught and handled immediately
2. **User-Friendly Messages**: Technical errors translated to user language
3. **Context Preservation**: Error context maintained for debugging
4. **Recovery Options**: Users can retry or take corrective action
5. **Logging**: Comprehensive error logging for debugging
6. **Graceful Degradation**: App continues working despite errors
7. **Type Safety**: TypeScript interfaces for all error types

## Testing Error Handling

The error handling system can be tested by:

1. **Component Errors**: Throw errors in components to test ErrorBoundary
2. **API Errors**: Simulate network failures or error responses
3. **Auth Errors**: Test with expired/invalid tokens
4. **Network Errors**: Disconnect network to test offline handling

## Monitoring and Alerting

In production, errors should be monitored through:
- Error logging service integration (placeholder in ErrorHandler)
- Performance monitoring
- User error reporting
- Analytics for error patterns

## Configuration

Error handling can be configured through:
- Environment variables for logging levels
- Error boundary fallbacks
- API client timeout settings
- Retry mechanisms

## Future Enhancements

1. **Error Reporting Service**: Integrate with Sentry/LogRocket
2. **Retry Mechanisms**: Automatic retry for recoverable errors
3. **Offline Support**: Better handling of network disconnections
4. **Error Analytics**: Dashboard for error patterns
5. **User Feedback**: Allow users to report errors

## Files Modified

- `src/components/common/ErrorBoundary.tsx` - React error boundary
- `src/components/common/ErrorDisplay.tsx` - Error display components
- `src/lib/utils/errorHandler.ts` - Error handling utility
- `src/lib/api/client.ts` - Enhanced API client
- `src/lib/api/auth.ts` - Updated with error handling
- `src/components/layout/Navbar.tsx` - Fixed useRouter client component issue
- `src/app/layout.tsx` - Integrated error boundary

## Resolution of Original Error

The original error on `http://localhost:3003/` was:
```
useRouter only works in Client Components. Add the "use client" directive at the top of the file to use it.
```

**Root Cause**: The `Navbar.tsx` component was using `useRouter` hook without being marked as a client component.

**Solution**: Added `'use client';` directive to the top of `Navbar.tsx` file.

**Result**: The application now runs successfully without the 500 Internal Server Error.
