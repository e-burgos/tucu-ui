import React, { lazy } from 'react';
import {
  LucideIcons,
  HeroCard,
  TableOfContents,
  type TableOfContentsItem,
  useAnchorScroll,
} from '../../../index';
import { LazyComponentSection } from '../../components';

// Lazy load component sections - Ordered by tocItems
const DesignPrinciplesSection = lazy(
  () => import('./design-system-sections/DesignPrinciplesSection')
);
const TypographySection = lazy(
  () => import('./design-system-sections/TypographySection')
);
const SpacingSystemSection = lazy(
  () => import('./design-system-sections/SpacingSystemSection')
);
const BorderRadiusSection = lazy(
  () => import('./design-system-sections/BorderRadiusSection')
);
const ColorSystemSection = lazy(
  () => import('./design-system-sections/ColorSystemSection')
);
const ComponentAnatomySection = lazy(
  () => import('./design-system-sections/ComponentAnatomySection')
);
const LayoutPrinciplesSection = lazy(
  () => import('./design-system-sections/LayoutPrinciplesSection')
);
const ShadowsSection = lazy(
  () => import('./design-system-sections/ShadowsSection')
);
const SizingSection = lazy(
  () => import('./design-system-sections/SizingSection')
);
const ImplementationGuidelinesSection = lazy(
  () => import('./design-system-sections/ImplementationGuidelinesSection')
);

