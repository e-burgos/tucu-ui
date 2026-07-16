import { lazy } from 'react';
import { LucideIcons, HeroCard } from '@e-burgos/tucu-ui';
import { DynamicSectionsPage, type SectionConfig } from '@e-burgos/tucu-ui';

const sections: SectionConfig[] = [
  {
    id: 'icon-architecture',
    label: 'Icon Architecture',
    component: lazy(
      () => import('./icon-system-sections/IconArchitectureSection')
    ),
  },
  {
    id: 'custom-icons',
    label: 'Custom Tucu Icons',
    component: lazy(() => import('./icon-system-sections/CustomIconsSection')),
  },
  {
    id: 'lucide-icons',
    label: 'Lucide React Icons',
    component: lazy(() => import('./icon-system-sections/LucideIconsSection')),
  },
  {
    id: 'usage-examples',
    label: 'Usage Examples',
    component: lazy(
      () => import('./icon-system-sections/UsageExamplesSection')
    ),
  },
  {
    id: 'icon-system-api',
    label: 'Icon System API',
    component: lazy(
      () => import('./icon-system-sections/IconSystemAPISection')
    ),
  },
  {
    id: 'best-practices',
    label: 'Best Practices',
    component: lazy(
      () => import('./icon-system-sections/BestPracticesSection')
    ),
  },
  {
    id: 'icon-sizing-guide',
    label: 'Icon Sizing Guide',
    component: lazy(
      () => import('./icon-system-sections/IconSizingGuideSection')
    ),
  },
  {
    id: 'icon-system-benefits',
    label: 'Icon System Benefits',
    component: lazy(
      () => import('./icon-system-sections/IconSystemBenefitsSection')
    ),
  },
];

export function IconsSystem() {
  return (
    <DynamicSectionsPage
      hideHeroInSubSections
      sections={sections}
      hero={
        <HeroCard
          title="Icons System"
          description="Comprehensive icon system combining 98+ custom-designed icons with full Lucide React integration (5000+ icons). Access to all icons through a unified, performant API with TypeScript support and automatic tree-shaking."
          githubButton
          getStartedButton
          docsButton="icons-system"
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500/50">
              <LucideIcons.Sparkles className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default IconsSystem;
