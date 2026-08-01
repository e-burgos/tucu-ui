import {
  Alert,
  BasicTable,
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Typography,
} from '@e-burgos/tucu-ui';

const entryColumns = [
  {
    key: 'entry',
    label: 'Import',
    render: (value: unknown) => (
      <code className="text-xs text-brand">{String(value)}</code>
    ),
  },
  { key: 'audience', label: 'Who it is for' },
  { key: 'contains', label: 'What it contains' },
  {
    key: 'size',
    label: 'Size',
    render: (value: unknown) => (
      <code className="text-xs text-gray-600 dark:text-gray-400">
        {String(value)}
      </code>
    ),
  },
];

const entryData = [
  {
    entry: '@e-burgos/tucu-ui/styles',
    audience: 'Apps that do NOT run their own Tailwind build',
    contains:
      'A full compiled stylesheet: Tailwind preflight, design tokens, component styles, every utility the library uses, legacy unprefixed aliases, and the bundled fonts.',
    size: '~660 KB (~79 KB gzip)',
  },
  {
    entry: '@e-burgos/tucu-ui/theme',
    audience: 'Apps that already run Tailwind v4',
    contains:
      'Raw @theme tokens, base/component layers, tucu- prefixed @utility registrations, and all component-support CSS (DataTable tokens, carousel skin, prism colors, scrollbars, range slider, backgrounds). No preflight, no generated utilities — your Tailwind produces those.',
    size: '~90 KB raw, processed by your build',
  },
  {
    entry: '@e-burgos/tucu-ui/fonts',
    audience: 'Optional, for ./theme consumers who want the bundled fonts',
    contains:
      '@font-face declarations for Inter Variable and JetBrains Mono Variable, served from woff2 files inside the package.',
    size: '~1 MB of woff2, loaded on demand by the browser',
  },
];

export function CssArchitecture() {
  return (
    <>
      <HeroCard
        title="CSS Architecture"
        description="How tucu-ui ships its styles: three explicit CSS entry points, no CSS
          smuggled through the JavaScript module graph, fonts as real files
          instead of base64."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-sky-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.FileCode2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <Alert variant="warning">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <LucideIcons.AlertTriangle className="h-4 w-4" />
            Pick exactly one of ./styles or ./theme
          </div>
          <div className="text-sm mt-1">
            <code>./styles</code> bundles a complete Tailwind build.{' '}
            <code>./theme</code> assumes yours. Importing both duplicates
            preflight and theme variables and produces conflicting rules.
          </div>
        </div>
      </Alert>

      <CardContainer className="overflow-hidden">
        <CardTitle title="The Three CSS Entry Points" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-4">
            <BasicTable columns={entryColumns} data={entryData} striped />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle
          title="Setup A — No Tailwind of Your Own"
          className="mt-2 mb-2"
        >
          <div className="w-full p-4 sm:p-6 space-y-4">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              One import. Utilities, tokens, component styles and fonts are all
              pre-compiled. Nothing else to configure.
            </Typography>
            <CodeBlock
              language="css"
              code={`/* src/index.css */
@import '@e-burgos/tucu-ui/styles';`}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle
          title="Setup B — Your App Already Runs Tailwind v4"
          className="mt-2 mb-2"
        >
          <div className="w-full p-4 sm:p-6 space-y-4">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Import the raw theme so your Tailwind compiles it, and — this is
              the part everyone forgets — tell Tailwind to{' '}
              <strong>scan the package</strong>. Tailwind v4 only emits
              utilities it sees used in the sources it scans, and its automatic
              detection never leaves your project root. Without the{' '}
              <code>@source</code> line, class names used inside tucu-ui
              components silently produce no CSS: transparent semantic colors,
              gradients missing their middle stop, unstyled corners of
              components.
            </Typography>
            <CodeBlock
              language="css"
              code={`/* src/index.css */
@import 'tailwindcss';
@import '@e-burgos/tucu-ui/theme';
/* Optional: the bundled Inter + JetBrains Mono variable fonts (~1 MB woff2).
   Skip it if you load your own fonts — tokens fall back to system families. */
@import '@e-burgos/tucu-ui/fonts';

/* REQUIRED: let YOUR Tailwind see the library's class names. */
@source '../node_modules/@e-burgos/tucu-ui';`}
            />
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              In a monorepo that consumes the library from source (aliased to{' '}
              <code>ui/tucu-ui/src</code>), point <code>@source</code> at the
              source directories instead — and remember that any other package
              whose components you render (a docs package, a shared UI package)
              needs its own <code>@source</code> line too:
            </Typography>
            <CodeBlock
              language="css"
              code={`@import 'tailwindcss';
@import '../../../../ui/tucu-ui/src/assets/css/theme.css';
@import '../../../../ui/tucu-ui/src/assets/css/fonts.css'; /* optional */
@source '../../../../ui/tucu-ui/src';
@source '../../../../ui/tucu-docs/src';`}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle
          title="Why No CSS Ships Through the JS Graph"
          className="mt-2 mb-2"
        >
          <div className="w-full p-4 sm:p-6 space-y-4">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Earlier versions imported a compiled stylesheet from{' '}
              <code>index.ts</code> and from the theme provider. That had three
              measurable costs, all fixed by moving delivery to the explicit CSS
              exports:
            </Typography>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <strong>Duplication.</strong> Two JS entry points into the same
                CSS tree meant every @font-face, keyframe and utility appeared
                twice in the compiled bundle.
              </li>
              <li>
                <strong>Base64 fonts.</strong> Vite&apos;s lib mode inlines
                every asset referenced from CSS. Four variable fonts (980 KB on
                disk) became 2.5 MB of base64 — 73% of the old stylesheet. They
                now ship as real woff2 files with relative <code>url()</code>s,
                so browsers only download the faces a page actually uses.
              </li>
              <li>
                <strong>Double Tailwind for source consumers.</strong> Any app
                bundling the library from source received a full compiled
                Tailwind build through the JS graph on top of its own — roughly
                1 MB of dead CSS per app.
              </li>
            </ul>
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Net effect on the published stylesheet:{' '}
              <strong>3.4 MB → ~660 KB</strong> (−81%), with the missing
              component-support CSS (DataTable tokens, carousel skin, prism
              colors) restored for <code>./theme</code> consumers. The only
              styles still delivered via JS are swiper&apos;s own stylesheets,
              imported by the Carousel component from the externalized{' '}
              <code>swiper</code> package — so they load only if you actually
              use the carousel.
            </Typography>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Entry Import Graph" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="text"
              code={`./styles  → globals.css
              ├── tailwindcss (preflight + utilities from library source)
              ├── theme.css ──────────────┐
              ├── legacy-utilities.css    │  shared: tokens, base,
              └── fonts.css               │  component styles
                                          │
./theme   → theme.css ←──────────────────┘
              ├── macos/ (Sonoma + Tahoe foundations)
              ├── base.css · third-party.css · utilities.css
              ├── animations.css · hero-card.css
              └── datatable.css · carousel.css · scrollbar.css
                  range-slider.css · prism-theme.css
                  default-backgrounds.css

./fonts   → fonts.css → fonts/*.woff2 (Inter, JetBrains Mono)`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
}

export default CssArchitecture;
