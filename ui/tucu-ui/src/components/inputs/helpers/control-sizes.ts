export type TextControlSize = 'sm' | 'md' | 'lg';

export const textControlSizeClasses: Record<
  'input' | 'select' | 'textarea',
  Record<TextControlSize, string>
> = {
  input: {
    sm: 'h-8 px-3 py-1.5 text-sm sm:h-10',
    md: 'h-10 px-4 py-2 text-sm sm:h-12',
    lg: 'h-12 px-4 py-3 text-base sm:h-14',
  },
  select: {
    sm: 'h-8 px-3 text-sm sm:h-10 sm:px-4',
    md: 'h-10 px-4 text-sm sm:h-12 sm:px-5',
    lg: 'h-12 px-4 text-base sm:h-14 sm:px-5',
  },
  textarea: {
    sm: 'min-h-20 px-3 py-2 text-sm sm:min-h-24',
    md: 'min-h-24 px-4 py-3 text-sm sm:min-h-28',
    lg: 'min-h-32 px-4 py-4 text-base sm:min-h-36',
  },
};
