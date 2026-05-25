import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { CardContainer } from '../../components/cards/card-container';

describe('CardContainer', () => {
  it('renders without crashing', () => {
    const { container } = render(<CardContainer>Content</CardContainer>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const { getByText } = render(
      <CardContainer>
        <span>Inner content</span>
      </CardContainer>
    );
    expect(getByText('Inner content')).toBeInTheDocument();
  });
});
