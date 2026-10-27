import { z } from 'zod';

export type Framework = 'vite' | 'next';

export const USE_CLIENT_DIRECTIVE = "'use client';";
export const NEXT_ENTRY = '@e-burgos/tucu-ui/next';
export const NEXT_THEME_PROVIDER_IMPORT = `import { NextThemeProvider } from '${NEXT_ENTRY}';`;

export const frameworkSchema = z
  .enum(['vite', 'next'])
  .optional()
  .describe(
    'Target framework. "vite" (default) = react-router SPA with ThemeProvider. "next" = Next.js 16 App Router: NextThemeProvider from @e-burgos/tucu-ui/next, \'use client\' where state/handlers live, pages under app/<route>/page.tsx.'
  );

export function withUseClient(code: string): string {
  return `${USE_CLIENT_DIRECTIVE}\n\n${code}`;
}

export function nextProviderNote(): string {
  return `Mount NextThemeProvider (from ${NEXT_ENTRY}) once in app/layout.tsx; do not use ThemeProvider or ReactRouter in a Next app.`;
}

export function nextClientBoundaryNote(): string {
  return "Functions (cell renderers, formatters, handlers) cannot be passed from a Server Component to a tucu-ui component: keep them in a file marked 'use client'.";
}
