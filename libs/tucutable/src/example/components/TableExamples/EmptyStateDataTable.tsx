import React from 'react';
import { DataTable } from '../../../components/DataTable';
import useAssetColumns from './useAssetColumns';

const EmptyStateDataTable: React.FC = () => {
  const { columns: assetColumns } = useAssetColumns();

  return (
    <DataTable
      tableId={'empty-state'}
      data={[]}
      columns={assetColumns}
      pagination={{ showPagination: true }}
      title="Empty State"
      sx={{ wrapper: { marginTop: '20px' } }}
    />
  );
};

export default EmptyStateDataTable;
