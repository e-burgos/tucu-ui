import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  Badge,
} from '../../../../index';

const HookCategoriesSection: React.FC = () => {
  const hookCategories = [
    {
      icon: (
        <LucideIcons.Monitor className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      title: 'Responsive & Layout',
      description: 'Screen size detection and element measurement hooks',
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      hooks: [
        { name: 'useBreakpoint', desc: 'Returns current breakpoint (xs–4xl)' },
        { name: 'useIsMobile', desc: 'Returns { isMobile: boolean }' },
        { name: 'useElementSize', desc: 'Tracks element width/height via ResizeObserver' },
        { name: 'useMeasure', desc: 'Full bounds (x, y, width, height, top, right, bottom, left)' },
        { name: 'useWindowScroll', desc: 'Returns { x, y } scroll position' },
      ],
    },
    {
      icon: (
        <LucideIcons.MousePointer className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      title: 'User Interaction',
      description: 'Click detection, clipboard, and event handling',
      color: 'from-purple-500 via-violet-500 to-indigo-500',
      hooks: [
        { name: 'useClickAway', desc: 'Detects clicks outside a ref element' },
        { name: 'useCopyToClipboard', desc: 'Clipboard copy with state tracking' },
        { name: 'useEventListener', desc: 'Type-safe event listener with auto-cleanup' },
      ],
    },
    {
      icon: (
        <LucideIcons.Layout className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      title: 'UI State Management',
      description: 'Global Zustand-based state for UI behavior',
      color: 'from-green-500 via-emerald-500 to-teal-500',
      hooks: [
        { name: 'useGridSwitcher', desc: 'Toggle compact/normal grid layout' },
        { name: 'useLockBodyScroll', desc: 'Lock body scroll (preserves scrollbar)' },
        { name: 'useToastStore', desc: 'Global toast notifications (Zustand)' },
        { name: 'useScrollableSlider', desc: 'Horizontal slider with prev/next controls' },
      ],
    },
    {
      icon: (
        <LucideIcons.Wrench className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      title: 'Utilities',
      description: 'Lifecycle and navigation helpers',
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      hooks: [
        { name: 'useIsMounted', desc: 'Returns boolean for component mount state' },
        { name: 'useAnchorScroll', desc: 'Smooth scroll to anchor links automatically' },
      ],
    },
  ];

  return (
    <>
      <HeroCard
        title="Hook Categories"
        description="14 hooks organized into 4 categories: Responsive & Layout, User Interaction, UI State Management, and Utilities."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.FolderTree className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Organized Collection
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Each hook category addresses a different development need
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
                  <div
                    className={`p-3 rounded-xl bg-linear-to-br ${category.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <Typography
                      tag="h3"
                      className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                    >
                      {category.title}
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      {category.description}
                    </Typography>
                  </div>
                </div>
                <div className="space-y-2">
                  {category.hooks.map((hook, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Badge className="text-dark dark:text-white shrink-0">
                        {hook.name}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {hook.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>
    </>
  );
};

export default HookCategoriesSection;
