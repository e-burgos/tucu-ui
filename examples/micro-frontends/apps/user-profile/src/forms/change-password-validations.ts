import { type FormValidations } from '@e-burgos/tucu-ui';

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const defaultValues: ChangePasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const formValidations: FormValidations<ChangePasswordFormValues> = {
  currentPassword: {
    required: 'Current password is required',
  },
  newPassword: {
    required: 'New password is required',
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
      differentFromCurrent: (
        value: string,
        formValues: ChangePasswordFormValues,
      ) =>
        value !== formValues.currentPassword ||
        'New password must be different from current password',
    },
  },
  confirmPassword: {
    required: 'Please confirm your password',
    validate: (value: string, formValues: ChangePasswordFormValues) =>
      value === formValues.newPassword || 'Passwords do not match',
  },
};
