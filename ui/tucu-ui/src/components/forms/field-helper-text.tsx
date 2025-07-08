import React from 'react';
import cn from 'classnames';

const helperTextClasses = {
  base: 'text-gray-900 dark:text-gray-200 mt-2',
  size: {
    sm: 'text-[10px]',
    DEFAULT: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base',
  },
};

export interface FieldHelperTextProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  tag?: 'div' | 'span';
  size?: keyof typeof helperTextClasses.size;
  className?: string;
}

export function FieldHelperText({
  size,
  tag = 'div',
  children,
  className,
}: React.PropsWithChildren<FieldHelperTextProps>) {
  const Component = tag;
  return (
    <Component
      role="alert"
      className={cn(
        helperTextClasses.base,
        size && helperTextClasses.size[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

export default FieldHelperText;
