import { CardContainer, CardTitle, Typography, HeroCard } from '../../../index';

export function SVGUtilities() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="SVG Utilities"
        description="Complete guide to SVG styling utilities in Tailwind CSS v4. Master fill, stroke, and stroke width properties."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg border border-amber-500/50">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            SVG Styling & Presentation
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Specialized SVG utilities built with Tailwind CSS v4 @source
            directives
          </Typography>
        </div>

        <CardContainer>
          <CardTitle title="Fill Colors">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Control SVG fill colors with semantic color utilities
              </Typography>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                <div className="w-16 h-16 bg-light-dark rounded flex items-center justify-center">
                  <svg className="w-8 h-8 fill-none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="w-16 h-16 bg-light-dark rounded flex items-center justify-center">
                  <svg
                    className="w-8 h-8 fill-current text-brand"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="w-16 h-16 bg-light-dark rounded flex items-center justify-center">
                  <svg className="w-8 h-8 fill-red-500" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="w-16 h-16 bg-light-dark rounded flex items-center justify-center">
                  <svg className="w-8 h-8 fill-green-500" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="w-16 h-16 bg-light-dark rounded flex items-center justify-center">
                  <svg className="w-8 h-8 fill-blue-500" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="w-16 h-16 bg-light-dark rounded flex items-center justify-center">
                  <svg className="w-8 h-8 fill-purple-500" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-xs text-center mt-2">
                <div>fill-none</div>
                <div>fill-current</div>
                <div>fill-red-500</div>
                <div>fill-green-500</div>
                <div>fill-blue-500</div>
                <div>fill-purple-500</div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer>
          <CardTitle title="Stroke Colors & Width">
            <div className="space-y-4">
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-300"
              >
                Control SVG stroke colors and thickness
              </Typography>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <Typography tag="h4" className="text-sm font-medium">
                    Stroke Colors
                  </Typography>
                  <div className="space-y-2">
                    <svg
                      className="w-12 h-12 stroke-none fill-brand"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="text-xs text-center">stroke-none</div>
                  </div>
                  <div className="space-y-2">
                    <svg
                      className="w-12 h-12 stroke-current text-brand fill-none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="text-xs text-center">stroke-current</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Typography tag="h4" className="text-sm font-medium">
                    Brand Colors
                  </Typography>
                  <div className="space-y-2">
                    <svg
                      className="w-12 h-12 stroke-brand fill-none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="text-xs text-center">stroke-brand</div>
                  </div>
                  <div className="space-y-2">
                    <svg
                      className="w-12 h-12 stroke-red-500 fill-none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <div className="text-xs text-center">stroke-red-500</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Typography tag="h4" className="text-sm font-medium">
                    Stroke Width
                  </Typography>
                  <div className="space-y-3">
                    <svg
                      className="w-12 h-12 stroke-brand stroke-1 fill-none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                      />
                    </svg>
                    <div className="text-xs text-center">stroke-1</div>
                  </div>
                  <div className="space-y-3">
                    <svg
                      className="w-12 h-12 stroke-brand stroke-2 fill-none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                      />
                    </svg>
                    <div className="text-xs text-center">stroke-2</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Typography tag="h4" className="text-sm font-medium">
                    Combined Example
                  </Typography>
                  <div className="w-20 h-20 bg-light-dark rounded-lg flex items-center justify-center">
                    <svg
                      className="w-12 h-12 stroke-brand stroke-2 fill-brand/20"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <div className="text-xs text-center">
                    Star with fill-brand/20 + stroke-brand + stroke-2
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
