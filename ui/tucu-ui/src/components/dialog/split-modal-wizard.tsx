'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '../../libs/cn';
import { useTucuMessages } from '../../libs/i18n/use-tucu-messages';
import { Button } from '../buttons';
import { Check } from '../icons/check';
import { ChevronLeft } from '../icons/chevron-left';
import { ChevronRight } from '../icons/chevron-right';
import { SplitModal } from './split-modal';
import type { SplitModalNavItem, SplitModalProps } from './split-modal-types';

export interface SplitModalWizardStep<T extends string = string> {
  /** Unique id of the step. */
  id: T;
  /** Label of the step in the sidebar. */
  title: React.ReactNode;
  /** Secondary line under the step label. */
  description?: React.ReactNode;
  /** Icon rendered next to the heading of the step panel. */
  icon?: React.ReactNode;
  /** Heading of the step panel; defaults to `title`. */
  heading?: React.ReactNode;
  /** Help text under the heading of the step panel. */
  hint?: React.ReactNode;
  /** Content of the step. */
  content: React.ReactNode;
  /** Prevents navigating to the step. */
  disabled?: boolean;
}

type SplitModalWizardInheritedProps = Omit<
  SplitModalProps,
  | 'title'
  | 'sections'
  | 'activeItemId'
  | 'defaultActiveItemId'
  | 'onActiveItemChange'
  | 'sidebarHeader'
  | 'sidebarFooter'
  | 'sidebar'
  | 'footer'
  | 'children'
>;

export interface SplitModalWizardProps<T extends string = string>
  extends SplitModalWizardInheritedProps {
  /** Title of the dialog. */
  title: React.ReactNode;
  /** Text rendered at the top of the sidebar. */
  subtitle?: React.ReactNode;
  /** Ordered steps of the wizard. */
  steps: SplitModalWizardStep<T>[];
  /** Id of the active step. */
  activeStepId: T;
  /** Called with the step the wizard moves to. */
  onStepChange: (id: T) => void;
  /** Validates a step before moving past it; moving backwards never validates. */
  validateStep?: (id: T) => boolean | Promise<boolean>;
  /** Called when the cancel button of the sidebar is pressed; the button is hidden without it. */
  onCancel?: () => void;
  /** Label of the cancel button. Defaults to the localized `splitModal.cancel`. */
  cancelLabel?: string;
  /** Label of the previous button. Defaults to the localized `splitModal.previous`. */
  previousLabel?: string;
  /** Label of the next button. Defaults to the localized `splitModal.next`. */
  nextLabel?: string;
  /** Action rendered on the last step instead of the next button. */
  primaryAction?: React.ReactNode;
  /** Renders `primaryAction` on every step, next to the next button. */
  primaryAlwaysVisible?: boolean;
  /** Shows the "Step i of N" text and progress bar in the step panel. */
  showProgress?: boolean;
  /** Content rendered in the sidebar footer above the cancel button. */
  sidebarAside?: React.ReactNode;
}

const addToSet = <T,>(current: ReadonlySet<T>, additions: readonly T[]) =>
  new Set([...current, ...additions]);

const removeFromSet = <T,>(current: ReadonlySet<T>, removals: readonly T[]) =>
  new Set([...current].filter((value) => !removals.includes(value)));

interface StepIndicatorProps {
  index: number;
  isComplete: boolean;
  hasError: boolean;
}

function StepIndicator({ index, isComplete, hasError }: StepIndicatorProps) {
  return (
    <span
      aria-hidden="true"
      data-tucu="split-modal-wizard-step-indicator"
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold',
        isComplete && 'border-green-500 bg-green-500 text-white',
        hasError && 'border-red-500 bg-red-500 text-white',
        !isComplete && !hasError && 'border-current/30'
      )}
    >
      {hasError ? (
        '!'
      ) : isComplete ? (
        <Check className="h-2.5 w-2.5" />
      ) : (
        index + 1
      )}
    </span>
  );
}

