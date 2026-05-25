import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { KeyValueRow } from '../../components/common/key-value-row';

describe('KeyValueRow', () => {
  it('renders without crashing', () => {
    const { container } = render(<KeyValueRow label="Name" value="John" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders label and value', () => {
    render(<KeyValueRow label="Status" value="Active" />);
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
