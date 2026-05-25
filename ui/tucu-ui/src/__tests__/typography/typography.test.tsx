import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Typography } from '../../components/typography/index';

describe('Typography', () => {
  it('renders children text', () => {
    render(<Typography>Hello World</Typography>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders as a paragraph by default', () => {
    render(<Typography>Default tag</Typography>);
    const el = screen.getByText('Default tag');
    expect(el.tagName).toBe('P');
  });

  it('renders with h1 tag', () => {
    render(<Typography tag="h1">Heading</Typography>);
    const el = screen.getByText('Heading');
    expect(el.tagName).toBe('H1');
  });

  it('renders with span tag', () => {
    render(<Typography tag="span">Inline text</Typography>);
    const el = screen.getByText('Inline text');
    expect(el.tagName).toBe('SPAN');
  });

  it('renders with code tag', () => {
    render(<Typography tag="code">const x = 1;</Typography>);
    const el = screen.getByText('const x = 1;');
    expect(el.tagName).toBe('CODE');
  });

  it('applies custom className', () => {
    render(<Typography className="custom-class">Styled</Typography>);
    const el = screen.getByText('Styled');
    expect(el.className).toContain('custom-class');
  });
});
