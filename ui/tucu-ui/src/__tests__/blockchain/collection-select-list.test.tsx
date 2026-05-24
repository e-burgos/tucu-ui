import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { CollectionSelectList } from '../../components/blockchain/collection-select-list';

describe('CollectionSelectList', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <CollectionSelectList
        collectionList={[{ icon: '/test.png', name: 'Test', value: 'test' }]}
        onSelect={vi.fn()}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
