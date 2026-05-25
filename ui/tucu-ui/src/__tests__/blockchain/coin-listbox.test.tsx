import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import CoinListBox from '../../components/blockchain/coin-listbox';

const mockCoin = {
  icon: <span>BTC</span>,
  code: 'BTC',
  name: 'Bitcoin',
  price: 45000,
};

describe('CoinListBox', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <CoinListBox
        coins={[mockCoin]}
        selectedCoin={mockCoin}
        setSelectedCoin={vi.fn()}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
