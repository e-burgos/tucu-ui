export type ControlColor =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'info'
  | 'success'
  | 'warning';

export type TextControlVariant = 'ghost' | 'solid' | 'transparent';

export const textControlToneClasses: Record<TextControlVariant, string> = {
  ghost: 'transition-shadow border',
  solid: 'transition-colors border',
  transparent: 'border',
};

export const textControlHoverRingClass = 'hover:ring-1';

export function textControlToneAttributes(
  variant: TextControlVariant,
  color?: ControlColor,
  hoverRing = false
) {
  if (!color) return undefined;
  return {
    'data-tucu-control-tone': color,
    'data-tucu-control-variant': variant,
    'data-tucu-control-hover-ring': hoverRing ? '' : undefined,
  };
}

export const controlAccentTextDefaultClass = 'text-brand';

export const controlAccentChipDefaultClass =
  'bg-brand/10 text-brand hover:bg-brand/20';

export const fileInputToneClasses = {
  wrapper: 'rounded-lg border border-solid p-4 sm:p-6',
  dropzone:
    'focus-within:ring-2 focus-within:ring-brand border border-dashed transition-all duration-300 relative h-48 flex items-center justify-center rounded-lg',
};

type ButtonLikeColor =
  | 'primary'
  | 'gray'
  | 'danger'
  | 'info'
  | 'success'
  | 'warning';

export const buttonColorByControlColor: Record<ControlColor, ButtonLikeColor> =
  {
    primary: 'primary',
    secondary: 'gray',
    danger: 'danger',
    info: 'info',
    success: 'success',
    warning: 'warning',
  };

export const buttonHoverClassByControlColor: Record<ControlColor, string> = {
  primary: 'hover:bg-primary-500',
  secondary: 'hover:bg-gray-600',
  danger: 'hover:bg-red-600',
  info: 'hover:bg-blue-600',
  success: 'hover:bg-green-600',
  warning: 'hover:bg-orange-600',
};
