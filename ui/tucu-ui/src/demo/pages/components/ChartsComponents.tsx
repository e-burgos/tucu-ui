import React, { lazy } from 'react';
import { LucideIcons, HeroCard } from '../../../index';
import { DynamicSectionsPage, type SectionConfig } from '../../components';

// ─── Section definitions (lazy-loaded) ─────────────────────────

const sections: SectionConfig[] = [
  {
    id: 'line-chart',
    label: 'LineChart',
    category: 'Charts',
    component: lazy(() => import('./charts-sections/LineChartSection')),
  },
  {
    id: 'bar-chart',
    label: 'BarChart',
    category: 'Charts',
    component: lazy(() => import('./charts-sections/BarChartSection')),
  },
  {
    id: 'area-chart',
    label: 'AreaChart',
    category: 'Charts',
    component: lazy(() => import('./charts-sections/AreaChartSection')),
  },
  {
    id: 'pie-chart',
    label: 'PieChart',
    category: 'Charts',
    component: lazy(() => import('./charts-sections/PieChartSection')),
  },
  {
    id: 'radar-chart',
    label: 'RadarChart',
    category: 'Charts',
    component: lazy(() => import('./charts-sections/RadarChartSection')),
  },
  {
    id: 'composed-chart',
    label: 'ComposedChart',
    category: 'Charts',
    component: lazy(() => import('./charts-sections/ComposedChartSection')),
  },
];

// ─── Page Component ────────────────────────────────────────────

export function ChartsComponents() {
  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="Charts"
          description="Data visualization components built on Recharts with automatic dark/light theme integration, responsive design, and a consistent API across all chart types."
          githubButton
          getStartedButton
          docsButton="introduction"
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg border border-emerald-500/50">
              <LucideIcons.BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default ChartsComponents;
