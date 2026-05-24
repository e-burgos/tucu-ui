import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { InfoCard } from '../../components/cards/info-card';

describe('InfoCard', () => {
  it('renders without crashing', () => {
    const { container } = render(<InfoCard title="Statistics" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with columns', () => {
    const { getByText } = render(
      <InfoCard
        title="Stats"
        columns={[
          {
            key: 'col1',
            label: 'General',
            items: [{ label: 'Total', value: '100' }],
          },
        ]}
      />
    );
    expect(getByText('Stats')).toBeInTheDocument();
  });

  it('renders children', () => {
    const { getByText } = render(
      <InfoCard>
        <span>Custom content</span>
      </InfoCard>
    );
    expect(getByText('Custom content')).toBeInTheDocument();
  });
});
