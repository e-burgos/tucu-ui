import React from 'react';
import {
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
    {
      key: 'standalone',
      label: 'Standalone App',
    },
    {
      key: 'mfe',
      label: 'Micro Frontends (MFE)',
    },
  ];

  const comparisonTableData = [
    {
      feature: 'Route Configuration',
      standalone: 'menuItems (automatic generation)',
      mfe: 'appRoutesConfig (explicit configuration)',
    },
    {
      feature: 'Base Path',
      standalone: 'Not required (uses root /)',
      mfe: 'Required (e.g., /my-app)',
    },
    {
      feature: 'Route Generation',
      standalone: 'Automatic from menuItems',
      mfe: 'Manual via appRoutesConfig',
    },
    {
      feature: 'Nested Routes',
      standalone: 'Supported via dropdownItems',
      mfe: 'Supported via nested routes in config',
    },
    {
      feature: 'Custom Routes',
      standalone: 'Optional customRoutes prop',
      mfe: 'Not available',
    },
    {
      feature: 'Authentication',
      standalone: 'Basic support via isPublic',
      mfe: 'Advanced support with isPublic per route',
    },
    {
      feature: 'Route Disabling',
      standalone: 'Not directly supported',
      mfe: 'Supported via disabled prop',
    },
    {
      feature: 'Deployment',
      standalone: 'Single deployment',
      mfe: 'Independent deployments per app',
    },
    {
      feature: 'Use Case',
      standalone: 'Traditional SPAs, monolithic apps',
      mfe: 'Distributed architectures, micro frontends',
    },
    {
      feature: 'TypeScript Safety',
      standalone: 'Enforced via discriminated unions',
      mfe: 'Enforced via discriminated unions',
    },
  ];

  const whenToUseStandalone = `// Use Standalone App Pattern when:
// ✅ Building a traditional single-page application
// ✅ All routes are in one codebase
// ✅ You want automatic route generation
// ✅ Simple deployment model
// ✅ No need for route isolation

function MyStandaloneApp() {
  return (
    <ThemeProvider
      menuItems={menuItems}  // Simple configuration
      logo={{ name: 'My', secondName: 'App' }}
    />
  );
}`;

  const whenToUseMFE = `// Use MFE Pattern when:
// ✅ Building micro frontend architecture
// ✅ Multiple teams working independently
// ✅ Need independent deployments
// ✅ Require route isolation
// ✅ Need explicit route control

function MyMfeApp() {
  return (
    <ThemeProvider
      architecturalPatterns="mfe"
      basePath="/my-app"  // Required for MFE
      appRoutesConfig={appRoutesConfig}  // Explicit routes
      logo={{ name: 'My', secondName: 'App' }}
    />
  );
}`;

  return (
    <div className="space-y-8">
      <CardContainer>
        <CardTitle
          title="Architectural Patterns: Standalone vs MFE"
          className="mt-2 mb-6"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg">
                <LucideIcons.GitCompare className="w-5 h-5 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h4" className="font-semibold">
                Pattern Comparison & Selection Guide
              </Typography>
            </div>

            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Understanding the differences between Standalone and MFE patterns
              helps you choose the right architecture for your project. Both
              patterns use the same{' '}
              <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                ThemeProvider
              </code>{' '}
              component, but with different configuration approaches and use
              cases.
            </Typography>

            <Alert variant="info" dismissible={false}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <LucideIcons.Lightbulb className="w-4 h-4" />
                  <Typography tag="span" className="font-semibold">
                    TypeScript Safety
                  </Typography>
                </div>
                <Typography tag="p" className="text-sm">
                  Both patterns use TypeScript discriminated unions to enforce
                  the correct props. The{' '}
                  <code className="px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded text-xs">
                    architecturalPatterns
                  </code>{' '}
                  prop determines which props are available, preventing
                  configuration errors at compile time.
                </Typography>
              </div>
            </Alert>

            <div className="space-y-6">
              <div className="space-y-4">
                <Typography tag="h4" className="font-semibold text-lg">
                  Feature Comparison
                </Typography>
                <BasicTable
                  columns={comparisonTableColumns}
                  data={comparisonTableData}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CardContainer className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg">
                      <LucideIcons.Package className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography tag="h4" className="font-semibold">
                      Standalone App Pattern
                    </Typography>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Typography
                        tag="h5"
                        className="font-semibold text-sm mb-2"
                      >
                        When to Use:
                      </Typography>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Traditional single-page applications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>All routes in one codebase</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Simple deployment model</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Want automatic route generation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>No need for route isolation</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <Typography
                        tag="h5"
                        className="font-semibold text-sm mb-2"
                      >
                        Key Advantages:
                      </Typography>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                          <span>Simple configuration with menuItems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                          <span>Automatic route generation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                          <span>Nested routes via dropdownItems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                          <span>Optional customRoutes override</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-light-dark rounded-lg">
                    <CodeBlock language="tsx" code={whenToUseStandalone} />
                  </div>
                </CardContainer>

                <CardContainer className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-linear-to-br from-purple-500 to-indigo-500 shadow-lg">
                      <LucideIcons.Box className="w-5 h-5 text-white filter drop-shadow-sm" />
                    </div>
                    <Typography tag="h4" className="font-semibold">
                      Micro Frontends (MFE) Pattern
                    </Typography>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Typography
                        tag="h5"
                        className="font-semibold text-sm mb-2"
                      >
                        When to Use:
                      </Typography>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Micro frontend architecture</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Multiple teams working independently</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Need independent deployments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Require route isolation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>Need explicit route control</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <Typography
                        tag="h5"
                        className="font-semibold text-sm mb-2"
                      >
                        Key Advantages:
                      </Typography>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                          <span>Explicit route configuration</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                          <span>Route isolation with basePath</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                          <span>Advanced authentication support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <LucideIcons.Circle className="w-3 h-3 mt-1 shrink-0 fill-current" />
                          <span>Route disabling capability</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-light-dark rounded-lg">
                    <CodeBlock language="tsx" code={whenToUseMFE} />
                  </div>
                </CardContainer>
              </div>

              <CardContainer className="p-4">
                <div className="flex items-start gap-3">
                  <LucideIcons.Lightbulb className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <Typography tag="p" className="text-sm font-semibold mb-2">
                      Decision Guide
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                    >
                      Choose <strong>Standalone App Pattern</strong> if you're
                      building a traditional SPA with all routes in one
                      codebase. Choose <strong>MFE Pattern</strong> if you need
                      independent deployments, route isolation, or are building
                      a micro frontend architecture.
                    </Typography>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <LucideIcons.ArrowRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>
                          <strong>Start with Standalone</strong> if you're
                          unsure - it's simpler and can be migrated to MFE later
                          if needed.
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <LucideIcons.ArrowRight className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                        <span>
                          <strong>Use MFE</strong> from the start if you know
                          you'll need independent deployments or route
                          isolation.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default ArchitecturalPatternsComparisonSection;
