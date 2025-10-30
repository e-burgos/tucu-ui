import React from 'react';
import cn from 'classnames';

const fieldErrorClasses = {
  base: 'text-red-500 mt-2',
  size: {
    sm: 'text-[10px]',
    DEFAULT: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base',
  },
};

export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  tag?: 'div' | 'span';
  error: string | null | undefined;
  size?: keyof typeof fieldErrorClasses.size;
  className?: string;
  id?: string;
}

export function FieldError({
  tag = 'div',
  error,
  size,
  className,
  id,
  ...props
}: FieldErrorProps) {
  const Component = tag;
  return (
    <Component
      id={id}
      role="alert"
      aria-live="polite"
      className={cn(
        fieldErrorClasses.base,
        size && fieldErrorClasses.size[size],
        className
      )}
      {...props}
    >
      {error}
    </Component>
  );
}

export default FieldError;
