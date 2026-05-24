import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { NFTGrid } from '../../components/blockchain/nft-grid';

describe('NFTGrid', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <NFTGrid
          author="Artist"
          authorImage="/avatar.png"
          image="/nft.png"
          name="Cool NFT"
          collection="Collection 1"
          price="0.5 ETH"
        />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
