export type ControlColor =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'info'
  | 'success'
  | 'warning';

type TextControlVariant = 'ghost' | 'solid' | 'transparent';

export const textControlColorClasses: Record<
  TextControlVariant,
  Record<ControlColor, string>
> = {
  ghost: {
    primary:
      '!border-brand/70 hover:!border-brand/80 focus:!border-brand focus:!ring-brand/35 caret-brand dark:!border-brand/75 dark:!bg-brand/20 dark:hover:!border-brand/85 dark:focus:!border-brand dark:focus:!ring-brand/40',
    secondary:
      'border-gray-500/40 hover:border-gray-500/60 focus:border-gray-500 focus:ring-gray-500/25 caret-gray-500 dark:border-gray-500/45 dark:bg-gray-500/10 dark:hover:border-gray-500/60 dark:focus:border-gray-400 dark:focus:ring-gray-500/30',
    danger:
      'border-red-500/40 hover:border-red-500/60 focus:border-red-500 focus:ring-red-500/25 caret-red-500 dark:border-red-500/45 dark:bg-red-500/10 dark:hover:border-red-500/60 dark:focus:border-red-500 dark:focus:ring-red-500/30',
    info: '!border-blue-500/70 hover:!border-blue-500/80 focus:!border-blue-500 focus:!ring-blue-500/35 caret-blue-500 dark:!border-blue-500/75 dark:!bg-blue-500/20 dark:hover:!border-blue-500/85 dark:focus:!border-blue-500 dark:focus:!ring-blue-500/40',
    success:
      'border-green-500/40 hover:border-green-500/60 focus:border-green-500 focus:ring-green-500/25 caret-green-500 dark:border-green-500/45 dark:bg-green-500/10 dark:hover:border-green-500/60 dark:focus:border-green-500 dark:focus:ring-green-500/30',
    warning:
      'border-orange-500/40 hover:border-orange-500/60 focus:border-orange-500 focus:ring-orange-500/25 caret-orange-500 dark:border-orange-500/45 dark:bg-orange-500/10 dark:hover:border-orange-500/60 dark:focus:border-orange-500 dark:focus:ring-orange-500/30',
  },
  solid: {
    primary:
      'border border-brand/45 bg-brand/15 hover:bg-brand/20 focus:border-brand focus:ring-brand/30 caret-brand dark:border-brand/50 dark:bg-brand/20 dark:hover:bg-brand/25 dark:focus:border-brand dark:focus:ring-brand/35',
    secondary:
      'border border-gray-500/30 bg-gray-500/10 hover:bg-gray-500/15 focus:border-gray-500 focus:ring-gray-500/25 caret-gray-500 dark:border-gray-500/35 dark:bg-gray-500/15 dark:hover:bg-gray-500/20 dark:focus:border-gray-400 dark:focus:ring-gray-500/30',
    danger:
      'border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 focus:border-red-500 focus:ring-red-500/25 caret-red-500 dark:border-red-500/35 dark:bg-red-500/15 dark:hover:bg-red-500/20 dark:focus:border-red-500 dark:focus:ring-red-500/30',
    info: 'border border-blue-500/45 bg-blue-500/15 hover:bg-blue-500/20 focus:border-blue-500 focus:ring-blue-500/30 caret-blue-500 dark:border-blue-500/50 dark:bg-blue-500/20 dark:hover:bg-blue-500/25 dark:focus:border-blue-500 dark:focus:ring-blue-500/35',
    success:
      'border border-green-500/30 bg-green-500/10 hover:bg-green-500/15 focus:border-green-500 focus:ring-green-500/25 caret-green-500 dark:border-green-500/35 dark:bg-green-500/15 dark:hover:bg-green-500/20 dark:focus:border-green-500 dark:focus:ring-green-500/30',
    warning:
      'border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/15 focus:border-orange-500 focus:ring-orange-500/25 caret-orange-500 dark:border-orange-500/35 dark:bg-orange-500/15 dark:hover:bg-orange-500/20 dark:focus:border-orange-500 dark:focus:ring-orange-500/30',
  },
  transparent: {
    primary:
      'border border-transparent bg-brand/10 hover:bg-brand/15 focus:border-brand focus:ring-brand/30 caret-brand dark:bg-brand/15 dark:hover:bg-brand/20 dark:focus:border-brand dark:focus:ring-brand/35',
    secondary:
      'border border-transparent bg-gray-500/5 hover:bg-gray-500/10 focus:border-gray-500 focus:ring-gray-500/25 caret-gray-500 dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:focus:border-gray-400 dark:focus:ring-gray-500/30',
    danger:
      'border border-transparent bg-red-500/5 hover:bg-red-500/10 focus:border-red-500 focus:ring-red-500/25 caret-red-500 dark:bg-red-500/10 dark:hover:bg-red-500/15 dark:focus:border-red-500 dark:focus:ring-red-500/30',
    info: 'border border-transparent bg-blue-500/10 hover:bg-blue-500/15 focus:border-blue-500 focus:ring-blue-500/30 caret-blue-500 dark:bg-blue-500/15 dark:hover:bg-blue-500/20 dark:focus:border-blue-500 dark:focus:ring-blue-500/35',
    success:
      'border border-transparent bg-green-500/5 hover:bg-green-500/10 focus:border-green-500 focus:ring-green-500/25 caret-green-500 dark:bg-green-500/10 dark:hover:bg-green-500/15 dark:focus:border-green-500 dark:focus:ring-green-500/30',
    warning:
      'border border-transparent bg-orange-500/5 hover:bg-orange-500/10 focus:border-orange-500 focus:ring-orange-500/25 caret-orange-500 dark:bg-orange-500/10 dark:hover:bg-orange-500/15 dark:focus:border-orange-500 dark:focus:ring-orange-500/30',
  },
};

