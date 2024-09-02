import React, { Fragment } from 'react';
import { Table } from '@tanstack/react-table';
import { TData } from '../../../common/types';
import AssetButton from '../../../components/Assets/AssetButton';
import PinIndicator from '../../../components/Assets/PinIndicator';
import useTableColors from '../../../hooks/useTableColors';

const ColumnPinSelectorParameterized = ({ table }: { table: Table<TData> }) => {
  const { colors } = useTableColors();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '250px',
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
                <AssetButton
                  onClick={() => {
                    column.getIsPinned() && column.getIsPinned() === 'left'
                      ? column.pin(false)
                      : column.pin('left');
                  }}
                >
                  <PinIndicator
                    direction={
                      column.getIsPinned() && column.getIsPinned() === 'left'
                        ? 'down'
                        : 'left'
                    }
                    size={20}
                    color={colors.primaryText}
                  />
                </AssetButton>
                <AssetButton
                  onClick={() => {
                    column.getIsPinned() && column.getIsPinned() === 'right'
                      ? column.pin(false)
                      : column.pin('right');
                  }}
                >
                  <PinIndicator
                    direction={
                      column.getIsPinned() && column.getIsPinned() === 'right'
                        ? 'down'
                        : 'right'
                    }
                    size={20}
                    color={colors.primaryText}
                  />
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

export default ColumnPinSelectorParameterized;
