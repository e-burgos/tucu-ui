import React from 'react';
import cn from 'classnames';
import { FieldError } from './field-error-text';
import { FieldHelperText } from './field-helper-text';

export interface InputSwitchProps {
  label?: string;
  offLabel?: string;
  onLabel?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  errorMessage?: string;
  helperText?: string;
}

export const InputSwitch: React.FC<InputSwitchProps> = ({
  label,
  offLabel,
  onLabel,
  checked,
  onChange,
  className,
  errorMessage,
  helperText,
}) => {
  return (
    <label
      className={cn(
        'flex items-center relative w-max cursor-pointer select-none',
        className
      )}
    >
      {label && <span className="text-sm mr-3">{label}</span>}
      <input
        style={{
          backgroundImage: `url(${checked ? '' : ''})`,
        }}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={cn(
          'appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-brand/50',
          checked ? 'bg-brand' : 'bg-gray-500'
        )}
      />
      <span className="absolute font-medium text-sm uppercase right-1 text-white">
        {offLabel || 'OFF'}
      </span>
      <span className="absolute font-medium text-sm uppercase right-8 text-white">
        {onLabel || 'ON'}
      </span>
      <span
        className={cn(
          'w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200',
          checked ? 'translate-x-7' : 'translate-x-0'
        )}
      />
      {errorMessage && <FieldError error={errorMessage} size="DEFAULT" />}
      {helperText && (
        <FieldHelperText size="DEFAULT">{helperText}</FieldHelperText>
      )}
    </label>
  );
};

export default InputSwitch;
