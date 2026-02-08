/**
 * ErrorCard Component
 * 
 * A reusable error display card that matches the Shadcn UI style.
 * Used within error boundaries to show consistent error states.
 */

import { ReactNode, ReactElement } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorCardProps {
  title?: string;
  message: string;
  icon?: ReactNode;
  actions?: ReactNode;
  variant?: 'default' | 'destructive';
  showIcon?: boolean;
  className?: string;
}

/**
 * ErrorCard - Displays error information in a card format
 */
export function ErrorCard({
  title = 'Error',
  message,
  icon,
  actions,
  variant = 'destructive',
  showIcon = true,
  className,
}: ErrorCardProps): ReactElement {
  return (
    <Card
      className={cn(
        'w-full max-w-lg border-2',
        variant === 'destructive' && 'border-red-500/50 bg-red-50/10',
        className
      )}
    >
      <CardHeader>
        <div className="flex items-start gap-3">
          {showIcon && (
            <div className="mt-0.5">
              {icon || (
                <AlertCircle
                  className={cn(
                    'h-5 w-5',
                    variant === 'destructive' && 'text-red-500'
                  )}
                />
              )}
            </div>
          )}
          <div className="flex-1">
            <CardTitle
              className={cn(
                'text-lg',
                variant === 'destructive' && 'text-red-600'
              )}
            >
              {title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{message}</CardDescription>
      </CardContent>
      {actions && <CardFooter className="gap-2">{actions}</CardFooter>}
    </Card>
  );
}

/**
 * Pre-configured error card actions
 */
export const ErrorCardActions = {
  Retry: ({ onRetry }: { onRetry: () => void }) => (
    <Button onClick={onRetry} variant="default" size="sm">
      <RefreshCw className="mr-2 h-4 w-4" />
      Try Again
    </Button>
  ),

  GoHome: ({ href = '/dashboard' }: { href?: string }) => (
    <Button asChild variant="outline" size="sm">
      <a href={href}>
        <Home className="mr-2 h-4 w-4" />
        Go to Dashboard
      </a>
    </Button>
  ),

  GoBack: ({ onGoBack }: { onGoBack: () => void }) => (
    <Button onClick={onGoBack} variant="outline" size="sm">
      Go Back
    </Button>
  ),

  Combined: ({
    onRetry,
    onGoHome,
  }: {
    onRetry: () => void;
    onGoHome?: () => void;
  }) => (
    <>
      <ErrorCardActions.Retry onRetry={onRetry} />
      {onGoHome && (
        <Button onClick={onGoHome} variant="ghost" size="sm">
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      )}
    </>
  ),
};

/**
 * Inline error message (for smaller errors within forms/sections)
 */
export function InlineError({
  message,
  className,
}: {
  message: string;
  className?: string;
}): ReactElement {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md border border-red-500/50 bg-red-50/10 p-3 text-sm text-red-600',
        className
      )}
    >
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

/**
 * Error badge (for showing error count or status)
 */
export function ErrorBadge({
  count,
  className,
}: {
  count?: number;
  className?: string;
}): ReactElement {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700',
        className
      )}
    >
      <AlertCircle className="h-3 w-3" />
      {count !== undefined ? `${count} Error${count !== 1 ? 's' : ''}` : 'Error'}
    </div>
  );
}
