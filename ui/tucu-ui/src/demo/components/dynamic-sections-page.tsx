import React, { Suspense, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Skeleton, Typography, LucideIcons, CardContainer } from '../../index';
import { TableOfContents, type TableOfContentsItem } from './table-of-contents';

// ─── Types ─────────────────────────────────────────────────────

export interface SectionConfig {
  /** Unique identifier (kebab-case), used in URL path */
  id: string;
  /** Display label for the TOC item */
  label: string;
  /** Optional category for grouping in the TOC sidebar */
  category?: string;
  /** Lazy-loaded section component */
  component: React.LazyExoticComponent<
    React.ComponentType<Record<string, never>>
  >;
}

export interface DynamicSectionsPageProps {
  /** Array of section configurations */
  sections: SectionConfig[];
  /** Hero card or intro content shown at the top */
  hero: React.ReactNode;
  /** Title for the table of contents sidebar */
  tocTitle?: string;
  /** Optional placeholder when no section is selected (defaults to a sections grid) */
  placeholder?: React.ReactNode;
}

// ─── Hook: useDynamicSection ───────────────────────────────────

/**
 * Hook that extracts the current section from the URL wildcard param
 * and provides navigation helpers.
 *
 * Requires the parent route to be registered with `enableNestedRoutes: true`
 * (which appends /* to the route path).
 */
export function useDynamicSection(sectionIds: string[]) {
  const location = useLocation();
  const navigate = useNavigate();
  const { '*': wildcard } = useParams();

  const sectionId = useMemo(() => {
    const id = wildcard?.replace(/^\/+|\/+$/g, '') || '';
    return sectionIds.includes(id) ? id : undefined;
  }, [wildcard, sectionIds]);

  const basePath = useMemo(() => {
    if (sectionId) {
      return location.pathname.slice(0, -(sectionId.length + 1));
    }
    return location.pathname.replace(/\/+$/, '');
  }, [location.pathname, sectionId]);

  const navigateToSection = useCallback(
    (id: string) => {
      navigate(`${basePath}/${id}`);
      // Scroll to top when navigating to a new section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate, basePath]
  );

  const navigateToBase = useCallback(() => {
    navigate(basePath);
  }, [navigate, basePath]);

  return { sectionId, basePath, navigateToSection, navigateToBase };
}

// ─── Section Skeleton ──────────────────────────────────────────

const SectionSkeleton: React.FC = () => (
  <div className="space-y-8">
    <div className="text-center space-y-4">
      <Skeleton className="h-10 w-64 mx-auto" />
      <Skeleton className="h-6 w-96 mx-auto" />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);

// ─── Sections Grid (default placeholder) ──────────────────────

interface SectionsGridProps {
  sections: SectionConfig[];
  onSectionClick: (id: string) => void;
}

const SectionsGrid: React.FC<SectionsGridProps> = ({
  sections,
  onSectionClick,
}) => {
  // Group by category
  const grouped = useMemo(() => {
    const groups: Record<string, SectionConfig[]> = {};
    sections.forEach((s) => {
      const cat = s.category || 'General';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(s);
    });
    return groups;
  }, [sections]);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <Typography tag="h3" className="text-2xl font-bold">
          Browse Components
        </Typography>
        <Typography tag="p" className="text-gray-500 dark:text-gray-400">
          Select a component from the sidebar or click below to explore.
        </Typography>
      </div>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="space-y-3">
          <Typography
            tag="h4"
            className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
          >
            {category}
          </Typography>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {items.map((item) => (
              <CardContainer key={item.id}>
                <button
                  onClick={() => onSectionClick(item.id)}
                  className="w-full p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg group"
                >
                  <div className="flex items-center gap-2">
                    <LucideIcons.ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand transition-colors" />
                    <Typography
                      tag="span"
                      className="text-sm font-medium group-hover:text-brand transition-colors"
                    >
                      {item.label}
                    </Typography>
                  </div>
                </button>
              </CardContainer>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── DynamicSectionsPage Component ─────────────────────────────

/**
 * Generic page component that renders a TOC sidebar + a single section
 * based on the current URL. Each section gets its own route/page.
 *
 * Usage:
 * ```tsx
 * const sections: SectionConfig[] = [
 *   { id: 'button', label: 'Button', category: 'Buttons', component: lazy(() => import('./ButtonSection')) },
 * ];
 * <DynamicSectionsPage sections={sections} hero={<HeroCard ... />} />
 * ```
 */
export const DynamicSectionsPage: React.FC<DynamicSectionsPageProps> = ({
  sections,
  hero,
  tocTitle = 'Table of Contents',
  placeholder,
}) => {
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);

  const { sectionId, navigateToSection } = useDynamicSection(sectionIds);

  const tocItems: TableOfContentsItem[] = useMemo(
    () => sections.map(({ id, label, category }) => ({ id, label, category })),
    [sections]
  );

  const SectionComponent = useMemo(() => {
    if (!sectionId) return null;
    return sections.find((s) => s.id === sectionId)?.component ?? null;
  }, [sectionId, sections]);

  return (
    <div className="relative scroll-smooth">
      <TableOfContents
        items={tocItems}
        title={tocTitle}
        navigationMode="route"
        activeSectionId={sectionId}
        onItemClick={(item) => navigateToSection(item.id)}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
          {/* Hero Section - always visible */}
          {hero}

          {/* Section Content or Placeholder */}
          {SectionComponent ? (
            <Suspense fallback={<SectionSkeleton />}>
              <SectionComponent />
            </Suspense>
          ) : (
            placeholder ?? (
              <SectionsGrid
                sections={sections}
                onSectionClick={navigateToSection}
              />
            )
          )}
        </div>
      </TableOfContents>
    </div>
  );
};

export default DynamicSectionsPage;
