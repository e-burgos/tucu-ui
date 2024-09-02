import React from 'react';
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

interface DragDropTableContextProps {
  children: React.ReactNode;
  columnOrder: string[];
  setColumnOrder: (value: string[]) => void;
}

const DragDropTableContext: React.FC<DragDropTableContextProps> = ({
  children,
  columnOrder,
  setColumnOrder,
}) => {
  function handleColumnDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = columnOrder.indexOf(active.id as string);
      const newIndex = columnOrder.indexOf(over.id as string);
      const newState = arrayMove(columnOrder, oldIndex, newIndex);
      setColumnOrder(newState);
      return newState;
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
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
