import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { CollectionCard } from '../../components/blockchain/collection-card';

describe('CollectionCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <CollectionCard
          item={{
            name: 'Test Collection',
            slug: 'test',
            title: 'Test',
            cover_image: '/test.png',
            number_of_artwork: 10,
            user: { name: 'Artist', slug: 'artist' },
          }}
        />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
