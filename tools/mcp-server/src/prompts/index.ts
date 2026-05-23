// ─── Prompt Registry ─────────────────────────────────────────────────────────
// Registers all 8 MCP prompts for guided AI workflows.

import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getCreateComponentPrompt } from './create-component.js';
import { getCreateFormPrompt } from './create-form.js';
import { getCreatePagePrompt } from './create-page.js';
import { getDebugVariantPrompt } from './debug-variant.js';
import { getMigrateComponentPrompt } from './migrate-component.js';
import { getThemeSetupPrompt } from './theme-setup.js';
import { getAccessibilityCheckPrompt } from './accessibility-check.js';
import { getPerformanceReviewPrompt } from './performance-review.js';

export function registerPrompts(server: McpServer): void {
  // ─── Prompt 1: create-component ─────────────────────────
  server.prompt(
    'create-component',
    'Generate a tucu-ui component usage with correct variants and imports',
    {
      component: z.string().describe('Component name (e.g. Button, Card, Alert)'),
      context: z.string().optional().describe('Usage context or description of what you need'),
    },
    async ({ component, context }) => ({
      messages: [
        {
          role: 'user' as const,
          content: { type: 'text' as const, text: getCreateComponentPrompt(component, context) },
        },
      ],
    })
  );

  // ─── Prompt 2: create-form ──────────────────────────────
  server.prompt(
    'create-form',
    'Generate a form with Form component, inputs, and validation',
    {
      fields: z.string().describe('Comma-separated field names (e.g. "name, email, password")'),
      validation: z.string().optional().describe('Validation requirements (e.g. "email required, password min 8")'),
    },
    async ({ fields, validation }) => ({
      messages: [
        {
          role: 'user' as const,
          content: { type: 'text' as const, text: getCreateFormPrompt(fields, validation) },
        },
      ],
    })
  );

  // ─── Prompt 3: create-page ──────────────────────────────
  server.prompt(
    'create-page',
    'Generate a page component with layout and routing configuration',
    {
      name: z.string().describe('Page name (PascalCase, e.g. "Dashboard", "UserProfile")'),
      layout: z.string().describe('Layout type: admin, horizontal, clean, macos, macos-tahoe'),
      sections: z.string().optional().describe('Page sections (e.g. "header, stats cards, table, chart")'),
    },
    async ({ name, layout, sections }) => ({
      messages: [
        {
          role: 'user' as const,
          content: { type: 'text' as const, text: getCreatePagePrompt(name, layout, sections) },
        },
      ],
    })
  );

  // ─── Prompt 4: debug-variant ────────────────────────────
  server.prompt(
    'debug-variant',
    'Diagnose "Cannot read properties of undefined" errors caused by invalid variants',
    {
      error: z.string().describe('The error message or stack trace'),
      component: z.string().optional().describe('Component where the error occurs (if known)'),
    },
    async ({ error, component }) => ({
      messages: [
        {
          role: 'user' as const,
          content: { type: 'text' as const, text: getDebugVariantPrompt(error, component) },
        },
      ],
    })
  );

  // ─── Prompt 5: migrate-component ───────────────────────
  server.prompt(
    'migrate-component',
    'Guide migration of a component between tucu-ui versions',
    {
      component: z.string().describe('Component to migrate (e.g. "Button", "Badge")'),
      fromVersion: z.string().describe('Source version (e.g. "1.x")'),
      toVersion: z.string().describe('Target version (e.g. "2.x")'),
    },
    async ({ component, fromVersion, toVersion }) => ({
      messages: [
        {
          role: 'user' as const,
          content: { type: 'text' as const, text: getMigrateComponentPrompt(component, fromVersion, toVersion) },
        },
      ],
    })
  );

  // ─── Prompt 6: theme-setup ─────────────────────────────
  server.prompt(
    'theme-setup',
    'Configure ThemeProvider with presets, dark mode, and layout',
    {
      preset: z.string().optional().describe('Color preset (e.g. "Blue", "macOS", "Green")'),
      darkMode: z.string().optional().describe('Dark mode strategy: "system", "light", "dark"'),
    },
    async ({ preset, darkMode }) => ({
      messages: [
        {
          role: 'user' as const,
          content: { type: 'text' as const, text: getThemeSetupPrompt(preset, darkMode) },
        },
      ],
    })
  );

  // ─── Prompt 7: accessibility-check ─────────────────────
  server.prompt(
    'accessibility-check',
    'Audit a component for WCAG accessibility compliance',
    {
      component: z.string().describe('Component or page name to audit'),
      code: z.string().optional().describe('The code to audit (optional, paste full component)'),
    },
    async ({ component, code }) => ({
      messages: [
        {
          role: 'user' as const,
          content: { type: 'text' as const, text: getAccessibilityCheckPrompt(component, code) },
        },
      ],
    })
  );

  // ─── Prompt 8: performance-review ──────────────────────
  server.prompt(
    'performance-review',
    'Analyze code for unnecessary renders, bundle size, and performance issues',
    {
      code: z.string().describe('The React code to review for performance'),
    },
    async ({ code }) => ({
      messages: [
        {
          role: 'user' as const,
          content: { type: 'text' as const, text: getPerformanceReviewPrompt(code) },
        },
      ],
    })
  );
}
