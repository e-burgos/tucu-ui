import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import Avatar from '../../components/common/avatar';

describe('Avatar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Avatar image="https://example.com/avatar.jpg" alt="User avatar" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
