import { CardContainer, CardTitle, Typography, LucideIcons } from 'tucu-ui';

import HeroPage from '../../components/HeroPage';

export function TransformsUtilities() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <HeroPage
        title="Transforms Utilities"
        description="Complete guide to CSS transforms in Tailwind CSS v4. Master rotation, scaling, skewing, and translation."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg border border-violet-500/50">
            <LucideIcons.Move3D className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            CSS Transforms & 3D Effects
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Powerful transformation utilities built with Tailwind CSS v4 @source
            directives
          </Typography>
        </div>

        <CardContainer>
          <CardTitle title="Rotation Transforms">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Rotate elements with precise angle controls
              </Typography>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                <div className="w-16 h-16 bg-brand rounded-lg flex items-center justify-center text-white font-bold transform rotate-0">
                  0°
                </div>
                <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold transform rotate-45">
                  45°
                </div>
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold transform rotate-90">
                  90°
                </div>
                <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold transform rotate-180">
                  180°
                </div>
                <div className="w-16 h-16 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold transform -rotate-45">
                  -45°
                </div>
                <div className="w-16 h-16 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold transform -rotate-90">
                  -90°
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Scale Transforms">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Scale elements up or down with precise control
              </Typography>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold transform scale-50">
                  0.5x
                </div>
                <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold transform scale-75">
                  0.75x
                </div>
                <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold transform scale-100">
                  1x
                </div>
                <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold transform scale-125">
                  1.25x
                </div>
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold transform scale-150">
                  1.5x
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Skew Transforms">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Apply skew transformations along X and Y axes
              </Typography>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="w-20 h-16 bg-purple-500 rounded flex items-center justify-center text-white font-bold transform skew-x-3">
                  X+3°
                </div>
                <div className="w-20 h-16 bg-pink-500 rounded flex items-center justify-center text-white font-bold transform skew-x-6">
                  X+6°
                </div>
                <div className="w-20 h-16 bg-indigo-500 rounded flex items-center justify-center text-white font-bold transform skew-y-3">
                  Y+3°
                </div>
                <div className="w-20 h-16 bg-cyan-500 rounded flex items-center justify-center text-white font-bold transform skew-y-6">
                  Y+6°
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Translation (Movement)">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Move elements along X and Y axes with precise positioning
              </Typography>
              <div className="relative w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div className="absolute top-2 left-2 w-8 h-8 bg-red-500 rounded transform translate-x-4 translate-y-2"></div>
                <div className="absolute top-8 left-8 w-8 h-8 bg-blue-500 rounded transform translate-x-8 translate-y-4"></div>
                <div className="absolute top-14 left-14 w-8 h-8 bg-green-500 rounded transform -translate-x-2 -translate-y-1"></div>
                <div className="absolute top-20 left-20 w-8 h-8 bg-purple-500 rounded transform translate-x-12 translate-y-6"></div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-28 text-center">
                  Elements moved with translate-x and translate-y utilities
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Transform Origin">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Control the point from which transforms originate
              </Typography>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg flex items-center justify-center transform origin-top rotate-45">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center transform origin-bottom rotate-45">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center transform origin-left rotate-45">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center transform origin-center rotate-45">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-center mt-2">
                <div>origin-top</div>
                <div>origin-bottom</div>
                <div>origin-left</div>
                <div>origin-center</div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
