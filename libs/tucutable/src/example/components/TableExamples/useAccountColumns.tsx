/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import {
  formatToMoney,
  sortingCompareNumberFn,
  sortingCompareStringFn,
} from '../../../common/functions';
import { IAccountWithBalance } from '../../mocks/types';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const useAccountColumns = () => {
  const columns: ColumnDef<IAccountWithBalance, IAccountWithBalance>[] =
    useMemo(
      () => [
        {
          id: 'Accounts',
          size: 400,
          minSize: 300,
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
          id: 'Balance',
          size: 220,
          minSize: 220,
          accessorFn: (row) => row,
          sortingFn: (rowA, rowB) =>
            sortingCompareNumberFn(
              Number(rowA.original?.balance?.totalBalance?.usd),
              Number(rowB.original?.balance?.totalBalance?.usd)
            ),
          cell: (info) => {
            return (
              <Typography variant="body1">
                $
                {formatToMoney(
                  info?.getValue()?.balance?.totalBalance?.usd || 0
                )}
              </Typography>
            );
          },
          header: (props) => props.column.id,
          footer: (props) => props.column.id,
        },
        {
          id: 'Type',
          size: 200,
          minSize: 200,
          accessorFn: (row) => row,
          sortingFn: (rowA, rowB) =>
            sortingCompareStringFn(
              rowA.original?.accountLabel,
              rowB.original?.accountLabel
            ),
          cell: (info) => (
            <Typography variant="body2">
              {info?.getValue()?.accountLabel}
            </Typography>
          ),
          header: (props) => props.column.id,
          footer: (props) => props.column.id,
        },
        {
          id: 'Account ID',
          size: 250,
          minSize: 250,
          enableMultiSort: true,
          enableSorting: true,
          accessorFn: (row) => row,
          sortingFn: (rowA, rowB) =>
            sortingCompareStringFn(
              rowA.original?.externalAccountId,
              rowB.original?.externalAccountId
            ),
          cell: (info) => (
            <Typography variant="body2">
              {info?.getValue()?.externalAccountId}
            </Typography>
          ),
          header: (props) => props.column.id,
          footer: (props) => props.column.id,
        },
        {
          id: 'No Draggable Column',
          size: 200,
          maxSize: 160,
          minSize: 160,
          accessorFn: (row) => row,
          enablePinning: false,
          enableResizing: false,
          enableSorting: false,
          enableHiding: false,
          meta: {
            //@ts-ignore
            noDraggable: true,
          },
          cell: () => (
            <Typography variant="body2">{'No Draggable Column'}</Typography>
          ),
          header: (props) => props.column.id,
          footer: (props) => props.column.id,
        },
      ],
      []
    );

  return { columns };
};

export default useAccountColumns;
