import { FC } from 'react';
import { Tab } from '@headlessui/react';
import { motion, LayoutGroup } from 'framer-motion';
import cn from 'classnames';

export { Tab };

export const TabGroup: FC<React.PropsWithChildren<{ className?: string }>> = (
  props
) => {
  return (
    <div className={cn('', props.className)}>
      <Tab.Group>{props.children}</Tab.Group>
    </div>
  );
};

export const TabList: FC<React.PropsWithChildren<{ className?: string }>> = (
  props
) => {
  return (
    <Tab.List className={cn('', props.className)}>{props.children}</Tab.List>
  );
};

export function TabItem({
  children,
  className,
  disabled,
  tabItemLayoutId,
}: React.PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  tabItemLayoutId?: string;
}>) {
  return (
    <Tab
      id={tabItemLayoutId}
      disabled={disabled}
      className={({ selected }) =>
        cn(
          'relative text-lg tracking-wider hover:text-gray-900 focus:outline-none',
          'xs:py-2.5 sm:py-3 px-3 sm:h-12 h-8 sm:w-auto w-full',
          {
            'font-medium rounded  dark:text-white text-current': selected,
            'text-gray-600 dark:text-gray-400': !selected,
          },
          className
        )
      }
    >
      {({ selected }) => (
        <>
          <span className="flex w-full justify-center px-4">{children}</span>
          {selected && (
            <motion.span
              className="absolute bottom-0 left-0 right-0 z-[1] h-0.5 w-full overflow-hidden rounded-full bg-brand md:z-10"
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
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <Tab.Panels className={className}>
      <LayoutGroup>
        <>{children}</>
      </LayoutGroup>
    </Tab.Panels>
  );
}

export function TabPanel({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <Tab.Panel className={className}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 32 }}
        exit={{ opacity: 0, y: -32 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </Tab.Panel>
  );
}
