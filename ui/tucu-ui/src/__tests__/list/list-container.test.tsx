import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { ListContainer } from '../../components/list/list-container';

describe('ListContainer', () => {
  const items = [
    { id: '1', label: 'Item 1', onClick: vi.fn() },
    { id: '2', label: 'Item 2', onClick: vi.fn() },
    { id: '3', label: 'Item 3', onClick: vi.fn() },
  ];

  it('renders without crashing', () => {
    const { container } = render(<ListContainer items={items} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with a label', () => {
    const { container } = render(
      <ListContainer items={items} label="Actions" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
