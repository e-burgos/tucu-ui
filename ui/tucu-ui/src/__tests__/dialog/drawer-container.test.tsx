import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
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

  it('makes its children clickable inside the pointer-events-none drawer', async () => {
    const onClick = vi.fn();
    render(
      <DrawerContainer isOpen={true} setIsOpen={vi.fn()}>
        <button type="button" onClick={onClick}>
          Item
        </button>
      </DrawerContainer>
    );
    const button = await screen.findByRole('button', { name: 'Item' });
    const content = button.closest('[data-tucu="drawer-content"]');
    expect(content).toHaveClass('pointer-events-auto');
    expect(content?.parentElement).toHaveClass('pointer-events-none');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
