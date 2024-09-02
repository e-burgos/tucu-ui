import React, { useState } from 'react';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import useTableColors from '../../../../hooks/useTableColors';
import ArrowDoubleIndicator from '../../../Assets/ArrowDoubleIndicator';
import styles from './column-draggable.module.css';

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
  const { colors } = useTableColors();
  const [hover, setHover] = useState<boolean>(false);
  return (
    <button
      className={styles.draggableButton}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...attributes}
      {...listeners}
    >
      <ArrowDoubleIndicator
        size={20}
        direction="horizontal"
        color={hover ? colors.primaryText : color}
      />
    </button>
  );
};

export default ColumnDraggable;
