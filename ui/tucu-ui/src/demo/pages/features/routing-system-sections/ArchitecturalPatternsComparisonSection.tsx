import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
  Alert,
  BasicTable,
  type TableColumn,
} from '../../../../index';

const ArchitecturalPatternsComparisonSection: React.FC = () => {
  const comparisonTableColumns: TableColumn[] = [
    {
      key: 'feature',
      label: 'Feature',
      render: (value: unknown) => (
        <Typography tag="span" className="font-medium">
          {String(value)}
        </Typography>
      ),
    },
    { key: 'standalone', label: 'Standalone' },
    { key: 'mfe', label: 'MFE' },
  ];

  const comparisonTableData = [
    {
      feature: 'Route Configuration',
      standalone: 'menuItems (automatic)',
      mfe: 'appRoutesConfig (explicit)',
    },
    {
      feature: 'Base Path',
      standalone: 'Not required (root /)',
      mfe: 'Required (e.g., /my-app)',
    },
    {
      feature: 'Authentication',
      standalone: 'Basic via isPublic',
      mfe: 'isAuthenticated + loginUrl (required)',
    },
    {
      feature: 'Nested Routes',
      standalone: 'dropdownItems + enableNestedRoutes',
      mfe: 'Via nested route config',
    },
    {
      feature: 'Custom Routes',
      standalone: 'Optional customRoutes prop',
      mfe: 'Not available',
    },
    {
      feature: 'Route Disabling',
      standalone: 'Not supported',
      mfe: 'Supported via disabled prop',
    },
    {
      feature: 'Deployment',
      standalone: 'Single deployment',
      mfe: 'Independent per app',
    },
    {
      feature: 'Use Case',
      standalone: 'Traditional SPAs',
      mfe: 'Distributed architectures',
    },
  ];

  const whenToUseStandalone = `import { ThemeProvider } from '@e-burgos/tucu-ui';

// Use Standalone when:
// ✅ Building a traditional SPA
// ✅ All routes in one codebase
// ✅ Want automatic route generation
// ✅ Simple deployment model

function MyApp() {
  return (
    <ThemeProvider
      menuItems={menuItems}
      logo={{ name: 'My', secondName: 'App' }}
    />
  );
}`;

  const whenToUseMFE = `import { ThemeProvider } from '@e-burgos/tucu-ui';

// Use MFE when:
// ✅ Multiple teams working independently
// ✅ Need independent deployments
// ✅ Require route isolation
// ✅ Need explicit route control

function MyMfeApp() {
  return (
    <ThemeProvider
      architecturalPatterns="mfe"
      basePath="/my-app"
      appRoutesConfig={routes}
      isAuthenticated={isLoggedIn}
      loginUrl="/login"
    />
  );
}`;

  return (
    <>
      <HeroCard
        title="Architectural Patterns"
        description="Compare Standalone and MFE patterns to choose the right architecture. Both use the same ThemeProvider with TypeScript-enforced discriminated unions."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.GitCompare className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Feature Comparison
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Side-by-side comparison of routing capabilities
          </Typography>
        </div>
        <CardContainer>
          <div className="p-4">
            <BasicTable
              columns={comparisonTableColumns}
              data={comparisonTableData}
            />
          </div>
        </CardContainer>
        <Alert variant="info" dismissible={false}>
          <Typography tag="p" className="text-sm">
            <LucideIcons.Lightbulb className="w-4 h-4 inline mr-2" />
            Both patterns use TypeScript discriminated unions. The{' '}
            <code className="px-1 py-0.5 border border-border rounded text-xs">
              architecturalPatterns
            </code>{' '}
            prop determines which props are available, preventing configuration
            errors at compile time.
          </Typography>
        </Alert>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Pattern Selection
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Choose the right architecture for your project
          </Typography>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardContainer>
            <CardTitle title="Standalone App">
              <CodeBlock language="tsx" code={whenToUseStandalone} />
            </CardTitle>
          </CardContainer>
          <CardContainer>
            <CardTitle title="Micro Frontends (MFE)">
              <CodeBlock language="tsx" code={whenToUseMFE} />
            </CardTitle>
          </CardContainer>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Decision Guide
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Quick guidance for choosing your architecture
          </Typography>
        </div>
        <CardContainer>
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <LucideIcons.ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <Typography tag="p" className="text-sm">
                <strong>Start with Standalone</strong> if you&apos;re unsure —
                it&apos;s simpler and can be migrated to MFE later.
              </Typography>
            </div>
            <div className="flex items-start gap-3">
              <LucideIcons.ArrowRight className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
              <Typography tag="p" className="text-sm">
                <strong>Use MFE from the start</strong> if you know you&apos;ll
                need independent deployments or route isolation.
              </Typography>
            </div>
            <div className="flex items-start gap-3">
              <LucideIcons.ArrowRight className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <Typography tag="p" className="text-sm">
                <strong>Both patterns share</strong> the same ThemeProvider,
                theming, and layout system — only routing differs.
              </Typography>
            </div>
          </div>
        </CardContainer>
      </section>
    </>
  );
};

export default ArchitecturalPatternsComparisonSection;
