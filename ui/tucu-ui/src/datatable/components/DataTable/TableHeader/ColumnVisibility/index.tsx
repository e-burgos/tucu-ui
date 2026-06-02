import React from 'react';
import { Header } from '@tanstack/react-table';
import { TData } from '../../../../common/types';
import VisibilityIndicator from '../../../Assets/VisibilityIndicator';
import { IconButton } from '../../../Common/IconButton';

/**
 * Props for the ColumnVisibility component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {Header<TData, unknown>} header - The header of the column.
 *
 * @template TData - The type of the data in the table.
 */

interface ColumnVisibilityProps {
  header: Header<TData, unknown>;
}
const ColumnVisibility: React.FC<ColumnVisibilityProps> = ({ header }) => {
  return (
    <IconButton
      className="flex items-center justify-center bg-transparent p-0 m-0 border-none cursor-pointer select-none touch-none"
      icon={<VisibilityIndicator visibility={'off'} />}
      onClick={() => header.column.toggleVisibility()}
    />
  );
};

export default ColumnVisibility;
