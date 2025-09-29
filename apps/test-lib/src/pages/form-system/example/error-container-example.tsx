import React from 'react';
import { Typography, useFormContext } from '@tucu-ui';
import { type FormValues } from './validations';

export const ErrorContainerExample: React.FC = () => {
  const { formState } = useFormContext<FormValues>();
  const { errors } = formState;

  return (
    <div className=" border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        Error List
      </h3>
      {errors && Object?.keys(errors).length > 0 ? (
        <Typography tag="code" className="text-sm">
          {JSON.stringify(errors, null, 2)}
        </Typography>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No errors in the form
        </p>
      )}
    </div>
  );
};

export default ErrorContainerExample;
