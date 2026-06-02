import {
  RowData,
  ColumnDefBase as OriginalColumnDefBase,
  AccessorFnColumnDefBase as OriginalAccessorFnColumnDefBase,
} from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  export interface ColumnDefBase<TData extends RowData, TValue = unknown>
    extends OriginalColumnDefBase<TData, TValue> {
    enableDraggable?: boolean;
    enableVisible?: boolean;
    accessorHeaderFn?: () => string;
    exportAsNumber?: boolean;
    exportAsPercentage?: boolean;
  }

  export interface AccessorFnColumnDefBase<
    TData extends RowData,
    TValue = unknown,
  > extends OriginalAccessorFnColumnDefBase<TData, TValue> {
    accessorHeaderFn?: () => string;
    exportAsNumber?: boolean;
    exportAsPercentage?: boolean;
  }

  export interface ColumnDefBase<TData extends RowData, TValue = unknown>
    extends OriginalColumnDefBase<TData, TValue> {
    accessorHeaderFn?: () => string;
    exportAsNumber?: boolean;
    exportAsPercentage?: boolean;
  }

  export interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select';
  }
}
