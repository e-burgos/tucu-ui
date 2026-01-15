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
const AdvancedFeaturesSection = lazy(
  () => import('./form-system-sections/AdvancedFeaturesSection')
);
const ArchitectureOverviewSection = lazy(
  () => import('./form-system-sections/ArchitectureOverviewSection')
);
const BasicUsageSection = lazy(
  () => import('./form-system-sections/BasicUsageSection')
);
const BestPracticesSection = lazy(
  () => import('./form-system-sections/BestPracticesSection')
);
const FormComponentsSection = lazy(
  () => import('./form-system-sections/FormComponentsSection')
);
const FormMethodsSection = lazy(
  () => import('./form-system-sections/FormMethodsSection')
);
const LiveDemoSection = lazy(
  () => import('./form-system-sections/LiveDemoSection')
);
const ValidationSystemSection = lazy(
  () => import('./form-system-sections/ValidationSystemSection')
);

export function FormSystem() {
  useAnchorScroll();

  // Table of contents items
  const tocItems: TableOfContentsItem[] = [
    { id: 'architecture-overview', label: 'Architecture Overview' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'form-components', label: 'Form Components' },
    { id: 'live-demo', label: 'Live Demo Form' },
    { id: 'validation-system', label: 'Validation System' },
    { id: 'form-methods', label: 'Form Methods' },
    { id: 'advanced-features', label: 'Advanced Features' },
    { id: 'best-practices', label: 'Best Practices' },
  ];

  return (
    <div className="relative scroll-smooth">
      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
          {/* Hero Section */}
          <HeroCard
            title="Form System"
            description="Comprehensive form handling built on React Hook Form with powerful validation, state management, and excellent developer experience."
            githubButton
            getStartedButton
            docsButton="form-system"
            icon={
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
                <LucideIcons.FileText className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
              </div>
            }
          />

          {/* Lazy-loaded component sections */}
          <LazyComponentSection
            id="architecture-overview"
            component={ArchitectureOverviewSection}
          />
          <LazyComponentSection
            id="basic-usage"
            component={BasicUsageSection}
          />
          <LazyComponentSection
            id="form-components"
            component={FormComponentsSection}
          />
          <LazyComponentSection id="live-demo" component={LiveDemoSection} />
          <LazyComponentSection
            id="validation-system"
            component={ValidationSystemSection}
          />
          <LazyComponentSection
            id="form-methods"
            component={FormMethodsSection}
          />
          <LazyComponentSection
            id="advanced-features"
            component={AdvancedFeaturesSection}
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

export default FormSystem;
