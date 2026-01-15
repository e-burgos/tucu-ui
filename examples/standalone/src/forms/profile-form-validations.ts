import { type FormValidations } from '@e-burgos/tucu-ui';
import { User } from '../store/useAuthGlobalStore';

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  bio: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  occupation: string;
  company: string;
  education: string;
}

export const getDefaultValues = (
  user?: Partial<User> | null
): ProfileFormValues => ({
  firstName: user?.firstName || '',
  lastName: user?.lastName || '',
  email: user?.email || '',
  phoneNumber: user?.phoneNumber || '',
  countryCode: user?.countryCode || '',
  bio: user?.bio || '',
  address: user?.address || '',
  city: user?.city || '',
  state: user?.state || '',
  zipCode: user?.zipCode || '',
  dateOfBirth: user?.dateOfBirth || '',
  gender: user?.gender || '',
  maritalStatus: user?.maritalStatus || '',
  occupation: user?.occupation || '',
  company: user?.company || '',
  education: user?.education || '',
});

export const formValidations: FormValidations<ProfileFormValues> = {
  firstName: {
    required: 'First name is required',
  },
  lastName: {
    required: 'Last name is required',
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email address',
    },
  },
  phoneNumber: {
    required: 'Phone number is required',
    minLength: {
      value: 9,
      message: 'Phone number must be at least 9 digits',
    },
    pattern: {
      value: /^\d+$/,
      message: 'Phone number must only contain numbers',
    },
  },
  countryCode: {
    required: 'Country code is required',
  },
  bio: {
    maxLength: {
      value: 500,
      message: 'Bio must be at most 500 characters',
    },
  },
  zipCode: {
    pattern: {
      value: /^[A-Z0-9\s-]+$/i,
      message: 'Invalid zip code format',
    },
  },
  dateOfBirth: {
    validate: (value: string) => {
      if (!value) return true;

      console.log('value', value);

      const date = new Date(value);
      const today = new Date();

      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date of birth';
      }

      // Check if the date is not in the future
      if (date > today) {
        return 'Date of birth cannot be in the future';
      }

      // Calculate age accurately
      let age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      const dayDiff = today.getDate() - date.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age -= 1;
      }

      // Validate minimum age (18 years)
      if (age < 18) {
        return 'You must be at least 18 years old';
      }

      // Validate maximum age (90 years)
      if (age > 90) {
        return 'You cannot be more than 90 years old';
      }

      return true;
    },
  },
};
