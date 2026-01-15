import { type FormValidations } from '@e-burgos/tucu-ui';

export interface VerifyPhoneFormValues {
  code: string;
}

export const defaultValues: VerifyPhoneFormValues = {
  code: '',
};

export const formValidations: FormValidations<VerifyPhoneFormValues> = {
  code: {
    required: 'Verification code is required',
    minLength: {
      value: 6,
      message: 'Verification code must be 6 digits',
    },
    maxLength: {
      value: 6,
      message: 'Verification code must be 6 digits',
    },
    pattern: {
      value: /^\d{6}$/,
      message: 'Invalid verification code',
    },
    validate: {
      isNumeric: (value: string) =>
        /^\d{6}$/.test(value) || 'Invalid verification code',
    },
  },
};
