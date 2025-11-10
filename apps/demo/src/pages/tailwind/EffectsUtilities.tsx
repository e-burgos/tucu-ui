import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
} from '@e-burgos/tucu-ui';

import HeroPage from '../../components/HeroPage';

export function EffectsUtilities() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Effects Utilities"
        description="Complete guide to visual effects utilities in Tailwind CSS v4. Master shadows, opacity, blend modes, and masking techniques."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border border-purple-500/50">
            <LucideIcons.Sparkles className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Effects Architecture */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Effects Architecture
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Powerful visual effects built with Tailwind CSS v4 @source
            directives
          </Typography>
        </div>

        {/* 1. BOX SHADOW */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Box Shadow
          </Typography>

          <CardContainer>
            <CardTitle title="Box Shadow Sizes">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Different shadow sizes and intensities
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <span className="text-xs font-medium">shadow-sm</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <span className="text-xs font-medium">shadow</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <span className="text-xs font-medium">shadow-md</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <span className="text-xs font-medium">shadow-lg</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <span className="text-xs font-medium">shadow-xl</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <span className="text-xs font-medium">shadow-2xl</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <span className="text-xs font-medium">shadow-inner</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-white dark:bg-gray-800 rounded-lg shadow-none border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <span className="text-xs font-medium">shadow-none</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 2. TEXT SHADOW */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Text Shadow
          </Typography>

          <CardContainer>
            <CardTitle title="Text Shadow Sizes">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Text shadow effects with different intensities
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-2xl font-bold text-shadow-sm text-gray-900 dark:text-white">
                      text-shadow-sm
                    </div>
                    <div className="text-lg font-semibold text-shadow text-gray-900 dark:text-white">
                      text-shadow
                    </div>
                    <div className="text-xl font-bold text-shadow-md text-gray-900 dark:text-white">
                      text-shadow-md
                    </div>
                    <div className="text-lg font-semibold text-shadow-lg text-gray-900 dark:text-white">
                      text-shadow-lg
                    </div>
                    <div className="text-base text-shadow-none text-gray-900 dark:text-white">
                      text-shadow-none
                    </div>
                  </div>
                  <div className="space-y-3 p-6 bg-gradient-to-r from-brand to-blue-500 rounded-lg text-white">
                    <div className="text-2xl font-bold text-shadow-lg">
                      With Gradient
                    </div>
                    <div className="text-lg font-semibold text-shadow-md">
                      Background
                    </div>
                    <div className="text-base text-shadow">
                      Beautiful effects
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 3. OPACITY */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Opacity
          </Typography>

          <CardContainer>
            <CardTitle title="Opacity Levels">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control element transparency with opacity values
                </Typography>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  <div className="space-y-1">
                    <div className="w-full h-12 bg-brand rounded opacity-25 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        25%
                      </span>
                    </div>
                    <div className="text-xs text-center">opacity-25</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-12 bg-brand rounded opacity-50 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        50%
                      </span>
                    </div>
                    <div className="text-xs text-center">opacity-50</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-12 bg-green-500 rounded opacity-75 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        75%
                      </span>
                    </div>
                    <div className="text-xs text-center">opacity-75</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-12 bg-green-500 rounded opacity-100 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        100%
                      </span>
                    </div>
                    <div className="text-xs text-center">opacity-100</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-12 bg-blue-500 rounded opacity-10 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        10%
                      </span>
                    </div>
                    <div className="text-xs text-center">opacity-10</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-12 bg-blue-500 rounded opacity-90 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        90%
                      </span>
                    </div>
                    <div className="text-xs text-center">opacity-90</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 4. MIX BLEND MODE */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Mix Blend Mode
          </Typography>

          <CardContainer>
            <CardTitle title="Mix Blend Mode Examples">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  How elements blend with their background
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="relative w-full h-20 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-blue-500 mix-blend-multiply rounded-lg flex items-center justify-center">
                        <span className="text-xs text-white font-medium">
                          multiply
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-center">
                      mix-blend-multiply
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative w-full h-20 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-blue-500 mix-blend-screen rounded-lg flex items-center justify-center">
                        <span className="text-xs text-white font-medium">
                          screen
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-center">mix-blend-screen</div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative w-full h-20 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-blue-500 mix-blend-overlay rounded-lg flex items-center justify-center">
                        <span className="text-xs text-white font-medium">
                          overlay
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-center">mix-blend-overlay</div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative w-full h-20 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-blue-500 mix-blend-difference rounded-lg flex items-center justify-center">
                        <span className="text-xs text-white font-medium">
                          difference
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-center">
                      mix-blend-difference
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 5. BACKGROUND BLEND MODE */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Background Blend Mode
          </Typography>

          <CardContainer>
            <CardTitle title="Background Blend Mode Examples">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  How multiple background images and colors blend together
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div
                      className="w-full h-20 bg-blend-multiply rounded-lg flex items-center justify-center text-white font-medium"
                      style={{
                        backgroundImage:
                          'linear-gradient(45deg, #ff0000, #ffff00), linear-gradient(45deg, #0000ff, #00ff00)',
                        backgroundSize: '20px 20px',
                      }}
                    >
                      <span className="text-xs">multiply</span>
                    </div>
                    <div className="text-xs text-center">bg-blend-multiply</div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="w-full h-20 bg-blend-screen rounded-lg flex items-center justify-center text-black font-medium"
                      style={{
                        backgroundImage:
                          'linear-gradient(45deg, #ff0000, #ffff00), linear-gradient(45deg, #0000ff, #00ff00)',
                        backgroundSize: '20px 20px',
                      }}
                    >
                      <span className="text-xs">screen</span>
                    </div>
                    <div className="text-xs text-center">bg-blend-screen</div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="w-full h-20 bg-blend-overlay rounded-lg flex items-center justify-center text-white font-medium"
                      style={{
                        backgroundImage:
                          'linear-gradient(45deg, #ff0000, #ffff00), linear-gradient(45deg, #0000ff, #00ff00)',
                        backgroundSize: '20px 20px',
                      }}
                    >
                      <span className="text-xs">overlay</span>
                    </div>
                    <div className="text-xs text-center">bg-blend-overlay</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 6. MASK UTILITIES */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Mask Utilities
          </Typography>

          <CardContainer>
            <CardTitle title="Mask Types">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  CSS masking techniques for complex shapes and effects
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Mask Images
                    </Typography>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <div className="w-full h-16 bg-gradient-to-r from-brand to-blue-500 rounded mask-linear-gradient flex items-center justify-center text-white text-xs font-medium">
                          Linear
                        </div>
                        <div className="text-xs text-center">
                          mask-linear-gradient
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="w-full h-16 bg-gradient-to-r from-green-500 to-purple-500 rounded mask-radial-gradient flex items-center justify-center text-white text-xs font-medium">
                          Radial
                        </div>
                        <div className="text-xs text-center">
                          mask-radial-gradient
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Mask Modes
                    </Typography>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded mask-alpha flex items-center justify-center text-white text-xs font-medium">
                          Alpha
                        </div>
                        <div className="text-xs text-center">mask-alpha</div>
                      </div>
                      <div className="space-y-1">
                        <div className="w-full h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded mask-luminance flex items-center justify-center text-white text-xs font-medium">
                          Luminance
                        </div>
                        <div className="text-xs text-center">
                          mask-luminance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle title="Mask Positioning">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control mask position and size
                </Typography>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div
                      className="w-full h-16 bg-gradient-to-r from-brand to-blue-500 rounded mask-center mask-contain flex items-center justify-center text-white text-xs font-medium"
                      style={{
                        maskImage:
                          'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="20" cy="20" r="15" fill="%23000000"/%3E%3C/svg%3E")',
                      }}
                    >
                      Center
                    </div>
                    <div className="text-xs text-center">mask-center</div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="w-full h-16 bg-gradient-to-r from-green-500 to-purple-500 rounded mask-top mask-contain flex items-start justify-center pt-1 text-white text-xs font-medium"
                      style={{
                        maskImage:
                          'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="20" cy="20" r="15" fill="%23000000"/%3E%3C/svg%3E")',
                      }}
                    >
                      Top
                    </div>
                    <div className="text-xs text-center">mask-top</div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="w-full h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded mask-left mask-contain flex items-center justify-start pl-1 text-white text-xs font-medium"
                      style={{
                        maskImage:
                          'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="20" cy="20" r="15" fill="%23000000"/%3E%3C/svg%3E")',
                      }}
                    >
                      Left
                    </div>
                    <div className="text-xs text-center">mask-left</div>
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
