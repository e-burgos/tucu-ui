import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { PanelActionCard } from '../../components/cards/panel-action-card';

describe('PanelActionCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <PanelActionCard title="Action Panel">
        <p>Content</p>
      </PanelActionCard>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays title', () => {
    const { getByText } = render(
      <PanelActionCard title="Action Panel">
        <p>Content</p>
      </PanelActionCard>
    );
    expect(getByText('Action Panel')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    const { getByText } = render(
      <PanelActionCard
        title="Panel"
        actions={[{ label: 'Save', onClick: vi.fn() }]}
      >
        <p>Content</p>
      </PanelActionCard>
    );
    expect(getByText('Save')).toBeInTheDocument();
  });
});
