import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  HeroCard,
} from '../../../index';

export function TransitionsAnimations() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="Transitions & Animations"
        description="Complete guide to CSS transitions and animations in Tailwind CSS v4. Master smooth transitions and engaging animations."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border border-orange-500/50">
            <LucideIcons.Play className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Smooth Transitions & Engaging Animations
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Professional animation utilities built with Tailwind CSS v4 @source
            directives
          </Typography>
        </div>

        <CardContainer>
          <CardTitle title="Transition Properties">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Control which properties should transition smoothly
              </Typography>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button className="w-full h-16 bg-brand hover:bg-brand/80 transition-all duration-300 rounded-lg flex items-center justify-center text-white font-medium hover:scale-105">
                  transition-all
                </button>
                <button className="w-full h-16 bg-green-500 hover:bg-blue-500 transition-colors duration-300 rounded-lg flex items-center justify-center text-white font-medium">
                  transition-colors
                </button>
                <button className="w-full h-16 bg-purple-500 hover:scale-110 transition-transform duration-300 rounded-lg flex items-center justify-center text-white font-medium">
                  transition-transform
                </button>
                <button className="w-full h-16 bg-pink-500 hover:shadow-lg transition-shadow duration-300 rounded-lg flex items-center justify-center text-white font-medium">
                  transition-shadow
                </button>
                <button className="w-full h-16 bg-indigo-500 hover:opacity-75 transition-opacity duration-300 rounded-lg flex items-center justify-center text-white font-medium">
                  transition-opacity
                </button>
                <button className="w-full h-16 bg-teal-500 transition-none rounded-lg flex items-center justify-center text-white font-medium">
                  transition-none
                </button>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Transition Duration">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Control the speed of transitions with different duration values
              </Typography>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                <button className="w-full h-12 bg-red-500 hover:bg-red-600 transition-colors duration-75 rounded flex items-center justify-center text-white text-xs font-medium">
                  75ms
                </button>
                <button className="w-full h-12 bg-orange-500 hover:bg-orange-600 transition-colors duration-100 rounded flex items-center justify-center text-white text-xs font-medium">
                  100ms
                </button>
                <button className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 transition-colors duration-150 rounded flex items-center justify-center text-white text-xs font-medium">
                  150ms
                </button>
                <button className="w-full h-12 bg-green-500 hover:bg-green-600 transition-colors duration-300 rounded flex items-center justify-center text-white text-xs font-medium">
                  300ms
                </button>
                <button className="w-full h-12 bg-blue-500 hover:bg-blue-600 transition-colors duration-500 rounded flex items-center justify-center text-white text-xs font-medium">
                  500ms
                </button>
                <button className="w-full h-12 bg-indigo-500 hover:bg-indigo-600 transition-colors duration-700 rounded flex items-center justify-center text-white text-xs font-medium">
                  700ms
                </button>
                <button className="w-full h-12 bg-purple-500 hover:bg-purple-600 transition-colors duration-1000 rounded flex items-center justify-center text-white text-xs font-medium">
                  1000ms
                </button>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Transition Timing Functions">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Different easing curves for more natural motion
              </Typography>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="w-full h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-bounce ease-linear"></div>
                  </div>
                  <div className="text-xs text-center">ease-linear</div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-bounce ease-in"></div>
                  </div>
                  <div className="text-xs text-center">ease-in</div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-bounce ease-out"></div>
                  </div>
                  <div className="text-xs text-center">ease-out</div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-bounce ease-in-out"></div>
                  </div>
                  <div className="text-xs text-center">ease-in-out</div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Transition Delay">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Add delays to create staggered animation effects
              </Typography>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-red-500 rounded transition-all duration-300 delay-0 hover:scale-125"></div>
                  <div className="w-8 h-8 bg-orange-500 rounded transition-all duration-300 delay-75 hover:scale-125"></div>
                  <div className="w-8 h-8 bg-yellow-500 rounded transition-all duration-300 delay-150 hover:scale-125"></div>
                  <div className="w-8 h-8 bg-green-500 rounded transition-all duration-300 delay-300 hover:scale-125"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded transition-all duration-300 delay-500 hover:scale-125"></div>
                </div>
                <div className="text-xs text-center text-gray-600 dark:text-gray-400">
                  Hover over the circles to see staggered delays: 0ms, 75ms,
                  150ms, 300ms, 500ms
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Built-in Animations">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Ready-to-use animations for common UI patterns
              </Typography>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="w-full h-16 bg-brand rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-spin"></div>
                  </div>
                  <div className="text-xs text-center">animate-spin</div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-green-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
                  </div>
                  <div className="text-xs text-center">animate-ping</div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-purple-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-xs text-center">animate-pulse</div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-pink-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                  </div>
                  <div className="text-xs text-center">animate-bounce</div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
