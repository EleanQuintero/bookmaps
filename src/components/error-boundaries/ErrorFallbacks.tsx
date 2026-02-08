/**
 * ErrorFallbacks - Pre-configured Error UI Components
 * 
 * Collection of error fallback components for different use cases:
 * - FullPageError: For route-level errors (entire page)
 * - CardError: For section-level errors (within a page)
 * - InlineError: For small inline errors
 * - MapLoadError: Specific to bookmap loading
 * - AIGenerationError: Specific to AI generation failures
 */

'use client';

import { ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, RefreshCw, Home, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ErrorCard, ErrorCardActions, InlineError as InlineErrorComponent } from '@/components/ui/error-card';
import { ErrorFallbackProps, getUserFriendlyMessage, is404Error } from '@/types/errors';

/**
 * FullPageError - For complete page failures
 * 
 * Shows a centered error message that takes up the full viewport.
 * Used in route-level error.tsx files.
 */
export function FullPageError({
  error,
  resetErrorBoundary,
  showDetails = false,
}: ErrorFallbackProps): ReactElement {
  const router = useRouter();
  const is404 = is404Error(error);

  const handleGoHome = (): void => {
    router.push('/dashboard');
  };

  const handleRetry = (): void => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <ErrorCard
          title={is404 ? 'Page Not Found' : 'Something Went Wrong'}
          message={
            is404
              ? 'The page you are looking for does not exist.'
              : getUserFriendlyMessage(error)
          }
          icon={
            is404 ? (
              <AlertCircle className="h-6 w-6 text-yellow-500" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-500" />
            )
          }
          actions={
            <>
              <ErrorCardActions.Retry onRetry={handleRetry} />
              <ErrorCardActions.GoHome href="/dashboard" />
            </>
          }
        />
        {showDetails && process.env.NODE_ENV === 'development' && (
          <details className="mt-4 rounded-md border border-red-500/50 bg-red-50/10 p-4">
            <summary className="cursor-pointer text-sm font-medium text-red-600">
              Error Details (Dev Only)
            </summary>
            <pre className="mt-2 overflow-auto text-xs text-muted-foreground">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

/**
 * CardError - For section-level errors
 * 
 * Shows error within a card, doesn't take up entire page.
 * Used for component-level error boundaries.
 */
export function CardError({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps): ReactElement {
  const handleRetry = (): void => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      <ErrorCard
        title="Failed to Load"
        message={getUserFriendlyMessage(error)}
        actions={
          resetErrorBoundary && <ErrorCardActions.Retry onRetry={handleRetry} />
        }
      />
    </div>
  );
}

/**
 * InlineError - For small inline errors
 * 
 * Compact error display for forms or small sections.
 * Export the component from error-card as well for convenience.
 */
export const InlineError = InlineErrorComponent;

/**
 * MapLoadError - Specific error for bookmap loading failures
 */
export function MapLoadError({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps): ReactElement {
  const router = useRouter();
  const is404 = is404Error(error);

  const handleRetry = (): void => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      router.refresh();
    }
  };

  const handleGoToMaps = (): void => {
    router.push('/dashboard/maps');
  };

  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <ErrorCard
        title={is404 ? 'BookMap Not Found' : 'Failed to Load BookMap'}
        message={
          is404
            ? 'This bookmap does not exist or has been deleted.'
            : getUserFriendlyMessage(error)
        }
        icon={<BookOpen className="h-5 w-5 text-red-500" />}
        actions={
          <>
            {!is404 && <ErrorCardActions.Retry onRetry={handleRetry} />}
            <Button onClick={handleGoToMaps} variant="outline" size="sm">
              View All Maps
            </Button>
          </>
        }
      />
    </div>
  );
}

/**
 * AIGenerationError - Specific error for AI generation failures
 */
export function AIGenerationError({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps): ReactElement {
  const handleRetry = (): void => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
  };

  const errorMessage = error.message.toLowerCase();
  const isTimeout = errorMessage.includes('timeout') || errorMessage.includes('too long');
  const isRateLimit = errorMessage.includes('rate limit') || errorMessage.includes('too many');

  let customMessage = getUserFriendlyMessage(error);
  let title = 'AI Generation Failed';

  if (isTimeout) {
    title = 'Generation Timeout';
    customMessage = 'The AI took too long to generate your bookmap. Try a more specific topic or try again.';
  } else if (isRateLimit) {
    title = 'Rate Limit Reached';
    customMessage = 'You have made too many requests. Please wait a moment and try again.';
  }

  return (
    <div className="flex w-full items-center justify-center p-4">
      <ErrorCard
        title={title}
        message={customMessage}
        icon={<Sparkles className="h-5 w-5 text-red-500" />}
        actions={<ErrorCardActions.Retry onRetry={handleRetry} />}
      />
    </div>
  );
}

/**
 * EmptyStateError - For when data is empty (not really an error, but similar UI)
 */
export function EmptyStateError({
  title = 'No Data',
  message,
  action,
}: {
  title?: string;
  message: string;
  action?: ReactElement;
}): ReactElement {
  return (
    <div className="flex min-h-[300px] items-center justify-center p-4">
      <div className="text-center">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );
}
