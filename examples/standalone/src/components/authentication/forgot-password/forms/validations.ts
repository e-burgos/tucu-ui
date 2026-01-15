import { type FormValidations } from '@e-burgos/tucu-ui';

export interface ForgotPasswordFormValues {
  countryCode: string;
  phoneNumber: string;
}

export const defaultValues: ForgotPasswordFormValues = {
  countryCode: '+54',
  phoneNumber: '',
};

export const formValidations: FormValidations<ForgotPasswordFormValues> = {
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
};
