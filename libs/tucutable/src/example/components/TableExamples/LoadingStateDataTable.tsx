import React from 'react';
import { DataTable } from '../../../components/DataTable';
import { assetsWithAccounts } from '../../mocks';
import useAssetColumns from './useAssetColumns';

const LoadingStateDataTable: React.FC = () => {
  const { columns: assetColumns } = useAssetColumns();

  return (
    <DataTable
      tableId={'loading-state'}
      data={assetsWithAccounts}
      isLoading
      columns={assetColumns}
      pagination={{ showPagination: true }}
      title="Loading State"
      sx={{ wrapper: { marginTop: '20px' } }}
    />
  );
};

export default LoadingStateDataTable;
