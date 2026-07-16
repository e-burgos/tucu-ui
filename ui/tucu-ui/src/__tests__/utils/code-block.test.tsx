import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CodeBlock } from '../../components/utils/code-block';

// prismjs's per-language files rely on a bare `Prism` global that only
// resolves correctly in a real browser bundle (verified separately) — in
// Vitest, these files load via Node's own CJS loader, outside jsdom's
// simulated global scope, so they're mocked here instead.
vi.mock('prismjs', () => ({
  languages: { javascript: {} },
  highlight: (code: string) => code,
}));
vi.mock('prismjs/components/prism-clike', () => ({}));
vi.mock('prismjs/components/prism-javascript', () => ({}));

describe('CodeBlock', () => {
  it('renders code content', async () => {
    render(<CodeBlock code="console.log('hello')" />);
    expect(
      await screen.findByText("console.log('hello')")
    ).toBeInTheDocument();
  });

  it('renders with a language prop', async () => {
    render(<CodeBlock code="const x = 1;" language="javascript" />);
    expect(await screen.findByText(/const/)).toBeInTheDocument();
  });

  it('renders copy button', async () => {
    render(<CodeBlock code="test code" />);
    expect(screen.getByLabelText('Copy to clipboard')).toBeInTheDocument();
    await screen.findByText('test code');
  });
});
