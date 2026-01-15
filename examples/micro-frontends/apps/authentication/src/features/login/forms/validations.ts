import { type FormValidations } from '@e-burgos/tucu-ui';

export interface LoginFormValues {
  password: string;
  email: string;
}

export const defaultValues: LoginFormValues = {
  password: '',
  email: '',
};

export const formValidations: FormValidations<LoginFormValues> = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
    maxLength: {
      value: 36,
      message: 'Password must be at most 36 characters',
    },
    validate: {
      hasUppercase: (value: string) =>
        /[A-Z]/.test(value) ||
        'Password must contain at least 1 uppercase letter',
      hasLowercase: (value: string) =>
        /[a-z]/.test(value) ||
        'Password must contain at least 1 lowercase letter',
      hasNumber: (value: string) =>
        /\d/.test(value) || 'Password must contain at least 1 number',
    },
  },
};
