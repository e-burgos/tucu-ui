import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';
import { queryClient } from './query-client';

interface QueryProviderProps {
  children: ReactNode;
  /**
   * Optional custom query client instance
   * If not provided, uses the default queryClient
   */
  client?: QueryClient;
  /**
   * Enable React Query DevTools (defaults to true in development)
   */
  enableDevtools?: boolean;
}

/**
 * QueryProvider component
 * Wraps the application with React Query context
 * Includes React Query DevTools in development mode
 *
 * @example
 * ```tsx
 * import { QueryProvider } from '@e-burgos-mfe/api';
 *
 * function App() {
 *   return (
 *     <QueryProvider>
 *       <YourApp />
 *     </QueryProvider>
 *   );
 * }
 * ```
 */
export function QueryProvider({
  children,
  client = queryClient,
  enableDevtools = import.meta.env.VITE_APP_ENVIRONMENT === 'local',
}: QueryProviderProps) {
  return (
    <QueryClientProvider client={client}>
      {children}
      {enableDevtools && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
    </QueryClientProvider>
  );
}
