import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { ForgetPasswordForm } from '../../components/auth/forget-password-form';

describe('ForgetPasswordForm', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ForgetPasswordForm onSubmit={vi.fn()} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
