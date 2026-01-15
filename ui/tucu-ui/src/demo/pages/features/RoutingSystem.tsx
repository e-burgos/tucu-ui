import React, { lazy } from 'react';
import {
  LucideIcons,
  HeroCard,
  TableOfContents,
  type TableOfContentsItem,
  useAnchorScroll,
} from '../../../index';
import { LazyComponentSection } from '../../components';

// Lazy load component sections - Ordered alphabetically by tocItems
const APIReferenceSection = lazy(
  () => import('./routing-system-sections/APIReferenceSection')
);
const ArchitecturalPatternsComparisonSection = lazy(
  () =>
    import('./routing-system-sections/ArchitecturalPatternsComparisonSection')
);
const BestPracticesSection = lazy(
  () => import('./routing-system-sections/BestPracticesSection')
);
const DynamicRoutesSection = lazy(
  () => import('./routing-system-sections/DynamicRoutesSection')
);
const MFESupportSection = lazy(
  () => import('./routing-system-sections/MFESupportSection')
);
const NestedRoutesSection = lazy(
  () => import('./routing-system-sections/NestedRoutesSection')
);
const RouteConfigurationSection = lazy(
  () => import('./routing-system-sections/RouteConfigurationSection')
);
const StandaloneAppSection = lazy(
  () => import('./routing-system-sections/StandaloneAppSection')
);
const SystemOverviewSection = lazy(
  () => import('./routing-system-sections/SystemOverviewSection')
);
const ThemeProviderIntegrationSection = lazy(
  () => import('./routing-system-sections/ThemeProviderIntegrationSection')
);

export function RoutingSystem() {
  useAnchorScroll();

  // Table of contents items
  const tocItems: TableOfContentsItem[] = [
    { id: 'system-overview', label: 'System Overview' },
    { id: 'route-configuration', label: 'Route Configuration' },
    { id: 'nested-routes', label: 'Nested Routes & Dropdown Menus' },
    { id: 'theme-provider-integration', label: 'ThemeProvider Integration' },
    { id: 'dynamic-routes', label: 'Dynamic & Conditional Routes' },
    { id: 'mfe-support', label: 'Micro Frontends (MFE) Support' },
    { id: 'standalone-app', label: 'Standalone App' },
    {
      id: 'architectural-patterns-comparison',
      label: 'Architectural Patterns: Standalone vs MFE',
    },
    { id: 'best-practices', label: 'Best Practices' },
    { id: 'api-reference', label: 'API Reference' },
  ];

  return (
    <div className="relative scroll-smooth">
      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
          {/* Hero Section */}
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

          {/* Lazy-loaded component sections */}
          <LazyComponentSection
            id="system-overview"
            component={SystemOverviewSection}
          />
          <LazyComponentSection
            id="route-configuration"
            component={RouteConfigurationSection}
          />
          <LazyComponentSection
            id="nested-routes"
            component={NestedRoutesSection}
          />
          <LazyComponentSection
            id="theme-provider-integration"
            component={ThemeProviderIntegrationSection}
          />
          <LazyComponentSection
            id="dynamic-routes"
            component={DynamicRoutesSection}
          />
          <LazyComponentSection
            id="mfe-support"
            component={MFESupportSection}
          />
          <LazyComponentSection
            id="standalone-app"
            component={StandaloneAppSection}
          />
          <LazyComponentSection
            id="architectural-patterns-comparison"
            component={ArchitecturalPatternsComparisonSection}
          />
          <LazyComponentSection
            id="best-practices"
            component={BestPracticesSection}
          />
          <LazyComponentSection
            id="api-reference"
            component={APIReferenceSection}
          />
        </div>
      </TableOfContents>
    </div>
  );
}

export default RoutingSystem;
