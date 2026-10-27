'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useId } from 'react';
import { cn } from '../../libs/cn';
import { useMeasure } from '../../hooks/use-measure';
import { useTheme } from '../../themes/hooks/use-theme';
import { LAYOUT_OPTIONS } from '../../themes/config';
import { Plus } from '../icons/plus';

export type CollapseVariant = 'card' | 'compact' | 'unstyled';

type CollapseDomAttributes = {
  [key: `aria-${string}`]: string | number | boolean | undefined;
  [key: `data-${string}`]: string | number | boolean | undefined;
};

export interface CollapseProps extends CollapseDomAttributes {
  label: React.ReactNode;
  initialOpen?: boolean;
  /** Controlled open state. When provided the component no longer manages its own state */
  open?: boolean;
  /** Called with the next open state when the header is toggled */
  onOpenChange?: (open: boolean) => void;
  /** card: bordered card with a tall uppercase header (default). compact: small plain header. unstyled: layout only */
  variant?: CollapseVariant;
  className?: string;
  /** Extra classes for the header button */
  headerClassName?: string;
  /** Extra classes for the content panel */
  panelClassName?: string;
}

const CARD_HEADER_HEIGHT = 54;

const headerVariantClasses: Record<CollapseVariant, string> = {
  card: 'flex h-13 w-full items-center justify-between px-5 py-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white',
  compact:
    'flex h-8 w-full items-center justify-between px-2 text-sm font-medium normal-case tracking-normal text-gray-900 dark:text-white',
  unstyled: 'flex w-full items-center justify-between',
};

export function Collapse({
  label,
  children,
  initialOpen = false,
  open,
  onOpenChange,
  variant = 'card',
  className,
  headerClassName,
  panelClassName,
  ...domAttributes
}: React.PropsWithChildren<CollapseProps>) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(initialOpen);
  const isOpen = isControlled ? open : internalOpen;
  const [ref, { height }] = useMeasure<HTMLDivElement>();
  const { layout } = useTheme();
  const uid = useId();
  const headerId = `${uid}-header`;
  const panelId = `${uid}-panel`;
  const isCard = variant === 'card';
  const isMacOS =
    layout === LAYOUT_OPTIONS.MACOS ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK;
  const extraPadding = isMacOS ? 24 : 0;

  useEffect(() => {
    if (!isControlled && initialOpen) setInternalOpen(true);
  }, [initialOpen]);

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div
      {...domAttributes}
      data-tucu="collapse"
      data-variant={variant}
      data-open={isOpen ? 'true' : 'false'}
      className={cn(
        isCard &&
          'ease-[cubic-bezier(0.33, 1, 0.68, 1)] relative mb-5 overflow-hidden rounded-lg bg-white shadow-card transition-all duration-350 last:mb-0 hover:shadow-transaction dark:bg-light-dark',
        isCard && (isOpen ? 'shadow-transaction' : 'shadow-card'),
        className
      )}
      style={
        isCard
          ? {
              height: isOpen
                ? CARD_HEADER_HEIGHT + height + extraPadding
                : CARD_HEADER_HEIGHT,
            }
          : undefined
      }
    >
      <button
        type="button"
        id={headerId}
        data-tucu="collapse-trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(headerVariantClasses[variant], headerClassName)}
        onClick={toggle}
      >
        {label}

        {variant !== 'unstyled' && (
          <span
            className={cn(
              'shrink-0 transition-transform duration-200 ltr:ml-4 rtl:mr-4',
              isOpen && 'rotate-45'
            )}
          >
            <Plus className="" />
          </span>
        )}
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        data-tucu="collapse-content"
        hidden={isCard ? undefined : !isOpen}
        aria-hidden={isCard && !isOpen ? true : undefined}
        className={cn(
          isCard && 'border-t border-dashed',
          isCard && (isOpen ? 'border-border' : 'border-transparent invisible'),
          panelClassName
        )}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}

export default Collapse;
