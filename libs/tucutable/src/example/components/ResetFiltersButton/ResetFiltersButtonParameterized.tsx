import React from 'react';
import { Table } from '@tanstack/react-table';
import { TData } from '../../../common/types';
import useDataTableStore from '../../../hooks/useDataTableStore';
import Button from '@mui/material/Button';

const ResetFiltersButtonParameterized = ({
  table,
  tableId,
}: {
  table: Table<TData> | undefined;
  tableId: string;
}) => {
  const { resetStoreData } = useDataTableStore(tableId);

  const resetTable = () => {
    resetStoreData();
    table?.resetColumnFilters();
    table?.resetColumnOrder();
    table?.resetColumnPinning();
    table?.resetColumnSizing();
    table?.resetColumnVisibility();
    table?.reset();
  };

  return <Button onClick={() => resetTable()}>Reset Filters</Button>;
};

export default ResetFiltersButtonParameterized;
