import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RevealContent } from '../../components/utils/reveal-content';

describe('RevealContent', () => {
  it('renders children content', () => {
    render(
      <RevealContent defaultHeight={100}>
        <p>Hidden content here</p>
      </RevealContent>
    );
    expect(screen.getByText('Hidden content here')).toBeInTheDocument();
  });

  it('renders show more button', () => {
    render(
      <RevealContent defaultHeight={50}>
        <div style={{ height: 200 }}>Tall content</div>
      </RevealContent>
    );
    // The button may show "Show More" or "Show Less" depending on content height
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
