import React from 'react';
import { useDataTableProvider } from '../../../context/DataTableContext';
import Button from '@mui/material/Button';

const ResetFiltersButton: React.FC = () => {
  const { resetTable } = useDataTableProvider();
  return (
    <Button variant="contained" onClick={() => resetTable()}>
      Reset Filters
    </Button>
  );
};

export default ResetFiltersButton;
