import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
} from '@e-burgos/tucu-ui';

import HeroPage from '../../components/HeroPage';

export function AccessibilityUtilities() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <HeroPage
        title="Accessibility Utilities"
        description="Essential accessibility utilities in Tailwind CSS v4 for inclusive web design and high contrast support."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-slate-500 via-gray-500 to-zinc-500 rounded-full flex items-center justify-center shadow-lg border border-slate-500/50">
            <LucideIcons.Accessibility className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Inclusive Design & Accessibility
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Critical accessibility utilities built with Tailwind CSS v4 @source
            directives
          </Typography>
        </div>

        <CardContainer>
          <CardTitle title="Forced Color Adjustment">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Control how elements adapt to high contrast and forced color
                modes
              </Typography>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-brand to-blue-500 rounded-lg forced-color-adjust-auto">
                  <Typography tag="p" className="text-white font-medium">
                    forced-color-adjust-auto
                  </Typography>
                  <Typography tag="p" className="text-white/80 text-sm mt-1">
                    Element adapts to user&apos;s forced color preferences
                    automatically
                  </Typography>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-500 to-purple-500 rounded-lg forced-color-adjust-none">
                  <Typography tag="p" className="text-white font-medium">
                    forced-color-adjust-none
                  </Typography>
                  <Typography tag="p" className="text-white/80 text-sm mt-1">
                    Element maintains its original colors even in high contrast
                    mode
                  </Typography>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
                  <Typography tag="h4" className="font-medium mb-2">
                    When to Use Each Value:
                  </Typography>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>forced-color-adjust-auto:</strong> Use for most
                      elements. Allows the browser to optimize colors for
                      accessibility when users have high contrast mode enabled.
                    </div>
                    <div>
                      <strong>forced-color-adjust-none:</strong> Use for
                      brand-critical elements, icons, or when you need to
                      preserve specific color relationships.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Browser Support & Usage">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Understanding forced colors mode and browser compatibility
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Typography tag="h4" className="text-sm font-medium">
                    What is Forced Colors Mode?
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-300"
                  >
                    A browser feature that overrides website colors to ensure
                    high contrast and accessibility. Used by:
                  </Typography>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                    <li>• Windows High Contrast Mode</li>
                    <li>• macOS Accessibility preferences</li>
                    <li>• Browser extensions</li>
                    <li>• User preference media queries</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <Typography tag="h4" className="text-sm font-medium">
                    Browser Support
                  </Typography>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Chrome</span>
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-500 px-2 py-1 rounded">
                        Supported
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Firefox</span>
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-500 px-2 py-1 rounded">
                        Supported
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Safari</span>
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-500 px-2 py-1 rounded">
                        Supported
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Edge</span>
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-500 px-2 py-1 rounded">
                        Supported
                      </span>
                    </div>
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
