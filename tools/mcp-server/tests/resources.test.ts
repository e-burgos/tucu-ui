import { describe, it, expect } from 'vitest';
import { resources, registerResources } from '../src/resources/index.js';
import { getCatalogContent } from '../src/resources/catalog.js';
import { getDataTableContent } from '../src/resources/datatable.js';
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
import { getStylingOverridesContent } from '../src/resources/styling-overrides.js';
import { getShellContent } from '../src/resources/shell.js';

// ─── Resource Registry ──────────────────────────────────────────────────────
describe('Resource Registry', () => {
  it('registers exactly 15 resources', () => {
    expect(resources).toHaveLength(15);
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
    { name: 'datatable', fn: getDataTableContent },
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
    { name: 'styling-overrides', fn: getStylingOverridesContent },
    { name: 'shell', fn: getShellContent },
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

  it('datatable documents the full DataTable surface', () => {
    const content = getDataTableContent();
    // architecture + exports
    expect(content).toContain('DataTableProvider');
    expect(content).toContain('TanstackTable');
    expect(content).toContain('useDataTableContext');
    expect(content).toContain('convertColumns');
    // props + ColumnDef extensions
    expect(content).toContain('IOptionalDataTableProps');
    expect(content).toContain('filterVariant');
    expect(content).toContain('exportAsNumber');
    expect(content).toContain('accessorHeaderFn');
    // pagination + persistence
    expect(content).toContain('serverPagination');
    expect(content).toContain('takeDefaultPagination');
    expect(content).toContain('useResetCacheVersion');
    expect(content).toContain('-datatable');
    // features
    expect(content).toContain('RowActionsColumn');
    expect(content).toContain('getCommonPinningStyles');
    expect(content).toContain('maxMultiSortColCount');
    expect(content).toContain('renderSubDataTable');
    expect(content).toContain('parseNumericValueForExport');
    expect(content).toContain('--color-table-');
    // gotchas
    expect(content).toContain('373px');
    expect(content).toContain('setScopes');
    expect(content).toContain('generate_datatable');
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

  it('catalog includes DrawerContainer', () => {
    const content = getCatalogContent();
    expect(content).toContain('DrawerContainer');
  });

  it('catalog documents the required Drawer type prop', () => {
    const content = getCatalogContent();
    expect(content).toContain('Drawer');
    expect(content).toMatch(/Drawer.*REQUIRED/s);
  });

  it('forms documents the DrawerContainer programmatic-submit pattern', () => {
    const content = getFormsContent();
    expect(content).toContain('useFormContext');
    expect(content).toContain('DrawerContainer');
    expect(content).toContain('handleSubmit');
  });

  it('styling-overrides contains the data-tucu anchor map and specificity rule', () => {
    const content = getStylingOverridesContent();
    expect(content).toContain('data-tucu');
    expect(content).toContain('specificity');
    expect(content).toContain('expandable-sidebar');
    expect(content).toContain('DrawerContainer');
  });

  it('styling-overrides documents components with no styling hook', () => {
    const content = getStylingOverridesContent();
    expect(content).toContain('CleanLayout');
    expect(content).toContain('ThemeWrapper');
    expect(content).toContain('--color-table-');
  });

  it('shell documents the internal BrowserRouter and real scroll container', () => {
    const content = getShellContent();
    expect(content).toContain('BrowserRouter');
    expect(content).toContain('overflow-y-auto');
    expect(content).toContain('bg-body');
    expect(content).toContain('rightButton');
  });

  it('shell documents cross-app full-page navigation', () => {
    const content = getShellContent();
    expect(content).toContain('isExternalUrl');
    expect(content).toContain('https?');
  });

  it('theme documents customPaletteColor and its blast radius', () => {
    const content = getThemeContent();
    expect(content).toContain('customPaletteColor');
    expect(content).toContain('Blast radius');
    expect(content).toContain('successPreset');
    expect(content).toContain('borderPreset');
  });

  it('tokens documents bg-body as the real page background and no ghost tokens', () => {
    const content = getTokensContent();
    expect(content).toContain('bg-body');
    expect(content).toContain('bg-light-dark');
    expect(content).toContain('46 entries');
    // Ghost tokens must not be published as real table rows / usage examples
    expect(content).not.toContain('| \`bg-background\`');
    expect(content).not.toContain('| \`bg-destructive\`');
    expect(content).not.toContain('text-muted-foreground');
    expect(content).not.toContain('text-primary-foreground');
  });

  it('layouts documents the pinnable sidebar and collapsedLogo', () => {
    const content = getLayoutsContent();
    expect(content).toContain('sidebar-pin');
    expect(content).toContain('collapsedLogo');
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
