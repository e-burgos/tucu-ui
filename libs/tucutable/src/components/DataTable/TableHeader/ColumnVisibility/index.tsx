import React, { useState } from 'react';
import { Header } from '@tanstack/react-table';
import { TData } from '../../../../common/types';
import useTableColors from '../../../../hooks/useTableColors';
import VisibilityIndicator from '../../../Assets/VisibilityIndicator';
import styles from './column-visibility.module.css';

interface ColumnVisibilityProps {
  header: Header<TData, unknown>;
}

const ColumnVisibility: React.FC<ColumnVisibilityProps> = ({ header }) => {
  const { colors } = useTableColors();
  const [hover, setHover] = useState<boolean>(false);

  return (
    <button
      className={styles.button}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => header.column.toggleVisibility()}
    >
      <VisibilityIndicator
        size={20}
        visibility={'off'}
        color={hover ? colors.primaryText : colors.disabled}
      />
    </button>
  );
};

export default ColumnVisibility;
