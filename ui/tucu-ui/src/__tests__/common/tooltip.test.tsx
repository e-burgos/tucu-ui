import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Tooltip } from '../../components/common/tooltip';

describe('Tooltip', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the trigger element', () => {
    render(
      <Tooltip content="Info">
        <button>Click here</button>
      </Tooltip>
    );
    expect(screen.getByText('Click here')).toBeInTheDocument();
  });
});
