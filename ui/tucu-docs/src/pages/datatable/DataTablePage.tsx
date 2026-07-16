import { lazy } from 'react';
import { LucideIcons, HeroCard } from '@e-burgos/tucu-ui';
import { DynamicSectionsPage, type SectionConfig } from '@e-burgos/tucu-ui';

const sections: SectionConfig[] = [
  { id: 'documentation', label: 'General Documentation', component: lazy(() => import('./datatable-sections/DocumentationSection')) },
  { id: 'columns', label: 'Columns Configuration', component: lazy(() => import('./datatable-sections/ColumnsSection')) },
  { id: 'fetching', label: 'Data Fetching & Pagination', component: lazy(() => import('./datatable-sections/DataFetchingSection')) },
  { id: 'search', label: 'Global Search', component: lazy(() => import('./datatable-sections/SearchSection')) },
  { id: 'examples', label: 'Usage Examples', component: lazy(() => import('./datatable-sections/ExamplesSection')) },
  { id: 'playground', label: 'Playground', component: lazy(() => import('./datatable-sections/PlaygroundSection')) },
];

export function DataTablePage() {
  return (
    <DynamicSectionsPage
      hideHeroInSubSections
      sections={sections}
      hero={
        <HeroCard
          title="DataTable Hub"
          description="A comprehensive documentation hub for the tucu-ui DataTable component. Explore specifications, practical use cases, or experiment directly with its properties in the interactive playground."
          githubButton
          getStartedButton
          docsButton="introduction"
          icon={
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border border-indigo-500/50">
              <LucideIcons.Table className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default DataTablePage;
