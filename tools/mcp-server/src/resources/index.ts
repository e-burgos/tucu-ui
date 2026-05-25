// ─── Resource Registry ───────────────────────────────────────────────────────
// Registers all 12 MCP resources with tucu:// URIs.

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getCatalogContent } from './catalog.js';
import { getTokensContent } from './tokens.js';
import { getFormsContent } from './forms.js';
import { getRoutingContent } from './routing.js';
import { getLayoutsContent } from './layouts.js';
import { getThemeContent } from './theme.js';
import { getChartsContent } from './charts.js';
import { getIconsContent } from './icons.js';
import { getMigrationContent } from './migration.js';
import { getBestPracticesContent } from './best-practices.js';
import { getChangelogContent } from './changelog.js';
import { getQuickStartContent } from './quickstart.js';

interface ResourceDef {
  name: string;
  uri: string;
  description: string;
  getContent: () => string;
}

const resources: ResourceDef[] = [
  {
    name: 'component-catalog',
    uri: 'tucu://catalog',
    description:
      'Complete component catalog with variants, props, and examples',
    getContent: getCatalogContent,
  },
  {
    name: 'design-tokens',
    uri: 'tucu://tokens',
    description:
      'Design tokens: CSS variables, semantic colors, breakpoints, typography',
    getContent: getTokensContent,
  },
  {
    name: 'form-system',
    uri: 'tucu://forms',
    description:
      'Form patterns: Form component, validation, useFormContext, all inputs',
    getContent: getFormsContent,
  },
  {
    name: 'routing-guide',
    uri: 'tucu://routing',
    description:
      'Routing guide: standalone, MFE, nested routes, ReactRouter namespace',
    getContent: getRoutingContent,
  },
  {
    name: 'layouts',
    uri: 'tucu://layouts',
    description: 'Layout system: admin, horizontal, clean, macOS, macOS Tahoe',
    getContent: getLayoutsContent,
  },
  {
    name: 'theme-system',
    uri: 'tucu://theme',
    description:
      'Theme system: useTheme hook, presets, dark/light, ThemeProvider setup',
    getContent: getThemeContent,
  },
  {
    name: 'charts',
    uri: 'tucu://charts',
    description:
      'Charts: Recharts wrappers, types, components, theming, performance',
    getContent: getChartsContent,
  },
  {
    name: 'icons',
    uri: 'tucu://icons',
    description: 'Icon catalog: 97+ native SVG icons + 1500+ Lucide icons',
    getContent: getIconsContent,
  },
  {
    name: 'migration-guide',
    uri: 'tucu://migration',
    description:
      'Migration guide: breaking changes between versions, variant mapping',
    getContent: getMigrationContent,
  },
  {
    name: 'best-practices',
    uri: 'tucu://best-practices',
    description: "Best practices: do's, don'ts, anti-patterns, common mistakes",
    getContent: getBestPracticesContent,
  },
  {
    name: 'changelog',
    uri: 'tucu://changelog',
    description: 'Changelog: latest versions and changes',
    getContent: getChangelogContent,
  },
  {
    name: 'quickstart',
    uri: 'tucu://quickstart',
    description: 'Quick start: install, setup, first component, warnings',
    getContent: getQuickStartContent,
  },
];

export function registerResources(server: McpServer): void {
  for (const resource of resources) {
    server.resource(
      resource.name,
      resource.uri,
      { description: resource.description },
      async () => ({
        contents: [
          {
            uri: resource.uri,
            mimeType: 'text/markdown',
            text: resource.getContent(),
          },
        ],
      })
    );
  }
}

export { resources };
