import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
} from '@e-burgos/tucu-ui';

import HeroPage from '../../components/HeroPage';

export function FiltersUtilities() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Filters Utilities"
        description="Complete guide to CSS filters and backdrop effects in Tailwind CSS v4. Master blur, brightness, contrast, and advanced visual effects."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg border border-cyan-500/50">
            <LucideIcons.Filter className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Filters Architecture */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Filters & Backdrop Effects
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Powerful CSS filters built with Tailwind CSS v4 @source directives
          </Typography>
        </div>

        {/* 1. BLUR FILTERS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Blur Filters
          </Typography>

          <CardContainer>
            <CardTitle title="Blur Intensity Levels">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Apply Gaussian blur effects with different intensity levels
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-brand to-blue-500 rounded-lg blur-none border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        blur-none
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-brand to-blue-500 rounded-lg blur-sm border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        blur-sm
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-green-500 to-purple-500 rounded-lg blur border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        blur
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg blur-md border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        blur-md
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg blur-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        blur-lg
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg blur-xl border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        blur-xl
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-2xl border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        blur-2xl
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg blur-3xl border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        blur-3xl
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 2. BRIGHTNESS FILTERS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Brightness Filters
          </Typography>

          <CardContainer>
            <CardTitle title="Brightness Adjustments">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control image brightness levels from dark to ultra-bright
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-brand to-blue-500 rounded-lg brightness-0 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        brightness-0
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-brand to-blue-500 rounded-lg brightness-50 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        brightness-50
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-green-500 to-purple-500 rounded-lg brightness-100 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        brightness-100
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg brightness-150 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        brightness-150
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg brightness-200 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-black font-medium z-10 relative">
                        brightness-200
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 3. CONTRAST FILTERS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Contrast Filters
          </Typography>

          <CardContainer>
            <CardTitle title="Contrast Adjustments">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Adjust image contrast from flat to ultra-high contrast
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-gray-300 to-gray-700 rounded-lg contrast-0 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        contrast-0
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-gray-300 to-gray-700 rounded-lg contrast-50 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        contrast-50
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-gray-300 to-gray-700 rounded-lg contrast-100 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        contrast-100
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-gray-300 to-gray-700 rounded-lg contrast-125 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-black font-medium z-10 relative">
                        contrast-125
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-gray-300 to-gray-700 rounded-lg contrast-150 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-black font-medium z-10 relative">
                        contrast-150
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-gray-300 to-gray-700 rounded-lg contrast-200 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-black font-medium z-10 relative">
                        contrast-200
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 4. COLOR ADJUSTMENT FILTERS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Color Adjustment Filters
          </Typography>

          <CardContainer>
            <CardTitle title="Hue Rotate & Saturation">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Apply hue rotation and saturation adjustments
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg hue-rotate-15 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        hue-rotate-15
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg hue-rotate-90 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        hue-rotate-90
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg hue-rotate-180 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        hue-rotate-180
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg saturate-0 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        saturate-0
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg saturate-50 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        saturate-50
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg saturate-150 border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        saturate-150
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle title="Monochrome & Invert Effects">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Apply grayscale, sepia, and invert effects
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg grayscale border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-gray-800 font-medium z-10 relative">
                        grayscale
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg sepia border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-gray-800 font-medium z-10 relative">
                        sepia
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg invert border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        invert
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg grayscale invert border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-white font-medium z-10 relative">
                        grayscale + invert
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 5. BACKDROP FILTERS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Backdrop Filters
          </Typography>

          <CardContainer>
            <CardTitle title="Backdrop Blur Effects">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Apply blur effects to the background behind elements
                </Typography>
                <div className="relative">
                  <div className="w-full h-32 bg-gradient-to-r from-brand via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      Background
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 w-24 h-16 bg-white/80 backdrop-blur-sm rounded border flex items-center justify-center">
                    <span className="text-xs font-medium">
                      backdrop-blur-sm
                    </span>
                  </div>
                  <div className="absolute top-8 right-8 w-24 h-16 bg-white/80 backdrop-blur rounded border flex items-center justify-center">
                    <span className="text-xs font-medium">backdrop-blur</span>
                  </div>
                  <div className="absolute bottom-4 left-8 w-24 h-16 bg-white/80 backdrop-blur-md rounded border flex items-center justify-center">
                    <span className="text-xs font-medium">
                      backdrop-blur-md
                    </span>
                  </div>
                  <div className="absolute bottom-8 right-4 w-24 h-16 bg-white/80 backdrop-blur-lg rounded border flex items-center justify-center">
                    <span className="text-xs font-medium">
                      backdrop-blur-lg
                    </span>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle title="Backdrop Effects Combination">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Combine multiple backdrop effects for complex visual results
                </Typography>
                <div className="relative">
                  <div className="w-full h-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      Background
                    </span>
                  </div>
                  <div className="absolute top-6 left-6 w-28 h-20 bg-black/20 backdrop-blur backdrop-brightness-75 rounded border flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      blur + brightness-75
                    </span>
                  </div>
                  <div className="absolute top-2 right-8 w-28 h-20 bg-black/20 backdrop-blur backdrop-contrast-125 rounded border flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      blur + contrast-125
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-12 w-28 h-20 bg-black/20 backdrop-blur backdrop-saturate-150 rounded border flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      blur + saturate-150
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-12 w-28 h-20 bg-black/20 backdrop-blur backdrop-invert rounded border flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      blur + invert
                    </span>
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
