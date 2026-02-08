/**
 * BaseErrorBoundary - Reusable Error Boundary Component
 * 
 * A generic error boundary that catches React errors and displays
 * a fallback UI. Can be customized with different fallback components
 * and error handling logic.
 * 
 * Features:
 * - Automatic error logging with page context
 * - Dev/prod environment awareness
 * - Accessibility support (ARIA labels, focus management)
 * - User-friendly error messages based on error codes
 * - Reset mechanism via resetKeys prop
 * 
 * Usage:
 * <BaseErrorBoundary fallback={<CustomErrorUI />} onError={logError}>
 *   <YourComponent />
 * </BaseErrorBoundary>
 * 
 * Reset Keys Usage:
 * Pass an array of values that should trigger a reset when they change.
 * Note: If resetKeys changes from undefined to defined, it will NOT trigger
 * a reset. Only changes between defined arrays trigger resets.
 * 
 * Example:
 * <BaseErrorBoundary resetKeys={[userId, currentRoute]}>
 *   <UserProfile />
 * </BaseErrorBoundary>
 */

'use client';

import { Component, ReactNode, createRef } from 'react';
import type { ErrorInfo } from 'react';
import { AppError, ErrorFallbackProps, getUserFriendlyMessage, isAppError } from '@/types/errors';
import { logError, getPageContext } from '@/lib/error-logger';
import { cn } from '@/lib/utils';

interface BaseErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((props: ErrorFallbackProps) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  showDetails?: boolean;
}

interface BaseErrorBoundaryState {
  hasError: boolean;
  error: Error | AppError | null;
  errorCount: number; // Track number of errors for telemetry
}

/**
 * Base Error Boundary Component
 * 
 * This is a class component (required by React for error boundaries)
 */
export class BaseErrorBoundary extends Component<
  BaseErrorBoundaryProps,
  BaseErrorBoundaryState
> {
  // Ref to the reset button for focus management
  private resetButtonRef = createRef<HTMLButtonElement>();

  constructor(props: BaseErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<BaseErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Increment error count for telemetry
    this.setState((prevState) => ({
      errorCount: prevState.errorCount + 1,
    }));

    // Gather page context for better debugging
    const pageContext = getPageContext();
    
    // Log the error with comprehensive context
    logError(error, {
      componentStack: errorInfo.componentStack,
      boundary: 'BaseErrorBoundary',
      errorCount: this.state.errorCount + 1, // Use updated count
      ...pageContext,
      // Add AppError specific context if available
      ...(isAppError(error) && {
        errorCode: error.code,
        statusCode: error.statusCode,
      }),
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: BaseErrorBoundaryProps): void {
    // Reset error state if resetKeys change
    // Note: This only triggers if both prev and current resetKeys are defined
    // and their values differ. If resetKeys goes from undefined -> defined,
    // it will NOT trigger a reset (intentional behavior).
    if (
      this.state.hasError &&
      this.props.resetKeys &&
      prevProps.resetKeys &&
      !this.areResetKeysEqual(prevProps.resetKeys, this.props.resetKeys)
    ) {
      this.resetErrorBoundary();
    }
  }

  areResetKeysEqual(
    prevKeys: Array<string | number>,
    nextKeys: Array<string | number>
  ): boolean {
    if (prevKeys.length !== nextKeys.length) {
      return false;
    }
    return prevKeys.every((key, index) => key === nextKeys[index]);
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorCount: 0, // Reset counter on manual reset
    });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      const { fallback, showDetails } = this.props;

      // Determine if we should show error details
      // In production, NEVER show stack traces to users unless explicitly forced
      const isDevelopment = process.env.NODE_ENV === 'development';
      const shouldShowDetails = showDetails && isDevelopment;

      // Get user-friendly error message based on error code
      const userMessage = getUserFriendlyMessage(this.state.error);

      // If fallback is a function, call it with error props
      if (typeof fallback === 'function') {
        return fallback({
          error: this.state.error,
          resetErrorBoundary: this.resetErrorBoundary,
          showDetails: shouldShowDetails,
        });
      }

      // If fallback is a ReactNode, render it directly
      if (fallback) {
        return fallback;
      }

      // Default fallback UI with accessibility improvements
      return (
        <div
          className={cn(
            'flex min-h-[400px] w-full items-center justify-center p-8'
          )}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className={cn('max-w-md space-y-4 text-center')}>
            <div aria-label="Error icon" className={cn('text-4xl')}>
              ⚠️
            </div>
            <h2 className={cn('text-2xl font-bold text-red-600')}>
              Something went wrong
            </h2>
            <p className={cn('text-muted-foreground')} role="status">
              {userMessage}
            </p>
            <button
              ref={this.resetButtonRef}
              onClick={this.resetErrorBoundary}
              className={cn(
                'rounded-md bg-primary px-4 py-2 text-primary-foreground',
                'hover:bg-primary/90 focus:outline-none focus:ring-2',
                'focus:ring-primary focus:ring-offset-2 transition-colors'
              )}
              aria-label="Try again and reset error boundary"
              autoFocus
            >
              Try again
            </button>
            {shouldShowDetails && (
              <details className={cn('mt-4 text-left text-sm')}>
                <summary
                  className={cn(
                    'cursor-pointer font-medium hover:text-primary',
                    'focus:outline-none focus:ring-2 focus:ring-primary',
                    'focus:ring-offset-2 rounded transition-colors'
                  )}
                  aria-label="Show detailed error information"
                >
                  Error details (development only)
                </summary>
                <div className={cn('mt-2 space-y-2')}>
                  {isAppError(this.state.error) && this.state.error.code && (
                    <div className={cn('rounded bg-muted p-2')}>
                      <strong>Error Code:</strong> {this.state.error.code}
                    </div>
                  )}
                  {isAppError(this.state.error) &&
                    this.state.error.statusCode && (
                      <div className={cn('rounded bg-muted p-2')}>
                        <strong>Status Code:</strong>{' '}
                        {this.state.error.statusCode}
                      </div>
                    )}
                  <pre
                    className={cn('overflow-auto rounded bg-muted p-2 text-xs')}
                    aria-label="Error stack trace"
                  >
                    {this.state.error.stack}
                  </pre>
                </div>
              </details>
            )}
            {this.state.errorCount > 1 && isDevelopment && (
              <p className={cn('text-xs text-muted-foreground')} role="status">
                This error has occurred {this.state.errorCount} times
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
