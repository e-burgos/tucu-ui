import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Collapse } from '../../components/common/collapse';

describe('Collapse', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Collapse label="Section Title">
        <p>Content here</p>
      </Collapse>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders label text', () => {
    render(
      <Collapse label="My Section">
        <p>Inner content</p>
      </Collapse>
    );
    expect(screen.getByText('My Section')).toBeInTheDocument();
  });
});