export function SplitModalWizard<T extends string = string>({
  title,
  subtitle,
  steps,
  activeStepId,
  onStepChange,
  validateStep,
  onCancel,
  cancelLabel,
  previousLabel,
  nextLabel,
  primaryAction,
  primaryAlwaysVisible = false,
  showProgress = true,
  sidebarAside,
  bodyClassName,
  ...modalProps
}: SplitModalWizardProps<T>) {
  const messages = useTucuMessages();
  const [completedIds, setCompletedIds] = useState<ReadonlySet<T>>(new Set());
  const [errorIds, setErrorIds] = useState<ReadonlySet<T>>(new Set());
  const navigationToken = useRef(0);

  useEffect(
    () => () => {
      navigationToken.current += 1;
    },
    []
  );

  const activeIndex = Math.max(
    steps.findIndex((step) => step.id === activeStepId),
    0
  );
  const activeStep = steps[activeIndex];
  const previousStep = steps
    .slice(0, activeIndex)
    .reverse()
    .find((step) => !step.disabled);
  const nextStep = steps.slice(activeIndex + 1).find((step) => !step.disabled);
  const isLastStep = !nextStep;

  const markPassed = useCallback((ids: T[]) => {
    setCompletedIds((current) => addToSet(current, ids));
    setErrorIds((current) => removeFromSet(current, ids));
  }, []);

  const markFailed = useCallback((id: T) => {
    setErrorIds((current) => addToSet(current, [id]));
    setCompletedIds((current) => removeFromSet(current, [id]));
  }, []);

  const navigateTo = useCallback(
    async (targetId: T) => {
      const targetIndex = steps.findIndex((step) => step.id === targetId);
      if (targetIndex < 0 || targetIndex === activeIndex) return;
      const token = ++navigationToken.current;

      if (targetIndex < activeIndex) {
        onStepChange(targetId);
        return;
      }

      const passedIds: T[] = [];
      for (let index = activeIndex; index < targetIndex; index += 1) {
        const candidate = steps[index];
        if (candidate.disabled) continue;
        const isValid = validateStep ? await validateStep(candidate.id) : true;
        if (token !== navigationToken.current) return;
        if (!isValid) {
          markPassed(passedIds);
          markFailed(candidate.id);
          if (index !== activeIndex) onStepChange(candidate.id);
          return;
        }
        passedIds.push(candidate.id);
      }
      markPassed(passedIds);
      onStepChange(targetId);
    },
    [steps, activeIndex, validateStep, onStepChange, markPassed, markFailed]
  );

  const sections = useMemo(
    () => [
      {
        id: 'steps',
        items: steps.map((step, index): SplitModalNavItem => {
          const hasError = errorIds.has(step.id);
          const isComplete =
            !hasError && completedIds.has(step.id) && step.id !== activeStepId;
          const stateText = hasError
            ? messages.splitModal.stepError
            : isComplete
            ? messages.splitModal.stepComplete
            : null;
          return {
            id: step.id,
            label: (
              <>
                {step.title}
                {stateText && <span className="sr-only">, {stateText}</span>}
              </>
            ),
            description: step.description,
            disabled: step.disabled,
            icon: (
              <StepIndicator
                index={index}
                isComplete={isComplete}
                hasError={hasError}
              />
            ),
          };
        }),
      },
    ],
    [steps, errorIds, completedIds, activeStepId, messages]
  );

  const stepOfText = messages.splitModal.stepOf
    .replace('{index}', String(activeIndex + 1))
    .replace('{total}', String(steps.length));

  const sidebarFooter =
    sidebarAside || onCancel ? (
      <div
        data-tucu="split-modal-wizard-sidebar-footer"
        className="flex w-full items-center justify-between gap-3 md:flex-col md:items-stretch"
      >
        {sidebarAside}
        {onCancel && (
          <Button
            variant="outline"
            color="gray"
            size="mini"
            className="shrink-0 md:w-full"
            onClick={onCancel}
          >
            {cancelLabel ?? messages.splitModal.cancel}
          </Button>
        )}
      </div>
    ) : undefined;

  const footer = (
    <div
      data-tucu="split-modal-wizard-footer"
      className="flex w-full items-center justify-between gap-2"
    >
      <Button
        variant="outline"
        color="gray"
        size="mini"
        disabled={!previousStep}
        onClick={() => previousStep && navigateTo(previousStep.id)}
      >
        <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
        {previousLabel ?? messages.splitModal.previous}
      </Button>
      <div className="flex items-center gap-2">
        {(isLastStep || primaryAlwaysVisible) && primaryAction}
        {!isLastStep && nextStep && (
          <Button
            variant={primaryAlwaysVisible ? 'outline' : 'solid'}
            color={primaryAlwaysVisible ? 'gray' : 'primary'}
            size="mini"
            onClick={() => navigateTo(nextStep.id)}
          >
            {nextLabel ?? messages.splitModal.next}
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <SplitModal
      {...modalProps}
      title={title}
      sections={sections}
      activeItemId={activeStep?.id}
      onActiveItemChange={(id) => navigateTo(id as T)}
      navigationLabel={modalProps.navigationLabel ?? messages.splitModal.steps}
      sidebarHeader={
        subtitle ? (
          <p
            data-tucu="split-modal-wizard-subtitle"
            className="m-0 text-sm opacity-70"
          >
            {subtitle}
          </p>
        ) : undefined
      }
      sidebarFooter={sidebarFooter}
      footer={footer}
      bodyClassName={bodyClassName}
    >
      {activeStep && (
        <div data-tucu="split-modal-wizard" className="flex flex-col gap-4">
          <div
            data-tucu="split-modal-wizard-heading"
            className="flex flex-col gap-2 border-b border-border pb-3"
          >
            <div className="flex items-center gap-2.5">
              {activeStep.icon && (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  {activeStep.icon}
                </span>
              )}
              <div className="min-w-0">
                <h3 className="m-0 truncate text-base font-semibold">
                  {activeStep.heading ?? activeStep.title}
                </h3>
                {showProgress && (
                  <p
                    data-tucu="split-modal-wizard-progress-text"
                    className="m-0 text-xs opacity-70"
                  >
                    {stepOfText}
                  </p>
                )}
              </div>
            </div>
            {showProgress && (
              <div
                role="progressbar"
                aria-label={stepOfText}
                aria-valuemin={1}
                aria-valuemax={steps.length}
                aria-valuenow={activeIndex + 1}
                data-tucu="split-modal-wizard-progress"
                className="h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <div
                  className="h-full rounded-full bg-brand transition-all"
                  style={{
                    width: `${((activeIndex + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>
            )}
            {activeStep.hint && (
              <p className="m-0 text-sm opacity-80">{activeStep.hint}</p>
            )}
          </div>
          {activeStep.content}
        </div>
      )}
    </SplitModal>
  );
}

SplitModalWizard.displayName = 'SplitModalWizard';

export default SplitModalWizard;
