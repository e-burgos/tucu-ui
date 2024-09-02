import React, { Fragment } from 'react';
import { useDataTableProvider } from '../../../context/DataTableContext';
import useTableColors from '../../../hooks/useTableColors';

const ColumnVisibilitySelector: React.FC = () => {
  const { colors } = useTableColors();
  const { table } = useDataTableProvider();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '200px',
        height: '100%',
        gap: '5px',
      }}
    >
      {table.getAllColumns().map((column, index) => {
        return (
          <Fragment key={`${column.id}-${index}`}>
            {column.id !== 'Expanded' && column.id !== 'RowActionsColumn' && (
              <div>
                <label style={{ color: colors.primaryText }}>
                  <input
                    {...{
                      type: 'checkbox',
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                      style: { marginRight: '5px' },
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

export default ColumnVisibilitySelector;
