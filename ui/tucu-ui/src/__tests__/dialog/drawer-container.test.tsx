import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { DrawerContainer } from '../../components/dialog/drawer-container';

describe('DrawerContainer', () => {
  it('renders without crashing when open', () => {
    const { baseElement } = render(
      <DrawerContainer isOpen={true} setIsOpen={vi.fn()}>
        <p>Container content</p>
      </DrawerContainer>
    );
    expect(baseElement).toBeInTheDocument();
  });
});
