import React, { lazy } from 'react';
import { LucideIcons, HeroCard } from '../../../index';
import { DynamicSectionsPage, type SectionConfig } from '../../components';

const sections: SectionConfig[] = [
  {
    id: 'system-overview',
    label: 'System Overview',
    component: lazy(
      () => import('./routing-system-sections/SystemOverviewSection')
    ),
  },
  {
    id: 'route-configuration',
    label: 'Route Configuration',
    component: lazy(
      () => import('./routing-system-sections/RouteConfigurationSection')
    ),
  },
  {
    id: 'nested-routes',
    label: 'Nested Routes & Dropdown Menus',
    component: lazy(
      () => import('./routing-system-sections/NestedRoutesSection')
    ),
  },
  {
    id: 'theme-provider-integration',
    label: 'ThemeProvider Integration',
    component: lazy(
      () => import('./routing-system-sections/ThemeProviderIntegrationSection')
    ),
  },
  {
    id: 'dynamic-routes',
    label: 'Dynamic & Conditional Routes',
    component: lazy(
      () => import('./routing-system-sections/DynamicRoutesSection')
    ),
  },
  {
    id: 'mfe-support',
    label: 'Micro Frontends (MFE) Support',
    component: lazy(
      () => import('./routing-system-sections/MFESupportSection')
    ),
  },
  {
    id: 'standalone-app',
    label: 'Standalone App',
    component: lazy(
      () => import('./routing-system-sections/StandaloneAppSection')
    ),
  },
  {
    id: 'architectural-patterns-comparison',
    label: 'Architectural Patterns: Standalone vs MFE',
    component: lazy(
      () =>
        import(
          './routing-system-sections/ArchitecturalPatternsComparisonSection'
        )
    ),
  },
  {
    id: 'best-practices',
    label: 'Best Practices',
    component: lazy(
      () => import('./routing-system-sections/BestPracticesSection')
    ),
  },
  {
    id: 'api-reference',
    label: 'API Reference',
    component: lazy(
      () => import('./routing-system-sections/APIReferenceSection')
    ),
  },
];

export function RoutingSystem() {
  return (
    <DynamicSectionsPage
      hideHeroInSubSections
      sections={sections}
      hero={
        <HeroCard
          title="Routing System"
          description="Powerful and flexible routing system built on React Router with automatic navigation generation, nested routes support, and seamless integration with the theming system. Supports both Standalone applications and Micro Frontends (MFE) architectures."
          githubButton
          getStartedButton
          docsButton="introduction"
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500/50">
              <LucideIcons.Route className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default RoutingSystem;
