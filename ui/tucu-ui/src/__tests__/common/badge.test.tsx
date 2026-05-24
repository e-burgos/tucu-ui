import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Badge } from '../../components/common/badge';

describe('Badge', () => {
  it('renders without crashing', () => {
    const { container } = render(<Badge>Active</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children text', () => {
    render(
      <Badge variant="solid" color="primary">
        Status
      </Badge>
    );
    expect(screen.getByText('Status')).toBeInTheDocument();
  });
});
