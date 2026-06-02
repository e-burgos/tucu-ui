import React from 'react';

/**
 * Props for the InputSearcher component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {string} value - The value of the input.
 * @property {function(string): void} onChange - The function to call when the input value changes.
 * @property {number} debounce - The debounce time for the input.
 *
 * @template TData - The type of the data in the table.
 */

function InputSearcher({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default InputSearcher;
