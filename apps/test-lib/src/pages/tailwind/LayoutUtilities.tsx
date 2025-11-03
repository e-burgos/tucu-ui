import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '@tucu-ui';

import HeroPage from '../../components/HeroPage';

export function LayoutUtilities() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Tailwind v4 Layout Utilities"
        description="Complete collection of Tailwind CSS v4 layout utilities working seamlessly in tucu-ui. All utilities are automatically included using @source directives."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
            <LucideIcons.LayoutGrid className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Layout Architecture */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Layout Architecture
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Built with Tailwind CSS v4 @source directives for complete utility
            coverage
          </Typography>
        </div>

        {/* 1. LAYOUT UTILITIES */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Layout Utilities
          </Typography>

          {/* Aspect Ratio */}
          <CardContainer>
            <CardTitle title="Aspect Ratio">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control the aspect ratio of elements
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="aspect-square bg-brand/20 border-2 border-brand/30 rounded-lg flex items-center justify-center p-2">
                    <span className="text-xs font-medium">aspect-square</span>
                  </div>
                  <div className="aspect-video bg-green-500/20 border-2 border-green-500/30 rounded-lg flex items-center justify-center p-2">
                    <span className="text-xs font-medium">aspect-video</span>
                  </div>
                  <div className="aspect-4/3 bg-blue-500/20 border-2 border-blue-500/30 rounded-lg flex items-center justify-center p-2">
                    <span className="text-xs font-medium">aspect-4/3</span>
                  </div>
                  <div className="aspect-16/9 bg-purple-500/20 border-2 border-purple-500/30 rounded-lg flex items-center justify-center p-2">
                    <span className="text-xs font-medium">aspect-16/9</span>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Object Fit */}
          <CardContainer>
            <CardTitle title="Object Fit">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control how content fits within its container
                </Typography>
                <div className="grid grid-cols-2  gap-4">
                  <div className="w-100 h-100 bg-gray-200 rounded mb-4">
                    <img
                      src="https://marketplace.canva.com/MADaqpevv8c/1/thumbnail_large-1/canva-mountain-landscape-MADaqpevv8c.jpg"
                      alt="object-contain"
                      className="w-full h-full object-contain"
                    />
                    <div className="text-xs text-center mt-1">
                      object-contain
                    </div>
                  </div>
                  <div className="w-100 h-100 bg-gray-200 rounded mb-4">
                    <img
                      src="https://marketplace.canva.com/MADaqpevv8c/1/thumbnail_large-1/canva-mountain-landscape-MADaqpevv8c.jpg"
                      alt="object-cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="text-xs text-center mt-1">object-cover</div>
                  </div>
                  <div className="w-100 h-100 bg-gray-200 rounded mb-4">
                    <img
                      src="https://marketplace.canva.com/MADaqpevv8c/1/thumbnail_large-1/canva-mountain-landscape-MADaqpevv8c.jpg"
                      alt="object-fill"
                      className="w-full h-full object-fill"
                    />
                    <div className="text-xs text-center mt-1">object-fill</div>
                  </div>
                  <div className="w-100 h-100 bg-gray-200 rounded mb-4">
                    <img
                      src="https://marketplace.canva.com/MADaqpevv8c/1/thumbnail_large-1/canva-mountain-landscape-MADaqpevv8c.jpg"
                      alt="object-none"
                      className="w-full h-full object-none"
                    />
                    <div className="text-xs text-center mt-1">object-none</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Position & Display */}
          <CardContainer>
            <CardTitle title="Position & Display">
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="relative w-16 h-16 bg-red-500/20 border rounded">
                    <div className="absolute top-0 left-0 w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-xs">relative</span>
                  </div>
                  <div className="w-16 h-16 bg-blue-500/20 border rounded flex items-center justify-center">
                    <span className="text-xs">flex</span>
                  </div>
                  <div className="w-16 h-16 bg-green-500/20 border rounded grid place-items-center">
                    <span className="text-xs">grid</span>
                  </div>
                  <div className="w-16 h-16 bg-purple-500/20 border rounded block">
                    <span className="text-xs">block</span>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 2. FLEXBOX & GRID */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Flexbox & Grid
          </Typography>

          <CardContainer>
            <CardTitle title="Flexbox Utilities">
              <div className="space-y-4">
                <div className="flex gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                  <div className="flex-1 bg-brand/20 p-2 rounded text-center text-xs">
                    flex-1
                  </div>
                  <div className="flex-none bg-green-500/20 p-2 rounded text-center text-xs">
                    flex-none
                  </div>
                  <div className="flex-auto bg-blue-500/20 p-2 rounded text-center text-xs">
                    flex-auto
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                  <div className="bg-red-500/20 p-2 rounded text-center text-xs">
                    flex-col
                  </div>
                  <div className="bg-yellow-500/20 p-2 rounded text-center text-xs">
                    item
                  </div>
                  <div className="bg-purple-500/20 p-2 rounded text-center text-xs">
                    item
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle title="Grid Utilities">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded">
                  <div className="bg-brand/20 p-2 rounded text-center text-xs">
                    col-1
                  </div>
                  <div className="bg-green-500/20 p-2 rounded text-center text-xs">
                    col-2
                  </div>
                  <div className="bg-blue-500/20 p-2 rounded text-center text-xs">
                    col-3
                  </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded h-24">
                  <div className="bg-red-500/20 p-2 rounded text-center text-xs">
                    1
                  </div>
                  <div className="bg-yellow-500/20 p-2 rounded text-center text-xs">
                    2
                  </div>
                  <div className="bg-purple-500/20 p-2 rounded text-center text-xs">
                    3
                  </div>
                  <div className="bg-pink-500/20 p-2 rounded text-center text-xs">
                    4
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 3. SPACING */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Spacing
          </Typography>

          <CardContainer>
            <CardTitle title="Padding & Margin">
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                  <div className="bg-brand/20 p-2 rounded mb-2">
                    <span className="text-xs">padding + margin</span>
                  </div>
                  <div className="bg-green-500/20 px-4 py-2 rounded">
                    <span className="text-xs">px-4 py-2</span>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 4. SIZING */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Sizing
          </Typography>

          <CardContainer>
            <CardTitle title="Width & Height">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="w-16 h-16 bg-brand/20 rounded"></div>
                  <div className="w-20 h-20 bg-green-500/20 rounded"></div>
                  <div className="w-24 h-24 bg-blue-500/20 rounded"></div>
                  <div className="w-full h-12 bg-purple-500/20 rounded max-w-xs"></div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  w-16 h-16 | w-20 h-20 | w-24 h-24 | w-full h-12
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 5. TYPOGRAPHY */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Typography
          </Typography>

          <CardContainer>
            <CardTitle title="Font Sizes & Weights">
              <div className="space-y-2">
                <div className="text-xs">text-xs - Extra small text</div>
                <div className="text-sm">text-sm - Small text</div>
                <div className="text-base">text-base - Base text</div>
                <div className="text-lg">text-lg - Large text</div>
                <div className="text-xl">text-xl - Extra large text</div>
                <div className="text-2xl font-bold">text-2xl font-bold</div>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle title="Text Colors">
              <div className="space-y-2">
                <div className="text-red-500">text-red-500</div>
                <div className="text-green-500">text-green-500</div>
                <div className="text-blue-500">text-blue-500</div>
                <div className="text-brand">text-brand</div>
                <div className="text-gray-900 dark:text-gray-100">
                  text-gray-900/100
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 6. BACKGROUNDS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Backgrounds
          </Typography>

          <CardContainer>
            <CardTitle title="Background Colors">
              <div className="grid grid-cols-4 gap-2">
                <div className="w-16 h-16 bg-red-500 rounded"></div>
                <div className="w-16 h-16 bg-green-500 rounded"></div>
                <div className="w-16 h-16 bg-blue-500 rounded"></div>
                <div className="w-16 h-16 bg-brand rounded"></div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                bg-red-500 | bg-green-500 | bg-blue-500 | bg-brand
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 7. BORDERS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Borders
          </Typography>

          <CardContainer>
            <CardTitle title="Border Radius & Width">
              <div className="grid grid-cols-4 gap-4">
                <div className="w-16 h-16 bg-gray-200 border border-gray-400 rounded-none"></div>
                <div className="w-16 h-16 bg-gray-200 border border-gray-400 rounded"></div>
                <div className="w-16 h-16 bg-gray-200 border-2 border-gray-400 rounded-lg"></div>
                <div className="w-16 h-16 bg-gray-200 border-4 border-gray-400 rounded-full"></div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                rounded-none | rounded | rounded-lg | rounded-full
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 8. EFFECTS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Effects
          </Typography>

          <CardContainer>
            <CardTitle title="Shadows & Opacity">
              <div className="grid grid-cols-3 gap-4">
                <div className="w-20 h-20 bg-brand rounded shadow-sm flex items-center justify-center">
                  <span className="text-xs text-white">shadow-sm</span>
                </div>
                <div className="w-20 h-20 bg-green-500 rounded shadow-lg flex items-center justify-center">
                  <span className="text-xs text-white">shadow-lg</span>
                </div>
                <div className="w-20 h-20 bg-blue-500 rounded shadow-xl flex items-center justify-center opacity-75">
                  <span className="text-xs text-white">opacity-75</span>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 9. FILTERS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Filters
          </Typography>

          <CardContainer>
            <CardTitle title="Filter Effects">
              <div className="grid grid-cols-4 gap-4">
                <div className="w-16 h-16 bg-brand rounded blur-sm"></div>
                <div className="w-16 h-16 bg-green-500 rounded brightness-75"></div>
                <div className="w-16 h-16 bg-blue-500 rounded contrast-125"></div>
                <div className="w-16 h-16 bg-purple-500 rounded grayscale"></div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                blur-sm | brightness-75 | contrast-125 | grayscale
              </div>
            </CardTitle>
          </CardContainer>
        </section>
      </section>
    </div>
  );
}
