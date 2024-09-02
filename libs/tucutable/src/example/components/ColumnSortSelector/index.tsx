import React, { Fragment } from 'react';
import ArrowLongIndicator from '../../../components/Assets/ArrowLongIndicator';
import AssetButton from '../../../components/Assets/AssetButton';
import FilterIndicator from '../../../components/Assets/FilterIndicator';
import { useDataTableProvider } from '../../../context/DataTableContext';
import useTableColors from '../../../hooks/useTableColors';

const ColumnSortSelector: React.FC = () => {
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
                  color: colors.primaryText,
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

export default ColumnSortSelector;
