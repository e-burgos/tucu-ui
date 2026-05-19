import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
} from '../../../../index';

const BestPracticesSection: React.FC = () => {
  const dos = [
    'Use descriptive route names and paths',
    'Keep route hierarchy shallow (max 2-3 levels)',
    'Use consistent naming conventions across routes',
    'Leverage TypeScript for type-safe route definitions',
    'Use useMemo for dynamic route generation',
    'Include icons for better navigation UX',
    'Test routes with different user roles and permissions',
    'Use basePath for MFE applications',
    'Provide isAuthenticated and loginUrl in MFE mode',
    'Use enableNestedRoutes when child components need internal routing',
  ];

  const donts = [
    'Create overly deep nesting (>3 levels)',
    'Use generic names like "Page" or "Component"',
    'Hardcode paths in components — use ReactRouter hooks',
    'Forget to handle 404 pages with customRoutes',
    'Mix routing logic with business logic',
    'Skip accessibility considerations in navigation',
    'Ignore mobile navigation UX patterns',
    'Mix Standalone and MFE props in the same ThemeProvider',
    'Import directly from react-router-dom — use ReactRouter namespace',
    'Use StandaloneAppThemeProvider directly — use ThemeProvider',
  ];

  return (
    <>
      <HeroCard
        title="Best Practices"
        description="Guidelines for building maintainable, accessible, and type-safe routing configurations."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Recommendations
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Follow these guidelines for robust routing
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardContainer>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 shadow-lg">
                  <LucideIcons.Check className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="font-semibold">
                  Do&apos;s
                </Typography>
              </div>
              <ul className="space-y-2">
                {dos.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContainer>

          <CardContainer>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-red-500 to-rose-500 shadow-lg">
                  <LucideIcons.X className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="font-semibold">
                  Don&apos;ts
                </Typography>
              </div>
              <ul className="space-y-2">
                {donts.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <LucideIcons.X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContainer>
        </div>
      </section>
    </>
  );
};

export default BestPracticesSection;
