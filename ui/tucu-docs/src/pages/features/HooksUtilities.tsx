import { lazy } from 'react';
import { LucideIcons, HeroCard } from '@e-burgos/tucu-ui';
import { DynamicSectionsPage, type SectionConfig } from '@e-burgos/tucu-ui';

const sections: SectionConfig[] = [
  {
    id: 'hook-features',
    label: 'Why Choose Our Hooks?',
    component: lazy(
      () => import('./hooks-utilities-sections/HookFeaturesSection')
    ),
  },
  {
    id: 'hook-categories',
    label: 'Hook Categories',
    component: lazy(
      () => import('./hooks-utilities-sections/HookCategoriesSection')
    ),
  },
  {
    id: 'live-demonstrations',
    label: 'Live Hook Demonstrations',
    component: lazy(
      () => import('./hooks-utilities-sections/LiveDemonstrationsSection')
    ),
  },
  {
    id: 'hook-documentation',
    label: 'Hook Documentation',
    component: lazy(
      () => import('./hooks-utilities-sections/HookDocumentationSection')
    ),
  },
  {
    id: 'best-practices',
    label: 'Best Practices',
    component: lazy(
      () => import('./hooks-utilities-sections/BestPracticesSection')
    ),
  },
];

export function HooksUtilities() {
  return (
    <DynamicSectionsPage
      hideHeroInSubSections
      sections={sections}
      hero={
        <HeroCard
          title="Hooks & Utilities"
          description="A comprehensive collection of React hooks and utility functions to enhance your development experience with responsive design, user interactions, and state management."
          githubButton
          getStartedButton
          docsButton="hooks-utilities"
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
              <LucideIcons.Settings className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default HooksUtilities;
