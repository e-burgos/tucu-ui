import { useState } from 'react';
import AnchorLink from '../links/anchor-link';
import { Checkbox, Input } from '../inputs';
import { Button } from '../buttons';
import { Form, FormField } from '../forms';

// import icons
import { EyeIcon } from '../icons/eye';
import { EyeSlashIcon } from '../icons/eyeslash';
import cn from 'classnames';

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignInFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  forgetPasswordPath: string;
  onSubmit?: (data: SignInFormData) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SignInForm({
  title,
  description,
  buttonText,
  forgetPasswordPath,
  onSubmit,
  isLoading = false,
  error,
  className,
  children,
}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(data: SignInFormData) {
    if (onSubmit) {
      onSubmit(data);
    }
  }

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {title || 'Sign In'}
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
          <Form<SignInFormData>
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4"
            useFormProps={{
              defaultValues: {
                email: '',
                password: '',
                rememberMe: false,
              },
            }}
          >
            <FormField<SignInFormData>
              name="email"
              label="Email Address"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              }}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                inputClassName="focus:ring-0! placeholder:text-[#6B7280]"
              />
            </FormField>

            <FormField<SignInFormData>
              name="password"
              label="Password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
            >
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  inputClassName="focus:ring-0! placeholder:text-[#6B7280] pr-12"
                />
                <span
                  className="absolute bottom-3 right-4 cursor-pointer text-[#6B7280] rtl:left-4 rtl:right-auto sm:bottom-3.5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </span>
              </div>
            </FormField>

            <div className="flex items-center justify-between">
              <FormField<SignInFormData> name="rememberMe" hideError>
                <Checkbox
                  label="Remember me"
                  iconClassName="bg-brand rounded-sm"
                  labelPlacement="end"
                  labelClassName="ml-1.5 text-sm dark:text-gray-300"
                  size="sm"
                />
              </FormField>

              <AnchorLink
                to={forgetPasswordPath}
                className="text-sm font-medium text-brand hover:text-brand-600 dark:text-brand-400"
              >
                Forgot password?
              </AnchorLink>
            </div>

            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? 'Signing in...' : buttonText || 'Sign in'}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
