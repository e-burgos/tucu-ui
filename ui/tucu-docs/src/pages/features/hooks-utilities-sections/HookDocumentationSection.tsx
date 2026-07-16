import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '@e-burgos/tucu-ui';

const HookDocumentationSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="Hook Documentation"
        description="Complete API reference for all 14 hooks with signatures, parameters, return types, and usage examples."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-indigo-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.BookOpen className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Responsive & Layout Hooks
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Screen size detection and element measurement
          </Typography>
        </div>

        <CardContainer className="overflow-hidden">
          <CardTitle title="useBreakpoint & useIsMobile" className="mt-2 mb-2">
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useBreakpoint()
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Returns the current screen breakpoint name. Built on
                    createBreakpoint from react-use.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const breakpoint = useBreakpoint();
// Returns: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

// Breakpoint sizes:
// xs: 480px, sm: 640px, md: 768px, lg: 1024px
// xl: 1280px, 2xl: 1440px, 3xl: 1780px, 4xl: 2160px`}
                    />
                  </div>
                </div>

                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useIsMobile()
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Returns an object with isMobile boolean. True for xs, sm, md
                    breakpoints (≤768px).
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const { isMobile } = useIsMobile();
// Returns: { isMobile: boolean }

// Usage
if (isMobile) {
  return <MobileLayout />;
}
return <DesktopLayout />;`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer className="overflow-hidden">
          <CardTitle title="useElementSize & useMeasure" className="mt-2 mb-2">
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useElementSize&lt;T&gt;()
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Tracks element dimensions. Returns a callback ref setter
                    (not a RefObject) and size object.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const [ref, { width, height }] = useElementSize<HTMLDivElement>();
// ref: (node: T | null) => void — callback ref
// Returns: [callbackRef, { width: number; height: number }]

return (
  <div ref={ref} className="resizable">
    Size: {width} × {height}px
  </div>
);`}
                    />
                  </div>
                </div>

                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useMeasure&lt;T&gt;()
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Advanced measurement with full bounds. Uses ResizeObserver
                    internally (from react-use).
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const [ref, bounds] = useMeasure<HTMLDivElement>();
// bounds: { x, y, width, height, top, right, bottom, left }

return (
  <div ref={ref}>
    Position: ({bounds.x}, {bounds.y})
    Size: {bounds.width} × {bounds.height}
  </div>
);`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer className="overflow-hidden">
          <CardTitle title="useWindowScroll" className="mt-2 mb-2">
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="p-6 border rounded-lg">
                <Typography tag="h5" className="font-medium mb-3">
                  useWindowScroll()
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 mb-4"
                >
                  Returns current scroll position. Custom implementation that
                  detects scroll on window, document, and overflow containers.
                </Typography>
                <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                  <CodeBlock
                    language="tsx"
                    noExpand={true}
                    code={`const { x, y } = useWindowScroll();
// Returns: { x: number; y: number }

// Tracks scroll from window, document, and containers with overflow`}
                  />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            User Interaction Hooks
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Click detection, clipboard, and event handling
          </Typography>
        </div>

        <CardContainer className="overflow-hidden">
          <CardTitle
            title="useClickAway & useCopyToClipboard"
            className="mt-2 mb-2"
          >
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useClickAway(ref, handler, events?)
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Detects clicks outside a ref element. Re-exported from
                    react-use. Defaults to mousedown + touchstart.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const ref = useRef<HTMLDivElement>(null);
useClickAway(ref, () => {
  setIsOpen(false);
});
// Optional 3rd param: event names array
// Default: ['mousedown', 'touchstart']`}
                    />
                  </div>
                </div>

                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useCopyToClipboard()
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Clipboard functionality with state tracking. Re-exported
                    from react-use.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const [state, copyToClipboard] = useCopyToClipboard();
// state: { value?: string; error?: Error; noUserInteraction: boolean }

copyToClipboard('Text to copy');

// Check result:
if (state.value) console.log('Copied:', state.value);
if (state.error) console.error('Failed:', state.error);`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer className="overflow-hidden">
          <CardTitle title="useEventListener" className="mt-2 mb-2">
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="p-6 border rounded-lg">
                <Typography tag="h5" className="font-medium mb-3">
                  useEventListener(eventName, handler, element?, options?)
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 mb-4"
                >
                  Type-safe event listener with automatic cleanup. Custom
                  implementation with overloads for window, document,
                  HTMLElement, and MediaQueryList.
                </Typography>
                <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                  <CodeBlock
                    language="tsx"
                    noExpand={true}
                    code={`// On window (default target)
