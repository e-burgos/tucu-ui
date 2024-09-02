# `DataTableWithContext` Documentation

`DataTableWithContext` is a React component designed to render a data table by leveraging the `useDataTableProvider` hook. This component must be used within a `DataTableContext` to access the table instance and state managed by the context. It simplifies the integration of data tables into your application by allowing different components to share the same table instance.

## Table of Contents

- [`DataTableWithContext` Documentation](#datatablewithcontext-documentation)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Parameters](#parameters)
  - [Props](#props)
    - [Optional Props](#optional-props)
  - [Return Value](#return-value)
  - [Usage Example](#usage-example)
  - [Dependencies](#dependencies)
    - [back to Datatable Library Overview](#back-to-datatable-library-overview)

## Overview

`DataTableWithContext` is used to render a data table within the `DataTableContext` provided by `DataTableProvider`. This component automatically accesses the table instance and relevant state (such as data, column order, sorting, etc.) managed by the context. It is designed to work seamlessly with the `useDataTableProvider` hook, making it easy to integrate tables into your application without manually managing table state.

This component is ideal for scenarios where multiple components need to interact with the same table instance, allowing for a modular and scalable approach to table rendering and state management.

## Parameters

`DataTableWithContext` primarily uses the parameters provided by the `useDataTableProvider` hook through the `DataTableContext`. It also accepts optional props that can be passed to customize the table rendering.

- **`tableId?: string`**  
  (Optional) A unique identifier for the table. If not provided, the component uses the `tableId` from the context.

## Props

### Optional Props

`DataTableWithContext` extends the `IOptionalDataTableProps<TData>` interface, which includes the following optional properties:

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

## Return Value

The `DataTableWithContext` component returns a fully rendered table UI, leveraging the table instance and state managed by the `DataTableContext`. The component is flexible, allowing developers to customize the table's behavior and appearance through the optional props.

## Usage Example

```javascript
import React from 'react';
import { DataTableProvider } from './contexts/DataTableContext';
import DataTableWithContext from './components/DataTableWithContext';
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

function App() {
  return (
    <DataTableProvider
      tableId="example-table"
      defaultData={data}
      defaultColumns={columns}
    >
      <DataTableWithContext showFooter={true} />
    </DataTableProvider>
  );
}

export default App;
```

In this example, `DataTableWithContext` is used within a `DataTableProvider` to render a data table. The `DataTableWithContext` component automatically accesses the necessary state and table instance from the context, allowing for a clean and modular table setup.

## Dependencies

The `DataTableWithContext` component relies on the following dependencies:

- `@tanstack/react-table`: Provides core functionality for managing table state, such as sorting, pagination, and column visibility.
- `useDataTableProvider`: A custom hook used to access the table instance and state from the `DataTableContext`.
- `DataTableComponent`: The component responsible for rendering the table UI.
- `DataTableProvider`: The context provider that manages the table state and instance.

---

### back to [Datatable Library Overview](../../README.md)
