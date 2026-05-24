import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { SignUpForm } from '../../components/auth/sign-up-form';

describe('SignUpForm', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <SignUpForm onSubmit={vi.fn()} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
