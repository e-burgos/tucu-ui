import { describe, it, expect } from 'vitest';
import { resources, registerResources } from '../src/resources/index.js';
import { getCatalogContent } from '../src/resources/catalog.js';
import { getTokensContent } from '../src/resources/tokens.js';
import { getFormsContent } from '../src/resources/forms.js';
import { getRoutingContent } from '../src/resources/routing.js';
import { getLayoutsContent } from '../src/resources/layouts.js';
import { getThemeContent } from '../src/resources/theme.js';
import { getChartsContent } from '../src/resources/charts.js';
import { getIconsContent } from '../src/resources/icons.js';
import { getMigrationContent } from '../src/resources/migration.js';
import { getBestPracticesContent } from '../src/resources/best-practices.js';
import { getChangelogContent } from '../src/resources/changelog.js';
import { getQuickStartContent } from '../src/resources/quickstart.js';

// ─── Resource Registry ──────────────────────────────────────────────────────
describe('Resource Registry', () => {
  it('registers exactly 12 resources', () => {
    expect(resources).toHaveLength(12);
  });

  it('all resources have tucu:// URIs', () => {
    for (const resource of resources) {
      expect(resource.uri).toMatch(/^tucu:\/\//);
    }
  });

  it('all resources have unique URIs', () => {
    const uris = resources.map((r) => r.uri);
    expect(new Set(uris).size).toBe(uris.length);
  });

  it('all resources have unique names', () => {
    const names = resources.map((r) => r.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('all resources have non-empty descriptions', () => {
    for (const resource of resources) {
      expect(resource.description.length).toBeGreaterThan(10);
    }
  });

  it('registerResources is a function', () => {
    expect(typeof registerResources).toBe('function');
  });
});

// ─── Resource Content ───────────────────────────────────────────────────────
describe('Resource Content', () => {
  const contentFns = [
    { name: 'catalog', fn: getCatalogContent },
    { name: 'tokens', fn: getTokensContent },
    { name: 'forms', fn: getFormsContent },
    { name: 'routing', fn: getRoutingContent },
    { name: 'layouts', fn: getLayoutsContent },
    { name: 'theme', fn: getThemeContent },
    { name: 'charts', fn: getChartsContent },
    { name: 'icons', fn: getIconsContent },
    { name: 'migration', fn: getMigrationContent },
    { name: 'best-practices', fn: getBestPracticesContent },
    { name: 'changelog', fn: getChangelogContent },
    { name: 'quickstart', fn: getQuickStartContent },
  ];

  it('all resources return non-empty content', () => {
    for (const { name, fn } of contentFns) {
      const content = fn();
      expect(
        content.length,
        `${name} content should not be empty`
      ).toBeGreaterThan(100);
    }
  });

  it('catalog contains component names', () => {
    const content = getCatalogContent();
    expect(content).toContain('Button');
    expect(content).toContain('Form');
    expect(content).toContain('Input');
    expect(content).toContain('CardContainer');
    expect(content).toContain('Typography');
  });

  it('catalog contains correct Button variants', () => {
    const content = getCatalogContent();
    expect(content).toContain('"solid"');
    expect(content).toContain('"ghost"');
    expect(content).toContain('"transparent"');
    // It should warn about invalid variants, not recommend them
    expect(content).toContain('NEVER use variant="primary"');
  });

  it('tokens contains semantic token names', () => {
    const content = getTokensContent();
    expect(content).toContain('bg-primary');
    expect(content).toContain('text-secondary');
    expect(content).toContain('--color-tucu-ui-');
  });

  it('forms contains Form component documentation', () => {
    const content = getFormsContent();
    expect(content).toContain('FormProps');
    expect(content).toContain('validationSchema');
    expect(content).toContain('useFormContext');
    expect(content).toContain('onSubmit');
  });

  it('routing contains ReactRouter warning', () => {
    const content = getRoutingContent();
    expect(content).toContain('ReactRouter');
    expect(content).toContain('NEVER import directly from');
  });

  it('layouts contains all 5 layout options', () => {
    const content = getLayoutsContent();
    expect(content).toContain('LAYOUT_OPTIONS.ADMIN');
    expect(content).toContain('LAYOUT_OPTIONS.HORIZONTAL');
    expect(content).toContain('LAYOUT_OPTIONS.CLEAN');
    expect(content).toContain('LAYOUT_OPTIONS.MACOS');
    expect(content).toContain('LAYOUT_OPTIONS.MACOS_TAHOE');
  });

  it('theme contains useTheme hook documentation', () => {
    const content = getThemeContent();
    expect(content).toContain('useTheme');
    expect(content).toContain('applyMacOSTheme');
    expect(content).toContain('restoreDefaultColors');
  });

  it('charts contains Recharts info', () => {
    const content = getChartsContent();
    expect(content).toContain('ResponsiveContainer');
    expect(content).toContain('LineChart');
    expect(content).toContain('BarChart');
  });

  it('icons contains LucideIcons', () => {
    const content = getIconsContent();
    expect(content).toContain('LucideIcons');
    expect(content).toContain('1500+');
  });

  it('migration contains breaking changes', () => {
    const content = getMigrationContent();
    expect(content).toContain('variant="primary"');
    expect(content).toContain('variant="solid"');
    expect(content).toContain('Cannot read properties of undefined');
  });

  it('best-practices contains do/dont patterns', () => {
    const content = getBestPracticesContent();
    expect(content).toContain('NEVER');
    expect(content).toContain('ALWAYS');
    expect(content).toContain('@e-burgos/tucu-ui');
  });

  it('quickstart contains installation instructions', () => {
    const content = getQuickStartContent();
    expect(content).toContain('pnpm add @e-burgos/tucu-ui');
    expect(content).toContain('ThemeProvider');
    expect(content).toContain('variant="solid"');
  });

  it('no resource recommends invalid variants as correct usage', () => {
    const invalidRecommendations = [
      'use variant="primary" for',
      'variant="primary" is correct',
      'recommended: variant="outline"',
      'use size="lg" for',
      'use size="sm" for',
    ];
    for (const { name, fn } of contentFns) {
      const content = fn();
      for (const pattern of invalidRecommendations) {
        expect(
          content,
          `${name} should not recommend "${pattern}"`
        ).not.toContain(pattern);
      }
    }
  });
});
