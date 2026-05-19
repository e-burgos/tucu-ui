import { lazy } from 'react';
import { LucideIcons, HeroCard } from '../../../index';
import { DynamicSectionsPage, type SectionConfig } from '../../components';

const sections: SectionConfig[] = [
  {
    id: 'theme-provider-required',
    label: 'ThemeProvider Required',
    component: lazy(
      () => import('./layout-system-sections/ThemeProviderRequiredSection')
    ),
  },
  {
    id: 'menu-items-guide',
    label: 'MenuItems Guide',
    component: lazy(
      () => import('./layout-system-sections/MenuItemsGuideSection')
    ),
  },
  {
    id: 'layout-types',
    label: 'Layout Types',
    component: lazy(
      () => import('./layout-system-sections/LayoutTypesSection')
    ),
  },
  {
    id: 'best-practices',
    label: 'Best Practices',
    component: lazy(
      () => import('./layout-system-sections/BestPracticesSection')
    ),
  },
  {
    id: 'implementation-examples',
    label: 'Implementation Examples',
    component: lazy(
      () => import('./layout-system-sections/ImplementationExamplesSection')
    ),
  },
  {
    id: 'common-errors',
    label: 'Common Errors and Solutions',
    component: lazy(
      () => import('./layout-system-sections/CommonErrorsSection')
    ),
  },
];

export function LayoutSystem() {
  return (
    <DynamicSectionsPage
      hideHeroInSubSections
      sections={sections}
      hero={
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
      }
    />
  );
}

export default LayoutSystem;
