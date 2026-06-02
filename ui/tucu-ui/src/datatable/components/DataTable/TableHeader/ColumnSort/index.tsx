import React, { ReactNode, useMemo } from 'react';
import { flexRender, Header } from '@tanstack/react-table';
import { TData } from '../../../../common/types';
import ArrowLongIndicator from '../../../Assets/ArrowLongIndicator';
import FilterIndicator from '../../../Assets/FilterIndicator';
import { IconButton } from '../../../Common/IconButton';

/**
 * Props for the ColumnSort component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {Header<TData, unknown>} header - The header of the column.
 * @property {boolean} isPinned - Whether the column is pinned.
 *
 * @template TData - The type of the data in the table.
 */

interface ColumnSortProps {
  header: Header<TData, unknown>;
  isPinned?: boolean;
}

const sorterIcons: Record<string, ReactNode> = {
  asc: <ArrowLongIndicator direction="up" size={19.5} />,
  desc: <ArrowLongIndicator direction="down" size={19.5} />,
};

const ColumnSort: React.FC<ColumnSortProps> = ({ header, isPinned }) => {
  const renderIcon = useMemo(() => {
    if (header.isPlaceholder) return null;
    return (
      <>
        {flexRender(
          !header.column.getIsSorted() ? <FilterIndicator size={18} /> : null,
          header.getContext()
        )}
        {sorterIcons?.[header.column.getIsSorted() as string] ?? null}
      </>
    );
  }, [header]);

  return (
    <IconButton
      isPinned={isPinned}
      className="flex items-center justify-center bg-transparent p-0 m-0 border-none cursor-pointer select-none touch-none"
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
      icon={renderIcon ?? <></>}
    />
  );
};

export default ColumnSort;
