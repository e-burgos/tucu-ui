import React, { useState } from 'react';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import ArrowDoubleIndicator from '../../../Assets/ArrowDoubleIndicator';

/**
 * Props for the ColumnDraggable component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {string} color - The color of the column.
 * @property {DraggableAttributes} attributes - The attributes of the column.
 * @property {SyntheticListenerMap} listeners - The listeners of the column.
 *
 * @template TData - The type of the data in the table.
 */

interface ColumnDraggableProps {
  color?: string;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap;
}

const ColumnDraggable: React.FC<ColumnDraggableProps> = ({
  color,
  attributes,
  listeners,
}) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <button
      className="flex items-center justify-center bg-transparent p-0 m-0 border-none cursor-move select-none touch-none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...attributes}
      {...listeners}
    >
      <ArrowDoubleIndicator
        size={20}
        direction="horizontal"
        color={hover ? 'var(--color-table-primary-text)' : color}
      />
    </button>
  );
};

export default ColumnDraggable;
