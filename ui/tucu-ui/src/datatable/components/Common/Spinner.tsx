import React from 'react';
import { cn } from '../../common/helpers/cn';

const colors = {
  primary: 'text-table-primary',
  gray: 'text-table-secondary-text',
  success: 'text-success',
  danger: 'text-error',
  info: 'text-info',
  warning: 'text-warning',
};

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: keyof typeof colors;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
}) => {
  return (
    <div className="flex items-center justify-center" role="status">
      <svg
        className={cn('animate-spin', sizes[size], colors[color])}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
