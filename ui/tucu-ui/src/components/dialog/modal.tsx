import React, { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../buttons';
import { CardContainer } from '../cards/card-container';
import cn from 'classnames';
import { Close } from '../icons/close';
import Typography from '../typography';

export interface ModalProps {
  isOpen: boolean;
  closeable?: boolean;
  hideButtons?: boolean;
  children?: React.ReactNode;
  buttonContainer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  titleContainerClassName?: string;
  text?: {
    title?: string;
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
  contentClassName,
  setIsOpen,
  onSubmit,
  onBack,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store the previously focused element when modal opens
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Return focus to previously focused element when modal closes
  useEffect(() => {
    if (!isOpen && previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);

  // Handle modal visibility and animations
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      // Show modal immediately
      setIsVisible(true);
      // Trigger animation after DOM update
      const timer = setTimeout(() => {
        setIsAnimating(true);
        // Focus on title after animation starts
        if (titleRef.current) {
          titleRef.current.focus();
        }
      }, 0);
      return () => clearTimeout(timer);
    } else {
      // Start closing animation
      setIsAnimating(false);
      // Hide modal after animation completes
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 200); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Cleanup on unmount
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

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      // Only close if clicking directly on the backdrop, not on children
      if (e.target === e.currentTarget && closeable) {
        closeableClose();
      }
    },
    [closeable, closeableClose]
  );

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && closeable) {
        closeableClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
    return undefined;
  }, [isOpen, closeable, closeableClose]);

  if (!isVisible) {
    return null;
  }

  const titleId = 'modal-title';
  const descriptionId = 'modal-description';

  const backdropClasses = cn(
    'fixed inset-0 w-screen h-screen bg-gray-700/10 backdrop-blur-xs transition-opacity duration-300 ease-out',
    isAnimating ? 'opacity-100' : 'opacity-0'
  );

  const modalContentClasses = cn(
    'fixed inset-0 flex items-center justify-center p-[16px] transition-all duration-300 ease-out pointer-events-none',
    isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
  );

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        className={backdropClasses}
        onClick={handleBackdropClick}
        aria-hidden="true"
        style={{ zIndex: 50 }}
      />
      {/* Modal Content */}
      <div
        className={modalContentClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={text?.title ? titleId : undefined}
        aria-describedby={text?.content ? descriptionId : undefined}
        style={{ zIndex: 51 }}
      >
        <CardContainer
          className={cn(
            'relative w-full sm:max-w-[800px] h-fit! min-h-[400px] rounded-xl shadow-card pointer-events-auto',
            className
          )}
        >
          <h3
            ref={titleRef}
            id={titleId}
            className={cn(
              'flex w-full h-fit justify-between items-start pb-3 dark:text-white text-current',
              !text?.title
                ? 'text-transparent dark:text-transparent'
                : ' border-b border-gray-200 dark:border-gray-700',
              titleContainerClassName
            )}
            tabIndex={-1}
          >
            <Typography
              tag="h3"
              className="font-bold font-figtree text-[22px] font-600 leading-[100%] tracking-[0.022px]"
            >
              {text?.title || ''}
            </Typography>
            <Button
              variant="transparent"
              size="mini"
              shape="circle"
              onClick={closeableClose}
              aria-label={closeable ? 'Close modal' : 'Close'}
            >
              <Close
                className="h-[18px] w-[18px] cursor-pointer text-gray-500 dark:text-gray-200"
                aria-hidden="true"
                width={18}
                height={18}
              />
            </Button>
          </h3>

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
              'flex flex-col w-full overflow-x-hidden overflow-y-auto max-h-[60vh] p-[8px] dark:text-white text-current mt-[16px]',
              contentClassName
            )}
          >
            {children}
          </div>
          {buttonContainer && (
            <div className="mt-[24px]">{buttonContainer}</div>
          )}
          {!hideButtons && (
            <div className="absolute bottom-8 right-8 flex w-full justify-end gap-[8px]">
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
    </>
  );

  // Use portal to render modal directly in body, ensuring proper stacking
  return createPortal(modalContent, document.body) as React.ReactElement;
};

Modal.displayName = 'Modal';

export default Modal;
