import React, { useState } from 'react';
import { flexRender, Header } from '@tanstack/react-table';
import { TData } from '../../../../common/types';
import useTableColors from '../../../../hooks/useTableColors';
import ArrowLongIndicator from '../../../Assets/ArrowLongIndicator';
import FilterIndicator from '../../../Assets/FilterIndicator';
import styles from './column-sort.module.css';

interface ColumnSortProps {
  header: Header<TData, unknown>;
  color?: string;
}
const ColumnSort: React.FC<ColumnSortProps> = ({ header, color }) => {
  const { colors } = useTableColors();
  const [hover, setHover] = useState<boolean>(false);
  return (
    <button
      className={styles.button}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={header.column.getToggleSortingHandler()}
      title={
        header.column.getCanSort()
          ? header.column.getNextSortingOrder() === 'asc'
            ? 'Sort ascending'
            : header.column.getNextSortingOrder() === 'desc'
              ? 'Sort descending'
              : 'Clear sort'
          : undefined
      }
    >
      {header.isPlaceholder
        ? null
        : flexRender(
            !header.column.getIsSorted() ? (
              <FilterIndicator
                size={20}
                color={hover ? colors.primaryText : color}
              />
            ) : null,
            header.getContext(),
          )}
      {{
        asc: (
          <ArrowLongIndicator
            direction="up"
            size={20}
            color={hover ? colors.primaryText : color}
          />
        ),
        desc: (
          <ArrowLongIndicator
            direction="down"
            size={20}
            color={hover ? colors.primaryText : color}
          />
        ),
      }[header.column.getIsSorted() as string] ?? null}
    </button>
  );
};

export default ColumnSort;
