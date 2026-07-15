import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

const DocumentationSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="DataTable Documentation"
        description="A comprehensive reference guide for DataTable components in tucu-ui. Learn how to configure sorting, pagination, pinning, state persistence, and customized row details."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Introduction">
          <Typography className="text-sm text-foreground/70 mb-4">
            The <code>DataTable</code> component is a powerful, highly-configurable table wrapper built on top of <strong>@tanstack/react-table</strong>. It incorporates advanced UI features tailored for dashboard structures while maintaining lightweight bundle profiles.
          </Typography>
          <Typography className="text-sm text-foreground/70">
            It natively handles column adjustments (resizing, ordering), row selections (single/multi), custom cell rendering, background fetching states, manual (server-side) or client-side pagination, and automatic persistence of the table configuration inside local storage via Zustand.
          </Typography>
        </CardTitle>
      </CardContainer>

      <section className="space-y-6">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Key Features
          </Typography>
          <Typography tag="p" className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Packed with enterprise-grade capabilities out-of-the-box
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardContainer className="p-5">
            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-500">
                <LucideIcons.FolderHeart className="w-6 h-6" />
              </div>
              <div>
                <Typography tag="h5" className="font-semibold mb-1">State Persistence</Typography>
                <Typography className="text-xs text-foreground/60">
                  Zustand state integration automatically remembers pagination size, sorting parameters, column visibility configurations, pinning states, and column order parameters.
                </Typography>
              </div>
            </div>
          </CardContainer>

          <CardContainer className="p-5">
            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-purple-500/10 rounded-lg text-purple-500">
                <LucideIcons.MoveHorizontal className="w-6 h-6" />
              </div>
              <div>
                <Typography tag="h5" className="font-semibold mb-1">Column Resizing & Reordering</Typography>
                <Typography className="text-xs text-foreground/60">
                  Allow users to drag column boundaries to adjust their size, or drag headers laterally to re-order the columns.
                </Typography>
              </div>
            </div>
          </CardContainer>

          <CardContainer className="p-5">
            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-pink-500/10 rounded-lg text-pink-500">
                <LucideIcons.Pin className="w-6 h-6" />
              </div>
              <div>
                <Typography tag="h5" className="font-semibold mb-1">Column Pinning</Typography>
                <Typography className="text-xs text-foreground/60">
                  Pin critical columns (such as identifier or status) permanently to the left or right boundaries while scrolling horizontally.
                </Typography>
              </div>
            </div>
          </CardContainer>

          <CardContainer className="p-5">
            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-500">
                <LucideIcons.FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <Typography tag="h5" className="font-semibold mb-1">Sub-component Expanding</Typography>
                <Typography className="text-xs text-foreground/60">
                  Drill down on details for any record by expanding rows to show sub-panels, charts, or nested tables in place.
                </Typography>
              </div>
            </div>
          </CardContainer>
        </div>
      </section>

      {/* ─── Auto Generated Props ─────────────────────────────────── */}
      <AutoPropsTable componentName="DataTable" showFilePath={true} />
    </div>
  );
};

export default DocumentationSection;
