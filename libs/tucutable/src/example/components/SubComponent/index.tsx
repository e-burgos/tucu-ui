import React from 'react';

import Typography from '@mui/material/Typography';
import { SubComponentProps, TData } from '../../../common/types';
import { IAssetWithTokensWithAccounts } from '../../mocks/types';
import { formatToMoney } from '../../../common/functions';
import useTableColors from '../../../hooks/useTableColors';

const SubComponent: React.FC<SubComponentProps<TData>> = ({ row }) => {
  const { colors } = useTableColors();
  const data = row?.original as IAssetWithTokensWithAccounts;
  return (
    <div
      style={{
        borderTop: `1px solid ${colors.divider}`,
        padding: '16px',
      }}
    >
      <Typography sx={{ color: colors.primaryText }} variant="body2">
        {data.name}
      </Typography>
      <Typography sx={{ color: colors.primaryText }} variant="body2">
        {data.symbol}
      </Typography>
      <Typography
        sx={{ color: colors.primaryText }}
        variant="body2"
      >{`Balance: $${formatToMoney(data.balance.usd)}`}</Typography>
      <Typography
        sx={{ color: colors.primaryText }}
        variant="body2"
      >{`Market Price: $${formatToMoney(data.marketPrice)}`}</Typography>
    </div>
  );
};

export default SubComponent;
