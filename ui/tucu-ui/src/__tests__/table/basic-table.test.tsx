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

  it('renders column headers', () => {
    render(<BasicTable columns={columns} data={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders row data', () => {
    render(<BasicTable columns={columns} data={data} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('hides header when showHeader is false', () => {
    render(<BasicTable columns={columns} data={data} showHeader={false} />);
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
  });

  it('renders empty table with no data', () => {
    const { container } = render(<BasicTable columns={columns} data={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
