import React from 'react';
import cn from 'classnames';

type ShapeNames = 'rounded' | 'pill' | 'circle';
type VariantNames = 'solid' | 'ghost' | 'outline' | 'soft';
type ColorNames =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'gray'
  | 'white'
  | 'light-dark';
type SizeNames = 'tiny' | 'small' | 'medium' | 'large';
type StatusNames = 'active' | 'inactive' | 'pending' | 'default';

const shapes: Record<ShapeNames, string> = {
  rounded: 'rounded-md',
  pill: 'rounded-full',
  circle: 'rounded-full',
};

const sizes: Record<SizeNames, string[]> = {
  tiny: ['text-xs px-1.5 py-0.5 h-4', 'w-2 h-2'],
  small: ['text-xs px-2 py-1 h-5', 'w-2.5 h-2.5'],
  medium: ['text-sm px-2.5 py-1 h-6', 'w-3 h-3'],
  large: ['text-base px-3 py-1.5 h-7', 'w-3.5 h-3.5'],
};

const colors: Record<ColorNames, string[]> = {
  primary: ['text-brand', 'bg-brand', 'border-brand'],
  success: ['text-green-500', 'bg-green-500', 'border-green-500'],
  info: ['text-blue-500', 'bg-blue-500', 'border-blue-500'],
  warning: ['text-yellow-500', 'bg-yellow-500', 'border-yellow-500'],
  danger: ['text-red-500', 'bg-red-500', 'border-red-500'],
  gray: ['text-gray-500', 'bg-gray-500', 'border-gray-500'],
  white: ['text-gray-900', 'bg-white', 'border-white'],
  'light-dark': [
    'text-light-dark dark:text-gray-200',
    'border-light-dark dark:border-gray-700',
  ],
};

const statusColors: Record<StatusNames, ColorNames> = {
  active: 'success',
  inactive: 'danger',
  pending: 'warning',
  default: 'gray',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  className?: string;
  status?: StatusNames;
  color?: ColorNames;
  size?: SizeNames;
  variant?: VariantNames;
  shape?: ShapeNames;
  withDot?: boolean;
}

export const Badge = ({
  children,
  className,
  status,
  color,
  size = 'small',
  variant = 'solid',
  shape = 'pill',
  withDot = false,
  ...props
}: BadgeProps) => {
  // Determine the color based on status or color prop
  const badgeColor = status ? statusColors[status] : color || 'gray';
  const colorClassNames = colors[badgeColor];
  const sizeClassNames = sizes[size];

  let badgeColorClasses = '';
  switch (variant) {
    case 'solid':
      badgeColorClasses = `${colorClassNames[1]} text-white`;
      break;
    case 'ghost':
      badgeColorClasses = `bg-transparent border-2 ${colorClassNames[0]} ${colorClassNames[2]}`;
      break;
    case 'outline':
      badgeColorClasses = `bg-transparent border ${colorClassNames[0]} ${colorClassNames[2]}`;
      break;
    case 'soft':
      badgeColorClasses = `${colorClassNames[1]}/10 ${colorClassNames[0]} border ${colorClassNames[2]}/20`;
      break;
  }

  const dotSize = withDot && !children ? sizeClassNames[1] : '';

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200',
        shapes[shape],
        withDot && !children ? dotSize : sizeClassNames[0],
        badgeColorClasses,
        className
      )}
      {...props}
    >
      {withDot && children && (
        <span
          className={cn(
            'rounded-full mr-1.5',
            sizeClassNames[1],
            variant === 'solid' ? 'bg-white/80' : colorClassNames[1]
          )}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
