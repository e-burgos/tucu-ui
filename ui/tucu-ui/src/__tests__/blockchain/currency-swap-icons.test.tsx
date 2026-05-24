import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { CurrencySwapIcons } from '../../components/blockchain/currency-swap-icons';

describe('CurrencySwapIcons', () => {
  it('renders without crashing', () => {
    const { container } = render(<CurrencySwapIcons from="BTC" to="ETH" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays coin pair text', () => {
    const { getByText } = render(<CurrencySwapIcons from="BTC" to="ETH" />);
    expect(getByText('BTC-ETH')).toBeInTheDocument();
  });
});
