import React, { useState } from 'react';
import cn from 'classnames';
import Button from '../buttons/button';
import PinCode from '../forms/pin-code';
import AnchorLink from '../links/anchor-link';

export interface ResetPinFormData {
  pin: string;
}

export interface ResetPinFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (data: ResetPinFormData) => void;
  signInPath: string;
  className?: string;
  isLoading?: boolean;
  error?: string;
  pinLength?: number;
  children?: React.ReactNode;
}

export function ResetPinForm({
  title,
  description,
  buttonText,
  onSubmit,
  signInPath,
  className,
  isLoading = false,
  error,
  pinLength = 5,
  children,
}: ResetPinFormProps) {
  const [pin, setPin] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  const validatePin = (value: string): string => {
    if (!value) {
      return 'PIN is required';
    }
    if (value.length !== pinLength) {
      return `PIN must be exactly ${pinLength} digits`;
    }
    if (!/^\d+$/.test(value)) {
      return 'PIN must contain only numbers';
    }
    return '';
  };

  const handlePinChange = (value: string) => {
    setPin(value);
    const error = validatePin(value);
    setValidationError(error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const error = validatePin(pin);
    if (error) {
      setValidationError(error);
      return;
    }

    if (onSubmit) {
      onSubmit({ pin });
    }
  };

  const isFormValid = pin.length === pinLength && !validationError;

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {title || 'Reset PIN'}
        </h2>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
            {description}
          </p>
        )}
        <div className="flex flex-col gap-4">
          {children}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 text-center">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-full flex flex-col items-center">
              <PinCode
                length={pinLength}
                placeholder="-"
                variant="outline"
                color="DEFAULT"
                size="lg"
                value={pin}
                onChange={handlePinChange}
                error={validationError}
                inputClassName="border-[#E3E8ED] focus:border-brand focus:ring-brand dark:focus:ring-brand-200 dark:focus:ring-1 text-lg lg:text-2xl 2xl:text-[32px] w-12 h-14 lg:w-14 lg:h-16 2xl:w-16 2xl:h-[72px]"
                className="mb-8 gap-3 sm:gap-4 2xl:mb-12 2xl:gap-6"
              />
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={isLoading || !isFormValid}
              className="uppercase"
            >
              {isLoading ? 'Verifying...' : buttonText || 'Verify PIN'}
            </Button>

            <AnchorLink
              to={signInPath}
              className="font-medium underline hover:text-brand/80 dark:text-gray-300 mt-4"
            >
              Back to Sign In
            </AnchorLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPinForm;
