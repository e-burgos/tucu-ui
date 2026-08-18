// .mts is load-bearing — see the note at the top of vite.config.mts.
import { defineConfig, PluginOption } from 'vite';
import * as path from 'path';
import { existsSync, rmSync } from 'fs';
import tailwindcss from '@tailwindcss/vite';

/**
 * Dedicated build for the package's CSS artifacts. Runs after the main lib
 * build (triggered from vite.config.mts's buildStylesPlugin), into the same
 * dist directory, with emptyOutDir off.
 *
 * Why a separate build instead of `import './styles.css'` in src/index.ts:
 * a JS-side import ships a full compiled Tailwind bundle to every consumer
 * that bundles the library from source, and having two JS entry points into
 * the same CSS tree (index.ts and theme-wrapper.tsx) used to duplicate the
 * entire aggregate — every @font-face, keyframe and utility appeared twice
 * in dist/index.css.
 *
 * Why not lib mode: Vite's lib mode force-inlines every asset referenced
 * from CSS as a base64 data URI. The four variable fonts (980 KB on disk)
 * became 2.5 MB of base64 — 73% of the old artifact. A regular build emits
 * them as files and rewrites the url()s.
 *
 * Outputs:
 *   dist/index.css     — compiled bundle (`./styles` export)
 *   dist/fonts.css     — standalone @font-face sheet (`./fonts` export)
 *   dist/fonts/*.woff2 — Inter + JetBrains Mono variable fonts
 */
const cssDir = path.resolve(__dirname, 'src/assets/css');
const outDir = path.resolve(__dirname, '../../dist/ui/tucu-ui');

/** Rollup emits a JS stub per input even when the input is pure CSS. */
const dropJsStubsPlugin = (): PluginOption => ({
  name: 'drop-js-stubs',
  closeBundle: () => {
    for (const stub of ['index.stub.js', 'fonts.stub.js']) {
      const p = path.join(outDir, stub);
      if (existsSync(p)) rmSync(p);
    }
  },
});

export default defineConfig({
  root: __dirname,
  // Relative base so url(fonts/…) stays relative to the CSS file — the
  // default '/' would emit absolute /fonts/… paths, broken for npm consumers
  // resolving the stylesheet from inside node_modules.
  base: './',
  // Its own cache dir — sharing the main build's cache confuses Vite.
  cacheDir: '../../node_modules/.vite/ui/tucu-ui-styles',
  plugins: [tailwindcss() as PluginOption, dropJsStubsPlugin()],
  build: {
    outDir,
    emptyOutDir: false,
    // Never inline assets: fonts must ship as real files.
    assetsInlineLimit: 0,
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        index: path.join(cssDir, 'globals.css'),
        fonts: path.join(cssDir, 'fonts.css'),
      },
      output: {
        entryFileNames: '[name].stub.js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? '';
          if (name.endsWith('.css')) return '[name].css';
          if (name.endsWith('.woff2')) return 'fonts/[name][extname]';
          return 'assets/[name][extname]';
        },
      },
    },
  },
});
