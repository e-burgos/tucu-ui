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
    TValue = unknown
  > extends OriginalAccessorFnColumnDefBase<TData, TValue> {
    accessorHeaderFn?: () => string;
    exportAsNumber?: boolean;
    exportAsPercentage?: boolean;
  }

  // The type parameters are dictated by @tanstack/react-table's own
  // declaration — the arity has to match for the augmentation to merge, even
  // though the members added here don't reference them.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select';
  }
}
