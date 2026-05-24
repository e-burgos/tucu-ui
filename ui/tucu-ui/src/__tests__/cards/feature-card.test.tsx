import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { FeatureCard } from '../../components/cards/feature-card';

describe('FeatureCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <FeatureCard
        icon={<span>⚡</span>}
        title="Fast"
        description="Lightning fast performance"
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays title and description', () => {
    const { getByText } = render(
      <FeatureCard
        icon={<span>⚡</span>}
        title="Fast"
        description="Lightning fast performance"
      />
    );
    expect(getByText('Fast')).toBeInTheDocument();
    expect(getByText('Lightning fast performance')).toBeInTheDocument();
  });
});
