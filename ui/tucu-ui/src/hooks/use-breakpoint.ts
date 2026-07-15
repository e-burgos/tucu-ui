import * as createBreakpointModule from 'react-use/lib/factory/createBreakpoint';
import { unwrapCjsDefault } from './internal/cjs-esm-interop';

const createBreakpoint = unwrapCjsDefault<
  (breakpoints?: Record<string, number>) => () => string
>(createBreakpointModule);

const breakPoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
  '3xl': 1780,
  '4xl': 2160,
};

export const useBreakpoint = createBreakpoint(breakPoints);
