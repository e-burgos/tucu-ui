import React, { Fragment } from 'react';
import { Table } from '@tanstack/react-table';
import { TData } from '../../../common/types';
import ArrowLongIndicator from '../../../components/Assets/ArrowLongIndicator';
import AssetButton from '../../../components/Assets/AssetButton';
import FilterIndicator from '../../../components/Assets/FilterIndicator';
import useTableColors from '../../../hooks/useTableColors';

const ColumnSortSelectorParameterized = ({
  table,
}: {
  table: Table<TData>;
}) => {
  const { colors } = useTableColors();
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <AssetButton onClick={column.getToggleSortingHandler()}>
                  {{
                    asc: (
                      <ArrowLongIndicator
                        direction="up"
                        size={20}
                        color={colors.primaryText}
                      />
                    ),
                    false: (
                      <FilterIndicator size={20} color={colors.primaryText} />
                    ),
                    desc: (
                      <ArrowLongIndicator
                        direction="down"
                        size={20}
                        color={colors.primaryText}
                      />
                    ),
                  }[column.getIsSorted() as string] ?? null}
                </AssetButton>
                {column.id}
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default ColumnSortSelectorParameterized;
