import React, { CSSProperties } from 'react';
import { Spinner } from '../../Common/Spinner';
import { cn } from '../../../common/helpers/cn';
import { IDataTableStyles } from '../../../common/types';
import { useDataTableContext } from '../../../context/index';
import ColumnsVisibilityManager from '../ColumnsVisibilityManager';
import Input from '../../../../components/inputs/input';
import { SearchIcon } from '../../../../components/icons/search';

/**
 * Props for the TableWrapper component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {string} tableId - The id of the table.
 * @property {string} title - The title of the table.
 * @property {boolean} border - Whether the table has a border.
 * @property {boolean} isFetching - Whether the table is fetching.
 * @property {boolean} isEmpty - Whether the table is empty.
 * @property {React.ReactNode} headerContainer - The header container of the table.
 * @property {React.ReactNode} children - The children of the table.
 * @property {IDataTableStyles} sx - The styles of the table.
 * @property {number} containerWidth - The width of the table.
 *
 * @template TData - The type of the data in the table.
 */

export interface TableWrapperProps {
  tableId: string;
  title?: string;
  border?: boolean;
  isFetching?: boolean;
  isEmpty?: boolean;
  headerContainer?: React.ReactNode;
  children: React.ReactNode;
  sx?: IDataTableStyles;
  containerWidth?: number;
  mode?: 'dark' | 'light';
}

const TableWrapper: React.FC<TableWrapperProps> = ({
  tableId,
  title,
  border,
  isFetching,
  headerContainer,
  children,
  isEmpty,
  sx,
  containerWidth,
  mode,
}) => {
  const context = useDataTableContext();
  const enableHideColumns = !!context?.config?.enableHideColumns;
  const searchableColumns = context?.config?.searchableColumns;
  const rightActions = context?.config?.rightActions;
  const hasSearch = !!(searchableColumns && searchableColumns.length > 0);
  const globalFilter = context?.globalFilter ?? '';
  const setGlobalFilter = context?.setGlobalFilter;

  const shouldShowBorder = !!(
    border === true ||
    (border === undefined &&
      (title ||
        headerContainer ||
        enableHideColumns ||
        hasSearch ||
        rightActions))
  );

  const shouldShowBorderRadius = !!(
    border ||
    title ||
    headerContainer ||
    enableHideColumns ||
    hasSearch ||
    rightActions
  );

  const shouldHeaderBottomBorder = !!(
    title ||
    headerContainer ||
    enableHideColumns ||
    hasSearch ||
    rightActions
  );

  const shouldActionsContainer = !!(
    enableHideColumns ||
    hasSearch ||
    rightActions
  );

  return (
    <div
      id={`${tableId}-wrapper`}
      data-testid="table-wrapper"
      data-theme={mode}
      className={cn([
        'flex flex-col w-full h-fit z-0 relative overflow-hidden',
        shouldShowBorderRadius && 'rounded-xl',
        shouldShowBorder && 'border border-table-divider shadow-lg',
        mode && mode === 'dark' && 'dark',
        mode && mode === 'light' && 'light',
      ])}
      style={
        {
          backgroundColor: isEmpty
            ? undefined
            : 'var(--color-table-default-bg)',
          border: shouldShowBorder
            ? '1px solid var(--color-table-divider)'
            : 'none',
          '--table-width': `${containerWidth ?? 0}px`,
          ...sx?.wrapper,
        } as CSSProperties
      }
    >
      <div
        id={`${tableId}-wrapper-container`}
        data-testid="table-wrapper-container"
        className={cn(
          'flex flex-col w-full h-fit z-0 relative overflow-hidden'
        )}
        style={{
          backgroundColor: isEmpty ? undefined : 'var(--color-table-box-bg)',
          ...sx?.wrapperContainer,
        }}
      >
        {isFetching && (
          <div
            id={`${tableId}-fetching-container`}
            data-testid="table-fetching-container"
            className="flex justify-center items-center absolute w-full h-full z-100 cursor-not-allowed"
            style={{
              backgroundColor: 'var(--color-table-default-bg)',
              opacity: 0.5,
            }}
          >
            <Spinner size="lg" color="primary" />
          </div>
        )}
        {shouldHeaderBottomBorder && (
          <div
            className={cn(
              'flex flex-col items-center w-full z-2 h-fit',
              'border-b! border-table-divider!'
            )}
            style={{
              ...sx?.container,
            }}
            data-testid="table-header-container"
          >
            {title && (
              <div
                className={cn(
                  'flex justify-between items-center w-full z-0 text-table-primary-text! p-4'
                )}
                data-testid="table-title"
              >
                <span className="font-sans text-table-primary-text! text-lg font-bold leading-6 text-left block">
                  {title}
                </span>
                {!hasSearch && (
                  <div className="flex flex-row items-center gap-3 shrink-0">
                    {rightActions}
                    {enableHideColumns && <ColumnsVisibilityManager />}
                  </div>
                )}
              </div>
            )}
            {!title && !hasSearch && (
              <div
                className={cn(
                  'flex justify-end items-center w-full z-0 text-table-primary-text! p-4'
                )}
              >
                <div className="flex flex-row items-center gap-3 shrink-0">
                  {rightActions}
                  {enableHideColumns && <ColumnsVisibilityManager />}
                </div>
              </div>
            )}
            {shouldActionsContainer && (
              <div
                className={cn(
                  'p-4 flex flex-row w-full justify-between items-center gap-4',
                  title && 'pt-0!',
                  !hasSearch && 'hidden!'
                )}
              >
                {hasSearch && setGlobalFilter && (
                  <div className="w-[240px]">
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={globalFilter}
                      onChange={(e) => setGlobalFilter(e.target.value)}
                      icon={
                        <SearchIcon className="w-4 h-4 text-table-secondary-text" />
                      }
                      size="sm"
                      variant="ghost"
                      color="primary"
                      className="w-full"
                      inputClassName="border border-border!"
                    />
                  </div>
                )}
                {(enableHideColumns || rightActions) && (
                  <div className="flex flex-row items-center gap-3 shrink-0">
                    {rightActions}
                    {enableHideColumns && <ColumnsVisibilityManager />}
                  </div>
                )}
              </div>
            )}
            {headerContainer && (
              <div className={cn('flex-1 w-full h-fit')}>{headerContainer}</div>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default TableWrapper;
