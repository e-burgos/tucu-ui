import { useEffect } from 'react';
import { ReactRouter } from '@e-burgos/tucu-ui';

/**
 * Google Analytics gtag function type
 */
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Hook to track page views in Google Analytics for React Router navigation
 *
 * This hook automatically tracks page views when the route changes in a SPA.
 * It uses React Router's useLocation to detect route changes and sends
 * page_view events to Google Analytics.
 *
 * @param measurementId - Google Analytics measurement ID (optional, reads from env if not provided)
 *
 * @example
 * ```tsx
 * function App() {
 *   useGoogleAnalytics();
 *   return <div>...</div>;
 * }
 * ```
 */
export function useGoogleAnalytics(measurementId?: string): void {
  const location = ReactRouter.useLocation();
  const gaId = measurementId || import.meta.env.VITE_GOOGLE_ANALYTICS_TAG_ID;

  useEffect(() => {
    // Guard: Only track if GA is configured and available
    if (!gaId || !window.gtag || typeof window === 'undefined') {
      return;
    }

    // Track page view on route change
    // This will only fire when location actually changes, not on component re-renders
    window.gtag('config', gaId, {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location.pathname, location.search, gaId]);
}
