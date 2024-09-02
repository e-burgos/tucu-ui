# `useDataTableStore` Documentation

`useDataTableStore` is a custom hook created using Zustand for managing and persisting table preferences and filters in a React application. This hook stores table state such as pagination, sorting, column visibility, and pinning, and automatically saves this state to persistent storage for later retrieval.

## Table of Contents

- [`useDataTableStore` Documentation](#usedatatablestore-documentation)
  - [Table of Contents](#table-of-contents)
  - [Functionality](#functionality)
  - [Interfaces](#interfaces)
    - [`ITableData`](#itabledata)
    - [`DataTableStore`](#datatablestore)
  - [State Management](#state-management)
  - [Parameters](#parameters)
  - [Return Value](#return-value)
  - [Usage Example](#usage-example)
  - [Dependencies](#dependencies)
    - [back to Datatable Library Overview](#back-to-datatable-library-overview)

## Functionality

`useDataTableStore` is designed to manage the state of a data table, including user preferences such as pagination settings, sorting orders, column visibility, column pinning, and filters. The state is persisted using a storage solution, ensuring that user preferences are saved and restored across sessions.

This hook creates a Zustand store specifically for a table identified by a unique `tableId`, allowing different tables in the application to have independent states.

## Interfaces

### `ITableData`

This interface defines the structure of the table data stored in the Zustand store:

- **`id: string`**  
  Unique identifier for the table.

- **`data: TData[] | null`**  
  The dataset being displayed in the table.

- **`pagination: PaginationState`**  
  State of pagination, including page size and current page index.

- **`sorting: SortingState`**  
  Sorting configuration for the table columns.

- **`columnOrder: ColumnOrderState`**  
  Order of the columns in the table.

- **`columnVisibility: VisibilityState`**  
  Visibility state of the table columns.

- **`columnPinning: ColumnPinningState`**  
  Pinning state of the table columns, including pinned columns on the left and right sides.

- **`columnFilters: ColumnFiltersState`**  
  Filtering state for the table columns.

### `DataTableStore`

This interface represents the Zustand store for managing table data:

- **`tableData: ITableData`**  
  The current state of the table stored in the Zustand store.

- **`setData(value: TData[]): void`**  
  Function to update the dataset of the table.

- **`setPagination(value: PaginationState): void`**  
  Function to update the pagination state.

- **`setSorting(value: SortingState): void`**  
  Function to update the sorting state.

- **`setColumnOrder(value: ColumnOrderState): void`**  
  Function to update the column order.

- **`setColumnVisibility(value: VisibilityState): void`**  
  Function to update the visibility of columns.

- **`setColumnPinning(value: ColumnPinningState): void`**  
  Function to update the pinning of columns.

- **`setColumnFilters(value: ColumnFiltersState): void`**  
  Function to update the filters applied to the columns.

- **`resetStoreData(): void`**  
  Function to reset the table data in the store, clearing all saved preferences.

## State Management

The hook uses Zustand to manage the state of a data table, with the following key aspects:

- **Persistent Storage**: State is saved to persistent storage via the `storage` module from `@membrane-mfe-app/integrations`. This ensures that table preferences are not lost when the user navigates away from the page or reloads the application.
- **Initial State**: On initialization, the hook attempts to load the table state from storage. If no state is found, default values are used.
- **Automatic Updates**: Whenever a setter function (e.g., `setSorting`) is called, the new state is automatically saved to storage, ensuring that user preferences are always up-to-date.

## Parameters

The `useDataTableStore` hook accepts a single parameter:

- **`tableId: string`**  
  A unique identifier for the table. This ID is used to differentiate the state of multiple tables in the application.

## Return Value

The hook returns an object containing the current state and setter functions for managing the table preferences:

- **`data: TData[] | null`**  
  The current dataset being displayed in the table.

- **`pagination: PaginationState`**  
  The current pagination state, including page size and index.

- **`sorting: SortingState`**  
  The current sorting state of the table.

- **`columnOrder: ColumnOrderState`**  
  The current order of the columns.

- **`columnVisibility: VisibilityState`**  
  The current visibility state of the columns.

- **`columnPinning: ColumnPinningState`**  
  The current pinning state of the columns.

- **`columnFilters: ColumnFiltersState`**  
  The current filter state of the columns.

- **`setData(value: TData[]): void`**  
  Function to update the dataset.

- **`setPagination(value: PaginationState): void`**  
  Function to update the pagination state.

- **`setSorting(value: SortingState): void`**  
  Function to update the sorting state.

- **`setColumnOrder(value: ColumnOrderState): void`**  
  Function to update the column order.

- **`setColumnVisibility(value: VisibilityState): void`**  
  Function to update the visibility of columns.

- **`setColumnPinning(value: ColumnPinningState): void`**  
  Function to update the pinning of columns.

- **`setColumnFilters(value: ColumnFiltersState): void`**  
  Function to update the filters applied to the columns.

- **`resetStoreData(): void`**  
  Function to reset the table data, clearing all saved preferences.

## Usage Example

```javascript
import useDataTableStore from './hooks/useDataTableStore';

function MyComponent() {
  const { data, pagination, sorting, columnOrder, columnVisibility, columnPinning, columnFilters, setData, setPagination, setSorting, setColumnOrder, setColumnVisibility, setColumnPinning, setColumnFilters, resetStoreData } = useDataTableStore('my-table-id');

  // Example: Update sorting state
  const handleSortChange = (newSorting) => {
    setSorting(newSorting);
  };

  return (
    <div>
      {/* Render table with current state */}
      <TableComponent data={data} pagination={pagination} sorting={sorting} columnOrder={columnOrder} columnVisibility={columnVisibility} columnPinning={columnPinning} columnFilters={columnFilters} />
      <button onClick={resetStoreData}>Reset Table Preferences</button>
    </div>
  );
}

export default MyComponent;
```

## Dependencies

The `useDataTableStore` hook relies on the following dependencies:

- **`@tanstack/react-table`**: Provides types and interfaces for managing table state (e.g., sorting, pagination).
- **`Zustand`**: State management library used to create and manage the store.
- **`storage` from `@membrane-mfe-app/integrations`**: A custom storage solution used to persist the table state across sessions.

---

### back to [Datatable Library Overview](../../README.md)
