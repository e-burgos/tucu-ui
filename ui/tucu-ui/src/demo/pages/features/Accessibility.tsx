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
  () => import('./accessibility-sections/BestPracticesSection')
);
const CodeExamplesSection = lazy(
  () => import('./accessibility-sections/CodeExamplesSection')
);
const ComponentStatusSection = lazy(
  () => import('./accessibility-sections/ComponentStatusSection')
);
const ImplementedFeaturesSection = lazy(
  () => import('./accessibility-sections/ImplementedFeaturesSection')
);
const ImplementationStatusSection = lazy(
  () => import('./accessibility-sections/ImplementationStatusSection')
);
const KeyboardNavigationSection = lazy(
  () => import('./accessibility-sections/KeyboardNavigationSection')
);
const TestingSection = lazy(
  () => import('./accessibility-sections/TestingSection')
);
const WCAGPrinciplesSection = lazy(
  () => import('./accessibility-sections/WCAGPrinciplesSection')
);

export function Accessibility() {
  useAnchorScroll();

  // Table of contents items
  const tocItems: TableOfContentsItem[] = [
    { id: 'implementation-status', label: 'Implementation Status' },
    { id: 'wcag-principles', label: 'WCAG 2.1 AA Principles' },
    { id: 'implemented-features', label: 'Implemented Features' },
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
    { id: 'component-status', label: 'Component Accessibility Status' },
    { id: 'code-examples', label: 'Implementation Examples' },
    { id: 'testing', label: 'Accessibility Testing' },
    { id: 'best-practices', label: 'Best Practices' },
  ];

  return (
    <div className="relative scroll-smooth">
      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
      {/* Hero Section */}
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

          {/* Lazy-loaded component sections */}
          <LazyComponentSection
            id="implementation-status"
            component={ImplementationStatusSection}
          />
          <LazyComponentSection
            id="wcag-principles"
            component={WCAGPrinciplesSection}
          />
          <LazyComponentSection
            id="implemented-features"
            component={ImplementedFeaturesSection}
          />
          <LazyComponentSection
            id="keyboard-navigation"
            component={KeyboardNavigationSection}
          />
          <LazyComponentSection
            id="component-status"
            component={ComponentStatusSection}
          />
          <LazyComponentSection
            id="code-examples"
            component={CodeExamplesSection}
          />
          <LazyComponentSection id="testing" component={TestingSection} />
          <LazyComponentSection
            id="best-practices"
            component={BestPracticesSection}
                    />
                  </div>
      </TableOfContents>
    </div>
  );
}

export default Accessibility;
