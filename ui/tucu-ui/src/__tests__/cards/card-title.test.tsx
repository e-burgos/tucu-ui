import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { CardTitle } from '../../components/cards/card-title';

describe('CardTitle', () => {
  it('renders without crashing', () => {
    const { container } = render(<CardTitle title="My Title" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays title text', () => {
    const { getByText } = render(<CardTitle title="My Title" />);
    expect(getByText('My Title')).toBeInTheDocument();
  });

  it('renders children', () => {
    const { getByText } = render(
      <CardTitle title="Title">
        <span>Children</span>
      </CardTitle>
    );
    expect(getByText('Children')).toBeInTheDocument();
  });
});
