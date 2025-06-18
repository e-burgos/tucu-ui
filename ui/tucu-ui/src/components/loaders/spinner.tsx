import React from 'react';
import cn from 'classnames';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size, color }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-brand',
          size === 'sm' && 'w-4 h-4',
          size === 'md' && 'w-6 h-6',
          size === 'lg' && 'w-8 h-8',
          color && `border-t-${color}`
        )}
      ></div>
    </div>
  );
};

export default Spinner;
