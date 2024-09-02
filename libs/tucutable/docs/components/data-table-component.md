# `DataTableComponent` Documentation

`DataTableComponent` is an advanced React component for rendering data tables with features such as sorting, pagination, drag-and-drop, and style customization. This component is highly configurable and integrates with the `@tanstack/react-table` library for table state management.

## Table of Contents

- [Overview](#overview)
- [Interfaces Used](#interfaces-used)
- [Hooks Used](#hooks-used)
- [Contexts](#contexts)
- [Props](#props)
- [Usage Example](#usage-example)
- [Additional Libraries](#additional-libraries)

## Overview

`DataTableComponent` allows you to create interactive and customizable tables in React. It leverages `@tanstack/react-table` for data and column manipulation, supporting advanced features such as:

- **Sorting**: Allows sorting columns by different criteria.
- **Pagination**: Divides data into pages, with control options over page size and row information.
- **Drag-and-Drop**: Users can rearrange columns and rows using drag-and-drop functionality.
- **Style Customization**: Through the `sx` prop, custom styles can be defined for different parts of the table.

The component handles important states such as data loading, errors, and column order. Additionally, it can render subcomponents within rows, offering greater flexibility for displaying complex data.

## Interfaces Used

### `DataTableComponentProps<TData>`

This interface defines the properties that the `DataTableComponent` receives. The properties are divided into several categories:

- **Data**

  - `tableId: string`: Unique identifier for the table.
  - `table: Table<TData>`: Table instance created with `@tanstack/react-table`.
  - `columns: ColumnDef<TData, TData>[]`: Array of column definitions.
  - `data: TData[]`: Array of data to be displayed in the table.
  - `setData: React.Dispatch<React.SetStateAction<TData[]>>`: Function to update the data.

- **State**

  - `isLoading: boolean`: Loading state for the data.
  - `isError: boolean`: Error state when loading data.
  - `columnOrder: ColumnOrderState`: State representing the order of columns.
  - `dataIds: UniqueIdentifier[]`: Unique identifiers for the data.
  - `setColumnOrder: (value: ColumnOrderState) => void`: Function to update the column order.

- **Pagination**

  - `pagination: IPaginationOptions`: Pagination options.
  - `pagination.showPagination: boolean`: Show pagination.
  - `pagination.pageIndex: number`: Current page number.
  - `pagination.pageSize: number`: Page size.
  - `pagination.rowsInfo: boolean`: Show row information.
  - `pagination.hideRecordsSelector: boolean`: Hide the records selector.

- **Others**

  - `initialConfig?: Partial<ColumnDef<TData, unknown>>`: Initial column configuration.
  - `showFooter?: boolean`: Show footer.
  - `renderSubComponent?: React.FC<SubComponentProps<TData>>`: Function to render a subcomponent within rows.
  - `title?: string`: Table title.
  - `headerContainer?: React.ReactNode`: Custom header container.
  - `border?: boolean`: Show border around the table.
  - `headerSticky?: boolean`: Enables sticky behavior for the table header.

- **Draggable**

  - `draggable?: IDraggableOptions`: Options to enable drag-and-drop functionality.
  - `draggable.columns: boolean`: Enable drag-and-drop for columns.
  - `draggable.rows: boolean`: Enable drag-and-drop for rows.

- **Custom Styles**
  - `sx?: IDataTableStyles`: Custom styles for different parts of the table.
  - `sx.container?: React.CSSProperties`: Styles for the container.
  - `sx.messageContainer?: React.CSSProperties`: Styles for the message container.
  - `sx.table?: React.CSSProperties`: Styles for the table.
  - `sx.thead?: React.CSSProperties`: Styles for the table header.
  - `sx.tbody?: React.CSSProperties`: Styles for the table body.
  - `sx.tfoot?: React.CSSProperties`: Styles for the table footer.
  - `sx.header?: React.CSSProperties`: Styles for the table header.
  - `sx.row?: React.CSSProperties`: Styles for table rows.
  - `sx.column?: React.CSSProperties`: Styles for table columns.
  - `sx.cell?: React.CSSProperties`: Styles for table cells.

### `IPaginationOptions`

Defines the configuration options for pagination:

- `showPagination: boolean`: Show or hide pagination.
- `rowsInfo?: boolean`: Display additional row information.
- `pageIndex?: number`: Current page index.
- `pageSize?: number`: Number of rows per page.
- `hideRecordsSelector?: boolean`: Hide the records selector.

### `IDataTableStyles`

Allows for style customization:

- `wrapper?: React.CSSProperties`: Styles for the table wrapper.
- `container?: React.CSSProperties`: Styles for the container.
- `messageContainer?: React.CSSProperties`: Styles for the message container.
- `table?: React.CSSProperties`: Styles for the table.
- `thead?: React.CSSProperties`: Styles for the table header.
- `tbody?: React.CSSProperties`: Styles for the table body.
- `tfoot?: React.CSSProperties`: Styles for the table footer.
- `header?: React.CSSProperties`: Styles for the table header.
- `row?: React.CSSProperties`: Styles for table rows.
- `column?: React.CSSProperties`: Styles for table columns.
- `cell?: React.CSSProperties`: Styles for table cells.
- `pagination?: React.CSSProperties`: Styles for pagination.

### `IDraggableOptions`

Options for drag-and-drop functionality:

- `columns?: boolean`: Enable column drag-and-drop.
- `rows?: boolean`: Enable row drag-and-drop.

## Hooks Used

### `useHeaderSticky`

This hook is used to handle the sticky behavior of the table header, ensuring the header remains visible as the user scrolls vertically.

- **Parameters**:
  - `tableId: string`: Unique identifier for the table.
- **Return**:
  - `headerAnimation`: CSS class for header animation.
  - `headerFixed`: Boolean indicating if the header is fixed.

### `useScrollableTable`

This hook manages horizontal scrolling for the table and calculates the container width.

- **Parameters**:
  - `tableId: string`: Unique identifier for the table.
- **Return**:
  - `containerWith`: Width of the container.
  - `isScrollable`: Boolean indicating if the table is scrollable.
  - `scrollX`: Horizontal scroll value.
  - `handleScroll`: Function to handle the scroll event.

### `useTableColors`

This hook provides the colors used for various table elements, such as background, text, and borders.

- **Return**:
  - `colors`: Object containing colors for different table elements.

## Contexts

### `DragDropContentContext`

This context manages the state related to drag-and-drop functionality within the table, whether for columns or rows.

- **Parameters**:
  - `isColumn`: Boolean indicating if a column is being dragged.
  - `dataIds`: Array of unique identifiers for the data.
  - `columnOrder`: State of the column order.

### `DragDropTableContext`

This context is responsible for managing drag-and-drop interactions at the table level, allowing columns or rows to be reorganized according to user preferences.

- **Parameters**:
  - `isColumn`: Boolean indicating if a column is being dragged.
  - `columnOrder`: State of the column order.
  - `setColumnOrder`: Function to update the column order.
  - `data`: Array of data being displayed.
  - `setData`: Function to update the data.

## Props

The component accepts the following properties for configuration:

### Data

- **`tableId: string`**: Unique identifier for the table.
- **`table: Table<TData>`**: Table instance created with `@tanstack/react-table`.
- **`columns: ColumnDef<TData, TData>[]`**: Array of column definitions.
- **`data: TData[]`**: Array of data to be displayed in the table.
- **`setData: React.Dispatch<React.SetStateAction<TData[]>>`**: Function to update the data.

### State

- **`isLoading?: boolean`**: Indicates if the data is loading.
- **`isError?: boolean`**: Indicates if there was an error loading the data.
- **`columnOrder: ColumnOrderState`**: State representing the order of columns.
- **`dataIds: UniqueIdentifier[]`**: Unique identifiers for the data.
- **`setColumnOrder: (value: ColumnOrderState) => void`**: Function to update the column order.

### Pagination

- **`pagination?: IPaginationOptions`**: Options for pagination.
  - **`pagination.showPagination: boolean`**: Indicates if pagination should be shown.
  - **`pagination.pageIndex?: number`**: Current page index.
  - **`pagination.pageSize?: number`**: Page size.
  - **`pagination.rowsInfo?: boolean`**: Displays additional row information.
  - **`pagination.hideRecordsSelector?: boolean`**: Hides the records selector.

### Others

- **`initialConfig?: Partial<ColumnDef<TData, unknown>>`**: Initial configuration for the columns.
- **`showFooter?: boolean`**: Shows the footer.
- **`renderSubComponent?: React.FC<SubComponentProps<TData>>`**: Function to render a subcomponent within rows.
- **`title?: string`**: Title of the table.
- **`headerContainer?: React.ReactNode`**: Custom header container.
- **`border?: boolean`**: Shows a border around the table.
- **`headerSticky?: boolean`**: Enables sticky behavior for the table header.

### Draggable

- **`draggable?: IDraggableOptions`**: Options to enable drag-and-drop functionality.
  - **`draggable.columns?: boolean`**: Enables column drag-and-drop.
  - **`draggable.rows?: boolean`**: Enables row drag-and-drop.

### Custom Styles

- **`sx?: IDataTableStyles`**: Custom styles for the table.
  - **`sx.container?: React.CSSProperties`**: Styles for the container.
  - **`sx.messageContainer?: React.CSSProperties`**: Styles for the message container.
  - **`sx.table?: React.CSSProperties`**: Styles for the table.
  - **`sx.thead?: React.CSSProperties`**: Styles for the table header.
  - **`sx.tbody?: React.CSSProperties`**: Styles for the table body.
  - **`sx.tfoot?: React.CSSProperties`**: Styles for the table footer.
  - **`sx.header?: React.CSSProperties`**: Styles for the table header.
  - **`sx.row?: React.CSSProperties`**: Styles for table rows.
  - **`sx.column?: React.CSSProperties`**: Styles for table columns.
  - **`sx.cell?: React.CSSProperties`**: Styles for table cells.

## Usage Example

```tsx
import React, { useState } from 'react';
import { useTable, ColumnDef } from '@tanstack/react-table';
import DataTableComponent from './DataTableComponent';

const columns = [
  /* your column definitions */
];
const data = [
  /* your data array */
];

function MyTable() {
  const table = useTable({ columns, data });
  const [dataState, setDataState] = useState(data);
  const [columnOrder, setColumnOrder] = useState([]);

  return <DataTableComponent tableId="my-table" table={table} data={dataState} columnOrder={columnOrder} setData={setDataState} setColumnOrder={setColumnOrder} isLoading={false} isError={false} pagination={{ showPagination: true, pageIndex: 0, pageSize: 10 }} showFooter={true} />;
}
```

## Adicional Libraries

The DataTableComponent uses the following libraries:

- `@tanstack/react-table`: Used for table state and logic management.
- `@dnd-kit/core`: Provides drag-and-drop functionality.
- `@membrane-mfe-app/ui`: Used for UI components like NoData and ThreeDots.

These libraries are essential for the functionality and appearance of the DataTableComponent. They provide the necessary tools for managing table data, enabling drag-and-drop interactions, and rendering UI components.

---

### back to [Datatable Library Overview](../../README.md)
