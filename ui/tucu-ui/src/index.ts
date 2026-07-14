import type {} from './datatable/overrides';
import './styles.css';
// Namespace re-exports must import the external packages directly:
// api-extractor cannot roll up a namespace built from a local module
// that star-exports another module.
import * as LucideIconsImport from 'lucide-react';
import * as ReactRouterImport from 'react-router-dom';
import * as SwiperReactImport from 'swiper/react';
import * as SwiperModulesImport from 'swiper/modules';

export * from './components';
export * from './datatable';
export * from './demo';
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
