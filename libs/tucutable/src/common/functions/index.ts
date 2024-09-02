/* eslint-disable @typescript-eslint/no-explicit-any */
import { Updater } from '@tanstack/react-table';
import BigNumber from 'bignumber.js';

export const sortingCompareNumberFn = (
  rowA: number | string,
  rowB: number | string
) => {
  const propertyA = Number.isNaN(Number(rowA)) ? 0 : rowA;
  const propertyB = Number.isNaN(Number(rowB)) ? 0 : rowB;
  return propertyA > propertyB ? 1 : propertyA < propertyB ? -1 : 0;
};

export const sortingCompareStringFn = (rowA: string, rowB: string) => {
  const propertyA = rowA?.toLocaleLowerCase() ?? '';
  const propertyB = rowB?.toLocaleLowerCase() ?? '';
  return propertyA.localeCompare(propertyB);
};

export const onChangeTableState = (
  updaterFn: Updater<any>,
  state: any,
  setState: any
) => {
  const newState = updaterFn(state, undefined);
  return setState(newState);
};

export const handleHeaderTableListener = (el: HTMLElement | null) => {
  const eventConfig = {
    view: window,
    bubbles: true,
    cancelable: true,
  };
  const eventMouseOver = new MouseEvent('mouseover', eventConfig);
  const eventMouseOut = new MouseEvent('mouseout', eventConfig);
  if (el) {
    el?.dispatchEvent(eventMouseOver);
    el?.dispatchEvent(eventMouseOut);
  }
};

export const FALLBACK_MONEY_VALUE = '-';

export const hasMoreDecimals = (n: number | string): boolean => {
  const decimals = n.toString().split('.')[1] || '';
  return Number(`0.${decimals}`) < 0.01;
};

export const formatToMoney = (
  value: number | string,
  digits: number | 'auto' = 2,
  useParentheses?: boolean,
  useCurrencySymbol = false,
  currencySymbol = '$'
): string => {
  const rawValue = new BigNumber(value);

  if (rawValue.isNaN()) return FALLBACK_MONEY_VALUE;

  if (digits === 'auto') digits = hasMoreDecimals(rawValue.toNumber()) ? 8 : 2;

  const formatStringNumber = new BigNumber(rawValue.toFixed(digits)).toFormat(
    digits
  );

  if (useParentheses) formatStringNumber.toString();

  return useCurrencySymbol
    ? `${currencySymbol}${formatStringNumber.toString()}`
    : formatStringNumber.toString();
};
