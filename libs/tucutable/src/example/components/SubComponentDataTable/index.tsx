import React, { useState } from 'react';
import { Table } from '@tanstack/react-table';
import { SubComponentProps, TData } from '../../../common/types';
import DataTable from '../../../components/DataTable/DataTable';
import useDataTableStore from '../../../hooks/useDataTableStore';
import useTableColors from '../../../hooks/useTableColors';
import { assetsWithAccounts } from '../../mocks';
import { IAccountWithBalance } from '../../mocks/types';
import useAssetColumns from './useAssetColumns';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const SubComponentDataTable: React.FC<SubComponentProps<TData>> = ({ row }) => {
  const { colors } = useTableColors();
  const { resetStoreData, setPagination } = useDataTableStore('sub-assets');
  const { columns: assetColumns } = useAssetColumns();

  const [table, setTable] = useState<Table<TData>>();

  const rowData = row?.original as IAccountWithBalance;

  return (
    <Stack
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: colors.rowExpandedBg,
      }}
    >
      <DataTable
        tableId={'sub-assets'}
        smallAnatomy
        data={assetsWithAccounts}
        columns={assetColumns}
        setTableIntance={setTable}
        pagination={{
          pageSize: 5,
          pageIndex: 0,
          showPagination: true,
          hideRecordsSelector: true,
        }}
        border={false}
        headerOptions={{
          headerContainer: (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                padding: 5,
                height: '10px',
                borderTop: `1px solid ${colors.divider}`,
              }}
            >
              <Typography style={{ color: colors.primaryText }} variant="h6">
                {rowData.name}
              </Typography>
              <Button
                onClick={() => {
                  table?.setPageSize(5);
                  table?.reset();
                  setPagination({ pageSize: 5, pageIndex: 0 });
                  resetStoreData();
                }}
              >
                Reset Filters
              </Button>
            </Box>
          ),
        }}
        sx={{
          container: {
            backgroundColor: colors.rowExpandedBg,
          },
          header: {
            backgroundColor: colors.headerExpandedBg,
          },
          row: {
            backgroundColor: colors.rowExpandedBg,
          },
          pagination: {
            backgroundColor: colors.rowExpandedBg,
          },
        }}
      />
    </Stack>
  );
};

export default SubComponentDataTable;
