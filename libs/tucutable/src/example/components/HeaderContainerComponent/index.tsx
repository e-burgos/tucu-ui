import React from 'react';
import { HeaderContainerProps, TData } from '../../../common/types';
import ResetFiltersButtonParameterized from '../ResetFiltersButton/ResetFiltersButtonParameterized';
import Typography from '@mui/material/Typography';

interface HeaderContainerComponentProps extends HeaderContainerProps<TData> {
  title?: string;
  tableId: string;
}

const HeaderContainerComponent: React.FC<HeaderContainerComponentProps> = ({
  table,
  tableId,
  title,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        width: '100%',
        borderBottom: '1px solid rgb(45, 47, 51)',
        padding: '20px 16px',
        textAlign: 'center',
      }}
    >
      {title && <Typography variant="h6">{title}</Typography>}
      <ResetFiltersButtonParameterized table={table} tableId={tableId} />
    </div>
  );
};

export default HeaderContainerComponent;
