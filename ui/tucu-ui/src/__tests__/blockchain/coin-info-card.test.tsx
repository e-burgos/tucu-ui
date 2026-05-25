import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { CoinInfoCard } from '../../components/blockchain/coin-info-card';

describe('CoinInfoCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <CoinInfoCard
        item={{ name: 'Bitcoin', logo: '/test.png', balance: '1.5' }}
        variant="small"
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
