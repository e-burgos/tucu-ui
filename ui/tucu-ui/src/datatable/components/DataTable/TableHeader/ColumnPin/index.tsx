import React from 'react';
import { Header } from '@tanstack/react-table';
import { TData } from '../../../../common/types';
import PinIndicator from '../../../Assets/PinIndicator';
import { IconButton } from '../../../Common/IconButton';

/**
 * Props for the ColumnPin component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {Header<TData, unknown>} header - The header of the column.
 * @property {boolean} disabled - Whether the column is disabled.
 * @property {string} color - The color of the column.
 * @property {boolean} enablePinLeftColumns - Whether the column can be pinned to the left.
 * @property {boolean} enablePinRightColumns - Whether the column can be pinned to the right.
 *
 * @template TData - The type of the data in the table.
 */

interface ColumnPinProps {
  header: Header<TData, unknown>;
  disabled?: boolean;
  color?: string;
  enablePinLeftColumns?: boolean;
  enablePinRightColumns?: boolean;
}

const ColumnPin: React.FC<ColumnPinProps> = ({
  header,
  color,
  disabled,
  enablePinLeftColumns,
  enablePinRightColumns,
}) => {
  return (
    <div className="flex items-center justify-center bg-transparent gap-1">
      {enablePinLeftColumns &&
        !header.column.getIsPinned() &&
        header.column.getIsPinned() !== 'left' && (
          <IconButton
            color={color}
            disabled={disabled}
            icon={<PinIndicator direction="down" />}
            onClick={() => {
              header.column.pin('left');
            }}
          />
        )}
      {header.column.getIsPinned() && (
        <IconButton
          color={color}
          isPinned
          disabled={disabled}
          icon={<PinIndicator direction="down" />}
          onClick={() => {
            header.column.pin(false);
          }}
        />
      )}
      {enablePinRightColumns &&
        !header.column.getIsPinned() &&
        header.column.getIsPinned() !== 'right' && (
          <IconButton
            color={color}
            disabled={disabled}
            icon={<PinIndicator direction="right" />}
            onClick={() => {
              header.column.pin('right');
            }}
          />
        )}
    </div>
  );
};

export default ColumnPin;
