import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { TopupButton } from '../../components/buttons/topup-button';

describe('TopupButton', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <TopupButton label="Top Up" />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays label text', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TopupButton label="Top Up" />
      </MemoryRouter>
    );
    expect(getByText('Top Up')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <MemoryRouter>
        <TopupButton label="Top Up" onClick={handleClick} />
      </MemoryRouter>
    );
    fireEvent.click(getByText('Top Up'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
