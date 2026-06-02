import React from 'react';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { ColumnOrderState } from '@tanstack/react-table';

/**
 * Props for the DragDropContentContext component.
 *
 * @category libs/datatable
 * @subcategory Context
 *
 * @property {React.ReactNode} children - The child nodes to render within the context.
 * @property {ColumnOrderState} columnOrder - The order of the columns.
 * @property {string} id - The id of the context.
 */
interface DragDropContentContextProps {
  id?: string;
  children: React.ReactNode;
  columnOrder: ColumnOrderState;
}

/**
 * DragDropContentContext is a React component that provides a drag and drop context for content.
 * It utilizes the SortableContext from '@dnd-kit/sortable' with a horizontal sorting strategy.
 *
 * @category libs/datatable
 * @subcategory Context
 *
 * @component
 * @param {DragDropContentContextProps} props - The properties for the DragDropContentContext component.
 * @param {React.ReactNode} props.children - The child nodes to render within the context.
 * @param {ColumnOrderState} props.columnOrder - The order of the columns.
 *
 * @returns {React.ReactElement} A React element representing the drag and drop content context.
 */

const DragDropContentContext: React.FC<DragDropContentContextProps> = ({
  children,
  columnOrder,
  id,
}: DragDropContentContextProps): React.ReactElement => {
  return (
    <SortableContext
      key={id}
      items={columnOrder}
      strategy={horizontalListSortingStrategy}
    >
      {children}
    </SortableContext>
  );
};

export default DragDropContentContext;
