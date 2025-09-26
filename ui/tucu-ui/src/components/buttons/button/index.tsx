import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useId,
  TouchEventHandler,
} from 'react';
import cn from 'classnames';
import ButtonDrip from './button-drip';
import ButtonLoader from './button-loader';
import { LoaderSizeTypes, LoaderVariantTypes } from '../../loaders/loader';

type ShapeNames = 'rounded' | 'pill' | 'circle';
type VariantNames = 'solid' | 'ghost' | 'transparent';
type ColorNames =
  | 'primary'
  | 'white'
  | 'gray'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger';
type SizeNames = 'large' | 'medium' | 'small' | 'mini' | 'tiny';

const shapes: Record<ShapeNames, string[]> = {
  rounded: ['rounded-md sm:rounded-lg'],
  pill: ['rounded-full'],
  circle: ['rounded-full'],
};
const variants: Record<VariantNames, string[]> = {
  ghost: ['bg-transparent'],
  solid: ['text-white'],
  transparent: ['bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800'],
};
const colors: Record<ColorNames, string[]> = {
  primary: ['text-brand', 'bg-brand', 'border-brand'],
  white: ['text-gray-900', 'bg-white', 'border-white'],
  gray: ['text-gray-900', 'bg-gray-500', 'border-gray-100'],
  success: ['text-green-500', 'bg-green-500', 'border-green-500'],
  info: ['text-blue-500', 'bg-blue-500', 'border-blue-500'],
  warning: ['text-yellow-500', 'bg-yellow-500', 'border-yellow-500'],
  danger: ['text-red-500', 'bg-red-500', 'border-red-500'],
};
const sizes: Record<SizeNames, string[]> = {
  large: ['px-7 sm:px-9 h-11 sm:h-13', 'w-11 h-11 sm:w-13 sm:h-13'],
  medium: ['px-5 sm:px-8 h-10 sm:h-12', 'h-10 w-10 sm:w-12 sm:h-12'],
  small: ['px-7 h-10', 'w-10 h-10'],
  mini: ['px-4 h-8', 'w-8 h-8'],
  tiny: ['px-2 h-6', 'w-6 h-6'],
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  disabled?: boolean;
  shape?: ShapeNames;
  variant?: VariantNames;
  color?: ColorNames;
  size?: SizeNames;
  fullWidth?: boolean;
  loaderSize?: LoaderSizeTypes;
  loaderVariant?: LoaderVariantTypes;
  tooltip?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      isLoading,
      disabled,
      fullWidth,
      shape = 'rounded',
      variant = 'solid',
      color = 'primary',
      size = 'medium',
      loaderSize = 'small',
      loaderVariant = 'scaleUp',
      tooltip,
      onClick,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...buttonProps
    },
    ref: React.Ref<HTMLButtonElement | null>
  ) => {
    const [hover, setHover] = useState<boolean>(false);
    const [dripShow, setDripShow] = useState<boolean>(false);
    const [dripX, setDripX] = useState<number>(0);
    const [dripY, setDripY] = useState<number>(0);
    const colorClassNames = colors[color];
    const sizeClassNames = sizes[size];
    const buttonRef = useRef<HTMLButtonElement>(null);
    const tooltipId = useId();

    useImperativeHandle(ref, () => buttonRef.current);

    function dripCompletedHandle() {
      setDripShow(false);
      setDripX(0);
      setDripY(0);
    }

    const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!isLoading && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDripShow(true);
        setDripX(event.clientX - rect.left);
        setDripY(event.clientY - rect.top);
      }
      onClick && onClick(event);
    };

    let buttonColorClassNames = '';
    let buttonDripColor = '';
    switch (variant) {
      case 'ghost':
        buttonColorClassNames = `border-2 border-solid ${colorClassNames[0]} ${colorClassNames[2]}`;
        buttonDripColor = 'rgba(0, 0, 0, 0.1)';
        break;

      case 'transparent':
        buttonColorClassNames = `${colorClassNames[0]} ${
          disabled || isLoading
            ? 'bg-gray-100 dark:bg-gray-800/25'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800'
        } `;
        buttonDripColor = 'rgba(0, 0, 0, 0.1)';
        break;

      default:
        buttonColorClassNames = `${colorClassNames[1]} ${colorClassNames[2]}`;
        buttonDripColor = 'rgba(255, 255, 255, 0.3)';
        break;
    }

    // Build aria-describedby string
    const describedBy =
      [ariaDescribedBy, tooltip ? tooltipId : null].filter(Boolean).join(' ') ||
      undefined;

    return (
      <div
        className={cn(
          'relative backdrop-blur-sm shadow-xl transition-all duration-300 transform',
          fullWidth && 'w-full'
        )}
      >
        {tooltip && hover && (
          <div
            id={tooltipId}
            role="tooltip"
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs dark:bg-light-dark bg-white rounded-sm shadow-lg border border-gray-200 dark:border-gray-700 z-10"
          >
            {tooltip}
          </div>
        )}
        <button
          onTouchStart={
            clickHandler as unknown as TouchEventHandler<HTMLButtonElement>
          }
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          ref={buttonRef}
          onClick={clickHandler}
          aria-label={ariaLabel}
          aria-describedby={describedBy}
          aria-busy={isLoading ? 'true' : 'false'}
          className={cn(
            'group inline-flex shrink-0 items-center justify-center overflow-hidden text-center text-xs font-medium tracking-wider outline-hidden transition-all sm:text-sm',
            !disabled
              ? buttonColorClassNames
              : 'cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 bg-gray-300 text-gray-600',
            disabled || isLoading || variant === 'transparent'
              ? 'bg-gray-100/25'
              : 'hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-hidden',
            isLoading &&
              'pointer-events-auto cursor-default focus:outline-hidden',
            fullWidth && 'w-full',
            color === 'white' || color === 'gray'
              ? 'text-gray-900 dark:text-white'
              : variants[variant],
            shapes[shape],
            shape === 'circle'
              ? `${sizeClassNames[1]}`
              : `${sizeClassNames[0]}`,
            className
          )}
          disabled={disabled}
          {...buttonProps}
        >
          <span className={cn(isLoading && 'invisible opacity-0')}>
            {children}
          </span>

          {isLoading && (
            <>
              <ButtonLoader size={loaderSize} variant={loaderVariant} />
              <span className="sr-only">Loading...</span>
            </>
          )}

          {dripShow && (
            <ButtonDrip
              x={dripX}
              y={dripY}
              color={
                ['white', 'gray'].indexOf(color) !== -1
                  ? 'rgba(0, 0, 0, 0.1)'
                  : buttonDripColor
              }
              fullWidth={fullWidth}
              onCompleted={dripCompletedHandle}
            />
          )}
        </button>
      </div>
    );
  }
);

Button.displayName = 'Button';

export default Button;
