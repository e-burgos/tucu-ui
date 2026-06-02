import React, { HTMLProps } from 'react';

/**
 * Props for the CheckboxSelector component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {boolean} indeterminate - Whether the checkbox is indeterminate.
 * @property {string} className - The class name of the checkbox.
 * @property {HTMLProps<HTMLInputElement>} rest - The rest of the props.
 *
 * @template TData - The type of the data in the table.
 */

function CheckboxSelector({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref.current!.indeterminate = !rest?.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}

export default CheckboxSelector;
