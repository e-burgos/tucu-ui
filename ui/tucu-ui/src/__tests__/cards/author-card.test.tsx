import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { AuthorCard } from '../../components/cards/author-card';

describe('AuthorCard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <AuthorCard image="/avatar.png" name="John Doe" authorRole="Developer" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('displays author name', () => {
    const { getByText } = render(
      <AuthorCard image="/avatar.png" name="John Doe" authorRole="Developer" />
    );
    expect(getByText('John Doe')).toBeInTheDocument();
  });
});
