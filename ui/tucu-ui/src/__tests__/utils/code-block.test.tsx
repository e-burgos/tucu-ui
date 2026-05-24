import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CodeBlock } from '../../components/utils/code-block';

describe('CodeBlock', () => {
  it('renders code content', () => {
    render(<CodeBlock code="console.log('hello')" />);
    expect(screen.getByText("console.log('hello')")).toBeInTheDocument();
  });

  it('renders with a language prop', () => {
    render(<CodeBlock code="const x = 1;" language="javascript" />);
    expect(screen.getByText(/const/)).toBeInTheDocument();
  });

  it('renders copy button', () => {
    render(<CodeBlock code="test code" />);
    expect(screen.getByLabelText('Copy to clipboard')).toBeInTheDocument();
  });
});
