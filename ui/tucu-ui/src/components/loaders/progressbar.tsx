import cn from 'classnames';
import Text from '../typography';

const classes = {
  base: 'absolute top-0 bottom-0 left-0 h-full flex items-center justify-center',
  size: {
    sm: 'h-1.5',
    DEFAULT: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-xs',
    md: 'rounded-md',
    lg: 'rounded-lg',
    DEFAULT: 'rounded-full',
  },
  variant: {
    solid: {
      base: 'text-gray-600 dark:text-white',
      color: {
        DEFAULT: 'bg-brand',
        primary: 'bg-brand',
        secondary: 'bg-brand/70',
        danger: 'bg-red-500',
        info: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-orange-500',
      },
    },
    flat: {
      base: '',
      color: {
        DEFAULT: 'bg-brand',
        primary: 'bg-brand text-gray-600 dark:text-white',
        secondary: 'bg-brand/70 text-gray-600 dark:text-white',
        danger: 'bg-red-500/70 text-red-500',
        info: 'bg-blue-500/70 text-blue-500',
        success: 'bg-green-500/70 text-green-500',
        warning: 'bg-orange-500/70 text-orange-500',
      },
    },
  },
};

export interface ProgressbarProps {
  /** Percentage of filled bar */
  value?: number;
  /** Pass label to show percentage inside bar */
  label?: React.ReactNode;
  /** Size of the compoents are: */
  size?: keyof typeof classes.size;
  /** The rounded variants are: */
  rounded?: keyof typeof classes.rounded;
  /** Pass color variations */
  color?: keyof typeof classes.variant.flat.color;
  /** The variants of the components are: */
  variant?: keyof typeof classes.variant;
  /** To style entire progressbar component */
  className?: string;
  /** To style bar of the component */
  barClassName?: string;
  /** To style label */
  labelClassName?: string;
}

export const Progressbar = ({
  value,
  label = '',
  size = 'DEFAULT',
  rounded = 'DEFAULT',
  color = 'DEFAULT',
  variant = 'solid',
  className,
  barClassName,
  labelClassName,
}: ProgressbarProps) => (
  <div
    className={cn(
      'relative w-full bg-gray-200',
      classes.size[size],
      classes.rounded[rounded],
      className
    )}
  >
    <div
      role="progressbar"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={value}
      aria-label={typeof label === 'string' ? label : undefined}
      className={cn(
        classes.base,
        classes.variant[variant].base,
        classes.variant[variant].color[color],
        classes.rounded[rounded],
        barClassName
      )}
      style={{ width: `${value}%` }}
    >
      {label && size === 'xl' && (
        <Text className={cn('text-sm font-bold', labelClassName)}>{label}</Text>
      )}
    </div>
  </div>
);

export default Progressbar;