export const controlAccentTextClasses: Record<ControlColor, string> = {
  primary: 'text-brand',
  secondary: 'text-gray-600 dark:text-gray-300',
  danger: 'text-red-500',
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-orange-500',
};

export const controlAccentChipClasses: Record<ControlColor, string> = {
  primary: 'bg-brand/10 text-brand hover:bg-brand/20',
  secondary:
    'bg-gray-500/10 text-gray-600 hover:bg-gray-500/20 dark:text-gray-300',
  danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
  info: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
  success: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
  warning: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20',
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

export const fileInputColorClasses: Record<
  ControlColor,
  { wrapper: string; dropzone: string }
> = {
  primary: {
    wrapper: 'border-brand/25 bg-brand/5 dark:border-brand/30 dark:bg-brand/10',
    dropzone:
      'border-brand/30 bg-brand/5 hover:border-brand/55 hover:bg-brand/10 focus-within:border-brand/55 focus-within:bg-brand/10 dark:border-brand/35 dark:bg-brand/10 dark:hover:border-brand/60 dark:hover:bg-brand/15 dark:focus-within:border-brand/60 dark:focus-within:bg-brand/15',
  },
  secondary: {
    wrapper:
      'border-gray-500/25 bg-gray-500/5 dark:border-gray-500/30 dark:bg-gray-500/10',
    dropzone:
      'border-gray-500/30 bg-gray-500/5 hover:border-gray-500/55 hover:bg-gray-500/10 focus-within:border-gray-500/55 focus-within:bg-gray-500/10 dark:border-gray-500/35 dark:bg-gray-500/10 dark:hover:border-gray-500/60 dark:hover:bg-gray-500/15 dark:focus-within:border-gray-500/60 dark:focus-within:bg-gray-500/15',
  },
  danger: {
    wrapper:
      'border-red-500/25 bg-red-500/5 dark:border-red-500/30 dark:bg-red-500/10',
    dropzone:
      'border-red-500/30 bg-red-500/5 hover:border-red-500/55 hover:bg-red-500/10 focus-within:border-red-500/55 focus-within:bg-red-500/10 dark:border-red-500/35 dark:bg-red-500/10 dark:hover:border-red-500/60 dark:hover:bg-red-500/15 dark:focus-within:border-red-500/60 dark:focus-within:bg-red-500/15',
  },
  info: {
    wrapper:
      'border-blue-500/25 bg-blue-500/5 dark:border-blue-500/30 dark:bg-blue-500/10',
    dropzone:
      'border-blue-500/30 bg-blue-500/5 hover:border-blue-500/55 hover:bg-blue-500/10 focus-within:border-blue-500/55 focus-within:bg-blue-500/10 dark:border-blue-500/35 dark:bg-blue-500/10 dark:hover:border-blue-500/60 dark:hover:bg-blue-500/15 dark:focus-within:border-blue-500/60 dark:focus-within:bg-blue-500/15',
  },
  success: {
    wrapper:
      'border-green-500/25 bg-green-500/5 dark:border-green-500/30 dark:bg-green-500/10',
    dropzone:
      'border-green-500/30 bg-green-500/5 hover:border-green-500/55 hover:bg-green-500/10 focus-within:border-green-500/55 focus-within:bg-green-500/10 dark:border-green-500/35 dark:bg-green-500/10 dark:hover:border-green-500/60 dark:hover:bg-green-500/15 dark:focus-within:border-green-500/60 dark:focus-within:bg-green-500/15',
  },
  warning: {
    wrapper:
      'border-orange-500/25 bg-orange-500/5 dark:border-orange-500/30 dark:bg-orange-500/10',
    dropzone:
      'border-orange-500/30 bg-orange-500/5 hover:border-orange-500/55 hover:bg-orange-500/10 focus-within:border-orange-500/55 focus-within:bg-orange-500/10 dark:border-orange-500/35 dark:bg-orange-500/10 dark:hover:border-orange-500/60 dark:hover:bg-orange-500/15 dark:focus-within:border-orange-500/60 dark:focus-within:bg-orange-500/15',
  },
};
