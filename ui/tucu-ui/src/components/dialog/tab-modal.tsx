import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown } from 'lucide-react';
import cn from 'classnames';
import Button from '../buttons/button/index';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabModalTab {
  /** Lucide icon component (e.g. Activity, BarChart3) */
  icon?: React.ElementType;
  name: string;
  content: React.ReactNode;
}

export interface TabModalButton {
  label: string;
  onClick: () => void;
}

export interface TabModalProps {
  /** Lucide icon component rendered in the header */
  icon?: React.ElementType;
  title?: string;
  subtitle?: string;
  /** Badge text rendered next to the title (e.g. "SANDBOX", "LIVE") */
  badgeHeader?: string;
  /** Extra Tailwind classes applied to the badge element */
  badgeHeaderClassName?: string;
  /**
   * Array of tabs. If provided (and `content` is not), renders a tab bar.
   * Each tab's `content` is shown when that tab is active.
   */
  tabs?: TabModalTab[];
  /**
   * Direct content. When provided, the tab bar is hidden and this content
   * fills the body directly.
   */
  content?: React.ReactNode;
  /** Text shown on the left side of the footer */
  footerLabel?: string;
  /** Primary action button (right side of footer) */
  successButton?: TabModalButton;
  /** Secondary close button (right side of footer). Defaults to onClose if omitted. */
  closeButton?: TabModalButton;
  /** Label for the default close button. Defaults to 'Close'. */
  closeLabel?: string;
  onClose: () => void;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TabModal({
  icon: HeaderIcon,
  title,
  subtitle,
  badgeHeader,
  badgeHeaderClassName,
  tabs,
  content,
  footerLabel,
  successButton,
  closeButton,
  closeLabel: closeLabelProp,
  onClose,
  className,
}: TabModalProps) {
  const useTabs = !content && tabs && tabs.length > 0;
  const [activeTab, setActiveTab] = useState(0);
  const [footerExpanded, setFooterExpanded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Reset active tab when tabs change
  useEffect(() => {
    setActiveTab(0);
  }, [tabs?.length]);

  const closeLabel = closeButton?.label ?? closeLabelProp ?? 'Close';
  const handleClose = closeButton?.onClick ?? onClose;

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-end sm:items-center justify-center bg-gray-700/10 backdrop-blur-xs p-0 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          'relative w-full sm:max-w-xl max-h-[92dvh] flex flex-col rounded-t-2xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden',
          className
        )}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-3 shrink-0 bg-brand/5 dark:bg-brand/10 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2.5">
            {HeaderIcon && (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 dark:bg-brand/20 border border-brand/20 dark:border-brand/30">
                <HeaderIcon className="h-4 w-4 text-brand" />
              </div>
            )}
            <div>
              {(title || badgeHeader) && (
                <div className="flex items-center gap-2">
                  {title && (
                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      {title}
                    </span>
                  )}
                  {badgeHeader && (
                    <span
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                        badgeHeaderClassName ??
                          'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                      )}
                    >
                      {badgeHeader}
                    </span>
                  )}
                </div>
              )}
              {subtitle && (
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Tabs bar (only when tabs provided and no direct content) ── */}
        {useTabs && (
          <div className="flex shrink-0 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/20">
            {tabs?.map(({ icon: TabIcon, name }, index) => (
              <button
                key={name}
                type="button"
                onClick={() => setActiveTab(index)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 py-2.5 text-[11px] font-bold uppercase tracking-wide transition-all',
                  activeTab === index
                    ? 'border-b-2 border-brand text-brand bg-brand/5'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                )}
              >
                {TabIcon && <TabIcon className="h-3 w-3 shrink-0 sm:hidden" />}
                <span>{name}</span>
              </button>
            ))}
          </div>
        )}

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto p-4">
          {content ? content : useTabs ? tabs?.[activeTab].content : null}
        </div>

        {/* ── Footer ── */}
        <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between bg-gray-100 dark:bg-gray-800/10">
          {closeButton || successButton ? (
            // Normal layout: footerLabel left, buttons right
            <>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-mono truncate max-w-[50%]">
                {footerLabel ?? ''}
              </span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="mini" onClick={handleClose}>
                  {closeLabel}
                </Button>
                {successButton && (
                  <Button
                    variant="solid"
                    size="mini"
                    onClick={successButton.onClick}
                  >
                    {successButton.label}
                  </Button>
                )}
              </div>
            </>
          ) : footerLabel ? (
            // No buttons: footerLabel expands full width with collapsible
            <button
              type="button"
              onClick={() => setFooterExpanded((v) => !v)}
              className="flex w-full items-start gap-2 text-left group"
            >
              <ChevronDown
                className={cn(
                  'h-3 w-3 shrink-0 mt-0.5 text-gray-400 transition-transform duration-200',
                  footerExpanded && 'rotate-180'
                )}
              />
              <span
                className={cn(
                  'text-[10px] text-gray-500 dark:text-gray-400 font-mono transition-all duration-200',
                  footerExpanded ? 'whitespace-pre-wrap break-all' : 'truncate'
                )}
              >
                {footerLabel}
              </span>
            </button>
          ) : (
            // No footerLabel, no buttons: default close button
            <div className="flex w-full justify-end">
              <Button variant="ghost" size="mini" onClick={handleClose}>
                {closeLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
