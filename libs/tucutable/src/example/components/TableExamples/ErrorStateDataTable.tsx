import React from 'react';
import { DataTable } from '../../../components/DataTable';
import { assetsWithAccounts } from '../../mocks';
import useAssetColumns from './useAssetColumns';

const ErrorStateDataTable: React.FC = () => {
  const { columns: assetColumns } = useAssetColumns();

  return (
    <DataTable
      tableId={'error-state'}
      data={assetsWithAccounts}
      isError
      columns={assetColumns}
      pagination={{ showPagination: true }}
      title="Error State"
      sx={{ wrapper: { marginTop: '20px' } }}
    />
  );
};

export default ErrorStateDataTable;
