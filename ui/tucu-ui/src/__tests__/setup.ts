import '@testing-library/jest-dom';
import { vi } from 'vitest';

// --- Mock demo pages (they use LucideIcons namespace which crashes in test) ---
vi.mock('../demo/pages', () => ({}));
vi.mock('../demo/pages/index', () => ({}));

// --- Mock Swiper (carousel dependency) ---
vi.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: unknown }) => children,
  SwiperSlide: ({ children }: { children: unknown }) => children,
}));
vi.mock('swiper/modules', () => {
  const mod = {};
  return {
    Navigation: mod,
    Pagination: mod,
    Scrollbar: mod,
    A11y: mod,
    Autoplay: mod,
    EffectFade: mod,
    EffectCoverflow: mod,
    Mousewheel: mod,
    EffectCube: mod,
    EffectFlip: mod,
    EffectCards: mod,
    EffectCreative: mod,
  };
});
vi.mock('swiper/css', () => ({}));
vi.mock('swiper/css/navigation', () => ({}));
vi.mock('swiper/css/pagination', () => ({}));
vi.mock('swiper/css/scrollbar', () => ({}));

// --- Browser API Mocks ---

// IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
  root = null;
  rootMargin = '';
  thresholds = [];
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
vi.stubGlobal('ResizeObserver', MockResizeObserver);

// matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// scrollTo
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
Element.prototype.scrollTo =
  vi.fn() as unknown as typeof Element.prototype.scrollTo;
Element.prototype.scrollIntoView = vi.fn();

// getComputedStyle
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = (elt: Element, pseudoElt?: string | null) => {
  try {
    return originalGetComputedStyle(elt, pseudoElt);
  } catch {
    return {
      getPropertyValue: () => '',
    } as unknown as CSSStyleDeclaration;
  }
};

// requestAnimationFrame / cancelAnimationFrame
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (cb: FrameRequestCallback) =>
    setTimeout(cb, 0) as unknown as number;
  window.cancelAnimationFrame = (id: number) => clearTimeout(id);
}

// crypto.randomUUID
if (!globalThis.crypto?.randomUUID) {
  Object.defineProperty(globalThis, 'crypto', {
    value: {
      randomUUID: () =>
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }),
      getRandomValues: (arr: Uint8Array) => {
        for (let i = 0; i < arr.length; i++)
          arr[i] = Math.floor(Math.random() * 256);
        return arr;
      },
    },
  });
}

// --- Module Mocks ---

// Mock framer-motion
vi.mock('framer-motion', () => {
  const React = require('react');
  const motion = new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (prop === 'custom') return () => ({});
        return React.forwardRef(
          (props: Record<string, unknown>, ref: unknown) => {
            const {
              children,
              initial,
              animate,
              exit,
              transition,
              variants,
              whileHover,
              whileTap,
              whileInView,
              ...rest
            } = props;
            return React.createElement(
              prop as string,
              { ...rest, ref },
              children
            );
          }
        );
      },
    }
  );
  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn(), set: vi.fn() }),
    useInView: () => true,
    useMotionValue: (initial: number) => ({
      get: () => initial,
      set: vi.fn(),
      onChange: vi.fn(),
    }),
    useTransform: () => ({ get: () => 0, set: vi.fn(), onChange: vi.fn() }),
    useSpring: () => ({ get: () => 0, set: vi.fn(), onChange: vi.fn() }),
    useReducedMotion: () => false,
    LayoutGroup: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Mock swiper modules
vi.mock('swiper/react', () => {
  const React = require('react');
  return {
    Swiper: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', { 'data-testid': 'swiper' }, children),
    SwiperSlide: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', { 'data-testid': 'swiper-slide' }, children),
  };
});

vi.mock('swiper/modules', () => ({
  Navigation: {},
  Pagination: {},
  Autoplay: {},
  EffectFade: {},
  Thumbs: {},
  FreeMode: {},
}));

vi.mock('swiper/css', () => ({}));
vi.mock('swiper/css/navigation', () => ({}));
vi.mock('swiper/css/pagination', () => ({}));
vi.mock('swiper/css/effect-fade', () => ({}));
vi.mock('swiper/css/thumbs', () => ({}));
vi.mock('swiper/css/free-mode', () => ({}));

// Mock recharts
vi.mock('recharts', () => {
  const React = require('react');
  const createMockComponent = (name: string) => {
    return ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) =>
      React.createElement(
        'div',
        { 'data-testid': `recharts-${name.toLowerCase()}`, ...props },
        children
      );
  };
  return {
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) =>
      React.createElement(
        'div',
        {
          'data-testid': 'responsive-container',
          style: { width: 500, height: 300 },
        },
        children
      ),
    LineChart: createMockComponent('LineChart'),
    BarChart: createMockComponent('BarChart'),
    AreaChart: createMockComponent('AreaChart'),
    PieChart: createMockComponent('PieChart'),
    RadarChart: createMockComponent('RadarChart'),
    ComposedChart: createMockComponent('ComposedChart'),
    Line: createMockComponent('Line'),
    Bar: createMockComponent('Bar'),
    Area: createMockComponent('Area'),
    Pie: createMockComponent('Pie'),
    Radar: createMockComponent('Radar'),
    XAxis: createMockComponent('XAxis'),
    YAxis: createMockComponent('YAxis'),
    CartesianGrid: createMockComponent('CartesianGrid'),
    Tooltip: createMockComponent('Tooltip'),
    Legend: createMockComponent('Legend'),
    Cell: createMockComponent('Cell'),
    PolarGrid: createMockComponent('PolarGrid'),
    PolarAngleAxis: createMockComponent('PolarAngleAxis'),
    PolarRadiusAxis: createMockComponent('PolarRadiusAxis'),
    RadialBarChart: createMockComponent('RadialBarChart'),
    RadialBar: createMockComponent('RadialBar'),
    Scatter: createMockComponent('Scatter'),
    ScatterChart: createMockComponent('ScatterChart'),
  };
});

// Note: CSS is handled by vitest config css:false
