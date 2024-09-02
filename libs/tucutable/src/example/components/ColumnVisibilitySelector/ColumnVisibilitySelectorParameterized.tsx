import React, { Fragment } from 'react';
import { Table } from '@tanstack/react-table';
import { TData } from '../../../common/types';

interface ColumnVisibilitySelectorParameterizedProps {
  table: Table<TData>;
}

const ColumnVisibilitySelectorParameterized: React.FC<
  ColumnVisibilitySelectorParameterizedProps
> = ({ table }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '200px',
        height: '100%',
      }}
    >
      {table.getAllColumns().map((column, index) => {
        return (
          <Fragment key={`${column.id}-${index}`}>
            {column.id !== 'Expanded' && column.id !== 'RowActionsColumn' && (
              <div>
                <label>
                  <input
                    {...{
                      type: 'checkbox',
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />{' '}
                  {column.id}
                </label>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default ColumnVisibilitySelectorParameterized;
