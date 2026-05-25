import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { SignInForm } from '../../components/auth/sign-in-form';

describe('SignInForm', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <SignInForm onSubmit={vi.fn()} forgetPasswordPath="/forgot-password" />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
