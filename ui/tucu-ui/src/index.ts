import type {} from './datatable/overrides';
// NOTE: no global CSS is imported here on purpose. Styles ship exclusively
// through the package's CSS exports — `./styles` (compiled bundle for
// non-Tailwind consumers) and `./theme` (tokens + component styles for
// consumers running their own Tailwind). Importing a compiled Tailwind build
// from the JS graph used to inject ~1 MB of duplicate CSS into every consumer
// that bundles this library from source.
// Namespace re-exports must import the external packages directly:
// api-extractor cannot roll up a namespace built from a local module
// that star-exports another module.
import * as LucideIconsImport from 'lucide-react';
import * as ReactRouterImport from 'react-router-dom';
import * as SwiperReactImport from 'swiper/react';
import * as SwiperModulesImport from 'swiper/modules';

export * from './components';
export * from './datatable';
export * from './docs-kit';
export * from './hooks';
export * from './libs';
export * from './themes';
export { LucideIconsImport as LucideIcons };
export { ReactRouterImport as ReactRouter };
// SwiperReact historically merged swiper/react and swiper/modules into a
// single namespace; a typed object keeps that public shape.
export const SwiperReact: typeof SwiperReactImport &
  typeof SwiperModulesImport = {
  ...SwiperReactImport,
  ...SwiperModulesImport,
};
