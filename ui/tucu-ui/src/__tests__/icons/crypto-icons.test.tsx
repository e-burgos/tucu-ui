import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Bitcoin,
  Bnb,
  Cardano,
  Doge,
  Ethereum,
  EthereumDark,
  Flow,
  Tether,
  Usdc,
} from '../../components/icons';

describe('Crypto Icons', () => {
  const icons = [
    { name: 'Bitcoin', Component: Bitcoin },
    { name: 'Bnb', Component: Bnb },
    { name: 'Cardano', Component: Cardano },
    { name: 'Doge', Component: Doge },
    { name: 'Ethereum', Component: Ethereum },
    { name: 'EthereumDark', Component: EthereumDark },
    { name: 'Flow', Component: Flow },
    { name: 'Tether', Component: Tether },
    { name: 'Usdc', Component: Usdc },
  ];

  icons.forEach(({ name, Component }) => {
    it(`${name} renders without crashing`, () => {
      const { container } = render(<Component />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
