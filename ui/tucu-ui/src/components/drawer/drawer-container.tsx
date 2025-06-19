import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import cn from 'classnames';

export interface DrawerContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  position?: 'left' | 'right';
  backdrop?: boolean;
}

export function DrawerContainer({
  isOpen,
  setIsOpen,
  children,
  position = 'left',
  backdrop = true,
}: DrawerContainerProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={cn('fixed inset-0 z-50 overflow-hidden')}
        onClose={() => null}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPanel
            onClick={() => setIsOpen(false)}
            className={cn(
              'fixed inset-0',
              backdrop ? 'bg-gray-700 bg-opacity-60 backdrop-blur-sm' : ''
            )}
          />
        </TransitionChild>

        {position === 'left' && (
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="fixed inset-y-0 ltr:left-0 rtl:right-0 flex w-full max-w-full xs:w-auto shadow-[0_0_80px_rgba(17,24,39,0.2)]">
              {children}
            </div>
          </TransitionChild>
        )}
        {position === 'right' && (
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-out duration-300"
            enterFrom="ltr:translate-x-full rtl:-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-300"
            leaveFrom="translate-x-0"
            leaveTo="ltr:translate-x-full rtl:-translate-x-full"
          >
            <div className="fixed inset-y-0 ltr:right-0 rtl:left-0 flex w-full max-w-full xs:w-auto shadow-[0_0_80px_rgba(17,24,39,0.2)]">
              {children}
            </div>
          </TransitionChild>
        )}
      </Dialog>
    </Transition>
  );
}
