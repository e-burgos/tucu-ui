import { CardContainer, CardTitle, Typography, LucideIcons } from 'tucu-ui';

import HeroPage from '../../components/HeroPage';

export function TablesUtilities() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <HeroPage
        title="Tables Utilities"
        description="Complete guide to table styling utilities in Tailwind CSS v4. Master table layout, borders, and spacing."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg border border-emerald-500/50">
            <LucideIcons.Table className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Table Layout & Styling
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
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
                  <table className="border-collapse border border-gray-300 w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Header 1
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Header 2
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Cell 1
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Cell 2
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-xs text-center">border-collapse</div>
                </div>
                <div className="space-y-2">
                  <Typography tag="h4" className="text-sm font-medium">
                    Border Separate
                  </Typography>
                  <table className="border-separate border-spacing-2 border border-gray-300 w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Header 1
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Header 2
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Cell 1
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Cell 2
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                  <table className="table-auto border-collapse border border-gray-300 w-full">
                    <caption className="caption-top text-sm font-medium mb-2">
                      Table Caption (Top)
                    </caption>
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Column 1
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Column 2
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Column 3
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Data 1
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Data 2
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Data 3
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-xs text-center">
                    table-auto + caption-top
                  </div>
                </div>
                <div className="space-y-2">
                  <Typography tag="h4" className="text-sm font-medium">
                    Fixed Layout
                  </Typography>
                  <table className="table-fixed border-collapse border border-gray-300 w-full">
                    <caption className="caption-bottom text-sm font-medium mt-2">
                      Table Caption (Bottom)
                    </caption>
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left w-1/3">
                          Column 1
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left w-1/3">
                          Column 2
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left w-1/3">
                          Column 3
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Fixed width
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Fixed width
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Fixed width
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
