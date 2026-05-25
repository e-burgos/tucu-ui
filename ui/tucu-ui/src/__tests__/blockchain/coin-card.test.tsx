import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { CoinCard } from '../../components/blockchain/coin-card';

describe('CoinCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <CoinCard
        id="btc"
        name="Bitcoin"
        symbol="BTC"
        logo="/test.png"
        balance="1.5"
        usdBalance="$45,000"
        change="+5.2%"
        isChangePositive={true}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays coin name', () => {
    const { getByText } = render(
      <CoinCard
        id="btc"
        name="Bitcoin"
        symbol="BTC"
        logo="/test.png"
        balance="1.5"
        usdBalance="$45,000"
        change="+5.2%"
        isChangePositive={true}
      />
    );
    expect(getByText('Bitcoin')).toBeInTheDocument();
  });
});
