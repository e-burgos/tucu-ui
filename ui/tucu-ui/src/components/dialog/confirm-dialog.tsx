'use client';

import React, { useId, useRef } from 'react';
import { cn } from '../../libs/cn';
import { useTucuMessages } from '../../libs/i18n/use-tucu-messages';
import { Button, type ButtonProps } from '../buttons';
import { Check } from '../icons/check';
import { InfoCircle } from '../icons/info-circle';
import { Warning } from '../icons/warning';
import { Modal, type ModalSize } from './modal';

export type ConfirmDialogTone = 'danger' | 'warning' | 'info' | 'success';
export type ConfirmDialogInitialFocus = 'confirm' | 'cancel';

export interface ConfirmDialogProps {
  /** Whether the dialog is visible. */
  isOpen: boolean;
  /** Called when the user confirms. */
  onConfirm: () => void;
  /** Called when the user cancels, presses Escape or clicks the overlay. */
  onCancel: () => void;
  /** Title of the dialog; it labels the alert dialog. */
  title: React.ReactNode;
  /** Description rendered under the title; it describes the alert dialog. */
  description?: React.ReactNode;
  /** Extra content rendered under the description. */
  children?: React.ReactNode;
  /** Label of the confirm button. Defaults to the localized `confirmDialog.confirm`. */
  confirmLabel?: string;
  /** Label of the cancel button. Defaults to the localized `confirmDialog.cancel`. */
  cancelLabel?: string;
  /** Visual intent: sets the icon and the confirm button colour. */
  tone?: ConfirmDialogTone;
  /** Shows a spinner on the confirm button, disables the buttons and blocks Escape and overlay closing. */
  loading?: boolean;
  /** Disables the confirm button. */
  confirmDisabled?: boolean;
  /** Button focused when the dialog opens. Defaults to `cancel` for the `danger` tone and `confirm` otherwise. */
  initialFocus?: ConfirmDialogInitialFocus;
  /** Replaces the icon of the tone. */
  icon?: React.ReactNode;
  /** Width preset of the dialog. */
  size?: ModalSize;
  /** Maximum width of the dialog; a CSS length or a number of pixels. */
  maxWidth?: number | string;
  /** Extra classes merged onto the dialog panel. */
  className?: string;
  /** Extra classes merged onto the backdrop overlay. */
  overlayClassName?: string;
  /** `data-*` attributes are forwarded to the element with `role="alertdialog"`. */
  [dataAttribute: `data-${string}`]: string | undefined;
}

const TONE_BUTTON_COLOR: Record<ConfirmDialogTone, ButtonProps['color']> = {
  danger: 'danger',
  warning: 'warning',
  info: 'primary',
  success: 'success',
};

const TONE_ICON_CLASSES: Record<ConfirmDialogTone, string> = {
  danger: 'bg-red-500/10 text-red-600 dark:text-red-400',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  info: 'bg-brand/10 text-brand',
  success: 'bg-green-500/10 text-green-600 dark:text-green-400',
};

function ToneIcon({ tone }: { tone: ConfirmDialogTone }) {
  const iconClassName = 'h-5 w-5';
  if (tone === 'success') return <Check className={iconClassName} />;
  if (tone === 'info') return <InfoCircle className={iconClassName} />;
  return <Warning className={iconClassName} />;
}

const noop = () => undefined;

export function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
  children,
  confirmLabel,
  cancelLabel,
  tone = 'info',
  loading = false,
  confirmDisabled = false,
  initialFocus,
  icon,
  size = 'sm',
  maxWidth,
  className,
  overlayClassName,
  ...dataAttributes
}: ConfirmDialogProps) {
  const messages = useTucuMessages();
  const descriptionId = useId();
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const requestedFocus =
    initialFocus ?? (tone === 'danger' ? 'cancel' : 'confirm');
  const focusTarget =
    requestedFocus === 'confirm' && !confirmDisabled && !loading
      ? confirmButtonRef
      : cancelButtonRef;

  const header = (
    <div className="flex min-w-0 items-center gap-3">
      <span
        aria-hidden="true"
        data-tucu="confirm-dialog-icon"
        data-tone={tone}
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
          TONE_ICON_CLASSES[tone]
        )}
      >
        {icon ?? <ToneIcon tone={tone} />}
      </span>
      <h2
        data-tucu="confirm-dialog-title"
        className="m-0 min-w-0 text-lg font-semibold"
      >
        {title}
      </h2>
    </div>
  );

  const buttons = (
    <div
      data-tucu="confirm-dialog-actions"
      className="flex flex-wrap justify-end gap-2"
    >
      <Button
        ref={cancelButtonRef}
        variant="outline"
        color="gray"
        size="small"
        disabled={loading}
        onClick={onCancel}
      >
        {cancelLabel ?? messages.confirmDialog.cancel}
      </Button>
      <Button
        ref={confirmButtonRef}
        variant="solid"
        color={TONE_BUTTON_COLOR[tone]}
        size="small"
        isLoading={loading}
        disabled={confirmDisabled}
        onClick={onConfirm}
      >
        {confirmLabel ?? messages.confirmDialog.confirm}
      </Button>
    </div>
  );

  return (
    <Modal
      data-tucu="confirm-dialog"
      {...dataAttributes}
      role="alertdialog"
      isOpen={isOpen}
      setIsOpen={noop}
      onClose={onCancel}
      closeable={!loading}
      hideCloseButton
      hideButtons
      header={header}
      aria-describedby={description ? descriptionId : undefined}
      buttonContainer={buttons}
      initialFocusRef={focusTarget}
      size={size}
      maxWidth={maxWidth}
      className={className}
      overlayClassName={overlayClassName}
    >
      {description && (
        <div
          id={descriptionId}
          data-tucu="confirm-dialog-description"
          className="text-sm"
        >
          {description}
        </div>
      )}
      {children}
    </Modal>
  );
}

ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;
