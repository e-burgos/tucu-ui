import { lazy } from 'react';
import { LucideIcons, HeroCard } from '@e-burgos/tucu-ui';
import { DynamicSectionsPage, type SectionConfig } from '@e-burgos/tucu-ui';

const sections: SectionConfig[] = [
  {
    id: 'implementation-status',
    label: 'Implementation Status',
    component: lazy(
      () => import('./accessibility-sections/ImplementationStatusSection')
    ),
  },
  {
    id: 'wcag-principles',
    label: 'WCAG 2.1 AA Principles',
    component: lazy(
      () => import('./accessibility-sections/WCAGPrinciplesSection')
    ),
  },
  {
    id: 'implemented-features',
    label: 'Implemented Features',
    component: lazy(
      () => import('./accessibility-sections/ImplementedFeaturesSection')
    ),
  },
  {
    id: 'keyboard-navigation',
    label: 'Keyboard Navigation',
    component: lazy(
      () => import('./accessibility-sections/KeyboardNavigationSection')
    ),
  },
  {
    id: 'component-status',
    label: 'Component Accessibility Status',
    component: lazy(
      () => import('./accessibility-sections/ComponentStatusSection')
    ),
  },
  {
    id: 'code-examples',
    label: 'Implementation Examples',
    component: lazy(
      () => import('./accessibility-sections/CodeExamplesSection')
    ),
  },
  {
    id: 'testing',
    label: 'Accessibility Testing',
    component: lazy(() => import('./accessibility-sections/TestingSection')),
  },
  {
    id: 'best-practices',
    label: 'Best Practices',
    component: lazy(
      () => import('./accessibility-sections/BestPracticesSection')
    ),
  },
];

export function Accessibility() {
  return (
    <DynamicSectionsPage
      hideHeroInSubSections
      sections={sections}
      hero={
        <HeroCard
          title="Accessibility"
          description="Building inclusive experiences for all users with comprehensive accessibility features. Following WCAG 2.1 AA guidelines to ensure everyone can use our components effectively."
          githubButton
          getStartedButton
          docsButton="accessibility"
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
              <LucideIcons.Accessibility className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default Accessibility;
