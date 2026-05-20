import React, { lazy } from 'react';
import { LucideIcons, HeroCard } from '../../../index';
import { DynamicSectionsPage, type SectionConfig } from '../../components';

const sections: SectionConfig[] = [
  {
    id: 'architecture-overview',
    label: 'Architecture Overview',
    component: lazy(
      () => import('./form-system-sections/ArchitectureOverviewSection')
    ),
  },
  {
    id: 'basic-usage',
    label: 'Basic Usage',
    component: lazy(() => import('./form-system-sections/BasicUsageSection')),
  },
  {
    id: 'form-components',
    label: 'Form Components',
    component: lazy(
      () => import('./form-system-sections/FormComponentsSection')
    ),
  },
  {
    id: 'live-demo',
    label: 'Live Demo Form',
    component: lazy(() => import('./form-system-sections/LiveDemoSection')),
  },
  {
    id: 'validation-system',
    label: 'Validation System',
    component: lazy(
      () => import('./form-system-sections/ValidationSystemSection')
    ),
  },
  {
    id: 'form-methods',
    label: 'Form Methods',
    component: lazy(() => import('./form-system-sections/FormMethodsSection')),
  },
  {
    id: 'advanced-features',
    label: 'Advanced Features',
    component: lazy(
      () => import('./form-system-sections/AdvancedFeaturesSection')
    ),
  },
  {
    id: 'best-practices',
    label: 'Best Practices',
    component: lazy(
      () => import('./form-system-sections/BestPracticesSection')
    ),
  },
];

export function FormSystem() {
  return (
    <DynamicSectionsPage
      hideHeroInSubSections
      sections={sections}
      hero={
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
      }
    />
  );
}

export default FormSystem;
