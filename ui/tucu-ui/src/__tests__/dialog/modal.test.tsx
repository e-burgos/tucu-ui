import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Modal } from '../../components/dialog/modal';

describe('Modal', () => {
  it('renders without crashing when open', () => {
    const { baseElement } = render(
      <Modal isOpen={true} setIsOpen={vi.fn()}>
        <p>Modal content</p>
      </Modal>
    );
    expect(baseElement).toBeInTheDocument();
  });

  it('renders children when open', () => {
    render(
      <Modal isOpen={true} setIsOpen={vi.fn()}>
        <p>Hello Modal</p>
      </Modal>
    );
    expect(screen.getByText('Hello Modal')).toBeInTheDocument();
  });
});
