import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  HeroCard,
} from '../../../index';

export function FlexboxGridUtilities() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      {/* Hero Section */}
      <HeroCard
        title="Flexbox & Grid Utilities"
        description="Complete guide to Flexbox and CSS Grid utilities in Tailwind CSS v4. Master modern layout techniques with comprehensive examples."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
            <LucideIcons.Grid3X3 className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Flexbox Architecture */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Flexbox & Grid Architecture
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Powerful layout systems built with Tailwind CSS v4 @source
            directives
          </Typography>
        </div>

        {/* 1. FLEXBOX BASICS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Flexbox Basics
          </Typography>

          {/* Flex Direction */}
          <CardContainer>
            <CardTitle title="Flex Direction">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control the direction of flex items
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-row gap-2 p-3 bg-light-dark rounded">
                      <div className="w-8 h-8 bg-brand rounded"></div>
                      <div className="w-8 h-8 bg-green-500 rounded"></div>
                      <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    </div>
                    <div className="text-xs text-center">flex-row</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-row-reverse gap-2 p-3 bg-light-dark rounded">
                      <div className="w-8 h-8 bg-brand rounded"></div>
                      <div className="w-8 h-8 bg-green-500 rounded"></div>
                      <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    </div>
                    <div className="text-xs text-center">flex-row-reverse</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col gap-2 p-3 bg-light-dark rounded h-32">
                      <div className="w-8 h-8 bg-brand rounded"></div>
                      <div className="w-8 h-8 bg-green-500 rounded"></div>
                      <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    </div>
                    <div className="text-xs text-center">flex-col</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col-reverse gap-2 p-3 bg-light-dark rounded h-32">
                      <div className="w-8 h-8 bg-brand rounded"></div>
                      <div className="w-8 h-8 bg-green-500 rounded"></div>
                      <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    </div>
                    <div className="text-xs text-center">flex-col-reverse</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Flex Wrap */}
          <CardContainer>
            <CardTitle title="Flex Wrap">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control how flex items wrap
                </Typography>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 p-3 bg-light-dark rounded max-w-xs">
                      {Array.from({ length: 8 }, (_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 bg-brand rounded shrink-0"
                        ></div>
                      ))}
                    </div>
                    <div className="text-xs text-center">flex-wrap</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-nowrap gap-2 p-3 bg-light-dark rounded overflow-hidden max-w-xs">
                      {Array.from({ length: 8 }, (_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 bg-green-500 rounded shrink-0"
                        ></div>
                      ))}
                    </div>
                    <div className="text-xs text-center">flex-nowrap</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Flex Properties */}
          <CardContainer>
            <CardTitle title="Flex Properties">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control flex grow, shrink, and basis
                </Typography>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex gap-2 p-3 bg-light-dark rounded">
                      <div className="flex-1 w-8 h-8 bg-brand rounded text-center text-xs text-white flex items-center justify-center">
                        1
                      </div>
                      <div className="flex-none w-8 h-8 bg-green-500 rounded"></div>
                      <div className="flex-auto w-8 h-8 bg-blue-500 rounded text-center text-xs text-white flex items-center justify-center">
                        auto
                      </div>
                    </div>
                    <div className="text-xs text-center">
                      flex-1 + flex-none + flex-auto
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-2 p-3 bg-light-dark rounded">
                      <div className="flex-grow w-8 h-8 bg-purple-500 rounded text-center text-xs text-white flex items-center justify-center">
                        grow
                      </div>
                      <div className="flex-grow-0 w-8 h-8 bg-pink-500 rounded text-center text-xs text-white flex items-center justify-center">
                        grow-0
                      </div>
                    </div>
                    <div className="text-xs text-center">
                      flex-grow + flex-grow-0
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Order */}
          <CardContainer>
            <CardTitle title="Order">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control the order of flex items
                </Typography>
                <div className="space-y-2">
                  <div className="flex gap-2 p-3 bg-light-dark rounded">
                    <div className="order-3 w-8 h-8 bg-red-500 rounded text-center text-xs text-white flex items-center justify-center">
                      3
                    </div>
                    <div className="order-1 w-8 h-8 bg-green-500 rounded text-center text-xs text-white flex items-center justify-center">
                      1
                    </div>
                    <div className="order-2 w-8 h-8 bg-blue-500 rounded text-center text-xs text-white flex items-center justify-center">
                      2
                    </div>
                  </div>
                  <div className="text-xs text-center">
                    order-3 + order-1 + order-2
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 2. GRID BASICS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Grid Basics
          </Typography>

          {/* Grid Template Columns */}
          <CardContainer>
            <CardTitle title="Grid Template Columns">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Define the number of columns in a grid
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 p-3 bg-light-dark rounded">
                      {Array.from({ length: 4 }, (_, i) => (
                        <div
                          key={i}
                          className="h-8 bg-brand rounded text-center text-xs text-white flex items-center justify-center"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-center">grid-cols-2</div>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2 p-3 bg-light-dark rounded">
                      {Array.from({ length: 6 }, (_, i) => (
                        <div
                          key={i}
                          className="h-8 bg-green-500 rounded text-center text-xs text-white flex items-center justify-center"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-center">grid-cols-3</div>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-2 p-3 bg-light-dark rounded">
                      {Array.from({ length: 8 }, (_, i) => (
                        <div
                          key={i}
                          className="h-8 bg-blue-500 rounded text-center text-xs text-white flex items-center justify-center"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-center">grid-cols-4</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Grid Column Span */}
          <CardContainer>
            <CardTitle title="Grid Column Span">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Make items span multiple columns
                </Typography>
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2 p-3 bg-light-dark rounded">
                    <div className="col-span-2 h-8 bg-brand rounded text-center text-xs text-white flex items-center justify-center">
                      span-2
                    </div>
                    <div className="h-8 bg-green-500 rounded text-center text-xs text-white flex items-center justify-center">
                      1
                    </div>
                    <div className="h-8 bg-blue-500 rounded text-center text-xs text-white flex items-center justify-center">
                      2
                    </div>
                    <div className="col-span-3 h-8 bg-purple-500 rounded text-center text-xs text-white flex items-center justify-center">
                      span-3
                    </div>
                    <div className="h-8 bg-pink-500 rounded text-center text-xs text-white flex items-center justify-center">
                      3
                    </div>
                  </div>
                  <div className="text-xs text-center">
                    col-span-2 + col-span-3
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Grid Auto Flow */}
          <CardContainer>
            <CardTitle title="Grid Auto Flow">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control how grid items are placed automatically
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="grid grid-flow-row grid-cols-3 gap-2 p-3 bg-light-dark rounded h-32">
                      {Array.from({ length: 6 }, (_, i) => (
                        <div
                          key={i}
                          className="h-8 bg-brand rounded text-center text-xs text-white flex items-center justify-center"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-center">grid-flow-row</div>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-flow-col grid-cols-3 gap-2 p-3 bg-light-dark rounded h-32">
                      {Array.from({ length: 6 }, (_, i) => (
                        <div
                          key={i}
                          className="h-8 bg-green-500 rounded text-center text-xs text-white flex items-center justify-center"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-center">grid-flow-col</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 3. ALIGNMENT & JUSTIFICATION */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Alignment & Justification
          </Typography>

          {/* Justify Content */}
          <CardContainer>
            <CardTitle title="Justify Content (Main Axis)">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control alignment along the main axis
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-start gap-2 p-3 bg-light-dark rounded">
                      <div className="w-6 h-6 bg-brand rounded"></div>
                      <div className="w-6 h-6 bg-green-500 rounded"></div>
                      <div className="w-6 h-6 bg-blue-500 rounded"></div>
                    </div>
                    <div className="text-xs text-center">justify-start</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-center gap-2 p-3 bg-light-dark rounded">
                      <div className="w-6 h-6 bg-brand rounded"></div>
                      <div className="w-6 h-6 bg-green-500 rounded"></div>
                      <div className="w-6 h-6 bg-blue-500 rounded"></div>
                    </div>
                    <div className="text-xs text-center">justify-center</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-end gap-2 p-3 bg-light-dark rounded">
                      <div className="w-6 h-6 bg-brand rounded"></div>
                      <div className="w-6 h-6 bg-green-500 rounded"></div>
                      <div className="w-6 h-6 bg-blue-500 rounded"></div>
                    </div>
                    <div className="text-xs text-center">justify-end</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between gap-2 p-3 bg-light-dark rounded">
                      <div className="w-6 h-6 bg-brand rounded"></div>
                      <div className="w-6 h-6 bg-green-500 rounded"></div>
                      <div className="w-6 h-6 bg-blue-500 rounded"></div>
                    </div>
                    <div className="text-xs text-center">justify-between</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Align Items */}
          <CardContainer>
            <CardTitle title="Align Items (Cross Axis)">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control alignment along the cross axis
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 p-3 bg-light-dark rounded h-20">
                      <div className="w-6 h-12 bg-brand rounded"></div>
                      <div className="w-6 h-8 bg-green-500 rounded"></div>
                      <div className="w-6 h-16 bg-blue-500 rounded"></div>
                    </div>
                    <div className="text-xs text-center">items-start</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-3 bg-light-dark rounded h-20">
                      <div className="w-6 h-12 bg-brand rounded"></div>
                      <div className="w-6 h-8 bg-green-500 rounded"></div>
                      <div className="w-6 h-16 bg-blue-500 rounded"></div>
                    </div>
                    <div className="text-xs text-center">items-center</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-end gap-2 p-3 bg-light-dark rounded h-20">
                      <div className="w-6 h-12 bg-brand rounded"></div>
                      <div className="w-6 h-8 bg-green-500 rounded"></div>
                      <div className="w-6 h-16 bg-blue-500 rounded"></div>
                    </div>
                    <div className="text-xs text-center">items-end</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Gap */}
          <CardContainer>
            <CardTitle title="Gap (Spacing)">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control spacing between grid/flex items
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-1 p-3 bg-light-dark rounded">
                      <div className="w-6 h-6 bg-brand rounded"></div>
                      <div className="w-6 h-6 bg-green-500 rounded"></div>
                      <div className="w-6 h-6 bg-blue-500 rounded"></div>
                      <div className="w-6 h-6 bg-purple-500 rounded"></div>
                      <div className="w-6 h-6 bg-pink-500 rounded"></div>
                      <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                    </div>
                    <div className="text-xs text-center">gap-1</div>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-4 p-3 bg-light-dark rounded">
                      <div className="w-6 h-6 bg-brand rounded"></div>
                      <div className="w-6 h-6 bg-green-500 rounded"></div>
                      <div className="w-6 h-6 bg-blue-500 rounded"></div>
                      <div className="w-6 h-6 bg-purple-500 rounded"></div>
                      <div className="w-6 h-6 bg-pink-500 rounded"></div>
                      <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                    </div>
                    <div className="text-xs text-center">gap-4</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>
      </section>
    </div>
  );
}
