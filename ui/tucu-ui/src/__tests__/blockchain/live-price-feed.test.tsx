import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { LivePriceFeed } from '../../components/blockchain/live-price-feed';

describe('LivePriceFeed', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <LivePriceFeed
        id="btc"
        name="Bitcoin"
        symbol="BTC"
        icon={<span>₿</span>}
        balance="1.5"
        usdBalance="$45,000"
        change="+5.2%"
        isChangePositive={true}
        prices={[
          { name: 1, value: 100 },
          { name: 2, value: 110 },
        ]}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
