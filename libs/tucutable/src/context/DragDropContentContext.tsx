import React from 'react';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

interface DragDropContentContextProps {
  children: React.ReactNode;
  columnOrder: string[];
}

const DragDropContentContext: React.FC<DragDropContentContextProps> = ({
  children,
  columnOrder,
}) => {
  return (
    <SortableContext
      items={columnOrder}
      strategy={horizontalListSortingStrategy}
    >
      {children}
    </SortableContext>
  );
};

export default DragDropContentContext;
