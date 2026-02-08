/**
 * Error Logger Utility
 * 
 * Centralized error logging for the BookMap application.
 * Logs to console in development and can be extended to send
 * errors to external services (Sentry, LogRocket, etc.) in production.
 */

import { AppError, isAppError } from '@/types/errors';

interface ErrorContext {
  componentStack?: string | null;
  boundary?: string;
  userId?: string;
  url?: string;
  timestamp?: string;
  [key: string]: unknown;
}

/**
 * Log error to console and external services
 */
export function logError(
  error: Error | AppError,
  context?: ErrorContext
): void {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const errorData = {
    message: error.message,
    name: error.name,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    ...context,
  };

  // Add AppError specific data
  if (isAppError(error)) {
    Object.assign(errorData, {
      code: error.code,
      statusCode: error.statusCode,
      details: error.details,
    });
  }

  // Log to console in development
  if (isDevelopment) {
    console.group('🚨 Error Logged');
    console.error('Error:', error);
    console.error('Context:', context);
    console.error('Full Data:', errorData);
    console.groupEnd();
  } else {
    // In production, log minimal info to console
    console.error('[Error]', error.message, {
      code: isAppError(error) ? error.code : undefined,
      timestamp: errorData.timestamp,
    });
  }

  // TODO: Send to external error tracking service (Sentry, LogRocket, etc.)
  // Example:
  // if (typeof window !== 'undefined' && window.Sentry) {
  //   window.Sentry.captureException(error, {
  //     contexts: { custom: errorData },
  //   });
  // }
}

/**
 * Log warning (non-critical issues)
 */
export function logWarning(message: string, context?: ErrorContext): void {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const warningData = {
    message,
    timestamp: new Date().toISOString(),
    ...context,
  };

  if (isDevelopment) {
    console.warn('⚠️ Warning:', message, context);
  }

  // TODO: Send warnings to external service if needed
}

/**
 * Log info (for tracking important events)
 */
export function logInfo(message: string, data?: Record<string, unknown>): void {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    console.info('ℹ️ Info:', message, data);
  }

  // TODO: Send to analytics service if needed
}

/**
 * Wrap async functions with error logging
 */
export function withErrorLogging<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: Omit<ErrorContext, 'timestamp'>
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof Error) {
        logError(error, context);
      } else {
        logError(new Error(String(error)), context);
      }
      throw error;
    }
  }) as T;
}

/**
 * Get current page context for error logging
 */
export function getPageContext(): ErrorContext {
  if (typeof window === 'undefined') {
    return {};
  }

  return {
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Create a formatted error message for display
 */
export function formatErrorForDisplay(error: Error | AppError): string {
  if (isAppError(error) && error.code) {
    return `[${error.code}] ${error.message}`;
  }
  return error.message;
}
