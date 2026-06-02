/* eslint-disable @typescript-eslint/no-explicit-any */
import { Updater } from '@tanstack/react-table';

/**
 * Compare two numbers
 * @category libs/datatable
 * @subcategory Functions
 *
 * @param rowA - The first number to compare
 * @param rowB - The second number to compare
 * @returns 1 if rowA is greater than rowB, -1 if rowA is less than rowB, and 0 if they are equal
 */
export const sortingCompareNumberFn = (
  rowA: number | string,
  rowB: number | string
) => {
  const propertyA = Number.isNaN(Number(rowA)) ? 0 : rowA;
  const propertyB = Number.isNaN(Number(rowB)) ? 0 : rowB;
  return propertyA > propertyB ? 1 : propertyA < propertyB ? -1 : 0;
};

/**
 * Compare two strings
 * @category libs/datatable
 * @subcategory Functions
 *
 * @param rowA - The first string to compare
 * @param rowB - The second string to compare
 * @returns 1 if rowA is greater than rowB, -1 if rowA is less than rowB, and 0 if they are equal
 */
export const sortingCompareStringFn = (rowA: string, rowB: string) => {
  const propertyA = rowA?.toLocaleLowerCase() ?? '';
  const propertyB = rowB?.toLocaleLowerCase() ?? '';
  return propertyA.localeCompare(propertyB);
};

/**
 * Update the table state
 * @category libs/datatable
 * @subcategory Functions
 *
 * @param updaterFn - The updater function
 * @param state - The state
 * @param setState - The setState function
 */
export const onChangeTableState = (
  updaterFn: Updater<any>,
  state: any,
  setState: any
) => {
  const newState = updaterFn(state, undefined);
  return setState(newState);
};

/**
 * Handle the header table listener
 * @category libs/datatable
 * @subcategory Functions
 *
 * @param el - The element
 */
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
