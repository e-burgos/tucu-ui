import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { ColorCard } from '../../components/cards/color-card';

describe('ColorCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ColorCard
        icon={<span>★</span>}
        title="Feature"
        description="A feature description"
        color="blue"
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays title and description', () => {
    const { getByText } = render(
      <ColorCard
        icon={<span>★</span>}
        title="Feature"
        description="A feature description"
        color="blue"
      />
    );
    expect(getByText('Feature')).toBeInTheDocument();
    expect(getByText('A feature description')).toBeInTheDocument();
  });
});
