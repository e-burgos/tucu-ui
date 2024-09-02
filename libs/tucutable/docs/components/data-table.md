# `DataTable` Documentation

`DataTable` is a React component that combines the functionality of the `useDataTable` hook and the `DataTableComponent` to provide an easy-to-use interface for rendering data tables. This component abstracts the complexity of setting up a data table with features like sorting, pagination, and optional subcomponents, making it the only component developers need to import and use to display tables.

## Table of Contents

- [`DataTable` Documentation](#datatable-documentation)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Parameters](#parameters)
  - [Props](#props)
    - [Required Props](#required-props)
    - [Optional Props](#optional-props)
  - [Return Value](#return-value)
  - [Usage Example](#usage-example)
  - [Dependencies](#dependencies)
    - [back to Datatable Library Overview](#back-to-datatable-library-overview)

## Overview

The `DataTable` component is designed to streamline the process of setting up and rendering data tables in a React application. It internally uses the `useDataTable` hook to manage the table's state (such as sorting, pagination, and column visibility) and renders the table using the `DataTableComponent`. This component allows developers to render a fully functional table by simply passing in the required props, without needing to manually configure the underlying hook or component.

## Parameters

The `DataTable` component requires the following parameters:

- **`tableId: string`**  
  A unique identifier for the table. This ID is used to manage and persist the state of the table across sessions.

- **`columns: ColumnDef<TData, TData>[]`**  
  An array of column definitions that describe the structure of the table's columns.

- **`data: TData[]`**  
  An array of data objects to be displayed in the table.

## Props

### Required Props

- **`tableId: string`**  
  The unique identifier for the table instance.

- **`columns: ColumnDef<TData, TData>[]`**  
  The definitions of the columns in the table. This array dictates how each column is rendered, including its name, sorting behavior, and any custom rendering logic.

- **`data: TData[]`**  
  The data to be displayed in the table. Each object in this array corresponds to a row in the table.

### Optional Props

The `DataTable` component also accepts any optional props defined in the `IOptionalDataTableProps` interface, which include:

- **`initialConfig?: Partial<ColumnDef<TData, unknown>>`**  
  Initial configuration for the columns, such as default sizes, resizing behavior, and visibility settings.

- **`renderSubComponent?: React.FC<SubComponentProps<TData>>`**  
  Function to render a subcomponent within expandable rows. This is useful for displaying additional details or nested data.

- **`showFooter?: boolean`**  
  Boolean flag to indicate whether the table's footer should be displayed.

- **`draggable?: IDraggableOptions`**  
  Configuration options to enable drag-and-drop functionality for rows and/or columns.

- **`sx?: IDataTableStyles`**  
  Custom styles for the table and its elements.

- **`setTableIntance?: (table: Table<TData>) => void`**  
  A callback function that receives the table instance created by the `useDataTable` hook. This can be useful for accessing the table's API directly.

## Return Value

The `DataTable` component returns a fully rendered table UI, including any additional features such as pagination, sorting, column pinning, and subcomponents if configured.

## Usage Example

```javascript
import React from 'react';
import DataTable from './components/DataTable';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  // Add more columns as needed
];

const data = [
  { name: 'John Doe', age: 28 },
  { name: 'Jane Smith', age: 34 },
  // Add more data as needed
];

function MyTableComponent() {
  return (
    <DataTable
      tableId="example-table"
      columns={columns}
      data={data}
      showFooter={true}
      // Additional optional props can be passed here
    />
  );
}

export default MyTableComponent;
```

In this example, the `DataTable` component is used to render a table with basic columns and data. The developer only needs to provide the `tableId`, `columns`, and `data` props to get a fully functional table with pagination, sorting, and other advanced features.

## Dependencies

The `DataTable` component relies on the following dependencies:

- **`@tanstack/react-table`**: Provides core functionality for managing table state, such as sorting, pagination, and column visibility.
- **`useDataTable`**: A custom hook used to generate the table instance and manage its state.
- **`DataTableComponent`**: The component responsible for rendering the table UI.

---

### back to [Datatable Library Overview](../../README.md)
