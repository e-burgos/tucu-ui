import React, { Fragment, useEffect, useRef, useCallback } from 'react';
import { Button } from '../buttons';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from '@headlessui/react';
import { CardContainer } from '../cards';
import cn from 'classnames';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  closeable?: boolean;
  hideButtons?: boolean;
  children?: React.ReactNode;
  buttonContainer?: React.ReactNode;
  className?: string;
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
  setIsOpen,
  onSubmit,
  onBack,
  onClose,
}) => {
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

  const handleDialogClose = useCallback(() => {
    if (closeable) {
      closeableClose();
    }
  }, [closeable, closeableClose]);

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
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeable, closeableClose]);

  const titleId = 'modal-title';
  const descriptionId = 'modal-description';

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleDialogClose}
      aria-labelledby={text?.title ? titleId : undefined}
      aria-describedby={text?.content ? descriptionId : undefined}
      initialFocus={titleRef}
    >
      <div
        className="fixed inset-0 z-10 w-screen bg-gray-700/90 backdrop-blur-sm overflow-hidden"
        aria-hidden="true"
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-105"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-105"
        >
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              className="flex h-full w-full items-center justify-center overflow-y duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
              role="dialog"
              aria-modal="true"
            >
              <CardContainer
                className={cn(
                  'w-full sm:max-w-[800px] rounded-xl shadow-card',
                  className
                )}
              >
                <DialogTitle
                  as="h3"
                  ref={titleRef}
                  id={titleId}
                  className={cn(
                    'flex w-full justify-between items-center font-bold uppercase tracking-wider text-lg h-14 dark:text-white text-current',
                    !text?.title ? 'text-transparent dark:text-transparent' : ''
                  )}
                  tabIndex={-1}
                >
                  {text?.title || '.'}
                  <Button
                    variant="ghost"
                    size="mini"
                    shape="circle"
                    onClick={closeableClose}
                    aria-label={closeable ? 'Close modal' : 'Close'}
                  >
                    <X className="h-4 w-4 cursor-pointer" aria-hidden="true" />
                  </Button>
                </DialogTitle>

                {text?.content && (
                  <p
                    id={descriptionId}
                    className="mt-4 text-sm/6 dark:text-white text-current"
                  >
                    {text.content}
                  </p>
                )}
                <div className="flex flex-col w-full overflow-x-hidden overflow-y-auto max-h-[60vh] p-2 dark:text-white text-current mt-4">
                  {children}
                </div>
                {buttonContainer && (
                  <div className="mt-6">{buttonContainer}</div>
                )}
                {!hideButtons && (
                  <div className="flex w-full justify-end gap-2 mt-6">
                    <Button
                      size="medium"
                      shape="rounded"
                      variant="ghost"
                      onClick={() => {
                        close();
                        onBack && onBack();
                      }}
                    >
                      {text?.backButton || 'Cerrar'}
                    </Button>
                    <Button
                      size="medium"
                      shape="rounded"
                      onClick={() => {
                        onSubmit && onSubmit();
                      }}
                    >
                      {text?.button || 'Aceptar'}
                    </Button>
                  </div>
                )}
              </CardContainer>
            </DialogPanel>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  );
};

Modal.displayName = 'Modal';

export default Modal;
