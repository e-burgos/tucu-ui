import { lazy } from 'react';
import {
  LucideIcons,
  HeroCard,
  TableOfContents,
  type TableOfContentsItem,
  useAnchorScroll,
} from '../../../index';
import { LazyComponentSection } from '../../components';

// Lazy load component sections
const ThemeProviderRequiredSection = lazy(
  () => import('./layout-system-sections/ThemeProviderRequiredSection')
);
const MenuItemsGuideSection = lazy(
  () => import('./layout-system-sections/MenuItemsGuideSection')
);
const LayoutTypesSection = lazy(
  () => import('./layout-system-sections/LayoutTypesSection')
);
const BestPracticesSection = lazy(
  () => import('./layout-system-sections/BestPracticesSection')
);
const ImplementationExamplesSection = lazy(
  () => import('./layout-system-sections/ImplementationExamplesSection')
);
const CommonErrorsSection = lazy(
  () => import('./layout-system-sections/CommonErrorsSection')
);

export function LayoutSystem() {
  useAnchorScroll();

  // Table of contents items
  const tocItems: TableOfContentsItem[] = [
    { id: 'theme-provider-required', label: 'ThemeProvider Required' },
    { id: 'menu-items-guide', label: 'MenuItems Guide' },
    { id: 'layout-types', label: 'Layout Types' },
    { id: 'best-practices', label: 'Best Practices' },
    { id: 'implementation-examples', label: 'Implementation Examples' },
    { id: 'common-errors', label: 'Common Errors and Solutions' },
  ];

  return (
    <div className="relative scroll-smooth">
      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
          {/* Hero Section */}
          <HeroCard
            title="Layout System"
            description="Comprehensive layout system with multiple presets, responsive design patterns, and powerful theme management. Built for flexibility, accessibility, and ease of customization."
            githubButton
            getStartedButton
            docsButton="layout-system"
            icon={
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
                <LucideIcons.Layout className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
              </div>
            }
          />

          {/* Lazy-loaded component sections */}
          <LazyComponentSection
            id="theme-provider-required"
            component={ThemeProviderRequiredSection}
          />
          <LazyComponentSection
            id="menu-items-guide"
            component={MenuItemsGuideSection}
          />
          <LazyComponentSection
            id="layout-types"
            component={LayoutTypesSection}
          />
          <LazyComponentSection
            id="best-practices"
            component={BestPracticesSection}
          />
          <LazyComponentSection
            id="implementation-examples"
            component={ImplementationExamplesSection}
          />
          <LazyComponentSection
            id="common-errors"
            component={CommonErrorsSection}
          />
        </div>
      </TableOfContents>
    </div>
  );
}

export default LayoutSystem;