export function DesignSystem() {
  useAnchorScroll();

  // Table of contents items
  const tocItems: TableOfContentsItem[] = [
    { id: 'design-principles', label: 'Design Principles' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing-system', label: 'Spacing System' },
    { id: 'border-radius', label: 'Border Radius' },
    { id: 'color-system', label: 'Color System' },
    { id: 'component-anatomy', label: 'Component Anatomy' },
    { id: 'layout-principles', label: 'Layout Principles' },
    { id: 'shadows', label: 'Shadows' },
    { id: 'sizing', label: 'Sizing' },
    { id: 'implementation-guidelines', label: 'Implementation Guidelines' },
  ];

  return (
    <div className="relative scroll-smooth">
      {/* Tailwind CSS v4 Safelist: Explicit color classes for dynamic generation */}
      {/* This hidden block ensures all color classes are detected by @source directive */}
      <div className="hidden">
        {/* Color spectrum classes - All shades for each color */}
        <div className="bg-blue-0 bg-blue-5 bg-blue-10 bg-blue-15 bg-blue-20 bg-blue-30 bg-blue-40 bg-blue-50 bg-blue-60 bg-blue-70 bg-blue-80 bg-blue-90 bg-blue-100 bg-green-0 bg-green-5 bg-green-10 bg-green-15 bg-green-20 bg-green-30 bg-green-40 bg-green-50 bg-green-60 bg-green-70 bg-green-80 bg-green-90 bg-green-100 bg-orange-0 bg-orange-5 bg-orange-10 bg-orange-15 bg-orange-20 bg-orange-30 bg-orange-40 bg-orange-50 bg-orange-60 bg-orange-70 bg-orange-80 bg-orange-90 bg-orange-100 bg-gray-0 bg-gray-5 bg-gray-10 bg-gray-15 bg-gray-20 bg-gray-30 bg-gray-40 bg-gray-50 bg-gray-60 bg-gray-70 bg-gray-80 bg-gray-90 bg-gray-100 bg-indigo-0 bg-indigo-5 bg-indigo-10 bg-indigo-15 bg-indigo-20 bg-indigo-30 bg-indigo-40 bg-indigo-50 bg-indigo-60 bg-indigo-70 bg-indigo-80 bg-indigo-90 bg-indigo-100 bg-pink-0 bg-pink-5 bg-pink-10 bg-pink-15 bg-pink-20 bg-pink-30 bg-pink-40 bg-pink-50 bg-pink-60 bg-pink-70 bg-pink-80 bg-pink-90 bg-pink-100 bg-purple-0 bg-purple-5 bg-purple-10 bg-purple-15 bg-purple-20 bg-purple-30 bg-purple-40 bg-purple-50 bg-purple-60 bg-purple-70 bg-purple-80 bg-purple-90 bg-purple-100 bg-red-0 bg-red-5 bg-red-10 bg-red-15 bg-red-20 bg-red-30 bg-red-40 bg-red-50 bg-red-60 bg-red-70 bg-red-80 bg-red-90 bg-red-100 bg-teal-0 bg-teal-5 bg-teal-10 bg-teal-15 bg-teal-20 bg-teal-30 bg-teal-40 bg-teal-50 bg-teal-60 bg-teal-70 bg-teal-80 bg-teal-90 bg-teal-100 bg-yellow-0 bg-yellow-5 bg-yellow-10 bg-yellow-15 bg-yellow-20 bg-yellow-30 bg-yellow-40 bg-yellow-50 bg-yellow-60 bg-yellow-70 bg-yellow-80 bg-yellow-90 bg-yellow-100 bg-chartreuse-0 bg-chartreuse-5 bg-chartreuse-10 bg-chartreuse-15 bg-chartreuse-20 bg-chartreuse-30 bg-chartreuse-40 bg-chartreuse-50 bg-chartreuse-60 bg-chartreuse-70 bg-chartreuse-80 bg-chartreuse-90 bg-chartreuse-100"></div>
        {/* Semantic color classes */}
        <div className="text-semantic-fg text-semantic-fg-muted text-semantic-fg-inverse text-semantic-fg-primary text-semantic-fg-warning text-semantic-fg-positive text-semantic-fg-negative bg-semantic-bg bg-semantic-bg-alternate bg-semantic-bg-inverse bg-semantic-bg-primary bg-semantic-bg-primary-wash bg-semantic-bg-secondary bg-semantic-bg-tertiary bg-semantic-bg-secondary-wash bg-semantic-bg-negative border-semantic-line-primary border-semantic-line-primary-subtle border-semantic-line-inverse bg-semantic-elevation-1 bg-semantic-elevation-2 bg-semantic-accent-subtle-green bg-semantic-accent-bold-green bg-semantic-accent-subtle-blue bg-semantic-accent-bold-blue bg-semantic-accent-subtle-purple bg-semantic-accent-bold-purple bg-semantic-accent-subtle-yellow bg-semantic-accent-bold-yellow bg-semantic-accent-subtle-red bg-semantic-accent-bold-red bg-semantic-accent-subtle-gray bg-semantic-accent-bold-gray bg-brand bg-primary bg-secondary bg-accent bg-muted bg-success bg-warning bg-error bg-info bg-body bg-dark bg-light bg-light-dark w-icon-xs h-icon-xs w-icon-s h-icon-s w-icon-m h-icon-m w-icon-l h-icon-l w-avatar-s h-avatar-s w-avatar-m h-avatar-m w-avatar-l h-avatar-l w-avatar-xl h-avatar-xl w-avatar-xxl h-avatar-xxl w-avatar-xxxl h-avatar-xxxl"></div>
        {/* Spacing utility classes */}
        <div className="p-0 p-1 p-2 p-3 p-4 p-5 p-6 p-7 p-8 p-9 p-10 p-11 p-12 p-13 p-14 p-15 p-16 p-17 p-18 p-19 p-20 m-0 m-1 m-2 m-3 m-4 m-5 m-6 m-7 m-8 m-9 m-10 m-11 m-12 m-13 m-14 m-15 m-16 m-17 m-18 m-19 m-20 gap-0 gap-1 gap-2 gap-3 gap-4 gap-5 gap-6 gap-7 gap-8 gap-9 gap-10 gap-11 gap-12 gap-13 gap-14 gap-15 gap-16 gap-17 gap-18 gap-19 gap-20"></div>
        {/* Border radius classes */}
        <div className="rounded-0 rounded-100 rounded-200 rounded-300 rounded-400 rounded-500 rounded-600 rounded-700 rounded-800 rounded-900 rounded-1000"></div>
      </div>

      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
          {/* Hero Section */}
          <HeroCard
            title="Design System"
            description="A comprehensive design system that ensures consistency, accessibility, and scalability across all components and applications."
            githubButton
            getStartedButton
            docsButton="design-system"
            icon={
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
                <LucideIcons.Palette className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
              </div>
            }
          />

          {/* Lazy-loaded component sections */}
          <LazyComponentSection
            id="design-principles"
            component={DesignPrinciplesSection}
          />
          <LazyComponentSection id="typography" component={TypographySection} />
          <LazyComponentSection
            id="spacing-system"
            component={SpacingSystemSection}
          />
          <LazyComponentSection
            id="border-radius"
            component={BorderRadiusSection}
          />
          <LazyComponentSection
            id="color-system"
            component={ColorSystemSection}
          />
          <LazyComponentSection
            id="component-anatomy"
            component={ComponentAnatomySection}
          />
          <LazyComponentSection
            id="layout-principles"
            component={LayoutPrinciplesSection}
          />
          <LazyComponentSection id="shadows" component={ShadowsSection} />
          <LazyComponentSection id="sizing" component={SizingSection} />
          <LazyComponentSection
            id="implementation-guidelines"
            component={ImplementationGuidelinesSection}
          />
        </div>
      </TableOfContents>
    </div>
  );
}

export default DesignSystem;
