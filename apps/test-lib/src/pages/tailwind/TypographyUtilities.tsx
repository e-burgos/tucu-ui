import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '@tucu-ui';

import HeroPage from '../../components/HeroPage';

export function TypographyUtilities() {
  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="Typography Utilities"
        description="Complete typography system with font families, sizes, weights, spacing, and text formatting utilities."
        githubButton
        docsButton="tailwind-utilities"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg border border-blue-500/50">
            <div className="w-16 h-16 bg-white/20 rounded-lg border-4 border-white/60 flex items-center justify-center">
              <div className="text-white/90 text-2xl font-bold">Aa</div>
            </div>
          </div>
        }
      />

      {/* Typography Architecture */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Font & Text Styling
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Professional typography utilities built with Tailwind CSS v4 @source
            directives
          </Typography>
        </div>

        {/* 1. FONT FAMILY */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Font Family
          </Typography>

          <CardContainer>
            <CardTitle title="Font Family Types">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Choose from sans-serif, serif, and monospace font stacks
                </Typography>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="font-sans text-lg">
                        <strong className="text-brand">font-sans:</strong> The
                        quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="font-serif text-lg">
                        <strong className="text-brand">font-serif:</strong> The
                        quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="font-mono text-lg">
                        <strong className="text-brand">font-mono:</strong> The
                        quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 2. FONT SIZE */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Font Size
          </Typography>

          <CardContainer>
            <CardTitle title="Font Size Scale">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Comprehensive font size scale from extra small to extra large
                </Typography>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                      <span className="text-xs text-brand">text-xs:</span>
                      <span className="text-xs ml-2">
                        The quick brown fox jumps over the lazy dog
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                      <span className="text-sm text-brand">text-sm:</span>
                      <span className="text-sm ml-2">
                        The quick brown fox jumps over the lazy dog
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                      <span className="text-base text-brand">text-base:</span>
                      <span className="text-base ml-2">
                        The quick brown fox jumps over the lazy dog
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                      <span className="text-lg text-brand">text-lg:</span>
                      <span className="text-lg ml-2">
                        The quick brown fox jumps over the lazy dog
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                      <span className="text-xl text-brand">text-xl:</span>
                      <span className="text-xl ml-2">
                        The quick brown fox jumps over the lazy dog
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                      <span className="text-2xl text-brand">text-2xl:</span>
                      <span className="text-2xl ml-2">
                        The quick brown fox jumps
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                      <span className="text-3xl text-brand">text-3xl:</span>
                      <span className="text-3xl ml-2">The quick brown</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 3. FONT SMOOTHING */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Font Smoothing
          </Typography>

          <CardContainer>
            <CardTitle title="Antialiasing Options">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control font rendering quality and antialiasing
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="antialiased text-lg">
                        <strong className="text-brand">antialiased:</strong> The
                        quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                    <div className="text-xs text-center text-gray-600 dark:text-gray-300">
                      Smooth antialiasing
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="subpixel-antialiased text-lg">
                        <strong className="text-brand">
                          subpixel-antialiased:
                        </strong>{' '}
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                    <div className="text-xs text-center text-gray-600 dark:text-gray-300">
                      Subpixel antialiasing
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 4. FONT STYLE */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Font Style
          </Typography>

          <CardContainer>
            <CardTitle title="Italic & Normal Styles">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Apply italic styling or reset to normal
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="not-italic text-lg">
                        <strong className="text-brand">not-italic:</strong> The
                        quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="italic text-lg">
                        <strong className="text-brand">italic:</strong> The
                        quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 5. FONT WEIGHT */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Font Weight
          </Typography>

          <CardContainer>
            <CardTitle title="Font Weight Scale">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Comprehensive font weight options from thin to black
                </Typography>
                <div className="space-y-3">
                  <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="font-thin text-sm text-brand">
                      font-thin (100):
                    </span>
                    <span className="font-thin ml-2">The quick brown fox</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="font-light text-sm text-brand">
                      font-light (300):
                    </span>
                    <span className="font-light ml-2">The quick brown fox</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="font-normal text-sm text-brand">
                      font-normal (400):
                    </span>
                    <span className="font-normal ml-2">
                      The quick brown fox
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="font-medium text-sm text-brand">
                      font-medium (500):
                    </span>
                    <span className="font-medium ml-2">
                      The quick brown fox
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="font-semibold text-sm text-brand">
                      font-semibold (600):
                    </span>
                    <span className="font-semibold ml-2">
                      The quick brown fox
                    </span>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="font-bold text-sm text-brand">
                      font-bold (700):
                    </span>
                    <span className="font-bold ml-2">The quick brown fox</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="font-black text-sm text-brand">
                      font-black (900):
                    </span>
                    <span className="font-black ml-2">The quick brown fox</span>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 6. FONT VARIANT NUMERIC */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Font Variant Numeric
          </Typography>

          <CardContainer>
            <CardTitle title="Numeric Styling Options">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control how numbers and fractions are displayed
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Number Styles
                    </Typography>
                    <div className="space-y-2">
                      <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="normal-nums text-sm text-brand">
                          normal-nums:
                        </span>
                        <span className="normal-nums ml-2">1234567890</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="lining-nums text-sm text-brand">
                          lining-nums:
                        </span>
                        <span className="lining-nums ml-2">1234567890</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="oldstyle-nums text-sm text-brand">
                          oldstyle-nums:
                        </span>
                        <span className="oldstyle-nums ml-2">1234567890</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Fraction & Spacing
                    </Typography>
                    <div className="space-y-2">
                      <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="diagonal-fractions text-sm text-brand">
                          diagonal-fractions:
                        </span>
                        <span className="diagonal-fractions ml-2">1/2 3/4</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="stacked-fractions text-sm text-brand">
                          stacked-fractions:
                        </span>
                        <span className="stacked-fractions ml-2">1/2 3/4</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="tabular-nums text-sm text-brand">
                          tabular-nums:
                        </span>
                        <span className="tabular-nums ml-2 font-mono">
                          12 345 6789
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 7. LETTER SPACING */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Letter Spacing
          </Typography>

          <CardContainer>
            <CardTitle title="Tracking Options">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control space between characters for improved readability
                </Typography>
                <div className="space-y-3">
                  <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="tracking-tighter text-sm text-brand">
                      tracking-tighter:
                    </span>
                    <span className="tracking-tighter ml-2">
                      The quick brown fox
                    </span>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="tracking-tight text-sm text-brand">
                      tracking-tight:
                    </span>
                    <span className="tracking-tight ml-2">
                      The quick brown fox
                    </span>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="tracking-normal text-sm text-brand">
                      tracking-normal:
                    </span>
                    <span className="tracking-normal ml-2">
                      The quick brown fox
                    </span>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="tracking-wide text-sm text-brand">
                      tracking-wide:
                    </span>
                    <span className="tracking-wide ml-2">
                      The quick brown fox
                    </span>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="tracking-wider text-sm text-brand">
                      tracking-wider:
                    </span>
                    <span className="tracking-wider ml-2">
                      The quick brown fox
                    </span>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <span className="tracking-widest text-sm text-brand">
                      tracking-widest:
                    </span>
                    <span className="tracking-widest ml-2">
                      The quick brown fox
                    </span>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 8. LINE CLAMP & LINE HEIGHT */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Line Clamp & Line Height
          </Typography>

          <CardContainer>
            <CardTitle title="Text Truncation & Spacing">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control text overflow and line spacing
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Line Clamp
                    </Typography>
                    <div className="space-y-2">
                      <div className="w-full max-w-md h-20 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
                        <p className="line-clamp-2 text-sm">
                          <strong className="text-brand">line-clamp-2:</strong>{' '}
                          This is a long paragraph that will be truncated after
                          two lines. The text will continue but won't be visible
                          beyond the second line.
                        </p>
                      </div>
                      <div className="w-full max-w-md h-20 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
                        <p className="line-clamp-3 text-sm">
                          <strong className="text-brand">line-clamp-3:</strong>{' '}
                          This is a long paragraph that will be truncated after
                          three lines. The text will continue but won't be
                          visible beyond the third line.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Line Height
                    </Typography>
                    <div className="space-y-2">
                      <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="leading-tight text-sm">
                          <strong className="text-brand">leading-tight:</strong>
                          <br />
                          Tight line spacing for compact layouts
                        </p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="leading-normal text-sm">
                          <strong className="text-brand">
                            leading-normal:
                          </strong>
                          <br />
                          Standard line spacing for comfortable reading
                        </p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="leading-loose text-sm">
                          <strong className="text-brand">leading-loose:</strong>
                          <br />
                          Generous line spacing for better readability
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 9. LIST STYLE */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            List Style
          </Typography>

          <CardContainer>
            <CardTitle title="List Formatting">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control list marker positioning and types
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      List Position
                    </Typography>
                    <div className="space-y-2">
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <ul className="list-inside text-sm">
                          <li>
                            <strong className="text-brand">list-inside:</strong>{' '}
                            Items are inside the content flow
                          </li>
                          <li>Second item with longer text</li>
                          <li>Third item here</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <ul className="list-outside text-sm">
                          <li>
                            <strong className="text-brand">
                              list-outside:
                            </strong>{' '}
                            Items are outside the content flow
                          </li>
                          <li>Second item with longer text</li>
                          <li>Third item here</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      List Types
                    </Typography>
                    <div className="space-y-2">
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <ul className="list-disc text-sm">
                          <li>
                            <strong className="text-brand">list-disc:</strong>{' '}
                            Bulleted list
                          </li>
                          <li>Second item</li>
                          <li>Third item</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <ol className="list-decimal text-sm">
                          <li>
                            <strong className="text-brand">
                              list-decimal:
                            </strong>{' '}
                            Numbered list
                          </li>
                          <li>Second item</li>
                          <li>Third item</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 10. TEXT ALIGN & COLORS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Text Alignment & Colors
          </Typography>

          <CardContainer>
            <CardTitle title="Text Alignment & Color Palette">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control text positioning and semantic color utilities
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Text Alignment
                    </Typography>
                    <div className="space-y-2">
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="text-left text-sm">
                          <strong className="text-brand">text-left:</strong>{' '}
                          Left aligned text for standard layouts
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="text-center text-sm">
                          <strong className="text-brand">text-center:</strong>{' '}
                          Center aligned text for headings
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                          <p className="text-right text-sm">
                            <strong className="text-brand">text-right:</strong>{' '}
                            Right aligned text for special layouts
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Text Colors
                    </Typography>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-center">
                        <span className="text-brand text-sm block">
                          text-brand
                        </span>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-center">
                        <span className="text-red-500 text-sm block">
                          text-red-500
                        </span>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-center">
                        <span className="text-green-500 text-sm block">
                          text-green-500
                        </span>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-center">
                        <span className="text-blue-500 text-sm block">
                          text-blue-500
                        </span>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-center">
                        <span className="text-gray-600 text-sm block">
                          text-gray-600
                        </span>
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-center">
                        <span className="text-gray-900 text-sm block">
                          text-gray-900
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 11. TEXT DECORATION */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Text Decoration
          </Typography>

          <CardContainer>
            <CardTitle title="Decoration Styles & Options">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Underline, overline, and strikethrough text decorations
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Decoration Types
                    </Typography>
                    <div className="space-y-2">
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="underline text-lg">
                          <strong className="text-brand">underline:</strong>{' '}
                          Underlined text
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="overline text-lg">
                          <strong className="text-brand">overline:</strong>{' '}
                          Overlined text
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                          <p className="line-through text-lg">
                            <strong className="text-brand">
                              line-through:
                            </strong>{' '}
                            Strikethrough text
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Decoration Styles
                    </Typography>
                    <div className="space-y-2">
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="underline decoration-solid text-lg">
                          <strong className="text-brand">
                            decoration-solid:
                          </strong>{' '}
                          Solid underline
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="underline decoration-dashed text-lg">
                          <strong className="text-brand">
                            decoration-dashed:
                          </strong>{' '}
                          Dashed underline
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="underline decoration-wavy text-lg">
                          <strong className="text-brand">
                            decoration-wavy:
                          </strong>{' '}
                          Wavy underline
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="underline decoration-2 decoration-brand text-lg">
                          <strong className="text-brand">
                            decoration-2 decoration-brand:
                          </strong>{' '}
                          Thick brand underline
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 12. TEXT TRANSFORM & OVERFLOW */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Text Transform & Overflow
          </Typography>

          <CardContainer>
            <CardTitle title="Case Transformation & Text Handling">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control text case and handle overflow scenarios
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Text Transform
                    </Typography>
                    <div className="space-y-2">
                      <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="uppercase text-sm text-brand">
                          uppercase:
                        </span>
                        <span className="uppercase ml-2">hello world</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="lowercase text-sm text-brand">
                          lowercase:
                        </span>
                        <span className="lowercase ml-2">HELLO WORLD</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="capitalize text-sm text-brand">
                          capitalize:
                        </span>
                        <span className="capitalize ml-2">hello world</span>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <span className="normal-case text-sm text-brand">
                          normal-case:
                        </span>
                        <span className="normal-case ml-2">HELLO WORLD</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Text Overflow
                    </Typography>
                    <div className="space-y-2">
                      <div className="w-full max-w-xs h-12 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
                        <p className="truncate text-sm">
                          <strong className="text-brand">truncate:</strong> This
                          text will be truncated with ellipsis if it's too long
                        </p>
                      </div>
                      <div className="w-full max-w-xs h-12 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
                        <p className="text-ellipsis text-sm overflow-hidden">
                          <strong className="text-brand">text-ellipsis:</strong>{' '}
                          This text will show ellipsis at the end
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 13. TEXT WRAP & INDENTATION */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Text Wrap & Indentation
          </Typography>

          <CardContainer>
            <CardTitle title="Wrapping & Spacing Control">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control text wrapping behavior and indentation
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Text Wrap
                    </Typography>
                    <div className="space-y-2">
                      <div className="w-full max-w-md p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="text-wrap text-sm">
                          <strong className="text-brand">text-wrap:</strong>{' '}
                          This text will wrap normally at word boundaries and
                          fill the available space.
                        </p>
                      </div>
                      <div className="w-full max-w-md p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
                        <p className="text-nowrap text-sm">
                          <strong className="text-brand">text-nowrap:</strong>{' '}
                          This text will not wrap and may overflow its
                          container.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Text Indent
                    </Typography>
                    <div className="space-y-2">
                      <div className="w-full max-w-md p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="indent-0 text-sm">
                          <strong className="text-brand">indent-0:</strong> No
                          indentation for the first line of text.
                        </p>
                      </div>
                      <div className="w-full max-w-md p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="indent-4 text-sm">
                          <strong className="text-brand">indent-4:</strong>{' '}
                          First line indented by 1rem for paragraph formatting.
                        </p>
                      </div>
                      <div className="w-full max-w-md p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="indent-8 text-sm">
                          <strong className="text-brand">indent-8:</strong>{' '}
                          First line indented by 2rem for deeper nesting.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 14. VERTICAL ALIGN & WHITESPACE */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Vertical Align & Whitespace
          </Typography>

          <CardContainer>
            <CardTitle title="Alignment & Spacing Control">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control inline element alignment and whitespace handling
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Vertical Align
                    </Typography>
                    <div className="space-y-3">
                      <div className="h-16 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded flex items-center">
                        <span className="w-4 h-4 bg-brand rounded align-baseline mr-2"></span>
                        <span className="text-sm text-brand">
                          align-baseline:
                        </span>
                        <span className="ml-2">Text aligned to baseline</span>
                      </div>
                      <div className="h-16 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded flex items-center">
                        <span className="w-4 h-4 bg-green-500 rounded align-middle mr-2"></span>
                        <span className="text-sm text-green-600">
                          align-middle:
                        </span>
                        <span className="ml-2">Text aligned to middle</span>
                      </div>
                      <div className="h-16 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded flex items-center">
                        <span className="w-4 h-4 bg-blue-500 rounded align-top mr-2"></span>
                        <span className="text-sm text-blue-600">
                          align-top:
                        </span>
                        <span className="ml-2">Text aligned to top</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Whitespace
                    </Typography>
                    <div className="space-y-2">
                      <div className="w-full max-w-md p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="whitespace-normal text-sm">
                          <strong className="text-brand">
                            whitespace-normal:
                          </strong>{' '}
                          Normal whitespace handling with wrapping.
                        </p>
                      </div>
                      <div className="w-full max-w-md p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
                        <p className="whitespace-nowrap text-sm">
                          <strong className="text-brand">
                            whitespace-nowrap:
                          </strong>{' '}
                          No wrapping, may overflow.
                        </p>
                      </div>
                      <div className="w-full max-w-md p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="whitespace-pre text-sm">
                          <strong className="text-brand">
                            whitespace-pre:
                          </strong>{' '}
                          Preserves whitespace and line breaks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </section>

        {/* 15. WORD BREAK & HYPHENS */}
        <section className="space-y-6">
          <Typography tag="h3" className="text-xl font-semibold">
            Word Break & Hyphens
          </Typography>

          <CardContainer>
            <CardTitle title="Text Breaking & Hyphenation">
              <div className="space-y-4">
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Control how words break across lines and hyphenation behavior
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Word Break
                    </Typography>
                    <div className="space-y-2">
                      <div className="w-full max-w-xs p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="break-normal text-sm">
                          <strong className="text-brand">break-normal:</strong>{' '}
                          Normal word breaking at natural boundaries.
                        </p>
                      </div>
                      <div className="w-full max-w-xs p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="break-words text-sm">
                          <strong className="text-brand">break-words:</strong>{' '}
                          Verylongwordsthatwouldnormallyoverflow.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography tag="h4" className="text-sm font-medium">
                      Hyphens
                    </Typography>
                    <div className="space-y-2">
                      <div className="w-full max-w-xs p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="hyphens-none text-sm">
                          <strong className="text-brand">hyphens-none:</strong>{' '}
                          No hyphenation, words may overflow.
                        </p>
                      </div>
                      <div className="w-full max-w-xs p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                        <p className="hyphens-auto text-sm">
                          <strong className="text-brand">hyphens-auto:</strong>{' '}
                          Automatic hyphenation when appropriate.
                        </p>
                      </div>
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
