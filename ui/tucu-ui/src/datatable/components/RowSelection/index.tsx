import { HTMLProps, useEffect, useRef } from 'react';

/**
 * RowSelectionProps
 * @category libs/datatable
 * @subcategory Components
 *
 * @param type - The type of the row selection (checkbox or radio)
 * @param indeterminate - The indeterminate state of the row selection
 * @param rest - The rest of the props
 */

export function RowSelection({
  type = 'checkbox',
  indeterminate,
  ...rest
}: {
  indeterminate?: boolean;
  type?: 'checkbox' | 'radio';
} & HTMLProps<HTMLInputElement>): React.JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref.current!.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <input
      type={type}
      ref={ref}
      className={type === 'checkbox' ? 'table-checkbox' : 'table-radio'}
      {...rest}
    />
  );
}
