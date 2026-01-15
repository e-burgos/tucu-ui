import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  HeroCard,
} from '../../../index';

export function InteractivityUtilities() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="Interactivity Utilities"
        description="Complete guide to interactive utilities in Tailwind CSS v4. Master cursors, scroll behavior, touch actions, and user interactions."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg border border-rose-500/50">
            <LucideIcons.MousePointerClick className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Interactive User Experience
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Advanced interactivity utilities built with Tailwind CSS v4 @source
            directives
          </Typography>
        </div>

        <CardContainer>
          <CardTitle title="Cursor Types">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Control mouse cursor appearance for different interactions
              </Typography>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                <div className="w-16 h-16 bg-brand rounded flex items-center justify-center text-white font-medium cursor-auto">
                  Auto
                </div>
                <div className="w-16 h-16 bg-green-500 rounded flex items-center justify-center text-white font-medium cursor-pointer">
                  Pointer
                </div>
                <div className="w-16 h-16 bg-blue-500 rounded flex items-center justify-center text-white font-medium cursor-text">
                  Text
                </div>
                <div className="w-16 h-16 bg-purple-500 rounded flex items-center justify-center text-white font-medium cursor-move">
                  Move
                </div>
                <div className="w-16 h-16 bg-pink-500 rounded flex items-center justify-center text-white font-medium cursor-help">
                  Help
                </div>
                <div className="w-16 h-16 bg-indigo-500 rounded flex items-center justify-center text-white font-medium cursor-not-allowed">
                  Not
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Scroll Behavior & Margins">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Control scrolling behavior and snap positioning
              </Typography>
              <div className="space-y-4">
                <div className="h-32 bg-gradient-to-r from-brand to-blue-500 rounded-lg overflow-auto scroll-smooth">
                  <div className="h-64 p-4 text-white space-y-4">
                    <div className="h-16 bg-white/20 rounded flex items-center px-4 scroll-m-4">
                      Scroll margin top
                    </div>
                    <div className="h-16 bg-white/20 rounded flex items-center px-4">
                      Middle content
                    </div>
                    <div className="h-16 bg-white/20 rounded flex items-center px-4 scroll-mb-8">
                      Scroll margin bottom
                    </div>
                  </div>
                </div>
                <div className="text-xs text-center text-gray-600 dark:text-gray-400">
                  scroll-smooth + scroll margins for smooth scrolling with
                  offsets
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Scroll Snap & Touch Actions">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Advanced scrolling and touch interaction controls
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Typography tag="h4" className="text-sm font-medium">
                    Scroll Snap
                  </Typography>
                  <div className="h-32 bg-light-dark rounded overflow-x-auto snap-x snap-mandatory">
                    <div className="flex gap-4 p-4">
                      <div className="w-32 h-24 bg-brand rounded shrink-0 snap-center flex items-center justify-center text-white font-medium">
                        Snap 1
                      </div>
                      <div className="w-32 h-24 bg-green-500 rounded shrink-0 snap-center flex items-center justify-center text-white font-medium">
                        Snap 2
                      </div>
                      <div className="w-32 h-24 bg-blue-500 rounded shrink-0 snap-center flex items-center justify-center text-white font-medium">
                        Snap 3
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-center">
                    snap-x snap-mandatory snap-center
                  </div>
                </div>
                <div className="space-y-2">
                  <Typography tag="h4" className="text-sm font-medium">
                    Touch Actions
                  </Typography>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="w-full h-16 bg-purple-500 rounded touch-none flex items-center justify-center text-white text-xs font-medium">
                      None
                    </div>
                    <div className="w-full h-16 bg-pink-500 rounded touch-pan-x flex items-center justify-center text-white text-xs font-medium">
                      Pan X
                    </div>
                    <div className="w-full h-16 bg-indigo-500 rounded touch-pinch-zoom flex items-center justify-center text-white text-xs font-medium">
                      Pinch
                    </div>
                    <div className="w-full h-16 bg-cyan-500 rounded touch-manipulation flex items-center justify-center text-white text-xs font-medium">
                      Manip
                    </div>
                  </div>
                  <div className="text-xs text-center">
                    touch-none, touch-pan-x, touch-pinch-zoom,
                    touch-manipulation
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="User Selection & Appearance">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Control text selection and form appearance
              </Typography>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-light-dark rounded select-none">
                  <Typography tag="p" className="text-sm">
                    Cannot select this text
                  </Typography>
                </div>
                <div className="p-3 bg-light-dark rounded select-text">
                  <Typography tag="p" className="text-sm">
                    Can select this text
                  </Typography>
                </div>
                <div className="p-3 bg-light-dark rounded select-all">
                  <Typography tag="p" className="text-sm">
                    Select all on click
                  </Typography>
                </div>
                <div className="p-3 bg-light-dark rounded appearance-none">
                  <input type="checkbox" className="mr-2" />
                  <Typography tag="span" className="text-sm">
                    Custom styled
                  </Typography>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-center mt-2">
                <div>select-none</div>
                <div>select-text</div>
                <div>select-all</div>
                <div>appearance-none</div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </div>
  );
}
