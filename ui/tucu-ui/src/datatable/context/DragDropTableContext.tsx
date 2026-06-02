import React, { Dispatch, SetStateAction } from 'react';
import {
  closestCenter,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import { ColumnOrderState } from '@tanstack/react-table';

/**
 * Props for the DragDropTableContext component.
 *
 * @category libs/datatable
 * @subcategory Context
 *
 * @property {React.ReactNode} children - The child nodes to render within the context.
 * @property {ColumnOrderState} columnOrder - The current order of columns in the table.
 * @property {Dispatch<SetStateAction<ColumnOrderState>>} setColumnOrder - Function to update the column order.
 */
interface DragDropTableContextProps {
  children: React.ReactNode;
  columnOrder: ColumnOrderState;
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>;
}

/**
 * DragDropTableContext is a React component that provides a drag and drop context for reordering table columns.
 * It utilizes the DndContext and Sortable functionalities from the '@dnd-kit' library to update the column order
 * when a drag operation ends.
 *
 * @category libs/datatable
 * @subcategory Context
 *
 * @component
 * @param {DragDropTableContextProps} props - The properties for the DragDropTableContext component.
 * @param {React.ReactNode} props.children - The child nodes to render within the context.
 * @param {ColumnOrderState} props.columnOrder - The current order of columns in the table.
 * @param {Dispatch<SetStateAction<ColumnOrderState>>} props.setColumnOrder - Function to update the column order.
 *
 * @returns {React.ReactElement} A React element representing the drag and drop table context.
 */

const DragDropTableContext: React.FC<DragDropTableContextProps> = ({
  children,
  columnOrder,
  setColumnOrder,
}) => {
  const handleColumnDragEnd = (event: DragEndEvent | undefined) => {
    if (!event) return undefined;
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = columnOrder.indexOf(active.id as string);
      const newIndex = columnOrder.indexOf(over.id as string);
      const newState = arrayMove(columnOrder, oldIndex, newIndex);
      setColumnOrder(newState);
      return newState;
    }
    return columnOrder;
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleColumnDragEnd}
      sensors={sensors}
    >
      {children}
    </DndContext>
  );
};

export default DragDropTableContext;
