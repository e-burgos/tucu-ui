/**
 * SEO utility functions and constants
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  canonicalUrl?: string;
  noindex?: boolean;
}

export const DEFAULT_SEO: SEOConfig = {
  title: 'Tucu UI - Modern React Component Library',
  description:
    'A modern, comprehensive React component library built with TypeScript and Tailwind CSS v4. Features an advanced theming system with 34+ color presets, multi-layered color architecture, three layout systems, integrated routing, powerful form system with React Hook Form, and granular theme control. Designed for production-ready applications with sophisticated theming and full accessibility support.',
  keywords: [
    'react',
    'typescript',
    'component library',
    'tailwind css',
    'ui components',
    'react components',
    'design system',
    'accessibility',
    'blockchain components',
    'form validation',
    'theming',
    'layout',
    'routing',
    'form system',
    'theme control',
    'color presets',
    'multi-layered color architecture',
    'three layout systems',
    'integrated routing',
    'powerful form system',
    'React Hook Form',
    'granular theme control',
    'production-ready applications',
    'sophisticated theming',
    'mfe',
    'standalone',
    'micro frontend',
    'microfrontend',
    'micro-frontend',
  ],
  ogImage: 'https://tucu-ui.netlify.app/favicon.svg',
  ogType: 'website',
  canonicalUrl: 'https://tucu-ui.netlify.app',
};

/**
 * Get base URL from environment or default
 */
export function getBaseUrl(): string {
  return import.meta.env.VITE_APP_URL || 'https://tucu-ui.netlify.app';
}

/**
 * Generate canonical URL for a path
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = getBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generate page title with site name
 */
export function getPageTitle(title: string, siteName = 'Tucu UI'): string {
  if (title === siteName || title.includes(siteName)) {
    return title;
  }
  return `${title} | ${siteName}`;
}

/**
 * Generate meta keywords string from array
 */
export function getKeywordsString(keywords: string[]): string {
  return keywords.join(', ');
}
