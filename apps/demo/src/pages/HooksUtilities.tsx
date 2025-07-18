import { useState, useRef } from 'react';
import {
  CardContainer,
  CardTitle,
  Button,
  Badge,
  Typography,
  LucideIcons,
  Alert,
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
} from 'tucu-ui';

export function HooksUtilities() {
  const [copyText, setCopyText] = useState('Hello, World!');
  const [copiedValue, copy] = useCopyToClipboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [keyPressed, setKeyPressed] = useState('');

  const breakpoint = useBreakpoint();
  const { isMobile } = useIsMobile();
  const { addToast } = useToastStore();
  const { isGridCompact, setIsGridCompact } = useGridSwitcher();
  const { x: scrollX, y: scrollY } = useWindowScroll();

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

  const hookCategories = [
    {
      icon: <LucideIcons.Monitor className="w-8 h-8 text-teal-500" />,
      title: 'Responsive & Layout',
      description: 'Screen size detection and element measurement',
      hooks: [
        'useBreakpoint',
        'useIsMobile',
        'useElementSize',
        'useMeasure',
        'useWindowScroll',
      ],
    },
    {
      icon: <LucideIcons.MousePointer className="w-8 h-8 text-teal-500" />,
      title: 'User Interaction',
      description: 'Click detection and clipboard operations',
      hooks: ['useClickAway', 'useCopyToClipboard', 'useEventListener'],
    },
    {
      icon: <LucideIcons.Layout className="w-8 h-8 text-teal-500" />,
      title: 'UI State Management',
      description: 'Global state and UI behavior management',
      hooks: [
        'useGridSwitcher',
        'useLockBodyScroll',
        'useToastStore',
        'useScrollableSlider',
      ],
    },
    {
      icon: <LucideIcons.Wrench className="w-8 h-8 text-teal-500" />,
      title: 'Utilities',
      description: 'Lifecycle and utility functions',
      hooks: ['useIsMounted'],
    },
  ];

  const scrollableItems = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    content: `Content for item ${i + 1}`,
  }));

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-600 dark:from-sky-900 dark:via-cyan-900 dark:to-gray-800 rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 dark:from-black/20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-cyan-300/20 to-transparent rounded-full blur-2xl"></div>

          <div className="relative text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                  <LucideIcons.Settings className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full border-2 border-white shadow-md"></div>
              </div>
            </div>

            <Typography
              tag="h1"
              className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            >
              Hooks & Utilities
            </Typography>

            <Typography
              tag="p"
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed"
            >
              A comprehensive collection of React hooks and utility functions to
              enhance your development experience with responsive design, user
              interactions, and state management.
            </Typography>
          </div>
        </div>
      </section>

      {/* Hook Categories */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Hook Categories
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Organized collection of hooks for different development needs
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {hookCategories.map((category, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                    {category.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {category.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {category.description}
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {category.hooks.map((hook, i) => (
                    <Badge
                      key={i}
                      className="bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100"
                    >
                      {hook}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Live Demonstrations */}
      <section className="space-y-8">
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 shadow-md">
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
                      <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100">
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
                      <Badge
                        className={`${
                          isMobile
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100'
                            : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        }`}
                      >
                        {isMobile ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <Typography tag="p" className="text-xs text-gray-500">
                      True for xs, sm, md breakpoints
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                <Typography tag="code" className="text-sm whitespace-pre-wrap">
                  {`const breakpoint = useBreakpoint();
const { isMobile } = useIsMobile();

// Current: ${breakpoint}, Mobile: ${isMobile}`}
                </Typography>
              </div>
            </div>
          </CardContainer>

          {/* Element Measurement Demo */}
          <CardContainer className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
            <div className="w-full space-y-6 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 shadow-md">
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
                    className="bg-teal-100 dark:bg-teal-800 p-4 rounded-lg border-2 border-dashed border-teal-300 dark:border-teal-600 resize overflow-auto min-h-[100px]"
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 shadow-md">
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 shadow-md">
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
                      <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100">
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
                    <Button onClick={() => showToast('success')}>
                      Success
                    </Button>
                    <Button onClick={() => showToast('destructive')}>
                      Error
                    </Button>
                    <Button onClick={() => showToast('warning')}>
                      Warning
                    </Button>
                    <Button onClick={() => showToast('info')} variant="ghost">
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 shadow-md">
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
                          className="flex-shrink-0 w-48 p-4 bg-white dark:bg-gray-800 border rounded-lg"
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
                        <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100">
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
                          <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100">
                            {Math.round(scrollX)}px
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            Y:
                          </span>
                          <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100">
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
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      variant="ghost"
                    >
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
              </div>
            </div>
          </CardContainer>
        </div>
      </section>

      {/* Hook Documentation */}
      <section className="space-y-8">
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
                  <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 shadow-md">
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
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                      <Typography
                        tag="code"
                        className="text-sm whitespace-pre-wrap"
                      >
                        {`const breakpoint = useBreakpoint();
// Returns: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

// Breakpoint sizes:
// xs: 480px, sm: 640px, md: 768px, lg: 1024px
// xl: 1280px, 2xl: 1440px, 3xl: 1780px, 4xl: 2160px`}
                      </Typography>
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
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                      <Typography
                        tag="code"
                        className="text-sm whitespace-pre-wrap"
                      >
                        {`const { isMobile } = useIsMobile();
// Returns: { isMobile: boolean }

// Usage
return (
  <div>
    {isMobile ? <MobileLayout /> : <DesktopLayout />}
  </div>
);`}
                      </Typography>
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
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                      <Typography
                        tag="code"
                        className="text-sm whitespace-pre-wrap"
                      >
                        {`const [ref, { width, height }] = useElementSize();

return (
  <div ref={ref} className="resizable">
    Size: {width} × {height}px
  </div>
);`}
                      </Typography>
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
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                      <Typography
                        tag="code"
                        className="text-sm whitespace-pre-wrap"
                      >
                        {`const [ref, bounds] = useMeasure();
// bounds: { x, y, width, height, top, right, bottom, left }

return (
  <div ref={ref}>
    Position: ({bounds.x}, {bounds.y})
    Size: {bounds.width} × {bounds.height}
  </div>
);`}
                      </Typography>
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
                  <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 shadow-md">
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
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                      <Typography
                        tag="code"
                        className="text-sm whitespace-pre-wrap"
                      >
                        {`const ref = useRef(null);
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
                      </Typography>
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
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                      <Typography
                        tag="code"
                        className="text-sm whitespace-pre-wrap"
                      >
                        {`const [copiedText, copyToClipboard] = useCopyToClipboard();

const handleCopy = () => {
  copyToClipboard('Text to copy');
};

return (
  <button onClick={handleCopy}>
    {copiedText ? 'Copied!' : 'Copy'}
  </button>
);`}
                      </Typography>
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
                  <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 shadow-md">
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
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                      <Typography
                        tag="code"
                        className="text-sm whitespace-pre-wrap"
                      >
                        {`const { addToast, dismissToast, toasts } = useToastStore();

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
                      </Typography>
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
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
                      <Typography
                        tag="code"
                        className="text-sm whitespace-pre-wrap"
                      >
                        {`const { isGridCompact, setIsGridCompact } = useGridSwitcher();

const toggleLayout = () => {
  setIsGridCompact(!isGridCompact);
};

return (
  <div className={\`grid \${isGridCompact ? 'grid-cols-4' : 'grid-cols-2'}\`}>
    {/* Grid items */}
  </div>
);`}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Best Practices
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Guidelines for optimal hook implementation and usage
          </Typography>
        </div>

        <Alert>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LucideIcons.Lightbulb className="w-5 h-5 text-teal-500" />
              <Typography tag="h6" className="font-semibold">
                Best Practices for Using Hooks
              </Typography>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Always use hooks at the top level of your components
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Use useIsMounted() to prevent hydration issues in SSR
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Combine responsive hooks for better mobile experiences
                  </span>
                </li>
              </ul>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Use useClickAway for dropdown and modal interactions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Leverage useEventListener for complex event handling
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>Optimize performance with useCallback and useMemo</span>
                </li>
              </ul>
            </div>
          </div>
        </Alert>
      </section>

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
}
