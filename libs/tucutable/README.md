# Datatable Library Overview and Utility

This library provides a comprehensive solution for creating, managing, and rendering advanced data tables in React applications. It offers a set of components, hooks, and contexts designed to simplify the implementation of data tables with features such as sorting, pagination, column visibility, pinning, and expandable rows. The library is built with flexibility and modularity in mind, allowing developers to easily integrate, customize, and extend table functionality.
This library was generated with [Nx](https://nx.dev).

## Key Features

1. **Advanced Table Management**:

   - **Sorting and Pagination**: Easily manage sorting and pagination through integrated hooks and components.
   - **Column Visibility and Pinning**: Dynamically show, hide, and pin columns based on user preferences.
   - **Expandable Rows**: Support for rendering subcomponents within expandable rows for additional details.

2. **Context-Driven State Management**:

   - **DataTableContext**: Provides a centralized way to manage and share table state across multiple components. This context ensures that all components within the context have access to the same table instance and state.

3. **Modular and Extensible**:

   - **DataTable Component**: A flexible component that integrates with `useDataTable` to handle all table operations internally.
   - **DataTableWithContext**: Allows components to share a table instance managed by `DataTableContext`, making it easy to build complex UIs with multiple components interacting with the same table.
   - **SubComponentDataTable**: Demonstrates how to instantiate and control a table externally, providing an example of how to extend and customize table behavior.

4. **Ease of Use**:
   - **Custom Hooks**: `useDataTable` and `useDataTableStore` simplify the creation and management of table instances, including persistent state management with Zustand.
   - **Reusable Components**: Components like `ColumnVisibilitySelector`, `ColumnPinSelector`, and `ResetFiltersButton` allow for easy interaction with table state, making it simple to build interactive and user-friendly data tables.

## Summary of Usage

To use this library effectively, follow these steps:

1. **Wrap Your Component with `DataTableProvider`**: This will create the context necessary for managing the table state.
2. **Use `DataTableWithContext`**: Inside your provider, use this component to render the table, accessing the shared state provided by the context.
3. **Integrate Control Components**: Add components like `ColumnVisibilitySelector` and `ResetFiltersButton` to allow users to interact with the table dynamically.
4. **Extend and Customize**: Use components like `SubComponentDataTable` to demonstrate how to instantiate and control the table outside of the typical context, showcasing the library's flexibility.

This library is ideal for building sophisticated data-driven interfaces where tables are central to the user experience, offering a powerful yet user-friendly way to manage table state and functionality.

## Library Documentation Summary

This summary provides an overview and links to the detailed documentation for each component, hook, and context in this library. Use the links below to navigate to the specific documentation files.

### Components

- **[DataTableComponent](./docs/components/data-table-component.md)**  
  A React component that renders a data table using `@tanstack/react-table` and `useDataTableStore` to manage table state and preferences.

- **[DataTable](./docs/components/data-table.md)**  
  A React component that simplifies rendering data tables with sorting, pagination, and more, by using the `useDataTable` hook internally.

- **[DataTableWithContext](./docs/components/data-table-with-context.md)**  
  A React component that integrates with `DataTableContext` to render a data table, allowing multiple components to share the same table instance.

### Hooks

- **[useDataTable](./docs/hooks/use-data-table.md)**  
  A custom hook that generates a table instance using `@tanstack/react-table` and stores table preferences and filters using Zustand.

- **[useDataTableStore](./docs/hooks/use-data-table.md)**  
  A custom hook created with Zustand to manage and persist table state, such as pagination, sorting, column visibility, and pinning.

### Contexts

- **[DataTableContext](./docs/context/data-table-context.md)**  
  A React context used to create a table instance and expose the necessary data and state to all components within the context, managed by `useDataTableProvider`.

### Examples

- **[DataTable Context Example](./docs/usage/context-example.md)**  
  An example page component that demonstrates how to use `DataTableWithContext` within the `DataTableProvider` context, including interactive controls for managing the table's state.

- **[DataTable Example](./docs/usage/datatable-example.md)**  
  A wrapper component that demonstrates how to instantiate and manage a `DataTable` externally, showcasing the use of `DataTable` props and the ability to reset table state.

## Running unit tests

Run `nx test datatable` to execute the unit tests via [Vitest](https://vitest.dev/).

## Other implemented features

If the table needs draggable rows, check these [changes](https://github.com/Lattice-Trade/membrane-mfe-app/pull/518).
