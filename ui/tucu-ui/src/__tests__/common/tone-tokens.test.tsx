import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import React from 'react';

import { Alert } from '../../components/notifications/alert';
import { Tooltip } from '../../components/common/tooltip';
import { Badge } from '../../components/common/badge';
import { ConfirmDialog } from '../../components/dialog/confirm-dialog';
import { ColorCard } from '../../components/cards/color-card';

const tonesCss = readFileSync(
  resolve(__dirname, '../../assets/css/tokens/tones.css'),
  'utf8'
);

const cardColors = [
  'blue',
  'indigo',
  'cyan',
  'purple',
  'emerald',
  'orange',
  'green',
  'red',
  'pink',
  'amber',
  'teal',
  'violet',
  'rose',
  'sky',
] as const;

describe('Alert tone tokens', () => {
  it.each(['error', 'warning', 'success', 'info'] as const)(
    'emits data-alert-tone and no dark: utilities for %s',
    (variant) => {
      render(
        <Alert variant={variant} className="consumer-x">
          msg
        </Alert>
      );
      const el = screen.getByRole('alert');
      expect(el).toHaveAttribute('data-tucu', 'alert');
      expect(el).toHaveAttribute('data-alert-tone', variant);
      expect(el.className).not.toContain('dark:');
      expect(el.className).not.toMatch(/\b(bg|text)-(red|yellow|green|blue)-/);
      expect(el.className).toContain('consumer-x');
    }
  );

  it('omits data-alert-tone when an appearance is set', () => {
    render(<Alert variant="error" appearance="soft">msg</Alert>);
    expect(screen.getByRole('alert')).not.toHaveAttribute('data-alert-tone');
  });
});

describe('Tooltip tone tokens', () => {
  it.each(['dark', 'light'] as const)(
    'color %s emits attributes and no dark: utilities',
    (color) => {
      render(
        <Tooltip content="Tip" color={color} arrow contentClassName="consumer-x">
          <button>trigger</button>
        </Tooltip>
      );
      const bubble = screen.getByRole('tooltip', { hidden: true });
      expect(bubble).toHaveAttribute('data-color', color);
      expect(bubble.className).not.toContain('dark:');
      expect(bubble.className).not.toMatch(/\b(bg|text)-(gray|white)/);
      expect(bubble.className).toContain('consumer-x');
    }
  );
});

describe('Badge light-dark tone tokens', () => {
  it.each(['ghost', 'outline', 'solid'] as const)(
    'legacy light-dark %s has no dark: utilities',
    (variant) => {
      const { container } = render(
        <Badge color="light-dark" variant={variant} className="consumer-x">
          b
        </Badge>
      );
      const el = container.firstElementChild as HTMLElement;
      expect(el).toHaveAttribute('data-color', 'light-dark');
      expect(el.className).not.toContain('dark:');
      expect(el.className).toContain('consumer-x');
    }
  );

  it('does not tag toned light-dark badges', () => {
    const { container } = render(
      <Badge color="light-dark" variant="soft">
        b
      </Badge>
    );
    expect(container.firstElementChild).not.toHaveAttribute('data-color');
  });
});

describe('ConfirmDialog tone tokens', () => {
  it.each(['danger', 'warning', 'info', 'success'] as const)(
    'icon for %s has data-tone and no color utilities',
    (tone) => {
      render(
        <ConfirmDialog
          isOpen
          tone={tone}
          title="t"
          className="consumer-x"
          onConfirm={() => undefined}
          onCancel={() => undefined}
        />
      );
      const icon = document.querySelector(
        '[data-tucu="confirm-dialog-icon"]'
      ) as HTMLElement;
      expect(icon).toHaveAttribute('data-tone', tone);
      expect(icon.className).not.toContain('dark:');
      expect(icon.className).not.toMatch(/\b(bg|text)-/);
    }
  );
});

describe('ColorCard tone tokens', () => {
  it.each(cardColors)('%s preset uses data attributes only', (color) => {
    const { container } = render(
      <ColorCard
        icon={<span />}
        title="T"
        description="D"
        color={color}
        className="consumer-x"
      />
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute('data-tucu', 'color-card');
    expect(el).toHaveAttribute('data-color', color);
    expect(el.className).not.toContain('dark:');
    expect(el.className).not.toMatch(/\b(from|to|bg-linear)-/);
    expect(el.className).toContain('consumer-x');
  });

  it('keeps colorClassName as fallback without data-color', () => {
    const { container } = render(
      <ColorCard
        icon={<span />}
        title="T"
        description="D"
        colorClassName="bg-black text-white"
      />
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el).not.toHaveAttribute('data-color');
    expect(el.className).toContain('bg-black');
  });
});

describe('tones.css', () => {
  const [, afterBase] = tonesCss.split('@layer base');
  const [baseLayer, componentsLayer] = afterBase.split('@layer components');
  const [lightBlock, darkBlock] = baseLayer.split('html.dark,');

  const usedTokens = new Set(
    [...componentsLayer.matchAll(/var\((--tucu-[a-z0-9-]+),/g)].map((m) => m[1])
  );

  it('uses tokens', () => {
    expect(usedTokens.size).toBeGreaterThan(50);
  });

  it.each([...usedTokens])('%s has a default in both modes', (token) => {
    expect(lightBlock).toContain(`${token}-default:`);
    expect(darkBlock).toContain(`${token}-default:`);
  });

  it('declares no dark: variants', () => {
    expect(tonesCss).not.toContain('dark:');
  });
});
