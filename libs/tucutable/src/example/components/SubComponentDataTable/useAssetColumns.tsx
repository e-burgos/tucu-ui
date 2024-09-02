/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import {
  formatToMoney,
  sortingCompareNumberFn,
  sortingCompareStringFn,
} from '../../../common/functions';
import { IAssetWithTokensWithAccounts } from '../../mocks/types';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const useAssetColumns = () => {
  const columns: ColumnDef<
    IAssetWithTokensWithAccounts,
    IAssetWithTokensWithAccounts
  >[] = useMemo(
    () => [
      {
        id: 'Assets',
        size: 300,
        minSize: 200,
        meta: {
          filterVariant: 'text',
        },
        accessorFn: (row) => row,
        sortingFn: (rowA, rowB) =>
          sortingCompareStringFn(rowA.original?.name, rowB.original?.name),
        cell: (info) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Avatar
              sx={{ width: 24, height: 24 }}
              src={info.row.original?.iconUrl}
              alt={info.row.original?.name}
            />
            <Typography variant="body1">{info?.getValue()?.name}</Typography>
          </Box>
        ),
        footer: (props) => props.column.id,
        header: (props) => props.column.id,
      },
      {
        id: 'Market Price',
        size: 200,
        minSize: 200,
        accessorFn: (row) => row,
        sortingFn: (rowA, rowB) =>
          sortingCompareNumberFn(
            Number(rowA.original?.marketPrice),
            Number(rowB.original?.marketPrice)
          ),
        cell: (info) => {
          return (
            <Typography variant="body1">
              ${formatToMoney(info?.getValue()?.marketPrice)}
            </Typography>
          );
        },
        header: (props) => props.column.id,
        footer: (props) => props.column.id,
      },
      {
        id: 'Asset ID',
        size: 200,
        minSize: 200,
        enableMultiSort: true,
        enableSorting: true,
        accessorFn: (row) => row,
        sortingFn: (rowA, rowB) =>
          sortingCompareNumberFn(
            rowA.original?.assetId,
            rowB.original?.assetId
          ),
        cell: (info) => (
          <Typography variant="body1">{info?.getValue()?.assetId}</Typography>
        ),
        header: (props) => props.column.id,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  return { columns };
};

export default useAssetColumns;
