import React from 'react';
import { useFormContext } from '../hook-form';
import { FormValues } from './validations';

export const ErrorContainerExample: React.FC = () => {
  const { formState } = useFormContext<FormValues>();
  const { errors } = formState;

  return (
    <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        Error List
      </h3>
      {Object.keys(errors).length > 0 ? (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm">
          {JSON.stringify(errors, null, 2)}
        </pre>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No errors in the form
        </p>
      )}
    </div>
  );
};

export default ErrorContainerExample;
