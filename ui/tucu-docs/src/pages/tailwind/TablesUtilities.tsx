import {
  BasicTable,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  HeroCard,
} from '@e-burgos/tucu-ui';

export function TablesUtilities() {
  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="Tables Utilities"
        description="Complete guide to table styling utilities in Tailwind CSS v4. Master table layout, borders, and spacing."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-emerald-500 via-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Table className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Table Layout & Styling
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Professional table utilities built with Tailwind CSS v4 @source
            directives
          </Typography>
        </div>

        <CardContainer>
          <CardTitle title="Border Collapse & Spacing">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Control table border behavior and cell spacing
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Typography tag="h4" className="text-sm font-medium">
                    Border Collapse
                  </Typography>
                  <BasicTable
                    columns={[
                      { key: 'col1', label: 'Header 1' },
                      { key: 'col2', label: 'Header 2' },
                    ]}
                    data={[{ col1: 'Cell 1', col2: 'Cell 2' }]}
                    border
                    resizable={false}
                  />
                  <div className="text-xs text-center">border-collapse</div>
                </div>
                <div className="space-y-2">
                  <Typography tag="h4" className="text-sm font-medium">
                    Border Separate
                  </Typography>
                  <BasicTable
                    columns={[
                      { key: 'col1', label: 'Header 1' },
                      { key: 'col2', label: 'Header 2' },
                    ]}
                    data={[{ col1: 'Cell 1', col2: 'Cell 2' }]}
                    border
                    resizable={false}
                    tableClassName="border-separate border-spacing-2"
                  />
                  <div className="text-xs text-center">
                    border-separate border-spacing-2
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Table Layout & Caption">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Control table layout behavior and caption positioning
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Typography tag="h4" className="text-sm font-medium">
                    Auto Layout
                  </Typography>
                  <BasicTable
                    columns={[
                      { key: 'col1', label: 'Column 1' },
                      { key: 'col2', label: 'Column 2' },
                      { key: 'col3', label: 'Column 3' },
                    ]}
                    data={[{ col1: 'Data 1', col2: 'Data 2', col3: 'Data 3' }]}
                    border
                    resizable={false}
                    tableClassName="table-auto"
                  />
                  <div className="text-xs text-center">
                    table-auto + caption-top
                  </div>
                </div>
                <div className="space-y-2">
                  <Typography tag="h4" className="text-sm font-medium">
                    Fixed Layout
                  </Typography>
                  <BasicTable
                    columns={[
                      { key: 'col1', label: 'Column 1' },
                      { key: 'col2', label: 'Column 2' },
                      { key: 'col3', label: 'Column 3' },
                    ]}
                    data={[
                      {
                        col1: 'Fixed width',
                        col2: 'Fixed width',
                        col3: 'Fixed width',
                      },
                    ]}
                    border
                    resizable={false}
                    tableClassName="table-fixed"
                  />
                  <div className="text-xs text-center">
                    table-fixed + caption-bottom
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
