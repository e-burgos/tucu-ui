import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { PanelCard } from '../../components/cards/panel-card';

describe('PanelCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <PanelCard title="Panel Title">
        <p>Panel content</p>
      </PanelCard>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays title', () => {
    const { getByText } = render(
      <PanelCard title="Panel Title">
        <p>Content</p>
      </PanelCard>
    );
    expect(getByText('Panel Title')).toBeInTheDocument();
  });
});
