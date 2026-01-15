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
  () => import('./hooks-utilities-sections/BestPracticesSection')
);
const HookCategoriesSection = lazy(
  () => import('./hooks-utilities-sections/HookCategoriesSection')
);
const HookDocumentationSection = lazy(
  () => import('./hooks-utilities-sections/HookDocumentationSection')
);
const HookFeaturesSection = lazy(
  () => import('./hooks-utilities-sections/HookFeaturesSection')
);
const LiveDemonstrationsSection = lazy(
  () => import('./hooks-utilities-sections/LiveDemonstrationsSection')
);

export function HooksUtilities() {
  useAnchorScroll();

  // Table of contents items
  const tocItems: TableOfContentsItem[] = [
    { id: 'hook-features', label: 'Why Choose Our Hooks?' },
    { id: 'hook-categories', label: 'Hook Categories' },
    { id: 'live-demonstrations', label: 'Live Hook Demonstrations' },
    { id: 'hook-documentation', label: 'Hook Documentation' },
    { id: 'best-practices', label: 'Best Practices' },
  ];

  return (
    <div className="relative scroll-smooth">
      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
      {/* Hero Section */}
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

          {/* Lazy-loaded component sections */}
          <LazyComponentSection
            id="hook-features"
            component={HookFeaturesSection}
          />
          <LazyComponentSection
            id="hook-categories"
            component={HookCategoriesSection}
          />
          <LazyComponentSection
            id="live-demonstrations"
            component={LiveDemonstrationsSection}
          />
          <LazyComponentSection
            id="hook-documentation"
            component={HookDocumentationSection}
          />
          <LazyComponentSection
            id="best-practices"
            component={BestPracticesSection}
          />
        </div>
      </TableOfContents>
    </div>
  );
}

export default HooksUtilities;
