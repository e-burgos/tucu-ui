import { FormValidations } from '../types/validations.type';

export interface FormValues {
  name: string;
  email: string;
  password: string;
  message: string;
  acceptTerms: boolean;
  age: number;
  gender: string;
  isDeveloper: boolean;
  country: string;
}

export const defaultValues: FormValues = {
  name: '',
  email: '',
  password: '',
  message: '',
  acceptTerms: false,
  age: 0,
  gender: '',
  isDeveloper: false,
  country: 'ar',
};

export const formValidations: FormValidations<FormValues> = {
  name: {
    required: 'This is a required field.',
    minLength: {
      value: 2,
      message: 'The name must be at least 2 characters long.',
    },
  },
  email: {
    required: 'This is a required field.',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address.',
    },
  },
  password: {
    required: 'This is a required field.',
    minLength: {
      value: 8,
      message: 'The password must be at least 8 characters long.',
    },
  },
  message: {
    required: 'This is a required field.',
    minLength: {
      value: 10,
      message: 'The message must be at least 10 characters long.',
    },
  },
  acceptTerms: {
    required: 'This is a required field.',
  },
  country: {
    required: 'This is a required field.',
  },
  age: {
    required: 'This is a required field.',
    min: {
      value: 18,
      message: 'You must be at least 18 years old.',
    },
  },
  gender: {
    required: 'This is a required field.',
  },
  isDeveloper: {
    required: 'This is a required field.',
  },
};
