import React from 'react';
import cn from 'classnames';

const colors = {
  primary: 'border-t-brand',
  gray: 'border-t-gray-500',
  success: 'border-t-green-500',
  danger: 'border-t-red-500',
  info: 'border-t-blue-500',
  warning: 'border-t-orange-500',
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
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'border-4 border-t-4 border-gray-200 rounded-full animate-spin',
          size === 'sm' && 'w-4 h-4',
          size === 'md' && 'w-6 h-6',
          size === 'lg' && 'w-8 h-8',
          color && colors[color]
        )}
      ></div>
    </div>
  );
};

export default Spinner;
