import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  BasicTable,
} from '../../../../index';

const resources = [
  {
    uri: 'tucu://catalog',
    description:
      'Complete component catalog with categories, variants, and prop types',
  },
  {
    uri: 'tucu://tokens',
    description:
      'Design tokens: colors, spacing, typography, shadows, border-radius',
  },
  {
    uri: 'tucu://forms',
    description:
      'Form system guide: validation patterns, field types, react-hook-form integration',
  },
  {
    uri: 'tucu://routing',
    description:
      'Routing patterns for standalone and micro-frontend architectures',
  },
  {
    uri: 'tucu://layouts',
    description:
      'Layout system: MainLayout, sidebar, top-nav, full-width configurations',
  },
  {
    uri: 'tucu://theme',
    description:
      'Theming guide: color presets, dark/light mode, useTheme hook, Zustand store',
  },
  {
    uri: 'tucu://charts',
    description:
      'Recharts integration: chart types, theming, responsive patterns',
  },
  {
    uri: 'tucu://icons',
    description:
      'Icon catalog: full Lucide icon set with search and usage examples',
  },
  {
    uri: 'tucu://migration',
    description:
      'Migration guide: upgrading from previous versions, breaking changes',
  },
  {
    uri: 'tucu://best-practices',
    description:
      'Best practices: accessibility, performance, TypeScript patterns',
  },
  { uri: 'tucu://changelog', description: 'Version history and release notes' },
  {
    uri: 'tucu://quickstart',
    description:
      'Quick start guide: installation, first component, basic setup',
  },
];

const ResourcesSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Resources"
        description="12 static knowledge resources that agents can read for comprehensive context about the library."
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
