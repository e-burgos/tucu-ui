import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

export interface DrawerContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  position?: 'left' | 'right';
  backdrop?: boolean;
  backdropClassName?: string;
}

export function DrawerContainer({
  isOpen,
  setIsOpen,
  children,
  position = 'left',
  backdrop = true,
  backdropClassName,
}: DrawerContainerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
      // Show drawer immediately
      setIsVisible(true);
      // Trigger animation after DOM update
      const timer = setTimeout(() => {
        setIsAnimating(true);

        const focusableElements =
          drawerRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );

        if (focusableElements?.length) {
          focusableElements[0].focus();
        } else {
          drawerRef.current?.focus();
        }
      }, 0);
      return () => clearTimeout(timer);
    } else {
      // Start closing animation
      setIsAnimating(false);
      // Hide drawer after animation completes
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
        previousFocusRef.current?.focus();
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking directly on the backdrop, not on children
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        return;
      }

      if (e.key === 'Tab' && isOpen && drawerRef.current) {
        const focusableElements = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => {
          return (
            !element.hasAttribute('disabled') &&
            element.getAttribute('aria-hidden') !== 'true'
          );
        });

        if (!focusableElements.length) {
          e.preventDefault();
          drawerRef.current.focus();
          return;
        }

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (!activeElement || activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
          return;
        }

        if (activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
    return undefined;
  }, [isOpen, setIsOpen]);

  if (!isVisible) {
    return null;
  }

  const backdropClasses = cn(
    'fixed inset-0 w-screen h-dvh transition-opacity duration-300 ease-out',
    isAnimating ? 'opacity-100' : 'opacity-0',
    backdropClassName ?? (backdrop ? 'bg-gray-700/10 backdrop-blur-xs' : '')
  );

  const drawerClasses = cn(
    'fixed inset-y-0 h-dvh max-h-dvh w-full max-w-full min-[500px]:w-auto pointer-events-none transition-transform duration-300 ease-out',
    position === 'left'
      ? cn(
          'ltr:left-0 rtl:right-0',
          isAnimating
            ? 'ltr:translate-x-0 rtl:translate-x-0'
            : 'ltr:-translate-x-full rtl:translate-x-full'
        )
      : cn(
          'ltr:right-0 rtl:left-0',
          isAnimating
            ? 'translate-x-0'
            : 'ltr:translate-x-full rtl:-translate-x-full'
        )
  );

  const drawerContent = (
    <>
      {/* Backdrop - rendered first, lower z-index */}
      {(backdrop || backdropClassName) && (
        <div
          className={backdropClasses}
          onClick={handleBackdropClick}
          aria-hidden="true"
          style={{ zIndex: 50 }}
        />
      )}
      {/* Drawer - rendered second, higher z-index to be above backdrop */}
      <div
        ref={drawerRef}
        data-tucu="drawer"
        className={drawerClasses}
        style={{ zIndex: 51 }}
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar"
        tabIndex={-1}
      >
        {children}
      </div>
    </>
  );

  // Use portal to render drawer and backdrop directly in body, ensuring proper stacking
  return createPortal(drawerContent, document.body) as React.ReactElement;
}
