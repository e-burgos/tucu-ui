/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from '../forms/input';
import Button from '../buttons/button';
import { Form } from '../forms/form-system';
import { FormField } from '../forms/form-system/form-field';
import cn from 'classnames';

export interface ForgetPasswordFormData {
  email: string;
}

export interface ForgetPasswordFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (data: ForgetPasswordFormData) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
  successMessage?: string;
  children?: React.ReactNode;
}

export function ForgetPasswordForm({
  title,
  description,
  buttonText,
  onSubmit,
  isLoading = false,
  error,
  className,
  successMessage,
  children,
}: ForgetPasswordFormProps) {
  function handleSubmit(data: ForgetPasswordFormData) {
    if (onSubmit) {
      onSubmit(data);
    }
  }

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {title || 'Forgot Password'}
        </h2>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
            {description}
          </p>
        )}
        <div className="flex flex-col gap-4">
          {children}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
              {successMessage}
            </div>
          )}

          <Form<ForgetPasswordFormData>
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4"
            useFormProps={{
              defaultValues: {
                email: '',
              },
            }}
          >
            <FormField<ForgetPasswordFormData>
              name="email"
              label="Email Address"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              }}
              helperText="Enter the email address associated with your account"
              showHelper
            >
              <Input
                type="email"
                placeholder="Enter your email"
                inputClassName="focus:ring-0! placeholder:text-[#6B7280] mt-0!"
              />
            </FormField>

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              className="uppercase"
            >
              {isLoading ? 'Sending...' : buttonText || 'Send Reset Code'}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordForm;
