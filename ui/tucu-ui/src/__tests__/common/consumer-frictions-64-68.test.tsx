import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import React from 'react';
import { Button } from '../../components/buttons/button';
import { Badge } from '../../components/common/badge';
import { Input } from '../../components/inputs/input';
import { Tooltip } from '../../components/common/tooltip';

describe('Button shape square', () => {
  it.each(['large', 'medium', 'small', 'mini', 'tiny', 'xs'] as const)(
    'is equal width and height at %s with regular radius',
    (size) => {
      render(
        <Button shape="square" size={size}>
          x
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-shape', 'square');
      expect(button.className).toMatch(/\bw-\d+/);
      expect(button.className).toMatch(/\bh-\d+/);
      expect(button.className).toContain('rounded-md');
      expect(button.className).not.toContain('rounded-full');
      expect(button.className).not.toMatch(/\bpx-/);
    }
  );
});

describe('Badge size micro', () => {
  it('uses compact classes', () => {
    render(<Badge size="micro">new</Badge>);
    const badge = screen.getByText('new').closest('[data-tucu]') as HTMLElement;
    expect(badge.className).toContain('text-[10px]');
    expect(badge.className).toContain('h-auto');
    expect(badge.className).toContain('px-1.5');
  });
});

describe('Input suffix adornments', () => {
  it('renders end adornment without touching the value', () => {
    render(<Input aria-label="n" value="ab" onChange={() => undefined} endAdornment={<span>kg</span>} />);
    expect(screen.getByText('kg')).toBeInTheDocument();
    expect(screen.getByLabelText('n')).toHaveValue('ab');
  });

  it('shows the shortcut and hides it when a value is present', () => {
    const { container, rerender } = render(
      <Input aria-label="s" value="" onChange={() => undefined} shortcut="/" />
    );
    expect(container.querySelector('[data-tucu="input-shortcut"]')).toHaveTextContent('/');
    expect(screen.getByLabelText('s')).toHaveAttribute('aria-keyshortcuts', '/');
    expect(screen.getByLabelText('s').style.paddingInlineEnd).not.toBe('');
    rerender(<Input aria-label="s" value="a" onChange={() => undefined} shortcut="/" />);
    expect(container.querySelector('[data-tucu="input-shortcut"]')).toBeNull();
    rerender(
      <Input aria-label="s" value="a" onChange={() => undefined} shortcut="/" shortcutHideOnValue={false} />
    );
    expect(container.querySelector('[data-tucu="input-shortcut"]')).not.toBeNull();
  });
});

describe('Tooltip lazy', () => {
  it('keeps content in the DOM by default', () => {
    render(
      <Tooltip content="tip text">
        <button>t</button>
      </Tooltip>
    );
    expect(screen.getByText('t')).toHaveAttribute('aria-describedby');
    expect(document.body.textContent).toContain('tip text');
  });

  it('renders content only while open when lazy', () => {
    render(
      <Tooltip content="tip text" lazy leaveDelay={0}>
        <button>t</button>
      </Tooltip>
    );
    const trigger = screen.getByText('t');
    expect(document.body.textContent).not.toContain('tip text');
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip')).toHaveTextContent('tip text');
    expect(trigger.getAttribute('aria-describedby')).toBe(screen.getByRole('tooltip').id);
    fireEvent.mouseLeave(trigger);
    expect(document.body.textContent).not.toContain('tip text');
  });
});

describe('--color-body token isolation', () => {
  const css = resolve(__dirname, '../../assets/css');
  it('keeps --color-body out of @theme and defines page + bg-body', () => {
    const core = readFileSync(resolve(css, 'theme-core.css'), 'utf8');
    const themeBlock = core.slice(core.indexOf('@theme {'));
    expect(themeBlock).toContain('--color-page:');
    expect(themeBlock).not.toContain('--color-body:');
    const legacy = readFileSync(resolve(css, 'legacy-utilities.css'), 'utf8');
    expect(legacy).toContain('@utility bg-body');
    const base = readFileSync(resolve(css, 'base.css'), 'utf8');
    expect(base).toContain('--color-body: var(--color-page)');
  });
});
