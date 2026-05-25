import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { Card } from '../../components/cards/card';

describe('Card', () => {
  it('renders without crashing', () => {
    const { container } = render(<Card title="Test Card" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Card>
        <span>Card content</span>
      </Card>
    );
    expect(getByText('Card content')).toBeInTheDocument();
  });
});
