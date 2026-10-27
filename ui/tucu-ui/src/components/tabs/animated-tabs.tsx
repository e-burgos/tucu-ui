'use client';

import {
  useId,
  useMemo,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../libs/cn';
import { useBreakpoint } from '../../hooks/use-breakpoint';
import { TabSelect } from './tab-select';
import { useTabParam } from './use-tab-param';

export type AnimatedTabsSize = 'sm' | 'md';

export interface AnimatedTabItem<T extends string = string> {
  /** Unique id emitted by `onChange`. */
  id: T;
  /** Tab content. */
  label: ReactNode;
  /** Icon rendered before the label. */
  icon?: ReactNode;
  /** Badge rendered after the label. */
  badge?: ReactNode;
  /** Prevents selecting this tab. */
  disabled?: boolean;
}

export interface AnimatedTabsProps<T extends string = string> {
  /** Tabs, in display order. */
  tabs: AnimatedTabItem<T>[];
  /** Currently active tab id. Ignored when `queryParamKey` is set (the URL is the source of truth). */
  activeTab: T;
  /** Called with the picked tab id. */
  onChange: (id: T) => void;
  /** Keep the active tab in this URL search param through `useTabParam`. */
  queryParamKey?: string;
  /** Small screens: `select` swaps the row for a dropdown, `scroll` keeps a scrollable row. Defaults to `select`. */
  mobile?: 'select' | 'scroll';
  /** Tab size. Defaults to `md`. */
  size?: AnimatedTabsSize;
  /** Extra classes merged onto the root element. */
  className?: string;
}

const sizeClasses: Record<AnimatedTabsSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
};

function enabledIndexes<T extends string>(tabs: AnimatedTabItem<T>[]) {
  return tabs.map((_, i) => i).filter((i) => !tabs[i].disabled);
}

function targetIndexForKey<T extends string>(
  tabs: AnimatedTabItem<T>[],
  key: string,
  current: number
) {
  const enabled = enabledIndexes(tabs);
  if (enabled.length === 0) return undefined;
  const position = enabled.indexOf(current);
  const at = (p: number) => enabled[(p + enabled.length) % enabled.length];
  if (key === 'ArrowRight') return at(position + 1);
  if (key === 'ArrowLeft') return at(position - 1);
  if (key === 'Home') return enabled[0];
  if (key === 'End') return enabled[enabled.length - 1];
  return undefined;
}

function AnimatedTabsView<T extends string>({
  tabs,
  activeTab,
  onChange,
  mobile = 'select',
  size = 'md',
  className,
}: Omit<AnimatedTabsProps<T>, 'queryParamKey'>) {
  const baseId = useId();
  const breakpoint = useBreakpoint();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const tabbableIndex =
    activeIndex >= 0 && !tabs[activeIndex].disabled
      ? activeIndex
      : enabledIndexes(tabs)[0];
  const isSmallScreen = breakpoint === 'xs' || breakpoint === 'sm';

  const selectMenu = useMemo(
    () => tabs.map((tab) => ({ title: tab.label, path: tab.id })),
    [tabs]
  );

  if (mobile === 'select' && isSmallScreen) {
    return (
      <div data-tucu="animated-tabs" data-mobile="select" className={cn('w-full', className)}>
        <TabSelect
          tabMenu={selectMenu}
          selectedTabIndex={Math.max(activeIndex, 0)}
          onChange={(index) => {
            if (!tabs[index].disabled) onChange(tabs[index].id);
          }}
        />
      </div>
    );
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const target = targetIndexForKey(tabs, event.key, index);
    if (target === undefined) return;
    event.preventDefault();
    refs.current[target]?.focus();
    onChange(tabs[target].id);
  };

  return (
    <div
      data-tucu="animated-tabs"
      data-size={size}
      className={cn('w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', className)}
    >
      <div
        role="tablist"
        data-tucu="animated-tabs-list"
        className="inline-flex min-w-full items-center gap-1 border-b border-border sm:min-w-0"
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[index] = el;
              }}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-disabled={tab.disabled || undefined}
              disabled={tab.disabled}
              tabIndex={index === tabbableIndex ? 0 : -1}
              data-tucu="animated-tabs-tab"
              data-state={isActive ? 'active' : 'inactive'}
              onClick={() => onChange(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                'relative inline-flex shrink-0 items-center whitespace-nowrap rounded-lg font-medium outline-hidden transition-colors',
                'focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50',
                sizeClasses[size],
                isActive ? 'text-brand' : 'text-muted hover:text-foreground'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={`${baseId}-indicator`}
                  data-tucu="animated-tabs-indicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  className="absolute inset-0 rounded-[inherit] bg-brand/10"
                />
              )}
              {tab.icon && <span className="relative z-10 inline-flex shrink-0">{tab.icon}</span>}
              <span className="relative z-10">{tab.label}</span>
              {tab.badge && <span className="relative z-10 inline-flex">{tab.badge}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QueryParamAnimatedTabs<T extends string>({
  queryParamKey,
  onChange,
  tabs,
  ...rest
}: AnimatedTabsProps<T> & { queryParamKey: string }) {
  const values = useMemo(() => tabs.map((tab) => tab.id), [tabs]);
  const [current, setCurrent] = useTabParam<T>({ values, param: queryParamKey });
  return (
    <AnimatedTabsView
      {...rest}
      tabs={tabs}
      activeTab={current}
      onChange={(id) => {
        setCurrent(id);
        onChange(id);
      }}
    />
  );
}

export function AnimatedTabs<T extends string = string>(
  props: AnimatedTabsProps<T>
) {
  return props.queryParamKey ? (
    <QueryParamAnimatedTabs {...props} queryParamKey={props.queryParamKey} />
  ) : (
    <AnimatedTabsView {...props} />
  );
}

export default AnimatedTabs;
