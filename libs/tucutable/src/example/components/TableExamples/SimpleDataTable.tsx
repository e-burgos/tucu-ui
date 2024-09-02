import React from 'react';
import { DataTable } from '../../../components/DataTable';
import { assetsWithAccounts } from '../../mocks';
import SubComponent from '../SubComponent';
import useAssetColumns from './useAssetColumns';

const SimpleDataTable: React.FC = () => {
  const { columns: assetColumns } = useAssetColumns();

  return (
    <DataTable
      title="Simple DataTable Example"
      tableId={'assets'}
      data={assetsWithAccounts}
      columns={assetColumns}
      renderSubComponent={SubComponent}
      pagination={{ showPagination: true }}
      sx={{ wrapper: { marginTop: '20px' } }}
      rowActions={[
        {
          action: 'view',
          label: 'View Details',
          onClick: (row) => {
            alert(`View ${row.original.name}, check console for more details`);
            console.log('View', row);
          },
        },
      ]}
    />
  );
};

export default SimpleDataTable;
