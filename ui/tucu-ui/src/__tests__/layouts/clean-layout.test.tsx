import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { CleanLayout } from '../../components/layouts/clean-layout';

describe('CleanLayout', () => {
  it('renders children', () => {
    render(<CleanLayout>Clean content</CleanLayout>);
    expect(screen.getByText('Clean content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CleanLayout className="custom-class">Content</CleanLayout>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has default flex column layout', () => {
    const { container } = render(<CleanLayout>Content</CleanLayout>);
    expect(container.firstChild).toHaveClass('flex', 'flex-col');
  });
});
