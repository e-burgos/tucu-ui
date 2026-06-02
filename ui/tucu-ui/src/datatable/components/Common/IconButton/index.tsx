/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ButtonHTMLAttributes,
  cloneElement,
  forwardRef,
  ReactElement,
  RefObject,
} from 'react';
import { cn } from '../../../common/helpers/cn';

/**
 * IconButtonProps
 * @category libs/datatable
 * @subcategory Components
 *
 * @param size - The size
 * @param icon - The icon
 * @param isPinned - The isPinned
 */

type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  ref?: RefObject<any>;
  icon: ReactElement;
  isPinned?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const sizes: Record<NonNullable<IconButtonProps['size']>, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, isPinned, size = 'md', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'icon-button-wrapper',
          isPinned && 'icon-button-pinned',
          disabled && 'cursor-not-allowed',
          className
        )}
        disabled={disabled}
        {...props}
      >
        {cloneElement(icon, {
          ...(typeof icon.type === 'function'
            ? {
                size: (icon.props as any)?.size ?? sizes[size] ?? sizes.md,
                color: (icon.props as any)?.color ?? 'inherit',
              }
            : {}),
        })}
      </button>
    );
  }
);

export default IconButton;
