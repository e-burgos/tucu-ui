import { FC } from 'react';
import {
  Tab,
  TabGroup as HeadlessTabGroup,
  TabPanels as HeadlessTabPanels,
  TabPanel as HeadlessTabPanel,
  TabList as HeadlessTabList,
  TabGroupProps,
  TabPanelsProps,
  TabPanelProps,
  TabListProps,
  TabProps,
} from '@headlessui/react';
import { motion, LayoutGroup } from 'framer-motion';
import cn from 'classnames';
import { useBreakpoint } from '../../hooks';

export { Tab };

export const TabGroup: FC<
  React.PropsWithChildren<{ className?: string }> & TabGroupProps
> = (props) => {
  return (
    <div className={cn('', props.className)}>
      <HeadlessTabGroup>{props.children}</HeadlessTabGroup>
    </div>
  );
};

export const TabList: FC<
  React.PropsWithChildren<{ className?: string }> & TabListProps
> = (props) => {
  return (
    <HeadlessTabList className={cn('', props.className)}>
      {props.children}
    </HeadlessTabList>
  );
};

export function TabItem({
  children,
  className,
  disabled,
  showMobileIndicator = true,
}: React.PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  showMobileIndicator?: boolean;
}> &
  TabProps) {
  const breakpoint = useBreakpoint();
  return (
    <Tab
      disabled={disabled}
      className={({ selected }) =>
        cn(
          'relative text-lg tracking-wider hover:text-gray-900 focus:outline-hidden',
          { 'text-sm': ['xs'].indexOf(breakpoint) !== -1 },
          {
            'font-medium rounded-sm dark:text-white text-current': selected,
            'text-gray-600 dark:text-gray-400': !selected,
          },
          className
        )
      }
    >
      {({ selected }) => (
        <>
          <span className="flex w-full">{children}</span>
          {selected && (
            <motion.span
              className={cn(
                'absolute bottom-0 left-0 right-0 z-1 h-0.5 w-full overflow-hidden rounded-full md:z-10',
                {
                  'bg-brand': showMobileIndicator,
                }
              )}
              layoutId="tab-indicator"
            />
          )}
        </>
      )}
    </Tab>
  );
}

export function TabPanels({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }> & TabPanelsProps) {
  return (
    <HeadlessTabPanels className={className}>
      <LayoutGroup>
        <>{children}</>
      </LayoutGroup>
    </HeadlessTabPanels>
  );
}

export function TabPanel({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }> & TabPanelProps) {
  return (
    <HeadlessTabPanel className={className}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 32 }}
        exit={{ opacity: 0, y: -32 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </HeadlessTabPanel>
  );
}
