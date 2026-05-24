import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { ListItem } from '../../components/list/list-Item';

describe('ListItem', () => {
  it('renders without crashing', () => {
    const { container } = render(<ListItem id="1" label="Edit" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the label text', () => {
    render(<ListItem id="2" label="Delete" />);
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders with an icon', () => {
    render(
      <ListItem
        id="3"
        label="Settings"
        icon={<span data-testid="icon">⚙</span>}
      />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
