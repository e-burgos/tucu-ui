import React, {
  forwardRef,
  useState,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import cn from 'classnames';
import Radio, { RadioProps } from './radio';
import { FieldError } from './helpers/field-error-text';
import { FieldHelperText } from './helpers/field-helper-text';

export interface RadioGroupProps {
  /** Set field value */
  value?: string | number;
  /** Set default value for uncontrolled radio group */
  defaultValue?: string | number;
  /** The variants of the component are: */
  variant?: RadioProps['variant'];
  /** The size of the component. `"sm"` is equivalent to the dense input styling. */
  size?: RadioProps['size'];
  /** Change radio button color */
  color?: RadioProps['color'];
  /** Available directions of the label are: */
  labelPlacement?: RadioProps['labelPlacement'];
  /** Whether the radio group is disabled */
  disabled?: boolean;
  /** Set field label */
  label?: React.ReactNode;
  /** Show error message using this prop */
  error?: string;
  /** Add helper text. It could be string or a React component */
  helperText?: React.ReactNode;
  /** Use className prop to apply style for entire component */
  className?: string;
  /** Use containerClassName prop to apply some additional style for radio group container */
  containerClassName?: string;
  /** Use labelClassName prop to apply some addition style for the field label */
  labelClassName?: string;
  /** This prop allows you to customize the error message style */
  errorClassName?: string;
  /** This prop allows you to customize the helper message style */
  helperClassName?: string;
  /** Layout direction for radio options */
  direction?: 'vertical' | 'horizontal';
  /** Gap between radio options */
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  /** Radio options */
  options?: Array<{
    name?: string;
    label: React.ReactNode;
    value: string | number;
    disabled?: boolean;
    [key: string]: any;
  }>;
  /** Children radio components */
  children?: React.ReactNode;
  /** onChange callback function */
  onChange?: (value: string | number) => void;
}

const gapClasses = {
  vertical: {
    sm: 'space-y-[4px]',
    md: 'space-y-[8px]',
    lg: 'space-y-[12px]',
    xl: 'space-y-[16px]',
  },
  horizontal: {
    sm: 'space-x-[8px] rtl:space-x-reverse',
    md: 'space-x-[16px] rtl:space-x-reverse',
    lg: 'space-x-[24px] rtl:space-x-reverse',
    xl: 'space-x-[32px] rtl:space-x-reverse',
  },
};

/**
 * A group of radio components that allows users to select one option from a set.
 * RadioGroup can be used with either the options prop or with Radio components as children.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      defaultValue,
      variant = 'ghost',
      size = 'md',
      color = 'primary',
      labelPlacement = 'end',
      disabled = false,
      label,
      error,
      helperText,
      className,
      containerClassName,
      labelClassName,
      errorClassName,
      helperClassName,
      direction = 'vertical',
      gap = 'md',
      options,
      children,
      onChange,
      ...rest
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState<
      string | number | undefined
    >(value !== undefined ? value : defaultValue);

    useEffect(() => {
      if (value !== undefined) {
        setTimeout(() => {
          setSelectedValue(value as string | number | undefined);
        }, 100);
      }
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      if (value === undefined) {
        setSelectedValue(newValue as string | number | undefined);
      }

      onChange?.(newValue);
    };

    const renderOptions = () => {
      if (options) {
        return options.map((option) => {
          const isChecked =
            selectedValue !== undefined &&
            selectedValue.toString() === option.value.toString();
          const {
            name,
            label: optionLabel,
            value: optionValue,
            disabled: optionDisabled,
            ...restOptionProps
          } = option;

          return (
            <Radio
              key={optionValue}
              name={name}
              label={optionLabel}
              value={optionValue}
              disabled={disabled || optionDisabled}
              checked={isChecked}
              variant={variant}
              size={size}
              color={color}
              labelPlacement={labelPlacement}
              onChange={handleChange}
              activeClassName={isChecked ? 'active' : ''}
              {...restOptionProps}
            />
          );
        });
      }

      return Children.map(children, (child) => {
        if (!isValidElement<RadioProps>(child)) return child;

        const isChecked =
          selectedValue !== undefined &&
          selectedValue.toString() === child.props.value?.toString();

        return cloneElement(child, {
          checked: isChecked,
          onChange: handleChange,
          disabled: disabled || child.props.disabled,
          variant: child.props.variant || variant,
          size: child.props.size || size,
          color: child.props.color || color,
          labelPlacement: child.props.labelPlacement || labelPlacement,
          activeClassName: isChecked ? 'active' : '',
        } as Partial<RadioProps>);
      });
    };

    return (
      <div ref={ref} className={cn('flex flex-col', className)} {...rest}>
        {label && (
          <label
            className={cn('block text-sm font-medium mb-[6px]', labelClassName)}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            'flex',
            direction === 'vertical'
              ? 'flex-col'
              : 'flex-row flex-wrap items-center',
            gapClasses[direction][gap],
            containerClassName
          )}
        >
          {renderOptions()}
        </div>

        {!error && helperText && (
          <FieldHelperText size="md" className={helperClassName}>
            {helperText}
          </FieldHelperText>
        )}

        {error && (
          <FieldError size="md" error={error} className={errorClassName} />
        )}
      </div>
    );
  }
);

export default RadioGroup;
