'use client';

import React, { useId, useRef, useState } from 'react';
import { cn } from '../../libs/cn';
import { useTucuMessages } from '../../libs/i18n/use-tucu-messages';
import type { TucuMessages } from '../../libs/i18n/messages';
import type {
  SplitModalItemStatus,
  SplitModalNavItem,
  SplitModalSection,
} from './split-modal-types';

const ITEM_SELECTOR = 'button[data-tucu="split-modal-item"]:not(:disabled)';

const STATUS_DOT_CLASSES: Record<SplitModalItemStatus, string> = {
  neutral: 'bg-gray-400',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
};

const statusLabel = (
  status: SplitModalItemStatus,
  messages: TucuMessages['splitModal']
) => {
  const labels: Record<SplitModalItemStatus, string> = {
    neutral: messages.statusNeutral,
    success: messages.statusSuccess,
    warning: messages.statusWarning,
    danger: messages.statusDanger,
    info: messages.statusInfo,
  };
  return labels[status];
};

const NEXT_KEYS = ['ArrowDown', 'ArrowRight'];
const PREVIOUS_KEYS = ['ArrowUp', 'ArrowLeft'];

const focusSiblingItem = (nav: HTMLElement, key: string) => {
  const items = Array.from(nav.querySelectorAll<HTMLElement>(ITEM_SELECTOR));
  if (items.length === 0) return false;
  const current = items.indexOf(document.activeElement as HTMLElement);
  let target: number;
  if (key === 'Home') target = 0;
  else if (key === 'End') target = items.length - 1;
  else if (NEXT_KEYS.includes(key)) target = (current + 1) % items.length;
  else if (PREVIOUS_KEYS.includes(key))
    target = (current <= 0 ? items.length : current) - 1;
  else return false;
  items[target].focus();
  return true;
};

export interface SplitModalNavProps {
  sections: SplitModalSection[];
  activeItemId?: string;
  onSelect: (id: string) => void;
  ariaLabel?: string;
  className?: string;
}

export function SplitModalNav({
  sections,
  activeItemId,
  onSelect,
  ariaLabel,
  className,
}: SplitModalNavProps) {
  const messages = useTucuMessages();
  const navRef = useRef<HTMLElement>(null);
  const instanceId = useId();
  const [focusedId, setFocusedId] = useState<string | undefined>();

  const enabledItems = sections.flatMap((section) =>
    section.items.filter((item) => !item.disabled)
  );
  const isEnabled = (id?: string) =>
    id !== undefined && enabledItems.some((item) => item.id === id);
  const tabStopId = isEnabled(focusedId)
    ? focusedId
    : isEnabled(activeItemId)
    ? activeItemId
    : enabledItems[0]?.id;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!navRef.current) return;
    if (focusSiblingItem(navRef.current, event.key)) event.preventDefault();
  };

  const renderItem = (item: SplitModalNavItem) => {
    const isActive = item.id === activeItemId;
    return (
      <li key={item.id} className="shrink-0 md:shrink">
        <button
          type="button"
          data-tucu="split-modal-item"
          data-active={isActive ? 'true' : undefined}
          aria-current={isActive ? 'page' : undefined}
          disabled={item.disabled}
          tabIndex={item.id === tabStopId ? 0 : -1}
          onFocus={() => setFocusedId(item.id)}
          onClick={() => onSelect(item.id)}
          className={cn(
            'relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium whitespace-nowrap transition-colors outline-none md:whitespace-normal',
            'focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50',
            isActive
              ? 'bg-[var(--tucu-split-modal-item-active-bg,var(--tucu-split-modal-item-active-bg-default))] text-[color:var(--tucu-split-modal-item-active-fg,var(--tucu-split-modal-item-active-fg-default))]'
              : 'text-current enabled:hover:bg-[var(--tucu-split-modal-item-hover-bg,var(--tucu-split-modal-item-hover-bg-default))]'
          )}
        >
          {isActive && (
            <span
              aria-hidden="true"
              data-tucu="split-modal-item-indicator"
              className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-brand md:inset-x-auto md:top-2 md:bottom-2 md:left-0 md:h-auto md:w-0.5"
            />
          )}
          {item.icon && (
            <span
              data-tucu="split-modal-item-icon"
              className="flex shrink-0 items-center justify-center"
            >
              {item.icon}
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate md:whitespace-normal">
              {item.label}
            </span>
            {item.description && (
              <span
                data-tucu="split-modal-item-description"
                className="block text-xs font-normal opacity-70"
              >
                {item.description}
              </span>
            )}
          </span>
          {item.status && (
            <span
              data-tucu="split-modal-item-status"
              data-status={item.status}
              className="flex shrink-0 items-center"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'h-2 w-2 rounded-full',
                  STATUS_DOT_CLASSES[item.status]
                )}
              />
              <span className="sr-only">
                {statusLabel(item.status, messages.splitModal)}
              </span>
            </span>
          )}
          {item.badge && (
            <span
              data-tucu="split-modal-item-badge"
              className="ml-auto shrink-0 text-xs"
            >
              {item.badge}
            </span>
          )}
        </button>
      </li>
    );
  };

  return (
    <nav
      ref={navRef}
      data-tucu="split-modal-nav"
      aria-label={ariaLabel ?? messages.splitModal.navigation}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex flex-row gap-1 overflow-x-auto p-2 md:flex-col md:gap-4 md:overflow-x-visible md:overflow-y-auto md:p-3',
        className
      )}
    >
      {sections.map((section) => {
        const labelId = `${instanceId}-${section.id}`;
        return (
          <div
            key={section.id}
            data-tucu="split-modal-section"
            className="flex flex-row md:flex-col"
          >
            {section.label && (
              <p
                id={labelId}
                data-tucu="split-modal-section-label"
                className="m-0 hidden px-3 pb-1 text-xs font-semibold tracking-wide uppercase opacity-60 md:block"
              >
                {section.label}
              </p>
            )}
            <ul
              aria-labelledby={section.label ? labelId : undefined}
              className="m-0 flex list-none flex-row gap-1 p-0 md:flex-col"
            >
              {section.items.map(renderItem)}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
