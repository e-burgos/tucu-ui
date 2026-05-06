import cn from 'classnames';

export interface StepperStep {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  onStepChange?: (step: number) => void;
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  onStepChange,
  className,
}: StepperProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={step.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onStepChange?.(index)}
              disabled={!onStepChange}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                isActive && 'bg-brand/10 text-brand',
                isCompleted && 'text-green-500',
                !isActive &&
                  !isCompleted &&
                  'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
                !onStepChange && 'cursor-default'
              )}
            >
              <span
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                  isActive && 'bg-brand text-white',
                  isCompleted && 'bg-green-500 text-white',
                  !isActive &&
                    !isCompleted &&
                    'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                )}
              >
                {step.icon || index + 1}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-px w-6',
                  isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
