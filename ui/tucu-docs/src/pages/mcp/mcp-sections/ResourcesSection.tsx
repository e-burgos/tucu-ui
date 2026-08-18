import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  BasicTable,
} from '@e-burgos/tucu-ui';

const resources = [
  {
    uri: 'tucu://catalog',
    description:
      'Complete component catalog with variants, props, and examples — includes DrawerContainer as a first-class component and a compiling Drawer example (type and setIsOpen are required)',
  },
  {
    uri: 'tucu://tokens',
    description:
      'Design tokens audited against the real CSS: 46 color presets, CSS variables, semantic colors, JS-only breakpoints, typography',
  },
  {
    uri: 'tucu://forms',
    description:
      'Form patterns: Form component, validation, the re-exported useFormContext hook, programmatic submit for portaled content, all inputs',
  },
  {
    uri: 'tucu://routing',
    description:
      'Routing guide: standalone, MFE, nested routes, ReactRouter namespace',
  },
  {
    uri: 'tucu://layouts',
    description:
      'Layout system: admin, horizontal, clean, macOS, macOS Tahoe — including the AdminLayout sidebar pinning and collapsedLogo props',
  },
  {
    uri: 'tucu://theme',
    description:
      'Theme system: useTheme hook (complete state shape, 24 themeable preset slots), the 24 customPaletteColor keys with their blast radius, persistence, presets, dark/light, ThemeProvider setup',
  },
  {
    uri: 'tucu://datatable',
    description:
      'DataTable deep reference: architecture, all props, pagination modes, sorting, filters, pinning, persistence, export — including the explicit column id requirement',
  },
  {
    uri: 'tucu://charts',
    description:
      'Charts: Recharts wrappers, types, components, theming, performance',
  },
  {
    uri: 'tucu://icons',
    description: 'Icon catalog: 97+ native SVG icons + 1500+ Lucide icons',
  },
  {
    uri: 'tucu://migration',
    description:
      'Migration guide: breaking changes between versions, variant mapping',
  },
  {
    uri: 'tucu://best-practices',
    description:
      "Best practices: do's, don'ts, anti-patterns, common mistakes",
  },
  { uri: 'tucu://changelog', description: 'Version history and release notes' },
  {
    uri: 'tucu://quickstart',
    description:
      'Quick start guide: installation, first component, basic setup',
  },
  {
    uri: 'tucu://styling-overrides',
    description:
      'Real-world CSS overrides: full data-tucu anchor map, the compound-selector specificity rule, components with no styling hook, verified override recipes',
  },
  {
    uri: 'tucu://shell',
    description:
      'App shell and orchestration reality: standalone vs orchestrated ThemeProvider, the internal BrowserRouter and real scroll container, the rightButton header slot, cross-app full-page navigation',
  },
];

const ResourcesSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Resources"
        description="15 static knowledge resources that agents can read for comprehensive context about the library."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Available Resources">
          <Typography className="text-sm text-foreground/70 mb-4">
            Resources provide static, pre-compiled knowledge that agents can
            read at any time. Unlike tools, they don't execute code — they
            deliver structured documentation.
          </Typography>
          <div className="overflow-x-auto">
            <BasicTable
              columns={[
                {
                  key: 'uri',
                  label: 'URI',
                  render: (value: unknown) => (
                    <code className="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded text-xs font-mono whitespace-nowrap">
                      {String(value)}
                    </code>
                  ),
                },
                { key: 'description', label: 'Description' },
              ]}
              data={resources}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Integration-Reality Resources">
          <Typography className="text-sm text-foreground/70 mb-4">
            Beyond the component catalog, two resources document the reality of
            integrating tucu-ui into an existing app, and several resources were
            extended with audited, source-verified content:
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-lg border border-violet-500/20 bg-violet-500/5">
              <div className="flex items-center gap-2 mb-2">
                <LucideIcons.Paintbrush className="w-4 h-4 text-violet-500" />
                <code className="text-xs font-mono">
                  tucu://styling-overrides
                </code>
              </div>
              <Typography className="text-xs text-foreground/60">
                The complete map of <code>data-tucu</code> styling anchors, the
                compound-selector specificity rule for winning against library
                styles, the list of components with no styling hook (plus
                workarounds), and verified CSS override recipes.
              </Typography>
            </div>
            <div className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5">
              <div className="flex items-center gap-2 mb-2">
                <LucideIcons.AppWindow className="w-4 h-4 text-cyan-500" />
                <code className="text-xs font-mono">tucu://shell</code>
              </div>
              <Typography className="text-xs text-foreground/60">
                ThemeProvider internals: it mounts its own BrowserRouter and the
                real scroll container, exposes the <code>rightButton</code>{' '}
                header slot, and performs full-page navigation for{' '}
                <code>^https?://</code> URLs.
              </Typography>
            </div>
          </div>
          <Typography className="text-sm text-foreground/70 mb-2">
            Extended and audited resources:
          </Typography>
          <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/70">
            <li>
              <code className="text-xs font-mono">tucu://theme</code> — all 24{' '}
              <code>customPaletteColor</code> keys with their blast radius, the
              complete <code>useTheme</code> state shape (24 themeable preset
              slots), and persistence details.
            </li>
            <li>
              <code className="text-xs font-mono">tucu://tokens</code> — audited
              against the real CSS: 46 actual color presets, phantom tokens
              removed, the <code>bg-info</code> → primary divergence documented,
              and JS-only breakpoints flagged.
            </li>
            <li>
              <code className="text-xs font-mono">tucu://layouts</code> — the
              new AdminLayout props: <code>collapsedLogo</code>,{' '}
              <code>sidebarPinned</code>, <code>defaultSidebarPinned</code>,{' '}
              <code>onSidebarPinnedChange</code>.
            </li>
            <li>
              <code className="text-xs font-mono">tucu://forms</code> — the
              re-exported <code>useFormContext</code> hook and the programmatic
              submit pattern for portaled content.
            </li>
            <li>
              <code className="text-xs font-mono">tucu://catalog</code> —
              DrawerContainer is now indexed as a first-class component, the
              Drawer example compiles as-is (required <code>type</code> and{' '}
              <code>setIsOpen</code>), and DataTable columns carry an explicit{' '}
              <code>id</code> warning.
            </li>
          </ul>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="How Agents Use Resources">
          <Typography className="text-sm text-foreground/70 mb-3">
            When an agent needs context about the library, it reads the relevant
            resource URI. This is automatic — no user action required:
          </Typography>
          <CodeBlock
            code={`// Agent internally reads resources before generating code:

// 1. Read catalog to know available components
GET tucu://catalog
→ Returns: 95+ components with categories and prop summaries

// 2. Read tokens to use correct design values
GET tucu://tokens
→ Returns: color scales, spacing (4px base), typography, shadows

// 3. Read forms to generate correct form patterns
GET tucu://forms
→ Returns: Zod patterns, field types, validation rules`}
          />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Resource vs Tool">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
              <div className="flex items-center gap-2 mb-2">
                <LucideIcons.BookOpen className="w-4 h-4 text-emerald-500" />
                <Typography className="text-sm font-medium">
                  Resources
                </Typography>
              </div>
              <Typography className="text-xs text-foreground/60">
                Static knowledge. Read-only. Always available. No parameters
                needed. Provides broad context for the agent to work from.
              </Typography>
            </div>
            <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
              <div className="flex items-center gap-2 mb-2">
                <LucideIcons.Wrench className="w-4 h-4 text-blue-500" />
                <Typography className="text-sm font-medium">Tools</Typography>
              </div>
              <Typography className="text-xs text-foreground/60">
                Dynamic execution. Takes parameters. Generates code, searches,
                inspects. Returns computed results specific to the request.
              </Typography>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default ResourcesSection;
