import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { BasicTable } from '../../components/table/basic-table';

describe('BasicTable', () => {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'email', label: 'Email' },
  ];

  const data = [
    { name: 'Alice', age: 30, email: 'alice@test.com' },
    { name: 'Bob', age: 25, email: 'bob@test.com' },
  ];

  it('renders without crashing', () => {
    const { container } = render(<BasicTable columns={columns} data={data} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  // Each body cell also carries the column label for the card layout, so match
  // the header cell by role rather than by text.
  it('renders column headers', () => {
    render(<BasicTable columns={columns} data={data} />);
    expect(
      screen.getByRole('columnheader', { name: 'Name' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Age' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Email' })
    ).toBeInTheDocument();
  });

  it('renders row data', () => {
    render(<BasicTable columns={columns} data={data} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('hides header when showHeader is false', () => {
    render(<BasicTable columns={columns} data={data} showHeader={false} />);
    expect(screen.queryAllByRole('columnheader')).toHaveLength(0);
  });

  it('renders empty table with no data', () => {
    const { container } = render(<BasicTable columns={columns} data={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  describe('mobile card layout', () => {
    it('is enabled at the md breakpoint by default', () => {
      const { container } = render(
        <BasicTable columns={columns} data={data} />
      );
      expect(
        container.querySelector('[data-tucu="table-scroll"]')
      ).toHaveAttribute('data-cards', 'md');
    });

    it('labels every body cell so cards are readable without a header', () => {
      const { container } = render(
        <BasicTable columns={columns} data={data} />
      );
      const labels = container.querySelectorAll('.basic-table-cell-label');
      // One label per cell: 3 columns x 2 rows.
      expect(labels).toHaveLength(columns.length * data.length);
      expect(Array.from(labels).map((el) => el.textContent)).toEqual([
        'Name',
        'Age',
        'Email',
        'Name',
        'Age',
        'Email',
      ]);
    });

    it('honours a custom cardBreakpoint', () => {
      const { container } = render(
        <BasicTable columns={columns} data={data} cardBreakpoint="lg" />
      );
      expect(
        container.querySelector('[data-tucu="table-scroll"]')
      ).toHaveAttribute('data-cards', 'lg');
    });

    it('can be turned off with mobileCards={false}', () => {
      const { container } = render(
        <BasicTable columns={columns} data={data} mobileCards={false} />
      );
      expect(
        container.querySelector('[data-tucu="table-scroll"]')
      ).not.toHaveAttribute('data-cards');
      expect(
        container.querySelectorAll('.basic-table-cell-label')
      ).toHaveLength(0);
    });

    it('keeps each cell value in the DOM exactly once', () => {
      render(<BasicTable columns={columns} data={data} />);
      // Would throw if the card layout duplicated the row markup.
      expect(screen.getByText('alice@test.com')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('applies cardClassName to every row', () => {
      const { container } = render(
        <BasicTable columns={columns} data={data} cardClassName="shadow-md" />
      );
      expect(container.querySelectorAll('tr.shadow-md')).toHaveLength(
        data.length
      );
    });
  });
});
