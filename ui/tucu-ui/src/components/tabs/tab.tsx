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

type VariantNames = 'underline' | 'pills' | 'bordered' | 'solid';
type SizeNames = 'small' | 'medium' | 'large';
type ColorNames = 'primary' | 'secondary' | 'success' | 'danger';

const variants: Record<
  VariantNames,
  { base: string; selected: string; unselected: string }
> = {
  underline: {
    base: 'relative pb-2 border-b-2 border-transparent',
    selected: 'border-brand text-brand dark:border-brand dark:text-brand',
    unselected: 'hover:border-gray-300 dark:hover:border-gray-600',
  },
  pills: {
    base: 'rounded-full px-4 py-2 transition-all duration-200',
    selected: 'bg-brand text-white shadow-sm',
    unselected: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  },
  bordered: {
    base: 'rounded-lg border-2 px-4 py-2 transition-all duration-200',
    selected: 'border-brand bg-brand/10 text-brand dark:bg-brand/20',
    unselected:
      'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
  },
  solid: {
    base: 'rounded-lg px-4 py-2 transition-all duration-200',
    selected: 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white',
    unselected: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  },
};

const sizes: Record<SizeNames, string> = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
};

const colors: Record<ColorNames, string> = {
  primary: 'text-blue-600 dark:text-blue-400',
  secondary: 'text-gray-600 dark:text-gray-400',
  success: 'text-green-600 dark:text-green-400',
  danger: 'text-red-600 dark:text-red-400',
};

export interface TabGroupExtendedProps extends TabGroupProps {
  variant?: VariantNames;
  className?: string;
}

export const TabGroup: FC<React.PropsWithChildren<TabGroupExtendedProps>> = ({
  variant = 'underline',
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('w-full', className)} data-variant={variant}>
      <HeadlessTabGroup {...props}>{children}</HeadlessTabGroup>
    </div>
  );
};

export interface TabListExtendedProps extends TabListProps {
  variant?: VariantNames;
  className?: string;
}

export const TabList: FC<React.PropsWithChildren<TabListExtendedProps>> = ({
  variant = 'underline',
  className,
  children,
  ...props
}) => {
  const listClasses = cn(
    'flex',
    {
      'gap-6 border-b border-gray-200 dark:border-gray-700':
        variant === 'underline',
      'gap-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl': variant === 'pills',
      'gap-2': variant === 'bordered',
      'gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl': variant === 'solid',
    },
    className
  );

  return (
    <HeadlessTabList className={listClasses} {...props}>
      {children}
    </HeadlessTabList>
  );
};

export interface TabItemExtendedProps extends TabProps {
  variant?: VariantNames;
  size?: SizeNames;
  color?: ColorNames;
  className?: string;
  disabled?: boolean;
  showMobileIndicator?: boolean;
  icon?: React.ReactNode;
}

export function TabItem({
  children,
  className,
  disabled,
  showMobileIndicator = true,
  variant = 'underline',
  size = 'medium',
  color,
  icon,
}: React.PropsWithChildren<TabItemExtendedProps>) {
  const breakpoint = useBreakpoint();
  const isMobile = ['xs'].indexOf(breakpoint) !== -1;

  return (
    <Tab
      disabled={disabled}
      className={({ selected }) =>
        cn(
          'relative font-medium tracking-wide transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant].base,
          sizes[size],
          {
            [variants[variant].selected]: selected,
            [variants[variant].unselected]: !selected,
            'text-sm': isMobile,
          },
          color && !selected && colors[color],
          {
            'text-gray-600 dark:text-gray-400': !selected && !color,
            'text-gray-900 dark:text-white':
              selected && variant === 'underline',
          },
          className
        )
      }
    >
      {({ selected }) => (
        <>
          <span className="flex items-center justify-center gap-2 whitespace-nowrap">
            {icon && <span className="shrink-0">{icon}</span>}
            <span>{children}</span>
          </span>
          {selected && variant === 'underline' && showMobileIndicator && (
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full"
              layoutId="tab-indicator"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
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
    <HeadlessTabPanels className={cn('mt-4', className)}>
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
    <HeadlessTabPanel
      className={cn(
        'rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand',
        className
      )}
    >
      {children}
    </HeadlessTabPanel>
  );
}
