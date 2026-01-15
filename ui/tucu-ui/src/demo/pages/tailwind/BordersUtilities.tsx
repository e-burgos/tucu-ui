import { CardContainer, CardTitle, Typography, HeroCard } from '../../../index';

export function BordersUtilities() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      {/* Hero Section */}
      <HeroCard
        title="Borders Utilities"
        description="Complete guide to border and outline utilities in Tailwind CSS v4. Master border radius, width, colors, styles, and outline properties."
        githubButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500/50">
            <div className="w-16 h-16 bg-white/20 rounded-lg border-4 border-white/60 flex items-center justify-center">
              <div className="w-8 h-8 bg-white/40 rounded border-2 border-white/80"></div>
            </div>
          </div>
        }
      />

      {/* Borders Architecture */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Border & Outline Styling
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Professional border and outline utilities built with Tailwind CSS v4
            @source directives
          </Typography>
        </div>

        {/* 1. BORDER RADIUS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Border Radius
          </Typography>

          <CardContainer>
            <CardTitle title="Border Radius Sizes">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control corner rounding with different radius sizes
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-brand flex items-center justify-center rounded-none">
                      <span className="text-xs text-white font-medium">
                        rounded-none
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-green-500 flex items-center justify-center rounded-sm">
                      <span className="text-xs text-white font-medium">
                        rounded-sm
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-blue-500 flex items-center justify-center rounded">
                      <span className="text-xs text-white font-medium">
                        rounded
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-purple-500 flex items-center justify-center rounded-md">
                      <span className="text-xs text-white font-medium">
                        rounded-md
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-pink-500 flex items-center justify-center rounded-lg">
                      <span className="text-xs text-white font-medium">
                        rounded-lg
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-indigo-500 flex items-center justify-center rounded-xl">
                      <span className="text-xs text-white font-medium">
                        rounded-xl
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-red-500 flex items-center justify-center rounded-2xl">
                      <span className="text-xs text-white font-medium">
                        rounded-2xl
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-yellow-500 flex items-center justify-center rounded-full">
                      <span className="text-xs text-black font-medium">
                        rounded-full
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle title="Directional Border Radius">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Apply radius to specific sides independently
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-t-lg">
                      <span className="text-xs font-medium">rounded-t-lg</span>
                    </div>
                    <div className="text-xs text-center">Top only</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-r-lg">
                      <span className="text-xs font-medium">rounded-r-lg</span>
                    </div>
                    <div className="text-xs text-center">Right only</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-b-lg">
                      <span className="text-xs font-medium">rounded-b-lg</span>
                    </div>
                    <div className="text-xs text-center">Bottom only</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-l-lg">
                      <span className="text-xs font-medium">rounded-l-lg</span>
                    </div>
                    <div className="text-xs text-center">Left only</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 2. BORDER WIDTH */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Border Width
          </Typography>

          <CardContainer>
            <CardTitle title="Border Width Sizes">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control border thickness with different width values
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 border-0 flex items-center justify-center border-gray-400">
                      <span className="text-xs font-medium">border-0</span>
                    </div>
                    <div className="text-xs text-center">No border</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 border-2 flex items-center justify-center border-brand">
                      <span className="text-xs font-medium">border-2</span>
                    </div>
                    <div className="text-xs text-center">2px border</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 border-4 flex items-center justify-center border-green-500">
                      <span className="text-xs font-medium">border-4</span>
                    </div>
                    <div className="text-xs text-center">4px border</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 border-8 flex items-center justify-center border-blue-500">
                      <span className="text-xs font-medium">border-8</span>
                    </div>
                    <div className="text-xs text-center">8px border</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle title="Directional Border Width">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Apply different border widths to specific sides
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 border-t-4 border-brand flex items-center justify-center">
                      <span className="text-xs font-medium">border-t-4</span>
                    </div>
                    <div className="text-xs text-center">Top border</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 border-r-4 border-green-500 flex items-center justify-center">
                      <span className="text-xs font-medium">border-r-4</span>
                    </div>
                    <div className="text-xs text-center">Right border</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 border-b-4 border-blue-500 flex items-center justify-center">
                      <span className="text-xs font-medium">border-b-4</span>
                    </div>
                    <div className="text-xs text-center">Bottom border</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 border-l-4 border-purple-500 flex items-center justify-center">
                      <span className="text-xs font-medium">border-l-4</span>
                    </div>
                    <div className="text-xs text-center">Left border</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 3. BORDER COLORS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Border Colors
          </Typography>

          <CardContainer>
            <CardTitle title="Border Color Palette">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Apply different colors to borders using semantic color
                  utilities
                </Typography>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 border-4 border-brand rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-brand">
                      Brand
                    </span>
                  </div>
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 border-4 border-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-red-500">
                      Red
                    </span>
                  </div>
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 border-4 border-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-green-500">
                      Green
                    </span>
                  </div>
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 border-4 border-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-500">
                      Blue
                    </span>
                  </div>
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 border-4 border-gray-400 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      Gray
                    </span>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 4. BORDER STYLES */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Border Styles
          </Typography>

          <CardContainer>
            <CardTitle title="Border Style Types">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Different border appearance styles beyond solid lines
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 border-4 border-solid border-brand flex items-center justify-center">
                      <span className="text-xs font-medium">border-solid</span>
                    </div>
                    <div className="text-xs text-center">Solid</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 border-4 border-dashed border-green-500 flex items-center justify-center">
                      <span className="text-xs font-medium">border-dashed</span>
                    </div>
                    <div className="text-xs text-center">Dashed</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 border-4 border-dotted border-blue-500 flex items-center justify-center">
                      <span className="text-xs font-medium">border-dotted</span>
                    </div>
                    <div className="text-xs text-center">Dotted</div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 border-4 border-double border-purple-500 flex items-center justify-center">
                      <span className="text-xs font-medium">border-double</span>
                    </div>
                    <div className="text-xs text-center">Double</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 5. OUTLINE PROPERTIES */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Outline Properties
          </Typography>

          <CardContainer>
            <CardTitle title="Outline Width & Color">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Outline properties provide focus indicators without affecting
                  layout
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <button className="w-full h-16 bg-white dark:bg-gray-800 outline-2 outline-brand rounded flex items-center justify-center">
                      <span className="text-xs font-medium">outline-2</span>
                    </button>
                    <div className="text-xs text-center">2px outline</div>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full h-16 bg-white dark:bg-gray-800 outline-4 outline-green-500 rounded flex items-center justify-center">
                      <span className="text-xs font-medium">outline-4</span>
                    </button>
                    <div className="text-xs text-center">4px outline</div>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full h-16 bg-white dark:bg-gray-800 outline-8 outline-blue-500 rounded flex items-center justify-center">
                      <span className="text-xs font-medium">outline-8</span>
                    </button>
                    <div className="text-xs text-center">8px outline</div>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full h-16 bg-white dark:bg-gray-800 outline-none rounded flex items-center justify-center">
                      <span className="text-xs font-medium">outline-none</span>
                    </button>
                    <div className="text-xs text-center">No outline</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle title="Outline Styles & Offset">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Different outline styles and offset positioning
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Outline Styles
                    </Typography>
                    <div className="space-y-2">
                      <button className="w-full h-12 bg-white dark:bg-gray-800 outline-2 outline-solid outline-brand rounded flex items-center justify-center">
                        <span className="text-xs font-medium">
                          outline-solid
                        </span>
                      </button>
                      <button className="w-full h-12 bg-white dark:bg-gray-800 outline-2 outline-dashed outline-green-500 rounded flex items-center justify-center">
                        <span className="text-xs font-medium">
                          outline-dashed
                        </span>
                      </button>
                      <button className="w-full h-12 bg-white dark:bg-gray-800 outline-2 outline-dotted outline-blue-500 rounded flex items-center justify-center">
                        <span className="text-xs font-medium">
                          outline-dotted
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Outline Offset
                    </Typography>
                    <div className="space-y-2">
                      <button className="w-full h-12 bg-white dark:bg-gray-800 outline-2 outline-brand outline-offset-0 rounded flex items-center justify-center">
                        <span className="text-xs font-medium">offset-0</span>
                      </button>
                      <button className="w-full h-12 bg-white dark:bg-gray-800 outline-2 outline-green-500 outline-offset-2 rounded flex items-center justify-center">
                        <span className="text-xs font-medium">offset-2</span>
                      </button>
                      <button className="w-full h-12 bg-white dark:bg-gray-800 outline-2 outline-blue-500 outline-offset-4 rounded flex items-center justify-center">
                        <span className="text-xs font-medium">offset-4</span>
                      </button>
                    </div>
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
