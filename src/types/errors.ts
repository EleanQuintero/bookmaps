/**
 * Error handling types for BookMap application
 * 
 * Defines standardized error codes, interfaces, and fallback props
 * for consistent error handling across the application.
 */


/**
 * Standardized error codes for the application
 */
export enum ErrorCode {
  // Network & API Errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',

  // Database Errors
  DATABASE_ERROR = 'DATABASE_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',

  // Authentication & Authorization
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  SESSION_EXPIRED = 'SESSION_EXPIRED',

  // AI Service Errors
  AI_GENERATION_ERROR = 'AI_GENERATION_ERROR',
  AI_TIMEOUT = 'AI_TIMEOUT',
  AI_RATE_LIMIT = 'AI_RATE_LIMIT',

  // Validation Errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  // Application Errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  RENDER_ERROR = 'RENDER_ERROR',
}

/**
 * Standardized error interface for the application
 */
export interface AppError extends Error {
  code?: ErrorCode;
  statusCode?: number;
  details?: unknown;
  timestamp?: string;
}

/**
 * Props for error fallback components
 */
export interface ErrorFallbackProps {
  error: Error | AppError;
  resetErrorBoundary?: () => void;
  showDetails?: boolean;
}

/**
 * Result type for operations that can fail
 * Used in server actions to avoid throwing errors
 */
export type Result<T, E = AppError> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Type guard to check if an error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'code' in error
  );
}

/**
 * Create a standardized AppError
 */
export function createAppError(
  message: string,
  code: ErrorCode = ErrorCode.UNKNOWN_ERROR,
  statusCode?: number,
  details?: unknown
): AppError {
  const error = new Error(message) as AppError;
  error.code = code;
  error.statusCode = statusCode;
  error.details = details;
  error.timestamp = new Date().toISOString();
  return error;
}

/**
 * Get user-friendly error message based on error code
 */
export function getUserFriendlyMessage(error: Error | AppError): string {
  if (isAppError(error) && error.code) {
    switch (error.code) {
      case ErrorCode.NETWORK_ERROR:
        return 'Connection problem. Please check your internet connection.';
      case ErrorCode.TIMEOUT_ERROR:
        return 'The operation took too long. Please try again.';
      case ErrorCode.NOT_FOUND:
        return 'The requested resource was not found.';
      case ErrorCode.UNAUTHORIZED:
        return 'You need to sign in to access this content.';
      case ErrorCode.FORBIDDEN:
        return 'You do not have permission to access this content.';
      case ErrorCode.SESSION_EXPIRED:
        return 'Your session has expired. Please sign in again.';
      case ErrorCode.AI_GENERATION_ERROR:
        return 'Failed to generate the bookmap. Please try again.';
      case ErrorCode.AI_TIMEOUT:
        return 'AI generation took too long. Try a more specific topic.';
      case ErrorCode.AI_RATE_LIMIT:
        return 'Too many requests. Please wait a moment and try again.';
      case ErrorCode.VALIDATION_ERROR:
      case ErrorCode.INVALID_INPUT:
        return 'Please check your input and try again.';
      case ErrorCode.DATABASE_ERROR:
        return 'Database error. Please try again later.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  // Fallback to error message if available
  return error.message || 'An unexpected error occurred.';
}

/**
 * Check if error is a 404 (Not Found) error
 */
export function is404Error(error: Error | AppError): boolean {
  if (isAppError(error)) {
    return error.code === ErrorCode.NOT_FOUND || error.statusCode === 404;
  }

  // Check message patterns for 404
  const message = error.message.toLowerCase();
  return message.includes('not found') || message.includes('404');
}

/**
 * Check if error is a server error (5xx)
 */
export function isServerError(error: Error | AppError): boolean {
  if (isAppError(error) && error.statusCode) {
    return error.statusCode >= 500 && error.statusCode < 600;
  }
  return false;
}

/**
 * Check if error is a client error (4xx)
 */
export function isClientError(error: Error | AppError): boolean {
  if (isAppError(error) && error.statusCode) {
    return error.statusCode >= 400 && error.statusCode < 500;
  }
  return false;
}
