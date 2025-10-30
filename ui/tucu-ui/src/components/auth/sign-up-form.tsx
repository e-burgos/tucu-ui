import { useState } from 'react';
import AnchorLink from '../links/anchor-link';
import Checkbox from '../forms/checkbox';
import Button from '../buttons/button';
import Input from '../forms/input';
import { Form } from '../forms/form-system';
import { FormField } from '../forms/form-system/form-field';
import cn from 'classnames';

// import icons
import { EyeIcon } from '../icons/eye';
import { EyeSlashIcon } from '../icons/eyeslash';

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

export interface SignUpFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onSubmit?: (data: SignUpFormData) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
  termsOfServicePath?: string;
  privacyPolicyPath?: string;
  children?: React.ReactNode;
}

export function SignUpForm({
  title,
  description,
  buttonText,
  onSubmit,
  isLoading = false,
  error,
  className,
  termsOfServicePath = '#',
  privacyPolicyPath = '#',
  children,
}: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(data: SignUpFormData) {
    if (onSubmit) {
      onSubmit(data);
    }
  }

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {title || 'Sign Up'}
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

          <Form<SignUpFormData>
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4"
            useFormProps={{
              defaultValues: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                agreeToTerms: false,
              },
            }}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
              <FormField<SignUpFormData>
                name="firstName"
                label="First Name"
                rules={{
                  required: 'First name is required',
                  minLength: {
                    value: 2,
                    message: 'First name must be at least 2 characters',
                  },
                }}
              >
                <Input
                  type="text"
                  placeholder="First Name"
                  inputClassName="focus:ring-0! placeholder:text-[#6B7280]"
                />
              </FormField>

              <FormField<SignUpFormData>
                name="lastName"
                label="Last Name"
                rules={{
                  required: 'Last name is required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be at least 2 characters',
                  },
                }}
              >
                <Input
                  type="text"
                  placeholder="Last Name"
                  inputClassName="focus:ring-0! placeholder:text-[#6B7280]"
                />
              </FormField>
            </div>

            <FormField<SignUpFormData>
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
                placeholder="Email"
                inputClassName="focus:ring-0! placeholder:text-[#6B7280]"
              />
            </FormField>

            <FormField<SignUpFormData>
              name="password"
              label="Password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message:
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                },
              }}
            >
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
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

            <FormField<SignUpFormData>
              name="agreeToTerms"
              rules={{
                required: 'You must agree to the terms and conditions',
              }}
            >
              <Checkbox
                iconClassName="bg-brand rounded-sm mt-0.5"
                label={
                  <>
                    I've read and agree with
                    <AnchorLink
                      to={termsOfServicePath}
                      className="ml-2 font-medium tracking-[0.5px] underline dark:text-gray-300"
                    >
                      Terms of Service
                    </AnchorLink>
                    {' and our '}
                    <AnchorLink
                      to={privacyPolicyPath}
                      className="font-medium tracking-[0.5px] underline dark:text-gray-300"
                    >
                      Privacy Policy
                    </AnchorLink>
                  </>
                }
                labelPlacement="end"
                labelClassName="ml-1.5 text-[#4B5563] text-sm! dark:text-gray-300 tracking-[0.5px] leading-7!"
                containerClassName="items-start!"
                inputClassName="mt-1 focus:ring-offset-1!"
                size="sm"
              />
            </FormField>

            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              className="uppercase"
            >
              {isLoading ? 'Creating account...' : buttonText || 'Sign up'}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
