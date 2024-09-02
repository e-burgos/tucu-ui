# `DataTablePage` Documentation

`DataTablePage` is a React component that demonstrates the usage of `DataTableContext` to manage the state of a data table, along with the integration of `DataTableWithContext` for rendering the table. This page component brings together various child components that interact with the table's state, providing a comprehensive example of how to use context to manage and render complex data tables with advanced features like sorting, column visibility, and subcomponents.

## Table of Contents

- [`DataTablePage` Documentation](#datatablepage-documentation)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Component Structure](#component-structure)
  - [Usage of Child Components](#usage-of-child-components)
    - [1. **ColumnVisibilitySelector**](#1-columnvisibilityselector)
    - [2. **ColumnPinSelector**](#2-columnpinselector)
    - [3. **ColumnSortSelector**](#3-columnsortselector)
    - [4. **ResetFiltersButton**](#4-resetfiltersbutton)
    - [5. **SubComponentDataTable**](#5-subcomponentdatatable)
  - [Props](#props)
    - [Key Features](#key-features)
  - [Return Value](#return-value)
  - [Usage Example](#usage-example)
  - [Breakdown](#breakdown)
  - [Dependencies](#dependencies)
    - [back to Datatable Library Overview](#back-to-datatable-library-overview)

## Overview

`DataTablePage` serves as a full-featured example of how to set up and use a data table with context in a React application. It wraps the `DataTableWithContext` component within a `DataTableProvider` to manage the table's state, and includes several child components that allow the user to interact with the table by changing column visibility, pinning, sorting, and resetting filters. The table also supports expandable rows via a subcomponent.

## Component Structure

- **`DataTableProvider`**: Wraps the entire `DataTablePage` content to provide table state management via context.
- **`Stack`**: A layout component that arranges its children in a vertical stack, used to structure the content of the page.
- **`Typography`**: Displays the title of the page.
- **`Box`**: A flexible container used to group and style related UI elements.
- **`DataTableWithContext`**: Renders the data table using the context provided by `DataTableProvider`, with support for sorting, pagination, and subcomponents.

## Usage of Child Components

### 1. **ColumnVisibilitySelector**

- A component that allows the user to toggle the visibility of table columns.

### 2. **ColumnPinSelector**

- A component that enables the user to pin columns to the left or right side of the table.

### 3. **ColumnSortSelector**

- A component that provides sorting controls for the table columns.

### 4. **ResetFiltersButton**

- A button that resets all column filters and sorts to their default state.

### 5. **SubComponentDataTable**

- A component that renders additional details within expandable rows of the table.

## Props

`DataTablePage` does not accept any external props. All state and data are managed internally within the context provided by `DataTableProvider`.

### Key Features

- **Context-Based State Management**: `DataTablePage` leverages the `DataTableContext` to manage the state of the table, such as data, pagination, sorting, and column visibility.
- **Interactive Controls**: The page includes various controls (e.g., sorting, visibility toggles) that allow the user to interact with the table dynamically.
- **Expandable Rows**: The table supports expandable rows through the `renderSubComponent` prop in `DataTableWithContext`.

## Return Value

The `DataTablePage` component returns a fully interactive page with a data table, various controls for managing table state, and expandable rows. It provides a comprehensive example of how to build a data table with advanced features using context.

## Usage Example

```javascript
import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import DataTableWithContext from '../components/DataTable/DataTableWithContext';
import { DataTableProvider } from '../context/DataTableContext';
import ColumnPinSelector from './components/ColumnPinSelector';
import ColumnSortSelector from './components/ColumnSortSelector';
import ColumnVisibilitySelector from './components/ColumnVisibilitySelector';
import ResetFiltersButton from './components/ResetFiltersButton';
import SubComponentDataTable from './components/SubComponentDataTable';
import { accountsWithBalanceData } from './mocks';
import useAccountColumns from './useAccountColumns';

const DataTablePage = () => {
  const { columns } = useAccountColumns();

  return (
    <DataTableProvider tableId={'accounts'} defaultData={accountsWithBalanceData} defaultColumns={columns} isSubComponent={true}>
      <Stack sx={{ width: '100%', padding: '100px' }}>
        <Typography variant="h1">DataTable Example</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '200px',
            height: '100px',
            width: '100%',
            border: '1px solid white',
            borderRadius: '5px',
            marginBottom: '10px',
            margin: '20px 0',
            padding: '20px',
          }}
        >
          <ColumnVisibilitySelector />
          <ColumnPinSelector />
          <ColumnSortSelector />
          <ResetFiltersButton />
        </Box>
        <DataTableWithContext
          headerSticky
          title="Accounts"
          renderSubComponent={(row) => <SubComponentDataTable {...row} />}
          pagination={{
            showPagination: true,
            pageSize: 10,
            pageIndex: 0,
          }}
        />
        <Box sx={{ height: '1000px' }} />
      </Stack>
    </DataTableProvider>
  );
};

export default DataTablePage;
```

## Breakdown

- `DataTableProvider`: Initializes the table state using `tableId`, `defaultData`, and `defaultColumns`, making the state accessible to all child components.
- `Stack` and `Typography`: Organize and display the page content, including the title.
- `Control Components`: `ColumnVisibilitySelector`, `ColumnPinSelector`, `ColumnSortSelector`, and `ResetFiltersButton` allow the user to interact with the table by modifying its columns' visibility, order, and sorting, and by resetting filters.
- `DataTableWithContext`: Renders the table with the current state provided by the context. It includes features such as sticky headers, pagination, and expandable rows with subcomponents.

## Dependencies

The `DataTablePage` component relies on the following dependencies:

- `@mui/material`: Provides UI components like `Box`, `Stack`, and `Typography` for layout and styling.
- `DataTableContext`: The context used to manage and share the table state across the page.
- `DataTableWithContext`: The component responsible for rendering the table with the context-provided state.
- Control Components: Components like `ColumnVisibilitySelector` and `ColumnSortSelector` are used to interact with the table's state.

---

### back to [Datatable Library Overview](../../README.md)
