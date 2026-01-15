import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '../../../../index';

const HookDocumentationSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Hook Documentation
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Comprehensive guide to all available hooks and their usage
        </Typography>
      </div>

      <div className="space-y-8">
        {/* Responsive Hooks */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="Responsive & Layout Hooks" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 via-cyan-500 to-teal-500 shadow-lg">
                  <LucideIcons.Monitor className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Screen Size Detection & Element Measurement
                </Typography>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useBreakpoint()
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Detects the current screen breakpoint with support for
                    ultra-wide displays.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
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
                    Simplified mobile detection based on breakpoints (xs, sm,
                    md).
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const { isMobile } = useIsMobile();
// Returns: { isMobile: boolean }

// Usage
return (
  <div>
    {isMobile ? <MobileLayout /> : <DesktopLayout />}
  </div>
);`}
                    />
                  </div>
                </div>

                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useElementSize(ref)
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Tracks the dimensions of a DOM element with automatic
                    resize detection.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`
const [ref, { width, height }] = useElementSize();

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
                    useMeasure(ref)
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Advanced element measurement with ResizeObserver support.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const [ref, bounds] = useMeasure();
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

        {/* Interaction Hooks */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="User Interaction Hooks" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-purple-500 via-violet-500 to-indigo-500 shadow-lg">
                  <LucideIcons.MousePointer className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Click Detection & Clipboard Operations
                </Typography>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useClickAway(ref, handler)
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Detects clicks outside of a specified element.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const ref = useRef(null);
useClickAway(ref, () => {
  setIsOpen(false);
});

return (
  <div ref={ref}>
    <button onClick={() => setIsOpen(!isOpen)}>
      Toggle Menu
    </button>
    {isOpen && <Menu />}
  </div>
);`}
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
                    Provides clipboard functionality with state tracking.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const [copiedText, copyToClipboard] = useCopyToClipboard();

const handleCopy = () => {
  copyToClipboard('Text to copy');
};

return (
  <button onClick={handleCopy}>
    {copiedText ? 'Copied!' : 'Copy'}
  </button>
);`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>

        {/* State Management Hooks */}
        <CardContainer className="overflow-hidden">
          <CardTitle title="UI State Management Hooks" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 shadow-lg">
                  <LucideIcons.Database className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Global State & UI Behavior Management
                </Typography>
              </div>

              <div className="space-y-6">
                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useToastStore()
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Zustand-based global toast notification system.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const { addToast, dismissToast, toasts } = useToastStore();

const showToast = () => {
  addToast({
    id: Date.now().toString(),
    title: 'Success!',
    message: 'Operation completed',
    variant: 'success',
    timeout: 3000,
  });
};

// Toast variants: 'default' | 'destructive' | 'success' | 'warning' | 'info'`}
                    />
                  </div>
                </div>

                <div className="p-6 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-3">
                    useGridSwitcher()
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    Global state management for grid layout switching.
                  </Typography>
                  <div className="bg-light-dark p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                    <CodeBlock
                      language="tsx"
                      noExpand={true}
                      code={`const { isGridCompact, setIsGridCompact } = useGridSwitcher();

const toggleLayout = () => {
  setIsGridCompact(!isGridCompact);
};

return (
  <div className={\`grid \${isGridCompact ? 'grid-cols-4' : 'grid-cols-2'}\`}>
    {/* Grid items */}
  </div>
);`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </div>
    </div>
  );
};

export default HookDocumentationSection;

