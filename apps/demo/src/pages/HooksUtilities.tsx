import { useState } from 'react';
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
  useIsMounted,
  useToastStore,
  useGridSwitcher,
} from 'tucu-ui';

export function HooksUtilities() {
  const [copyText, setCopyText] = useState('Hello, World!');
  const [copiedValue, copy] = useCopyToClipboard();
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const isMobile = useIsMobile();
  const { addToast } = useToastStore();
  const { isGridCompact, setIsGridCompact } = useGridSwitcher();

  const handleCopy = () => {
    copy(copyText);
    addToast({
      id: `copy-${Date.now()}`,
      title: 'Copied!',
      message: `Copied "${copyText}" to clipboard`,
    });
  };

  const handleGridSwitch = () => {
    const newLayout = !isGridCompact;
    setIsGridCompact(newLayout);
    addToast({
      id: `layout-${Date.now()}`,
      title: 'Layout Changed',
      message: `Switched to ${newLayout ? 'Compact' : 'Normal'} layout`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl">
        <LucideIcons.Settings className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <Typography tag="h1" className="mb-4 text-4xl font-bold">
          Hooks & Utilities
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          A comprehensive collection of React hooks and utility functions to
          enhance your development experience.
        </Typography>
      </div>

      {/* Hook Categories */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Package className="w-5 h-5 text-blue-500" />
          Hook Categories
        </CardTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: <LucideIcons.Monitor className="w-8 h-8 text-blue-500" />,
              title: 'Responsive & Layout',
              hooks: [
                'useBreakpoint',
                'useIsMobile',
                'useElementSize',
                'useMeasure',
                'useWindowScroll',
              ],
            },
            {
              icon: (
                <LucideIcons.MousePointer className="w-8 h-8 text-purple-500" />
              ),
              title: 'User Interaction',
              hooks: ['useClickAway', 'useCopyToClipboard', 'useEventListener'],
            },
            {
              icon: <LucideIcons.Layout className="w-8 h-8 text-green-500" />,
              title: 'UI State Management',
              hooks: [
                'useGridSwitcher',
                'useLockBodyScroll',
                'useToastStore',
                'useScrollableSlider',
              ],
            },
            {
              icon: <LucideIcons.Wrench className="w-8 h-8 text-orange-500" />,
              title: 'Utilities',
              hooks: ['useIsMounted'],
            },
          ].map((category, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                {category.icon}
                <Typography tag="h3" className="font-semibold">
                  {category.title}
                </Typography>
              </div>
              <div className="space-y-1">
                {category.hooks.map((hook, i) => (
                  <Badge key={i} className="mr-2 mb-1">
                    {hook}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContainer>

      {/* Live Demo Section */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Play className="w-5 h-5 text-purple-500" />
          Live Hook Demonstrations
        </CardTitle>

        <div className="space-y-8">
          {/* useBreakpoint Demo */}
          <div className="p-4 border rounded-lg">
            <Typography
              tag="h4"
              className="font-semibold mb-3 flex items-center gap-2"
            >
              <LucideIcons.Monitor className="w-5 h-5 text-blue-500" />
              useBreakpoint
            </Typography>
            <Typography
              tag="p"
              className="text-gray-600 dark:text-gray-400 mb-4"
            >
              Detects the current screen size breakpoint and provides responsive
              utilities.
            </Typography>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <Typography tag="p" className="mb-2">
                <strong>Current breakpoint:</strong> <Badge>{breakpoint}</Badge>
              </Typography>
              <Typography tag="p" className="mb-2">
                <strong>Is mobile:</strong>{' '}
                <Badge>{isMobile ? 'Yes' : 'No'}</Badge>
              </Typography>
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                Resize your window to see the breakpoint change in real-time!
              </Typography>
            </div>

            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
              <Typography tag="pre">
                {`const breakpoint = useBreakpoint();
const isMobile = useIsMobile();

// Current: ${breakpoint}, Mobile: ${isMobile}`}
              </Typography>
            </div>
          </div>

          {/* useCopyToClipboard Demo */}
          <div className="p-4 border rounded-lg">
            <Typography
              tag="h4"
              className="font-semibold mb-3 flex items-center gap-2"
            >
              <LucideIcons.Copy className="w-5 h-5 text-green-500" />
              useCopyToClipboard
            </Typography>
            <Typography
              tag="p"
              className="text-gray-600 dark:text-gray-400 mb-4"
            >
              Provides an easy way to copy text to the clipboard with feedback.
            </Typography>

            <div className="flex gap-4 mb-4">
              <input
                type="text"
                value={copyText}
                onChange={(e) => setCopyText(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                placeholder="Enter text to copy"
              />
              <Button onClick={handleCopy} color="primary">
                <LucideIcons.Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>

            {copiedValue && (
              <Alert>
                <div className="flex items-center gap-2">
                  <LucideIcons.CheckCircle className="w-4 h-4 text-green-500" />
                  <Typography tag="p" className="text-sm">
                    Copied: <strong>{String(copiedValue)}</strong>
                  </Typography>
                </div>
              </Alert>
            )}

            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm mt-4">
              <Typography tag="pre">
                {`const [copiedValue, copy] = useCopyToClipboard();

const handleCopy = () => {
  copy(text);
};`}
              </Typography>
            </div>
          </div>

          {/* useGridSwitcher Demo */}
          <div className="p-4 border rounded-lg">
            <Typography
              tag="h4"
              className="font-semibold mb-3 flex items-center gap-2"
            >
              <LucideIcons.Grid className="w-5 h-5 text-purple-500" />
              useGridSwitcher
            </Typography>
            <Typography
              tag="p"
              className="text-gray-600 dark:text-gray-400 mb-4"
            >
              Manages global grid layout state across your application.
            </Typography>

            <div className="flex items-center gap-4 mb-4">
              <Typography tag="p">
                <strong>Current layout:</strong>{' '}
                <Badge>{isGridCompact ? 'Compact' : 'Normal'}</Badge>
              </Typography>
              <Button
                onClick={handleGridSwitch}
                variant="ghost"
                color="primary"
              >
                <LucideIcons.LayoutGrid className="w-4 h-4 mr-2" />
                Switch to {isGridCompact ? 'Normal' : 'Compact'}
              </Button>
            </div>

            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
              <Typography tag="pre">
                {`const { isGridCompact, setIsGridCompact } = useGridSwitcher();

const toggleLayout = () => {
  setIsGridCompact(!isGridCompact);
};`}
              </Typography>
            </div>
          </div>

          {/* useIsMounted Demo */}
          <div className="p-4 border rounded-lg">
            <Typography
              tag="h4"
              className="font-semibold mb-3 flex items-center gap-2"
            >
              <LucideIcons.Power className="w-5 h-5 text-orange-500" />
              useIsMounted
            </Typography>
            <Typography
              tag="p"
              className="text-gray-600 dark:text-gray-400 mb-4"
            >
              Tracks whether the component has been mounted to prevent hydration
              issues.
            </Typography>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <Typography tag="p">
                <strong>Component mounted:</strong>{' '}
                <Badge>{isMounted ? 'Yes' : 'No'}</Badge>
              </Typography>
            </div>

            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
              <Typography tag="pre">
                {`const isMounted = useIsMounted();

// Use to prevent hydration issues
if (!isMounted) {
  return <div>Loading...</div>;
}`}
              </Typography>
            </div>
          </div>
        </div>
      </CardContainer>

      {/* Hook Documentation */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Book className="w-5 h-5 text-indigo-500" />
          Hook Documentation
        </CardTitle>

        <div className="space-y-6">
          {/* Responsive Hooks */}
          <div>
            <Typography
              tag="h4"
              className="font-semibold mb-4 flex items-center gap-2"
            >
              <LucideIcons.Monitor className="w-5 h-5 text-blue-500" />
              Responsive & Layout Hooks
            </Typography>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <Typography tag="h5" className="font-medium mb-2">
                  useBreakpoint()
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 mb-3"
                >
                  Returns the current breakpoint (xs, sm, md, lg, xl, 2xl, 3xl,
                  4xl) based on window width.
                </Typography>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                  <Typography tag="pre">
                    {`const breakpoint = useBreakpoint();
// Returns: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'`}
                  </Typography>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <Typography tag="h5" className="font-medium mb-2">
                  useIsMobile()
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 mb-3"
                >
                  Returns true if the current breakpoint is xs, sm, or md.
                </Typography>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                  <Typography tag="pre">
                    {`const isMobile = useIsMobile();
// Returns: boolean`}
                  </Typography>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <Typography tag="h5" className="font-medium mb-2">
                  useElementSize(ref)
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 mb-3"
                >
                  Tracks the dimensions of a DOM element.
                </Typography>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                  <Typography tag="pre">
                    {`const ref = useRef<HTMLDivElement>(null);
const { width, height } = useElementSize(ref);`}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Interaction Hooks */}
          <div>
            <Typography
              tag="h4"
              className="font-semibold mb-4 flex items-center gap-2"
            >
              <LucideIcons.MousePointer className="w-5 h-5 text-purple-500" />
              User Interaction Hooks
            </Typography>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <Typography tag="h5" className="font-medium mb-2">
                  useClickAway(ref, handler)
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 mb-3"
                >
                  Detects clicks outside of a specified element.
                </Typography>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                  <Typography tag="pre">
                    {`const ref = useRef<HTMLDivElement>(null);
useClickAway(ref, () => {
  console.log('Clicked outside!');
});`}
                  </Typography>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <Typography tag="h5" className="font-medium mb-2">
                  useEventListener(eventName, handler, element)
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 mb-3"
                >
                  Adds event listeners with automatic cleanup.
                </Typography>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                  <Typography tag="pre">
                    {`useEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});`}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* State Management Hooks */}
          <div>
            <Typography
              tag="h4"
              className="font-semibold mb-4 flex items-center gap-2"
            >
              <LucideIcons.Database className="w-5 h-5 text-green-500" />
              UI State Management Hooks
            </Typography>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <Typography tag="h5" className="font-medium mb-2">
                  useToastStore()
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 mb-3"
                >
                  Manages toast notifications globally.
                </Typography>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                  <Typography tag="pre">
                    {`const { toasts, addToast, removeToast } = useToastStore();

addToast({
  title: 'Success!',
  message: 'Operation completed',
  type: 'success'
});`}
                  </Typography>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <Typography tag="h5" className="font-medium mb-2">
                  useLockBodyScroll(lock)
                </Typography>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 mb-3"
                >
                  Prevents body scrolling when modals or overlays are open.
                </Typography>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                  <Typography tag="pre">
                    {`const [isModalOpen, setIsModalOpen] = useState(false);
useLockBodyScroll(isModalOpen);`}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContainer>

      {/* Best Practices */}
      <Alert>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <LucideIcons.Lightbulb className="w-5 h-5 text-yellow-500" />
            <Typography tag="h6" className="font-semibold">
              Best Practices for Using Hooks
            </Typography>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Always use hooks at the top level of your components</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Use useIsMounted() to prevent hydration issues in SSR</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>
                Combine responsive hooks for better mobile experiences
              </span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Use useClickAway for dropdown and modal interactions</span>
            </li>
            <li className="flex items-start gap-2">
              <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Leverage useEventListener for complex event handling</span>
            </li>
          </ul>
        </div>
      </Alert>
    </div>
  );
}
