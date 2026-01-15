import React from 'react';
import cn from 'classnames';

const helperTextClasses = {
  base: 'text-gray-900 dark:text-gray-200 mt-[8px]',
  size: {
    sm: 'text-[10px]',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base',
  },
};

export interface FieldHelperTextProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  tag?: 'div' | 'span';
  size?: keyof typeof helperTextClasses.size;
  className?: string;
  id?: string;
}

export function FieldHelperText({
  size,
  tag = 'div',
  children,
  className,
  id,
  ...props
}: React.PropsWithChildren<FieldHelperTextProps>) {
  const Component = tag;
  return (
    <Component
      id={id}
      className={cn(
        helperTextClasses.base,
        size && helperTextClasses.size[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default FieldHelperText;
