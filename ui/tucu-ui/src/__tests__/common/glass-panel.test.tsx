import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { GlassPanel } from '../../components/common/glass-panel';

describe('GlassPanel', () => {
  it('renders a div with default material, radius and elevation', () => {
    render(<GlassPanel data-testid="p">content</GlassPanel>);
    const el = screen.getByTestId('p');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveAttribute('data-tucu', 'glass-panel');
    expect(el).toHaveAttribute('data-material', 'regular');
    expect(el).toHaveAttribute('data-radius', 'card');
    expect(el).toHaveAttribute('data-elevation', 'card');
    expect(el).not.toHaveAttribute('data-condense');
  });

  it('reflects props, polymorphic tag and merges className', () => {
    render(
      <GlassPanel
        as="section"
        material="thick"
        radius="panel"
        elevation="float"
        condense
        className="extra"
        aria-label="x"
      >
        a
      </GlassPanel>
    );
    const el = screen.getByLabelText('x');
    expect(el.tagName).toBe('SECTION');
    expect(el).toHaveAttribute('data-material', 'thick');
    expect(el).toHaveAttribute('data-radius', 'panel');
    expect(el).toHaveAttribute('data-elevation', 'float');
    expect(el).toHaveAttribute('data-condense', 'true');
    expect(el).toHaveClass('extra');
  });

  it('ships token-driven styles with a preset radius fallback and dark overrides', () => {
    const css = readFileSync(
      resolve(__dirname, '../../assets/css/tokens/surfaces.css'),
      'utf8'
    );
    expect(css).toMatch(
      /--tucu-glass-regular-bg,\s*var\(--tucu-glass-regular-bg-default\)/
    );
    expect(css).toMatch(/--tucu-radius-card,\s*var\(--tucu-radius,/);
    expect(css).toContain('html.dark');
  });
});
