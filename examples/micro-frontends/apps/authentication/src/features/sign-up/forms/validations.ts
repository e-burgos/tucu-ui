import { type FormValidations } from '@e-burgos/tucu-ui';

export interface SignUpFormValues {
  countryCode: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export const defaultValues: SignUpFormValues = {
  countryCode: '+54',
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

export const formValidations: FormValidations<SignUpFormValues> = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email address',
    },
  },
  firstName: {
    required: 'First name is required',
  },
  lastName: {
    required: 'Last name is required',
  },
  phoneNumber: {
    required: 'Phone number is required',
    minLength: {
      value: 9,
      message: 'Phone number must be at least 9 digits',
    },
    // only numbers
    pattern: {
      value: /^\d+$/,
      message: 'Phone number must only contain numbers',
    },
    validate: {
      isPhoneNumber: (value: string) =>
        /^[0-9]+$/.test(value) || 'Phone number must only contain numbers',
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
  confirmPassword: {
    required: 'Please confirm your password',
    validate: (value: string, formValues: SignUpFormValues) =>
      value === formValues.password || 'Passwords do not match',
  },
  acceptTerms: {
    required: 'Please agree to the User Agreement and Privacy Policy',
  },
};
