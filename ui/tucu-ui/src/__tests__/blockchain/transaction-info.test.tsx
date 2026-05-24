import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { TransactionInfo } from '../../components/blockchain/transaction-info';

describe('TransactionInfo', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <TransactionInfo label="Gas Fee" value="0.002 ETH" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays label and value', () => {
    const { getByText } = render(
      <TransactionInfo label="Gas Fee" value="0.002 ETH" />
    );
    expect(getByText('Gas Fee')).toBeInTheDocument();
    expect(getByText('0.002 ETH')).toBeInTheDocument();
  });
});