useEventListener('keydown', (event) => {
  console.log(event.key);
});

// On a specific element
const ref = useRef<HTMLDivElement>(null);
useEventListener('click', (event) => {
  console.log('Clicked!', event.clientX);
}, ref);

// Also exports useIsomorphicLayoutEffect`}
                  />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            UI State Management Hooks
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Zustand-powered global state for UI behaviors
          </Typography>
        </div>

        <CardContainer className="overflow-hidden">
          <CardTitle title="useToastStore" className="mt-2 mb-2">
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="p-6 border rounded-lg">
                <Typography tag="h5" className="font-medium mb-3">
                  useToastStore()
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 mb-4"
                >
                  Zustand-based global toast notification system with 5 variants
                  and auto-dismiss.
                </Typography>
                <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                  <CodeBlock
                    language="tsx"
                    noExpand={true}
                    code={`const { addToast, dismissToast, toasts, setToasts } = useToastStore();

addToast({
  id: 'unique-id',       // required
  message: 'Text',      // required
  title: 'Title',       // optional
  variant: 'success',   // 'default' | 'destructive' | 'success' | 'warning' | 'info'
  timeout: 3000,        // optional, default 3000ms
});

dismissToast('unique-id');  // dismiss by id
dismissToast();             // dismiss all`}
                  />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer className="overflow-hidden">
          <CardTitle
            title="useGridSwitcher & useLockBodyScroll"
            className="mt-2 mb-2"
          >
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useGridSwitcher()
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Zustand store for global grid layout switching. Persists
                    state across components.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const { isGridCompact, setIsGridCompact } = useGridSwitcher();
// isGridCompact: boolean (default: false)

const toggleLayout = () => setIsGridCompact(!isGridCompact);`}
                    />
                  </div>
                </div>

                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useLockBodyScroll(isLocked)
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Locks body scroll when active. Automatically preserves
                    scrollbar width to prevent layout shift.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`useLockBodyScroll(isModalOpen);
// Pass true to lock, false to unlock
// Automatically adds padding-right to compensate scrollbar

const [isOpen, setIsOpen] = useState(false);
useLockBodyScroll(isOpen);`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        <CardContainer className="overflow-hidden">
          <CardTitle title="useScrollableSlider" className="mt-2 mb-2">
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="p-6 border rounded-lg">
                <Typography tag="h5" className="font-medium mb-3">
                  useScrollableSlider(defaultActivePath?)
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 mb-4"
                >
                  Horizontal scrollable slider with navigation buttons. Uses
                  react-router-dom internally for active path detection.
                </Typography>
                <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                  <CodeBlock
                    language="tsx"
                    noExpand={true}
                    code={`const {
  sliderEl,        // RefObject<HTMLDivElement> — container ref
  sliderPrevBtn,   // RefObject<HTMLButtonElement> — prev button ref
  sliderNextBtn,   // RefObject<HTMLButtonElement> — next button ref
  scrollToTheRight,// () => void
  scrollToTheLeft, // () => void
} = useScrollableSlider('/');
// Parameter: defaultActivePath (string, default '/')
// Note: Uses useLocation() from react-router-dom internally`}
                  />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Utility Hooks
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Lifecycle and navigation helpers
          </Typography>
        </div>

        <CardContainer className="overflow-hidden">
          <CardTitle
            title="useIsMounted & useAnchorScroll"
            className="mt-2 mb-2"
          >
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useIsMounted()
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Returns a boolean indicating component mount state. Useful
                    to prevent memory leaks in async operations.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const isMounted = useIsMounted();
// Returns: boolean (true after mount, false before)

useEffect(() => {
  fetchData().then((data) => {
    if (isMounted) {
      setState(data); // safe — won't update unmounted component
    }
  });
}, [isMounted]);`}
                    />
                  </div>
                </div>

                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useAnchorScroll()
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Intercepts anchor link clicks and performs smooth scrolling
                    to target elements.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-border overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`useAnchorScroll();
// Returns: null
// Adds global click handler for <a href="#section"> links
// Automatically smooth-scrolls to the target element

// Usage: Just call in your root component
function App() {
  useAnchorScroll();
  return <Layout />;
}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>
    </>
  );
};

export default HookDocumentationSection;
