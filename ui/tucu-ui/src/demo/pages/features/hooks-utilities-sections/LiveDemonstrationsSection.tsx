import React, { useState, useRef, useEffect } from 'react';
import {
  CardContainer,
  Button,
  Badge,
  Typography,
  LucideIcons,
  useBreakpoint,
  useIsMobile,
  useCopyToClipboard,
  useToastStore,
  useGridSwitcher,
  useClickAway,
  useElementSize,
  useMeasure,
  useWindowScroll,
  useLockBodyScroll,
  useScrollableSlider,
  useEventListener,
  CodeBlock,
  useIsMounted,
} from '../../../../index';

const LiveDemonstrationsSection: React.FC = () => {
  const [copyText, setCopyText] = useState('Hello, World!');
  const [copiedValue, copy] = useCopyToClipboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [keyPressed, setKeyPressed] = useState('');
  const [mountedState, setMountedState] = useState('Checking...');

  const breakpoint = useBreakpoint();
  const { isMobile } = useIsMobile();
  const { addToast } = useToastStore();
  const { isGridCompact, setIsGridCompact } = useGridSwitcher();
  const { x: scrollX, y: scrollY } = useWindowScroll();
  const isMounted = useIsMounted();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [elementSizeRef, { width: elementWidth, height: elementHeight }] =
    useElementSize<HTMLDivElement>();
  const [measureElementRef, bounds] = useMeasure<HTMLDivElement>();

  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider('/');

  useLockBodyScroll(isModalOpen);

  useClickAway(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  useEventListener('keydown', (event) => {
    setKeyPressed(event.key);
    setTimeout(() => setKeyPressed(''), 1000);
  });

  useEffect(() => {
    if (isMounted) {
      setMountedState('Component is mounted');
    } else {
      setMountedState('Component is not mounted');
    }
  }, [isMounted]);

  const handleCopy = () => {
    copy(copyText);
    addToast({
      id: `copy-${Date.now()}`,
      title: 'Copied!',
      message: `Copied "${copyText}" to clipboard`,
      variant: 'success',
    });
  };

  const handleGridSwitch = () => {
    const newLayout = !isGridCompact;
    setIsGridCompact(newLayout);
    addToast({
      id: `layout-${Date.now()}`,
      title: 'Layout Changed',
      message: `Switched to ${newLayout ? 'Compact' : 'Normal'} layout`,
      variant: 'info',
    });
  };

  const showToast = (
    variant: 'success' | 'destructive' | 'warning' | 'info' = 'success'
  ) => {
    addToast({
      id: `toast-${Date.now()}`,
      title: 'Test Toast',
      message: `This is a ${variant} toast notification`,
      variant,
      timeout: 3000,
    });
  };

  const scrollableItems = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    content: `Content for item ${i + 1}`,
  }));

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Live Hook Demonstrations
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Interactive examples showing hooks in action
        </Typography>
      </div>

      <div className="space-y-8">
        {/* Responsive Hooks Demo */}
        <CardContainer className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 via-cyan-500 to-teal-500 shadow-lg">
                <LucideIcons.Monitor className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-xl font-semibold">
                Responsive Detection
              </Typography>
            </div>
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Real-time breakpoint detection and mobile state tracking.
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <Typography tag="h5" className="font-medium mb-3">
                  useBreakpoint
                </Typography>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Current:
                    </span>
                    <Badge className="text-dark dark:text-white">
                      {breakpoint}
                    </Badge>
                  </div>
                  <Typography tag="p" className="text-xs text-gray-500">
                    Resize your window to see changes
                  </Typography>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <Typography tag="h5" className="font-medium mb-3">
                  useIsMobile
                </Typography>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Is Mobile:
                    </span>
                    <Badge className="text-dark dark:text-white">
                      {isMobile ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <Typography tag="p" className="text-xs text-gray-500">
                    True for xs, sm, md breakpoints
                  </Typography>
                </div>
              </div>
            </div>

            <div className="bg-light-dark p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
              <CodeBlock
                language="tsx"
                noExpand={true}
                code={`
const breakpoint = useBreakpoint();
const { isMobile } = useIsMobile();
// Current: ${breakpoint}, Mobile: ${isMobile}`}
              />
            </div>
          </div>
        </CardContainer>

        {/* Element Measurement Demo */}
        <CardContainer className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 shadow-lg">
                <LucideIcons.Ruler className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-xl font-semibold">
                Element Measurement
              </Typography>
            </div>
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Track element dimensions and bounds in real-time.
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Typography tag="h5" className="font-medium mb-3">
                  useElementSize
                </Typography>
                <div
                  ref={elementSizeRef}
                  className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg border-2 border-dashed border-blue-300 dark:border-blue-600 resize overflow-auto min-h-[100px]"
                >
                  <Typography tag="p" className="text-sm">
                    Resize this element (drag corner)
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-xs text-gray-600 dark:text-gray-400 mt-2"
                  >
                    Size: {Math.round(elementWidth)} ×{' '}
                    {Math.round(elementHeight)}px
                  </Typography>
                </div>
              </div>

              <div>
                <Typography tag="h5" className="font-medium mb-3">
                  useMeasure
                </Typography>
                <div
                  ref={measureElementRef}
                  className="bg-cyan-100 dark:bg-cyan-800 p-4 rounded-lg border-2 border-dashed border-cyan-300 dark:border-cyan-600 min-h-[100px]"
                >
                  <Typography tag="p" className="text-sm">
                    Measured element
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-xs text-gray-600 dark:text-gray-400 mt-2"
                  >
                    Bounds: {Math.round(bounds.width)} ×{' '}
                    {Math.round(bounds.height)}px
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </CardContainer>

        {/* Interaction Hooks Demo */}
        <CardContainer className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-purple-500 via-violet-500 to-indigo-500 shadow-lg">
                <LucideIcons.MousePointer className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-xl font-semibold">
                User Interaction
              </Typography>
            </div>
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Interactive demonstrations of click detection and clipboard
              operations.
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Typography tag="h5" className="font-medium mb-3">
                  useClickAway
                </Typography>
                <div className="relative" ref={dropdownRef}>
                  <Button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    variant="ghost"
                    className="w-full"
                  >
                    <LucideIcons.ChevronDown className="w-4 h-4 mr-2" />
                    Click to open dropdown
                  </Button>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-4 z-10">
                      <Typography tag="p" className="text-sm">
                        Click outside to close this dropdown
                      </Typography>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Typography tag="h5" className="font-medium mb-3">
                  useCopyToClipboard
                </Typography>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={copyText}
                    onChange={(e) => setCopyText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                    placeholder="Enter text to copy"
                  />
                  <Button onClick={handleCopy} className="w-full">
                    <LucideIcons.Copy className="w-4 h-4 mr-2" />
                    Copy to Clipboard
                  </Button>
                  {copiedValue && (
                    <Typography
                      tag="p"
                      className="text-sm text-green-600 dark:text-green-400"
                    >
                      ✓ Copied: {String(copiedValue)}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContainer>

        {/* State Management Demo */}
        <CardContainer className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 shadow-lg">
                <LucideIcons.Settings className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-xl font-semibold">
                UI State Management
              </Typography>
            </div>
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Global state management for UI behaviors and notifications.
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Typography tag="h5" className="font-medium mb-3">
                  useGridSwitcher
                </Typography>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Current layout:
                    </span>
                    <Badge className="text-dark dark:text-white">
                      {isGridCompact ? 'Compact' : 'Normal'}
                    </Badge>
                  </div>
                  <Button
                    onClick={handleGridSwitch}
                    variant="ghost"
                    className="w-full"
                  >
                    <LucideIcons.LayoutGrid className="w-4 h-4 mr-2" />
                    Switch to {isGridCompact ? 'Normal' : 'Compact'}
                  </Button>
                </div>
              </div>

              <div>
                <Typography tag="h5" className="font-medium mb-3">
                  useToastStore
                </Typography>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    color="success"
                    fullWidth
                    onClick={() => showToast('success')}
                  >
                    Success
                  </Button>
                  <Button
                    color="danger"
                    fullWidth
                    onClick={() => showToast('destructive')}
                  >
                    Error
                  </Button>
                  <Button
                    color="warning"
                    fullWidth
                    onClick={() => showToast('warning')}
                  >
                    Warning
                  </Button>
                  <Button
                    color="info"
                    fullWidth
                    onClick={() => showToast('info')}
                  >
                    Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContainer>

        {/* Advanced Hooks Demo */}
        <CardContainer className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-lg">
                <LucideIcons.Zap className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-xl font-semibold">
                Advanced Utilities
              </Typography>
            </div>
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Advanced hooks for complex UI behaviors and interactions.
            </Typography>

            <div className="space-y-6">
              <div>
                <Typography tag="h5" className="font-medium mb-3">
                  useScrollableSlider
                </Typography>
                <div className="relative">
                  <button
                    ref={sliderPrevBtn}
                    onClick={scrollToTheLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border rounded-full p-2 shadow-md opacity-0 invisible transition-opacity"
                  >
                    <LucideIcons.ChevronLeft className="w-4 h-4" />
                  </button>

                  <div
                    ref={sliderEl}
                    className="flex gap-4 overflow-x-auto scrollbar-hide py-4"
                  >
                    {scrollableItems.map((item) => (
                      <div
                        key={item.id}
                        className="shrink-0 w-48 p-4 bg-white dark:bg-gray-800 border rounded-lg"
                      >
                        <Typography tag="h6" className="font-medium mb-2">
                          {item.title}
                        </Typography>
                        <Typography
                          tag="p"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          {item.content}
                        </Typography>
                      </div>
                    ))}
                  </div>

                  <button
                    ref={sliderNextBtn}
                    onClick={scrollToTheRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border rounded-full p-2 shadow-md transition-opacity"
                  >
                    <LucideIcons.ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Typography tag="h5" className="font-medium mb-3">
                    useEventListener
                  </Typography>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <Typography tag="p" className="text-sm mb-2">
                      Press any key to see event detection:
                    </Typography>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Last key:
                      </span>
                      <Badge className="text-dark dark:text-white">
                        {keyPressed || 'None'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <Typography tag="h5" className="font-medium mb-3">
                    useWindowScroll
                  </Typography>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                    <Typography tag="p" className="text-sm mb-2">
                      Current scroll position:
                    </Typography>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          X:
                        </span>
                        <Badge className="text-dark dark:text-white">
                          {Math.round(scrollX)}px
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          Y:
                        </span>
                        <Badge className="text-dark dark:text-white">
                          {Math.round(scrollY)}px
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Typography tag="h5" className="font-medium mb-3">
                  useLockBodyScroll
                </Typography>
                <div className="flex items-center gap-4">
                  <Button onClick={() => setIsModalOpen(true)} variant="ghost">
                    <LucideIcons.Lock className="w-4 h-4 mr-2" />
                    Open Modal (Locks Scroll)
                  </Button>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Body scroll is {isModalOpen ? 'locked' : 'unlocked'}
                  </Typography>
                </div>
              </div>

              <div>
                <Typography tag="h5" className="font-medium mb-3">
                  useIsMounted
                </Typography>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                  <Typography tag="p" className="text-sm mb-2">
                    Component mount status:
                  </Typography>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Status:
                    </span>
                    <Badge className="text-dark dark:text-white">
                      {mountedState}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContainer>
      </div>

      {/* Modal Demo */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <Typography tag="h3" className="font-semibold">
                Modal with Locked Scroll
              </Typography>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <LucideIcons.X className="w-5 h-5" />
              </button>
            </div>
            <Typography
              tag="p"
              className="text-gray-600 dark:text-gray-400 mb-4"
            >
              While this modal is open, body scrolling is locked using the
              useLockBodyScroll hook. The scrollbar width is preserved to
              prevent layout shift.
            </Typography>
            <Button onClick={() => setIsModalOpen(false)} className="w-full">
              Close Modal
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveDemonstrationsSection;
