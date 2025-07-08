import React, { Fragment } from 'react';
import Button from '../buttons';
import { Dialog, DialogPanel, TransitionChild } from '@headlessui/react';
import CardContainer from '../cards/card-container';
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
  function close() {
    setIsOpen(false);
  }

  function closeableClose() {
    onClose && onClose();
    closeable && setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-hidden"
      onClose={closeableClose}
    >
      <div
        className={`fixed inset-0 z-10 w-screen bg-gray-700/90 backdrop-blur-sm overflow-x-hidden overflow-y-hidden`}
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
            <DialogPanel className="flex h-full w-full items-center justify-center overflow-y duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
              <CardContainer
                className={cn(
                  'w-full sm:max-w-[800px] rounded-xl shadow-card',
                  className
                )}
              >
                <Dialog.Title
                  as="h3"
                  className={cn(
                    'flex w-full justify-between items-center font-bold uppercase tracking-wider text-lg h-14 dark:text-white text-current',
                    !text?.title ? 'text-transparent dark:text-transparent' : ''
                  )}
                >
                  {text?.title || '.'}
                  <Button
                    variant="ghost"
                    size="mini"
                    shape="circle"
                    onClick={closeableClose}
                  >
                    <X className="h-4 w-4 cursor-pointer" />
                  </Button>
                </Dialog.Title>

                {text?.content && (
                  <p className="mt-4 text-sm/6 dark:text-white text-current">
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

export default Modal;
