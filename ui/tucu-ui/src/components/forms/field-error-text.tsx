import React from 'react';
import cn from 'classnames';

const fieldErrorClasses = {
  base: 'text-red',
  size: {
    sm: 'text-[10px] mt-0.5',
    DEFAULT: 'text-xs mt-0.5',
    lg: 'text-xs mt-1',
    xl: 'text-sm mt-1',
  },
};

export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  tag?: 'div' | 'span';
  error: string | null | undefined;
  size?: keyof typeof fieldErrorClasses.size;
  className?: string;
}

export function FieldError({
  tag = 'div',
  error,
  size,
  className,
}: FieldErrorProps) {
  const Component = tag;
  return (
    <Component
      role="alert"
      className={cn(
        fieldErrorClasses.base,
        size && fieldErrorClasses.size[size],
        className
      )}
    >
      {error}
    </Component>
  );
}

export default FieldError;
