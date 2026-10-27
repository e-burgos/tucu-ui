'use client';

import React, {
  useEffect,
  useId,
  useRef,
  useCallback,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../buttons';
import { CardContainer } from '../cards/card-container';
import { cn } from '../../libs/cn';
import { Close } from '../icons/close';
import { useTucuMessages } from '../../libs/i18n/use-tucu-messages';
import { usePortalContainer } from '../../themes/components/theme-scope/portal-container';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const MODAL_PANEL_SIZE_CLASSES: Record<ModalSize, string> = {
  sm: 'sm:max-w-[400px]',
  md: 'sm:max-w-[800px]',
  lg: 'sm:max-w-[1000px]',
  xl: 'sm:max-w-[1200px]',
  full: 'sm:max-w-[calc(100vw-32px)]',
};

const MODAL_CONTENT_SIZE_CLASSES: Record<ModalSize, string> = {
  sm: 'max-h-[50vh]',
  md: 'max-h-[60vh]',
  lg: 'max-h-[70vh]',
  xl: 'max-h-[75vh]',
  full: 'max-h-[80vh]',
};

export type ModalCloseButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'onClick' | 'color'
> & {
  [dataAttribute: `data-${string}`]: string | undefined;
};

const TITLE_TYPOGRAPHY_CLASSES =
  'font-bold font-figtree text-[22px] font-600 leading-[100%] tracking-[0.022px]';

const toCssLength = (value: number | string | undefined) =>
  value === undefined ? undefined : typeof value === 'number' ? `${value}px` : value;

export interface ModalProps {
  isOpen: boolean;
  closeable?: boolean;
  hideButtons?: boolean;
  children?: React.ReactNode;
  buttonContainer?: React.ReactNode;
  className?: string;
  /** Extra classes merged onto the scrollable content area (e.g. `p-0 mt-0`). */
  contentClassName?: string;
  /** Extra classes merged onto the header row that holds the title and the close button. */
  titleContainerClassName?: string;
  /** Alias of `titleContainerClassName`, merged after it. */
  headerClassName?: string;
  /** Extra classes merged onto the backdrop overlay (defaults to `bg-gray-700/10 backdrop-blur-xs`). */
  overlayClassName?: string;
  /** Attributes spread onto the close button (`data-*`, `aria-*`, `className` merged). `aria-label` wins over `closeLabel`. */
  closeButtonProps?: ModalCloseButtonProps;
  /** Maximum width of the dialog panel; a CSS length or a number of pixels. Overrides the `size` preset. */
  maxWidth?: number | string;
  /** Maximum height of the scrollable content area; a CSS length or a number of pixels. Overrides the `size` preset. */
  maxHeight?: number | string;
  /** Element focused when the modal opens. Defaults to the dialog element itself. */
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  hideCloseButton?: boolean;
  /** Width and content height preset. `md` reproduces the original dimensions. */
  size?: ModalSize;
  /** Replaces the default title inside the header; the close button is kept. */
  header?: React.ReactNode;
  /** Accessible name of the close button. Defaults to the localized `dialog.close`. */
  closeLabel?: string;
  /** Accessible name applied to the element with `role="dialog"`. */
  'aria-label'?: string;
  /** Overrides the id reference used to describe the dialog. */
  'aria-describedby'?: string;
  /** Id of the element that labels the dialog. Defaults to the modal title; ignored when `aria-label` is set. */
  'aria-labelledby'?: string;
  /** ARIA role of the dialog element. Use `alertdialog` for confirmations that interrupt the user. */
  role?: 'dialog' | 'alertdialog';
  /** `data-*` attributes are forwarded to the element with `role="dialog"`. */
  [dataAttribute: `data-${string}`]: string | undefined;
  text?: {
    title?: React.ReactNode;
    content?: string;
    button?: string;
    backButton?: string;
  };
  setIsOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  onBack?: () => void;
  onSubmit?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  text,
  closeable = true,
  hideButtons = false,
  children,
  buttonContainer,
  className,
  titleContainerClassName,
  headerClassName,
  overlayClassName,
  closeButtonProps,
  maxWidth,
  maxHeight,
  initialFocusRef,
  contentClassName,
  hideCloseButton = false,
  size = 'md',
  header,
  closeLabel,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-labelledby': ariaLabelledBy,
  role = 'dialog',
  setIsOpen,
  onSubmit,
  onBack,
  onClose,
  ...dataAttributes
}) => {
  const messages = useTucuMessages();
  const portalContainer = usePortalContainer();
  const [isAnimating, setIsAnimating] = useState(false);
  const initialFocusRefLatest = useRef(initialFocusRef);
  initialFocusRefLatest.current = initialFocusRef;
  const instanceId = useId();
  const titleId = `${instanceId}-title`;
  const descriptionId = `${instanceId}-description`;
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && previousFocusRef.current) {
      const previous = previousFocusRef.current;
      previousFocusRef.current = null;
      if (previous.isConnected) previous.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsAnimating(false);
      document.body.style.overflow = '';
      return undefined;
    }
    document.body.style.overflow = 'hidden';
    setIsAnimating(true);
    (initialFocusRefLatest.current?.current ?? dialogRef.current)?.focus();
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const closeableClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
    if (closeable) {
      setIsOpen(false);
    }
  }, [onClose, closeable, setIsOpen]);

  const overlayPressStartedRef = useRef(false);

  const handleOverlayMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      overlayPressStartedRef.current = event.target === event.currentTarget;
    },
    []
  );

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const pressStartedOnOverlay = overlayPressStartedRef.current;
      overlayPressStartedRef.current = false;
      if (
        event.target === event.currentTarget &&
        pressStartedOnOverlay &&
        closeable
      ) {
        closeableClose();
      }
    },
    [closeable, closeableClose]
  );

  const handleDialogKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      if (closeable) closeableClose();
    },
    [closeable, closeableClose]
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const dialog = dialogRef.current;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const outside = !active || !dialog.contains(active);
      if (
        event.shiftKey &&
        (outside || active === first || active === dialog)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (outside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const hasHeading = Boolean(text?.title || header);

  const panelStyle: React.CSSProperties | undefined =
    maxWidth === undefined ? undefined : { maxWidth: toCssLength(maxWidth) };
  const contentStyle: React.CSSProperties | undefined =
    maxHeight === undefined ? undefined : { maxHeight: toCssLength(maxHeight) };

  const overlayClasses = cn(
    'fixed inset-0 w-screen h-screen flex items-center justify-center p-[16px] bg-gray-700/10 backdrop-blur-xs transition-opacity duration-300 ease-out',
    isAnimating ? 'opacity-100' : 'opacity-0',
    overlayClassName
  );

  const dialogClasses = cn(
    'flex w-full justify-center pointer-events-none transition-all duration-300 ease-out',
    isAnimating ? 'scale-100' : 'scale-105'
  );

  const modalContent = (
    <div
      data-tucu="modal-overlay"
      className={overlayClasses}
      onMouseDown={handleOverlayMouseDown}
      onClick={handleOverlayClick}
      style={{ zIndex: 50 }}
    >
      <div
        {...dataAttributes}
        ref={dialogRef}
        tabIndex={-1}
        className={cn(dialogClasses, 'outline-none')}
        role={role}
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={
          ariaLabel ? undefined : ariaLabelledBy ?? (hasHeading ? titleId : undefined)
        }
        aria-describedby={
          ariaDescribedBy ?? (text?.content ? descriptionId : undefined)
        }
        onKeyDown={handleDialogKeyDown}
      >
        <CardContainer
          data-tucu="modal"
          className={cn(
            'relative w-full h-fit! rounded-xl shadow-card pointer-events-auto',
            MODAL_PANEL_SIZE_CLASSES[size],
            className
          )}
          style={panelStyle}
        >
          <div
            data-tucu="modal-header"
            className={cn(
              'flex w-full h-fit justify-between items-start pb-3 dark:text-white text-current',
              !hasHeading
                ? 'text-transparent dark:text-transparent'
                : ' border-b border-border',
              titleContainerClassName,
              headerClassName
            )}
          >
            <div
              id={titleId}
              data-tucu="modal-title"
              className={cn('flex-1 min-w-0', TITLE_TYPOGRAPHY_CLASSES)}
            >
              {header ?? text?.title ?? ''}
            </div>
            {!hideCloseButton && (
              <Button
                variant="transparent"
                size="mini"
                shape="circle"
                {...closeButtonProps}
                className={cn('shrink-0', closeButtonProps?.className)}
                onClick={closeableClose}
                aria-label={
                  closeButtonProps?.['aria-label'] ??
                  closeLabel ??
                  messages.dialog.close
                }
              >
                <Close
                  className="h-[18px] w-[18px] cursor-pointer text-gray-500 dark:text-gray-200"
                  aria-hidden="true"
                  width={18}
                  height={18}
                />
              </Button>
            )}
          </div>

          {text?.content && (
            <p
              id={descriptionId}
              className="mt-[16px] text-sm/6 dark:text-white text-current"
            >
              {text.content}
            </p>
          )}
          <div
            className={cn(
              'flex flex-col w-full overflow-x-hidden overflow-y-auto p-[8px] dark:text-white text-current mt-[16px]',
              MODAL_CONTENT_SIZE_CLASSES[size],
              contentClassName
            )}
            style={contentStyle}
          >
            {children}
          </div>
          {buttonContainer && (
            <div className="mt-[24px]">{buttonContainer}</div>
          )}
          {!hideButtons && !buttonContainer && (
            <div
              data-tucu="modal-buttons"
              className="mt-auto pt-6 flex w-full justify-end gap-[8px]"
            >
              <Button
                size="medium"
                shape="rounded"
                variant="ghost"
                onClick={() => {
                  close();
                  onBack && onBack();
                }}
              >
                {text?.backButton || 'Close'}
              </Button>
              <Button
                size="medium"
                shape="rounded"
                onClick={() => {
                  onSubmit && onSubmit();
                }}
              >
                {text?.button || 'Accept'}
              </Button>
            </div>
          )}
        </CardContainer>
      </div>
    </div>
  );

  return portalContainer
    ? (createPortal(modalContent, portalContainer) as React.ReactElement)
    : null;
};

Modal.displayName = 'Modal';

export default Modal;
