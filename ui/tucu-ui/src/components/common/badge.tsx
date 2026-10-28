import React from 'react';
import { cn } from '../../libs/cn';

type ShapeNames = 'rounded' | 'pill' | 'circle';
type VariantNames = 'solid' | 'ghost' | 'outline' | 'soft' | 'ink' | 'line';
type ToneNames =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'green'
  | 'orange'
  | 'red'
  | 'teal'
  | 'purple';
type ColorNames =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'gray'
  | 'white'
  | 'light-dark';
type SizeNames = 'micro' | 'xs' | 'tiny' | 'small' | 'medium' | 'large';
type StatusNames = 'active' | 'inactive' | 'pending' | 'default';

const shapes: Record<ShapeNames, string> = {
  rounded: 'rounded-md',
  pill: 'rounded-full',
  circle: 'rounded-full',
};

const sizes: Record<SizeNames, string[]> = {
  micro: ['text-[10px] leading-tight px-1.5 py-0 h-auto', 'w-1 h-1'],
  xs: ['text-[10px] leading-none px-1 py-0.5 h-3.5', 'w-1.5 h-1.5'],
  tiny: ['text-xs px-1.5 py-0.5 h-4', 'w-2 h-2'],
  small: ['text-xs px-2 py-1 h-5', 'w-2.5 h-2.5'],
  medium: ['text-sm px-2.5 py-1 h-6', 'w-3 h-3'],
  large: ['text-base px-3 py-1.5 h-7', 'w-3.5 h-3.5'],
};

const colors: Record<ColorNames, string[]> = {
  primary: ['text-brand', 'bg-brand', 'border-brand'],
  success: ['text-green-500', 'bg-green-700', 'border-green-500'],
  info: ['text-blue-500', 'bg-blue-600', 'border-blue-500'],
  warning: ['text-yellow-500', 'bg-yellow-700', 'border-yellow-500'],
  danger: ['text-red-500', 'bg-red-600', 'border-red-500'],
  gray: ['text-gray-500', 'bg-gray-600', 'border-gray-500'],
  white: ['text-gray-900', 'bg-white', 'border-white'],
  'light-dark': ['', ''],
};

type ToneVariantNames = 'soft' | 'ink' | 'line';

const toneClassNames: Record<ToneVariantNames, Record<ToneNames, string>> = {
  soft: {
    primary: 'bg-brand/15 text-brand border border-transparent',
    success: 'bg-success/15 text-success border border-transparent',
    info: 'bg-info/15 text-info border border-transparent',
    warning: 'bg-warning/15 text-warning border border-transparent',
    danger: 'bg-error/15 text-error border border-transparent',
    neutral: 'bg-muted/15 text-muted border border-transparent',
    green: '',
    orange: '',
    red: '',
    teal: '',
    purple: '',
  },
  ink: {
    primary: 'bg-brand text-white border border-transparent',
    success: 'bg-success text-white border border-transparent',
    info: 'bg-info text-white border border-transparent',
    warning: 'bg-warning text-white border border-transparent',
    danger: 'bg-error text-white border border-transparent',
    neutral: 'bg-muted text-white border border-transparent',
    green: '',
    orange: '',
    red: '',
    teal: '',
    purple: '',
  },
  line: {
    primary: 'bg-transparent text-brand border border-brand',
    success: 'bg-transparent text-success border border-success',
    info: 'bg-transparent text-info border border-info',
    warning: 'bg-transparent text-warning border border-warning',
    danger: 'bg-transparent text-error border border-error',
    neutral: 'bg-transparent text-muted border border-muted',
    green: '',
    orange: '',
    red: '',
    teal: '',
    purple: '',
  },
};

const colorToTone: Record<ColorNames, ToneNames> = {
  primary: 'primary',
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'danger',
  gray: 'neutral',
  white: 'neutral',
  'light-dark': 'neutral',
};

const variantToToneVariant: Record<VariantNames, ToneVariantNames | null> = {
  soft: 'soft',
  ink: 'ink',
  line: 'line',
  solid: 'ink',
  ghost: 'line',
  outline: 'line',
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
  /** Status tone using theme tokens; combine with variant soft, ink or line. green, orange, red, teal and purple read the `--tucu-state-<tone>-soft|ink|line` tokens */
  tone?: ToneNames;
  /** Badge size. `micro` is smaller than `tiny` (10px text, auto height). */
  size?: SizeNames;
  variant?: VariantNames;
  shape?: ShapeNames;
  withDot?: boolean;
  /** Strikes the label through, for cancelled or expired states */
  struck?: boolean;
}

export const Badge = ({
  children,
  className,
  status,
  color,
  tone,
  size = 'small',
  variant = 'solid',
  shape = 'pill',
  withDot = false,
  struck = false,
  ...props
}: BadgeProps) => {
  const badgeColor = status ? statusColors[status] : color || 'gray';
  const colorClassNames = colors[badgeColor];
  const sizeClassNames = sizes[size];

  const resolvedTone: ToneNames | undefined =
    tone ?? (variant === 'soft' ? colorToTone[badgeColor] : undefined);
  const toneVariant = variantToToneVariant[variant];

  let badgeColorClasses = '';
  if (resolvedTone && toneVariant) {
    badgeColorClasses = toneClassNames[toneVariant][resolvedTone];
  } else
    switch (variant) {
      case 'solid':
        badgeColorClasses = `${colorClassNames[1]} ${
          color === 'white' ? 'text-gray-900' : 'text-white'
        }`;
        break;
      case 'ghost':
        badgeColorClasses = `bg-transparent border-2 ${colorClassNames[0]} ${colorClassNames[2]}`;
        break;
      case 'outline':
        badgeColorClasses = `bg-transparent border ${colorClassNames[0]} ${colorClassNames[2]}`;
        break;
      default:
        badgeColorClasses = `${colorClassNames[1]} text-white`;
        break;
    }

  const legacyLightDark =
    !(resolvedTone && toneVariant) && badgeColor === 'light-dark';

  const dotSize = withDot && !children ? sizeClassNames[1] : '';

  return (
    <span
      data-tucu="badge"
      data-variant={variant}
      data-tone={resolvedTone}
      data-color={legacyLightDark ? 'light-dark' : undefined}
      data-struck={struck ? 'true' : undefined}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200',
        shapes[shape],
        withDot && !children ? dotSize : sizeClassNames[0],
        badgeColorClasses,
        struck && 'line-through',
        className
      )}
      {...props}
    >
      {withDot && children && (
        <span
          className={cn(
            'rounded-full mr-1.5',
            sizeClassNames[1],
            variant === 'solid' || badgeColorClasses.includes('text-white')
              ? 'bg-white/80'
              : 'bg-current'
          )}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
