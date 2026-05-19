import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  CodeBlock,
} from '../../../../index';

const BestPracticesSection: React.FC = () => {
  const dos = [
    'Use useIsMounted to guard async state updates and prevent memory leaks',
    'Prefer useElementSize over useMeasure for simple width/height tracking',
    'Leverage generic types: useElementSize<HTMLCanvasElement>()',
    'Debounce rapid state changes when using useToastStore',
    'Import only needed hooks for optimal tree-shaking',
    'Combine useLockBodyScroll with focus management for accessible modals',
    'Use useEventListener for keyboard navigation instead of inline handlers',
    'Pass proper event types to useEventListener for type safety',
    'Use useClickAway with a RefObject for dropdown/popover close behavior',
    'Call useAnchorScroll once at root level for smooth scroll navigation',
  ];

  const donts = [
    'Destructure useCopyToClipboard as [value, fn] — it returns [stateObj, fn]',
    'Forget that useScrollableSlider requires react-router-dom context',
    'Use useMeasure when you only need width/height — it has more overhead',
    'Lock body scroll without preserving scrollbar width (useLockBodyScroll handles this)',
    'Create multiple useToastStore instances — it is a singleton Zustand store',
    'Ignore the noUserInteraction field in useCopyToClipboard state',
    'Use useIsMounted as a function — it returns a boolean directly',
    'Mix up useElementSize ref (callback ref) with useRef (RefObject)',
    'Hardcode breakpoint pixel values — use useBreakpoint named values instead',
    'Forget cleanup when using useEventListener with custom elements',
  ];

  return (
    <>
      <HeroCard
        title="Best Practices"
        description="Guidelines for optimal hook usage, common pitfalls to avoid, and patterns that ensure performance, type safety, and accessibility."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Recommendations
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Follow these guidelines for robust hook implementations
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardContainer>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-green-500 to-emerald-500 shadow-lg">
                  <LucideIcons.Check className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="font-semibold">
                  Do&apos;s
                </Typography>
              </div>
              <ul className="space-y-2">
                {dos.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContainer>

          <CardContainer>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-red-500 to-rose-500 shadow-lg">
                  <LucideIcons.X className="w-5 h-5 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="font-semibold">
                  Don&apos;ts
                </Typography>
              </div>
              <ul className="space-y-2">
                {donts.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <LucideIcons.X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContainer>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Common Patterns
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Recommended hook composition patterns
          </Typography>
        </div>

        <CardContainer>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg">
                <LucideIcons.Puzzle className="w-5 h-5 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="font-semibold">
                Accessible Modal Pattern
              </Typography>
            </div>
            <div className="bg-light-dark p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
              <CodeBlock
                language="tsx"
                noExpand={true}
                code={`function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Lock scroll when modal opens
  useLockBodyScroll(isOpen);
  
  // Close on click outside
  useClickAway(modalRef, onClose);
  
  // Close on Escape key
  useEventListener('keydown', (e) => {
    if (e.key === 'Escape') onClose();
  });

  if (!isOpen) return null;
  return <div ref={modalRef} role="dialog">{children}</div>;
}`}
              />
            </div>
          </div>
        </CardContainer>

        <CardContainer>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg">
                <LucideIcons.Monitor className="w-5 h-5 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="font-semibold">
                Responsive Layout Pattern
              </Typography>
            </div>
            <div className="bg-light-dark p-4 rounded-xl border dark:border-gray-700 overflow-x-auto">
              <CodeBlock
                language="tsx"
                noExpand={true}
                code={`function ResponsiveGrid({ children }) {
  const { isMobile } = useIsMobile();
  const { isGridCompact, setIsGridCompact } = useGridSwitcher();
  const breakpoint = useBreakpoint();

  // Auto-switch to compact on mobile
  useEffect(() => {
    if (isMobile && !isGridCompact) {
      setIsGridCompact(true);
    }
  }, [isMobile]);

  const cols = breakpoint === '4xl' ? 6 
    : breakpoint === '2xl' ? 4 
    : isGridCompact ? 3 : 2;

  return <div className={\`grid grid-cols-\${cols}\`}>{children}</div>;
}`}
              />
            </div>
          </div>
        </CardContainer>
      </section>
    </>
  );
};

export default BestPracticesSection;
