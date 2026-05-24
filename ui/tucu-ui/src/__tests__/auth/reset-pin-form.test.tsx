import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { ResetPinForm } from '../../components/auth/reset-pin-form';

describe('ResetPinForm', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ResetPinForm onSubmit={vi.fn()} signInPath="/sign-in" />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
