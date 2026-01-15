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
const BestPracticesSection = lazy(
  () => import('./icon-system-sections/BestPracticesSection')
);
const CustomIconsSection = lazy(
  () => import('./icon-system-sections/CustomIconsSection')
);
const IconArchitectureSection = lazy(
  () => import('./icon-system-sections/IconArchitectureSection')
);
const IconSizingGuideSection = lazy(
  () => import('./icon-system-sections/IconSizingGuideSection')
);
const IconSystemAPISection = lazy(
  () => import('./icon-system-sections/IconSystemAPISection')
);
const IconSystemBenefitsSection = lazy(
  () => import('./icon-system-sections/IconSystemBenefitsSection')
);
const LucideIconsSection = lazy(
  () => import('./icon-system-sections/LucideIconsSection')
);
const UsageExamplesSection = lazy(
  () => import('./icon-system-sections/UsageExamplesSection')
);

export function IconsSystem() {
  useAnchorScroll();

  // Table of contents items
  const tocItems: TableOfContentsItem[] = [
    { id: 'icon-architecture', label: 'Icon Architecture' },
    { id: 'custom-icons', label: 'Custom Tucu Icons' },
    { id: 'lucide-icons', label: 'Lucide React Icons' },
    { id: 'usage-examples', label: 'Usage Examples' },
    { id: 'icon-system-api', label: 'Icon System API' },
    { id: 'best-practices', label: 'Best Practices' },
    { id: 'icon-sizing-guide', label: 'Icon Sizing Guide' },
    { id: 'icon-system-benefits', label: 'Icon System Benefits' },
  ];

  return (
    <div className="relative scroll-smooth">
      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
          {/* Hero Section */}
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

          {/* Lazy-loaded component sections */}
          <LazyComponentSection
            id="icon-architecture"
            component={IconArchitectureSection}
          />
          <LazyComponentSection
            id="custom-icons"
            component={CustomIconsSection}
          />
          <LazyComponentSection
            id="lucide-icons"
            component={LucideIconsSection}
          />
          <LazyComponentSection
            id="usage-examples"
            component={UsageExamplesSection}
          />
          <LazyComponentSection
            id="icon-system-api"
            component={IconSystemAPISection}
          />
          <LazyComponentSection
            id="best-practices"
            component={BestPracticesSection}
          />
          <LazyComponentSection
            id="icon-sizing-guide"
            component={IconSizingGuideSection}
          />
          <LazyComponentSection
            id="icon-system-benefits"
            component={IconSystemBenefitsSection}
          />
        </div>
      </TableOfContents>
    </div>
  );
}

export default IconsSystem;
