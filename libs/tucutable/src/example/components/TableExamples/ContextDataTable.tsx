import React from 'react';
import DataTableWithContext from '../../../components/DataTable/DataTableWithContext';
import { DataTableProvider } from '../../../context/DataTableContext';
import { accountsWithBalanceData } from '../../mocks';
import ColumnPinSelector from '../ColumnPinSelector';
import ColumnSortSelector from '../ColumnSortSelector';
import ColumnVisibilitySelector from '../ColumnVisibilitySelector';
import ResetFiltersButton from '../ResetFiltersButton';
import SubComponentDataTable from '../SubComponentDataTable';
import useAccountColumns from './useAccountColumns';
import Box from '@mui/material/Box';

const ContextDataTable: React.FC = () => {
  const { columns: accountsColumns } = useAccountColumns();

  return (
    <DataTableProvider
      tableId={'accounts'}
      defaultData={accountsWithBalanceData}
      defaultColumns={accountsColumns}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '5px',
          marginBottom: '10px',
          margin: '20px 0',
          padding: '20px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <ColumnVisibilitySelector />
        <ColumnPinSelector />
        <ColumnSortSelector />
        <ResetFiltersButton />
      </Box>
      <DataTableWithContext
        title="Context DataTable Example"
        pagination={{ showPagination: true }}
        renderSubComponent={(row) => <SubComponentDataTable {...row} />}
        rowActions={[
          {
            action: 'view',
            label: 'View Details',
            onClick: (row) => {
              alert(
                `View ${row.original.name}, check console for more details`
              );
              console.log('View', row);
            },
          },
          {
            action: 'edit',
            label: 'Edit',
            onClick: (row) => {
              alert(
                `Edit ${row.original.name}, check console for more details`
              );
              console.log('Edit', row);
            },
          },
          {
            action: 'delete',
            label: 'Delete',
            onClick: (row) => {
              alert(
                `Delete ${row.original.name}, check console for more details`
              );
              console.log('Delete', row);
            },
          },
          {
            action: 'download',
            label: 'Download',
            onClick: (row) => {
              alert(
                `Download ${row.original.name}, check console for more details`
              );
              console.log('Download', row);
            },
          },
          {
            action: 'void',
            label: 'Void',
            onClick: (row) => {
              alert(
                `Void ${row.original.name}, check console for more details`
              );
              console.log('Void', row);
            },
          },
        ]}
      />
    </DataTableProvider>
  );
};

export default ContextDataTable;
