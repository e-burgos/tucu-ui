import React from 'react';
import { cn } from '../../libs/cn';
import { Tooltip } from '../common/tooltip';
import type { SplitModalAction } from './split-modal-types';

export interface SplitModalActionsProps {
  actions: SplitModalAction[];
  iconOnly?: boolean;
  className?: string;
}

const VARIANT_CLASSES: Record<
  NonNullable<SplitModalAction['variant']>,
  string
> = {
  default:
    'text-current enabled:hover:bg-[var(--tucu-split-modal-item-hover-bg,var(--tucu-split-modal-item-hover-bg-default))]',
  danger: 'text-red-500 enabled:hover:bg-red-500/10',
};

function ActionButton({
  action,
  iconOnly,
}: {
  action: SplitModalAction;
  iconOnly: boolean;
}) {
  const tooltipContent =
    action.tooltip ?? (iconOnly ? action.label : undefined);
  const button = (
    <button
      type="button"
      data-tucu="split-modal-action"
      data-variant={action.variant ?? 'default'}
      disabled={action.disabled}
      onClick={action.onClick}
      className={cn(
        'flex items-center gap-2 rounded-lg text-sm font-medium outline-none transition-colors',
        'focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50',
        iconOnly ? 'justify-center p-2' : 'w-full px-3 py-2 text-left',
        VARIANT_CLASSES[action.variant ?? 'default']
      )}
    >
      {action.icon && (
        <span
          className="flex shrink-0 items-center justify-center"
          aria-hidden={iconOnly || undefined}
        >
          {action.icon}
        </span>
      )}
      <span className={iconOnly ? 'sr-only' : 'min-w-0 flex-1 truncate'}>
        {action.label}
      </span>
    </button>
  );
  return tooltipContent ? (
    <Tooltip content={tooltipContent} lazy>
      {button}
    </Tooltip>
  ) : (
    button
  );
}

export function SplitModalActions({
  actions,
  iconOnly = false,
  className,
}: SplitModalActionsProps) {
  return (
    <ul
      data-tucu="split-modal-actions"
      data-icon-only={iconOnly ? 'true' : undefined}
      className={cn(
        'm-0 flex list-none gap-1 p-0',
        iconOnly ? 'flex-row flex-wrap' : 'flex-col',
        className
      )}
    >
      {actions.map((action) => (
        <li key={action.id} className={iconOnly ? undefined : 'w-full'}>
          <ActionButton action={action} iconOnly={iconOnly} />
        </li>
      ))}
    </ul>
  );
}
