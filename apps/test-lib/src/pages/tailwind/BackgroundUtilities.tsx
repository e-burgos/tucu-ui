import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '@tucu-ui';

import HeroPage from '../../components/HeroPage';

export function BackgroundUtilities() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Background Utilities"
        description="Complete guide to background utilities in Tailwind CSS v4. Master background colors, images, gradients, and positioning."
        githubButton
        getStartedButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-brand via-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
            <LucideIcons.Image className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Background Architecture */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Background Architecture
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Comprehensive background utilities built with Tailwind CSS v4
            @source directives
          </Typography>
        </div>

        {/* 1. BACKGROUND ATTACHMENT */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Background Attachment
          </Typography>

          <CardContainer>
            <CardTitle title="Background Attachment">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control how background images scroll with content
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="h-32 bg-fixed bg-center bg-cover bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg border-2 border-gray-300 dark:border-gray-600 overflow-hidden">
                      <div className="h-64 p-4 bg-black/50 text-white">
                        <p className="text-sm">Fixed attachment</p>
                        <p className="text-xs opacity-75 mt-1">
                          Scroll to see effect
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-center">bg-fixed</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-32 bg-local bg-center bg-cover bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg border-2 border-gray-300 dark:border-gray-600 overflow-hidden">
                      <div className="h-64 p-4 bg-black/50 text-white">
                        <p className="text-sm">Local attachment</p>
                        <p className="text-xs opacity-75 mt-1">
                          Scroll to see effect
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-center">bg-local</div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-32 bg-scroll bg-center bg-cover bg-gradient-to-r from-green-500 to-teal-500 rounded-lg border-2 border-gray-300 dark:border-gray-600 overflow-hidden">
                      <div className="h-64 p-4 bg-black/50 text-white">
                        <p className="text-sm">Scroll attachment</p>
                        <p className="text-xs opacity-75 mt-1">
                          Scroll to see effect
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-center">bg-scroll</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 2. BACKGROUND CLIP */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Background Clip
          </Typography>

          <CardContainer>
            <CardTitle title="Background Clip">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control how background extends beneath borders and padding
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="p-4 border-4 border-brand bg-clip-border bg-gradient-to-r from-brand to-blue-500 rounded-lg text-white">
                      <div className="bg-black/80 p-2 rounded">
                        Background extends to border
                      </div>
                    </div>
                    <div className="text-xs text-center">bg-clip-border</div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-4 border-4 border-brand bg-clip-padding bg-gradient-to-r from-brand to-blue-500 rounded-lg text-white">
                      <div className="bg-black/80 p-2 rounded">
                        Background stops at padding
                      </div>
                    </div>
                    <div className="text-xs text-center">bg-clip-padding</div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-4 border-4 border-brand bg-clip-content bg-gradient-to-r from-brand to-blue-500 rounded-lg text-white">
                      <div className="bg-black/80 p-2 rounded">
                        Background only on content
                      </div>
                    </div>
                    <div className="text-xs text-center">bg-clip-content</div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-4 border-4 border-brand bg-clip-text bg-gradient-to-r from-brand to-blue-500 rounded-lg text-transparent">
                      <div className="bg-black/80 p-2 rounded">
                        Text gradient effect
                      </div>
                    </div>
                    <div className="text-xs text-center">bg-clip-text</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 3. BACKGROUND COLORS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Background Colors
          </Typography>

          <CardContainer>
            <CardTitle title="Background Colors">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Solid background colors and brand variations
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="w-full h-16 bg-red-500 rounded flex items-center justify-center text-white text-xs font-medium">
                    bg-red-500
                  </div>
                  <div className="w-full h-16 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium">
                    bg-blue-500
                  </div>
                  <div className="w-full h-16 bg-green-500 rounded flex items-center justify-center text-white text-xs font-medium">
                    bg-green-500
                  </div>
                  <div className="w-full h-16 bg-yellow-500 rounded flex items-center justify-center text-black text-xs font-medium">
                    bg-yellow-500
                  </div>
                  <div className="w-full h-16 bg-brand rounded flex items-center justify-center text-white text-xs font-medium">
                    bg-brand
                  </div>
                  <div className="w-full h-16 bg-brand/80 rounded flex items-center justify-center text-white text-xs font-medium">
                    bg-brand/80
                  </div>
                  <div className="w-full h-16 bg-brand/50 rounded flex items-center justify-center text-black text-xs font-medium">
                    bg-brand/50
                  </div>
                  <div className="w-full h-16 bg-brand/20 rounded flex items-center justify-center text-black text-xs font-medium">
                    bg-brand/20
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 4. BACKGROUND GRADIENTS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Background Gradients
          </Typography>

          <CardContainer>
            <CardTitle title="Gradient Directions">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Linear gradient directions
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="w-full h-20 bg-gradient-to-t from-brand to-blue-500 rounded flex items-end justify-center pb-2 text-white text-xs font-medium">
                    to-t
                  </div>
                  <div className="w-full h-20 bg-gradient-to-r from-brand to-blue-500 rounded flex items-center justify-start pl-2 text-white text-xs font-medium">
                    to-r
                  </div>
                  <div className="w-full h-20 bg-gradient-to-b from-brand to-blue-500 rounded flex items-start justify-center pt-2 text-white text-xs font-medium">
                    to-b
                  </div>
                  <div className="w-full h-20 bg-gradient-to-l from-brand to-blue-500 rounded flex items-center justify-end pr-2 text-white text-xs font-medium">
                    to-l
                  </div>
                  <div className="w-full h-20 bg-gradient-to-tr from-brand to-blue-500 rounded flex items-start justify-start p-2 text-white text-xs font-medium">
                    to-tr
                  </div>
                  <div className="w-full h-20 bg-gradient-to-br from-brand to-blue-500 rounded flex items-end justify-start p-2 text-white text-xs font-medium">
                    to-br
                  </div>
                  <div className="w-full h-20 bg-gradient-to-bl from-brand to-blue-500 rounded flex items-end justify-end p-2 text-white text-xs font-medium">
                    to-bl
                  </div>
                  <div className="w-full h-20 bg-gradient-to-tl from-brand to-blue-500 rounded flex items-start justify-end p-2 text-white text-xs font-medium">
                    to-tl
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer>
            <CardTitle title="Complex Gradients">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Multi-stop and via gradients
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full h-20 bg-gradient-to-r from-brand via-purple-500 to-blue-500 rounded flex items-center justify-center text-white text-sm font-medium">
                    from-brand via-purple-500 to-blue-500
                  </div>
                  <div className="w-full h-20 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 rounded flex items-center justify-center text-white text-sm font-medium">
                    Multi-stop gradient
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 5. BACKGROUND POSITION */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Background Position
          </Typography>

          <CardContainer>
            <CardTitle title="Background Position">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control background image positioning
                </Typography>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  <div className="w-20 h-20 bg-center bg-contain bg-no-repeat bg-red-500 rounded border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="w-20 h-20 bg-top bg-contain bg-no-repeat bg-green-500 rounded border-2 border-gray-300 dark:border-gray-600 flex items-start justify-center pt-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="w-20 h-20 bg-bottom bg-contain bg-no-repeat bg-blue-500 rounded border-2 border-gray-300 dark:border-gray-600 flex items-end justify-center pb-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="w-20 h-20 bg-left bg-contain bg-no-repeat bg-purple-500 rounded border-2 border-gray-300 dark:border-gray-600 flex items-center justify-start pl-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="w-20 h-20 bg-right bg-contain bg-no-repeat bg-yellow-500 rounded border-2 border-gray-300 dark:border-gray-600 flex items-center justify-end pr-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-xs text-center">
                  <div>bg-center</div>
                  <div>bg-top</div>
                  <div>bg-bottom</div>
                  <div>bg-left</div>
                  <div>bg-right</div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 6. BACKGROUND REPEAT */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Background Repeat
          </Typography>

          <CardContainer>
            <CardTitle title="Background Repeat">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control how background images repeat
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div
                      className="h-20 bg-repeat bg-center bg-auto rounded border-2 border-gray-300 dark:border-gray-600"
                      style={{
                        backgroundImage:
                          'url("https://plus.unsplash.com/premium_photo-1709579654090-3f3ca8f8416b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJhbGV6YSUyMHBhaXNhamV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000")',
                      }}
                    ></div>
                    <div className="text-xs text-center">bg-repeat</div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="h-20 bg-no-repeat bg-center bg-auto rounded border-2 border-gray-300 dark:border-gray-600"
                      style={{
                        backgroundImage:
                          'url("https://plus.unsplash.com/premium_photo-1709579654090-3f3ca8f8416b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJhbGV6YSUyMHBhaXNhamV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000")',
                      }}
                    ></div>
                    <div className="text-xs text-center">bg-no-repeat</div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="h-20 bg-repeat-x bg-center bg-auto rounded border-2 border-gray-300 dark:border-gray-600"
                      style={{
                        backgroundImage:
                          'url("https://plus.unsplash.com/premium_photo-1709579654090-3f3ca8f8416b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJhbGV6YSUyMHBhaXNhamV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000")',
                      }}
                    ></div>
                    <div className="text-xs text-center">bg-repeat-x</div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="h-20 bg-repeat-y bg-center bg-auto rounded border-2 border-gray-300 dark:border-gray-600"
                      style={{
                        backgroundImage:
                          'url("https://plus.unsplash.com/premium_photo-1709579654090-3f3ca8f8416b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJhbGV6YSUyMHBhaXNhamV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000")',
                      }}
                    ></div>
                    <div className="text-xs text-center">bg-repeat-y</div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 7. BACKGROUND SIZE */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Background Size
          </Typography>

          <CardContainer>
            <CardTitle title="Background Size">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control background image sizing
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div
                      className="h-20 bg-auto bg-center bg-no-repeat rounded border-2 border-gray-300 dark:border-gray-600"
                      style={{
                        backgroundImage:
                          'url("https://plus.unsplash.com/premium_photo-1709579654090-3f3ca8f8416b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJhbGV6YSUyMHBhaXNhamV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000")',
                      }}
                    ></div>
                    <div className="text-xs text-center">bg-auto</div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="h-20 bg-cover bg-center bg-no-repeat rounded border-2 border-gray-300 dark:border-gray-600"
                      style={{
                        backgroundImage:
                          'url("https://plus.unsplash.com/premium_photo-1709579654090-3f3ca8f8416b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJhbGV6YSUyMHBhaXNhamV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000")',
                      }}
                    ></div>
                    <div className="text-xs text-center">bg-cover</div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="h-20 bg-contain bg-center bg-no-repeat rounded border-2 border-gray-300 dark:border-gray-600"
                      style={{
                        backgroundImage:
                          'url("https://plus.unsplash.com/premium_photo-1709579654090-3f3ca8f8416b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJhbGV6YSUyMHBhaXNhamV8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000")',
                      }}
                    ></div>
                    <div className="text-xs text-center">bg-contain</div>
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
