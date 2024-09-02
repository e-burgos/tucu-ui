# `SubComponentDataTable` Documentation

`SubComponentDataTable` is a React component that serves as a wrapper demonstrating how to instantiate and manage a `DataTable` outside of its own context. This component illustrates the usage of `DataTable` props, showcasing how a table instance can be controlled externally while integrating advanced features such as pagination, subcomponents, and custom styling.

## Table of Contents

- [`SubComponentDataTable` Documentation](#subcomponentdatatable-documentation)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Component Structure](#component-structure)
  - [Props](#props)
    - [Inherited Props from `SubComponentProps`](#inherited-props-from-subcomponentprops)
    - [Example of `DataTable` Props Usage](#example-of-datatable-props-usage)
  - [Return Value](#return-value)
  - [Usage Example](#usage-example)
  - [Breakdown](#breakdown)
  - [Dependencies](#dependencies)
    - [back to Datatable Library Overview](#back-to-datatable-library-overview)

## Overview

The `SubComponentDataTable` component is designed to provide an example of how to use the `DataTable` component in a flexible and powerful way. It demonstrates how to:

1. **Externally Control the Table Instance**: The `DataTable` instance is managed outside of the component using the `setTableIntance` prop.
2. **Use `DataTable` Props**: The component showcases how to customize the table using various props, including pagination settings, subcomponents, and styling options.
3. **Reset Table State**: The component includes functionality to reset the table state, such as clearing filters and sorting, by using the `resetStoreData` hook from `useDataTableStore`.

## Component Structure

- **`Stack`**: A layout component used to vertically arrange the content within the component.
- **`Box`**: A container for grouping the header section of the component, including the title and reset button.
- **`Typography`**: Displays the title of the subcomponent, which is derived from the row data.
- **`Button`**: A button that, when clicked, resets the table filters and sorting.
- **`DataTable`**: The main data table component, instantiated with various props to demonstrate its flexibility and integration with the `SubComponentDataTable`.

## Props

### Inherited Props from `SubComponentProps`

- **`row: Row<TData>`**  
  The data for the specific row that the subcomponent is rendering. This prop is used to access the row's original data and to display a title.

### Example of `DataTable` Props Usage

- **`tableId: string`**  
  The unique identifier for the table instance (`'assets'` in this example).

- **`data: TData[]`**  
  The dataset to be displayed in the table (`assetsWithAccounts` in this example).

- **`columns: ColumnDef<TData, TData>[]`**  
  The column definitions for the table (`assetColumns` in this example).

- **`renderSubComponent: React.FC<SubComponentProps<TData>>`**  
  A function to render additional subcomponents within expandable rows (`SubComponent` in this example).

- **`setTableIntance: (table: Table<TData>) => void`**  
  A callback function that receives the table instance. This allows external control of the table, such as resetting filters or sorting.

- **`pagination: IPaginationOptions`**  
  Pagination settings, such as page size and visibility of the records selector.

- **`sx: IDataTableStyles`**  
  Custom styles for various parts of the table, including the container, rows, cells, and pagination. These styles are dynamically applied using the `useTableColors` hook.

## Return Value

The `SubComponentDataTable` component returns a fully functional data table wrapped in a layout that includes a title and a reset button. The table is configured with pagination, subcomponents, and custom styles, and is controlled externally through a callback function.

## Usage Example

```javascript
import React, { useState } from 'react';
import {
  Button,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import { Table } from '@tanstack/react-table';
import { SubComponentProps, TData } from '../../../common/types';
import DataTable from '../../../components/DataTable/DataTable';
import useDataTableStore from '../../../hooks/useDataTableStore';
import useTableColors from '../../../hooks/useTableColors';
import { assetsWithAccounts } from '../../mocks';
import { IAccountWithBalance } from '../../mocks/types';
import SubComponent from '../SubComponent';
import useAssetColumns from './useAssetColumns';

const SubComponentDataTable: React.FC<SubComponentProps<TData>> = ({ row }) => {
  const { colors } = useTableColors();
  const { resetStoreData } = useDataTableStore('assets');
  const { columns: assetColumns } = useAssetColumns();

  const [table, setTable] = useState<Table<TData>>();

  const rowData = row.original as IAccountWithBalance;

  return (
    <Stack
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
          padding: 5,
        }}
      >
        <Typography variant="h5">{rowData.name}</Typography>
        <Button
          onClick={() => {
            table.reset();
            resetStoreData();
          }}
        >
          Reset Filters
        </Button>
      </Box>
      <DataTable
        tableId={'assets'}
        data={assetsWithAccounts}
        columns={assetColumns}
        renderSubComponent={SubComponent}
        setTableIntance={setTable}
        pagination={{
          showPagination: true,
          pageSize: 5,
          hideRecordsSelector: true,
        }}
        sx={{
          container: {
            backgroundColor: colors.paperBg,
          },
          row: {
            backgroundColor: colors.paperBg,
          },
          cell: {
            backgroundColor: colors.paperBg,
          },
          pagination: {
            backgroundColor: colors.paperBg,
          },
        }}
      />
    </Stack>
  );
};

export default SubComponentDataTable;
```

## Breakdown

- **`resetStoreData`**: The `resetStoreData` function is used to clear the table's filters, sorting, and other states stored in the context. This demonstrates how to manage table state externally from within a component.
- **`setTableIntance`**: The table instance is captured using the `setTableIntance` prop, allowing the component to interact with the table, such as resetting it.
- **`DataTable`**: The `DataTable` component is configured with custom styles and pagination settings, and it includes a subcomponent (`SubComponent`) for expandable rows.

## Dependencies

The `SubComponentDataTable` component relies on the following dependencies:

- `@mui/material`: Provides UI components like `Button`, `Box`, `Stack`, and `Typography` for layout and styling.
- `@tanstack/react-table`: Used for the table instance and state management.
- `useDataTableStore`: Custom hook for managing table state with Zustand.
- `useTableColors`: Custom hook for accessing color themes.
- `DataTable`: The main data table component that is instantiated and controlled externally.
- `SubComponent`: A subcomponent used within the expandable rows of the table.
- `useAssetColumns`: Custom hook to define and manage the columns of the table.

---

### back to [Datatable Library Overview](../../README.md)
