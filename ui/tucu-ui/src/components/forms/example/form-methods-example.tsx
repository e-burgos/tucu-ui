import React from 'react';
import { useFormContext } from '../hook-form';
import { defaultValues, FormValues } from './validations';
import { Button } from '../../buttons';

export const FormMethodsExample: React.FC = () => {
  // All form methods are accessed through useFormContext
  const {
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
    trigger,
    setValue,
    getValues,
    watch,
  } = useFormContext<FormValues>();

  // We observe the value of the 'name' field in real time
  const nameValue = watch('name');
  const emailValue = watch('email');
  const passwordValue = watch('password');
  const countryValue = watch('country');
  const messageValue = watch('message');
  const acceptTermsValue = watch('acceptTerms');
  const isDeveloperValue = watch('isDeveloper');
  const genderValue = watch('gender');
  const ageValue = watch('age');

  const handleReset = () => {
    reset(defaultValues); // Resets the form to its default values
  };

  const handleValidate = async () => {
    // Validates all fields of the form
    const result = await trigger();
    console.log('Validation result:', result);
  };

  const handleSetValue = () => {
    // Sets values programmatically
    setValue('name', 'Juan Pérez', { shouldValidate: true });
    setValue('email', 'juan@example.com', { shouldValidate: true });
    setValue('password', '12345678', { shouldValidate: true });
    setValue('country', 'mx', { shouldValidate: true });
    setValue('message', 'Hello, world!', { shouldValidate: true });
    setValue('acceptTerms', true, { shouldValidate: true });
    setValue('isDeveloper', true, { shouldValidate: true });
    setValue('gender', 'male', { shouldValidate: true });
    setValue('age', 25, { shouldValidate: true });
  };

  const handleGetValues = () => {
    // Gets the current values of the form
    const values = getValues();
    console.log('Current form values:', values);
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="mt-[32px] border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg p-[16px]">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-[16px]">
        Form Methods Example
      </h3>

      {/* Show the observed value */}
      <div className="mb-[16px] p-[12px] bg-light-dark  rounded-md">
        <p className=" font-semibold mb-[8px]">
          Current values: (observed in real time)
        </p>
        <p className="font-mono text-sm">Name: {nameValue || '(empty)'}</p>
        <p className="font-mono text-sm">Email: {emailValue || '(empty)'}</p>
        <p className="font-mono text-sm">
          Password: {passwordValue || '(empty)'}
        </p>
        <p className="font-mono text-sm">
          Country: {countryValue || '(empty)'}
        </p>
        <p className="font-mono text-sm">
          Message: {messageValue || '(empty)'}
        </p>
        <p className="font-mono text-sm">
          Accept terms: {`${acceptTermsValue ? 'Yes' : 'No'}` || '(empty)'}
        </p>
        <p className="font-mono text-sm">
          Is developer: {`${isDeveloperValue ? 'Yes' : 'No'}` || '(empty)'}
        </p>
        <p className="font-mono text-sm">Gender: {genderValue || '(empty)'}</p>
        <p className="font-mono text-sm">Age: {ageValue || '(empty)'}</p>
      </div>

      {/* Form state */}
      <div className="mb-[16px] grid grid-cols-2 gap-[8px]">
        <div className="p-[8px] border border-gray-200 dark:border-gray-700 rounded-md">
          <p className="text-sm font-medium mb-[4px]">isDirty:</p>
          <span
            className={`text-sm ${
              isDirty ? 'text-green-500' : 'text-gray-500'
            }`}
          >
            {isDirty ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="p-[8px] border border-gray-200 dark:border-gray-700 rounded-md">
          <p className="text-sm font-medium mb-[4px]">isValid:</p>
          <span
            className={`text-sm ${isValid ? 'text-green-500' : 'text-red-500'}`}
          >
            {isValid ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="p-[8px] border border-gray-200 dark:border-gray-700 rounded-md">
          <p className="text-sm font-medium mb-[4px]">isSubmitting:</p>
          <span
            className={`text-sm ${
              isSubmitting ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            {isSubmitting ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="p-[8px] border border-gray-200 dark:border-gray-700 rounded-md">
          <p className="text-sm font-medium mb-[4px]">Errors:</p>
          <span
            className={`text-sm ${
              Object.keys(errors).length > 0 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {Object.keys(errors).length > 0
              ? `${Object.keys(errors).length} errors`
              : 'No errors'}
          </span>
        </div>
      </div>

      {/* Buttons to interact with the form methods */}
      <div className="grid grid-cols-2 gap-[8px]">
        <Button type="button" color="gray" fullWidth onClick={handleReset}>
          Reset
        </Button>
        <Button
          type="button"
          color="warning"
          fullWidth
          onClick={handleValidate}
        >
          Validate
        </Button>
        <Button type="button" color="info" fullWidth onClick={handleSetValue}>
          Fill data
        </Button>
        <Button
          type="button"
          color="success"
          fullWidth
          onClick={handleGetValues}
        >
          Get values
        </Button>
      </div>
    </div>
  );
};

export default FormMethodsExample;
