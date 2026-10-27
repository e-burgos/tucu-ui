import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { Tooltip } from '../../components/common/tooltip';
import { Skeleton } from '../../components/common/skeleton';
import { Card } from '../../components/cards/card';
import { BasicTable } from '../../components/table/basic-table';

describe('Tooltip tokens', () => {
  it('uses tokens by default and exposes data attributes', () => {
    render(
      <Tooltip content="Tip" size="sm">
        <button>trigger</button>
      </Tooltip>
    );
    const bubble = screen.getByRole('tooltip', { hidden: true });
    expect(bubble).toHaveAttribute('data-tucu', 'tooltip');
    expect(bubble).toHaveAttribute('data-size', 'sm');
    expect(bubble).toHaveAttribute('data-color', 'auto');
    expect(bubble.className).toContain(
      'var(--tucu-tooltip-bg,var(--tucu-tooltip-bg-default))'
    );
    expect(bubble.className).toContain(
      'var(--tucu-tooltip-fg,var(--tucu-tooltip-fg-default))'
    );
    expect(bubble.className).toContain(
      'var(--tucu-tooltip-border,var(--tucu-tooltip-border-default))'
    );
  });

  it('keeps color presets and lets consumer classes win', () => {
    render(
      <Tooltip content="Tip" color="success" contentClassName="bg-red-500">
        <button>trigger</button>
      </Tooltip>
    );
    const bubble = screen.getByRole('tooltip', { hidden: true });
    expect(bubble).toHaveAttribute('data-color', 'success');
    expect(bubble.className).toContain('bg-red-500');
    expect(bubble.className).not.toContain('bg-green-700');
  });

  it('lets className override the token background', () => {
    render(
      <Tooltip content="Tip" className="bg-red-500">
        <button>trigger</button>
      </Tooltip>
    );
    const bubble = screen.getByRole('tooltip', { hidden: true });
    expect(bubble.className).toContain('bg-red-500');
    expect(bubble.className).not.toContain('--tucu-tooltip-bg');
  });
});

describe('Skeleton tokens', () => {
  it('uses the skeleton token, data attribute and merges className', () => {
    const { container } = render(
      <Skeleton className="bg-red-500" data-testid="sk" />
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute('data-tucu', 'skeleton');
    expect(el.className).toContain('bg-red-500');
    expect(el.className).not.toContain('--tucu-skeleton-bg');
  });

  it('references the background token by default', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain(
      'var(--tucu-skeleton-bg,var(--tucu-skeleton-bg-default))'
    );
  });
});

describe('Card density and layout', () => {
  it('is a flex column with a flex-1 body and default padding', () => {
    render(
      <Card data-testid="card" aria-label="demo" footer={<span>f</span>}>
        <span>body</span>
      </Card>
    );
    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('data-tucu', 'card');
    expect(card).toHaveAttribute('aria-label', 'demo');
    expect(card.className).toContain('flex-col');
    const body = card.querySelector('[data-tucu="card-body"]') as HTMLElement;
    expect(body.className).toContain('flex-1');
    expect(body.className).toContain('p-4');
  });

  it.each([
    ['compact', 'p-3'],
    ['comfortable', 'p-6'],
  ] as const)('applies %s density', (density, padding) => {
    render(
      <Card data-testid="card" density={density} bodyClassName="custom-body">
        <span>body</span>
      </Card>
    );
    const body = screen
      .getByTestId('card')
      .querySelector('[data-tucu="card-body"]') as HTMLElement;
    expect(body.className).toContain(padding);
    expect(body.className).toContain('custom-body');
  });

  it('className overrides background and radius', () => {
    render(
      <Card data-testid="card" className="bg-red-500 rounded-none">
        x
      </Card>
    );
    const card = screen.getByTestId('card');
    expect(card.className).toContain('bg-red-500');
    expect(card.className).not.toContain('bg-light-dark');
    expect(card.className).toContain('rounded-none');
    expect(card.className).not.toContain('rounded-xl');
  });
});

describe('BasicTable tokens, density and dividers', () => {
  const columns = [
    { key: 'a', label: 'A' },
    { key: 'b', label: 'B' },
  ];
  const data = [{ a: '1', b: '2' }];

  it('forwards rest props to the root', () => {
    render(
      <BasicTable
        columns={columns}
        data={data}
        data-testid="tbl"
        aria-label="things"
      />
    );
    expect(screen.getByTestId('tbl')).toHaveAttribute('aria-label', 'things');
  });

  it('uses table tokens for header and cells', () => {
    const { container } = render(<BasicTable columns={columns} data={data} />);
    expect(container.querySelector('thead')?.className).toContain(
      '--tucu-table-header-bg'
    );
    expect(
      container.querySelector('[data-tucu="table-header-cell"]')?.className
    ).toContain('--tucu-table-header-fg');
    expect(
      container.querySelector('[data-tucu="table-cell"]')?.className
    ).toContain('--tucu-table-cell-fg');
  });

  it('applies snug density between compact and default', () => {
    const { container } = render(
      <BasicTable columns={columns} data={data} density="snug" />
    );
    const cell = container.querySelector('[data-tucu="table-cell"]');
    expect(cell?.className).toContain('text-[13px]');
    expect(cell?.className).toContain('px-2.5');
    expect(cell?.className).toContain('py-1.5');
    expect(
      container.querySelector('[data-tucu="table-header-cell"]')?.className
    ).toContain('px-2.5');
  });

  it('reads the row hover token with a library default', () => {
    const { container } = render(<BasicTable columns={columns} data={data} />);
    expect(
      container.querySelector('[data-tucu="table-row"]')?.className
    ).toContain('var(--tucu-table-row-hover,var(--tucu-table-row-hover-default))');
  });

  it('applies compact density', () => {
    const { container } = render(
      <BasicTable columns={columns} data={data} density="compact" />
    );
    const cell = container.querySelector('[data-tucu="table-cell"]');
    expect(cell?.className).toContain('text-xs');
    expect(cell?.className).toContain('px-2');
    expect(cell?.className).toContain('py-1');
  });

  it('default density keeps text-sm px-3 py-2', () => {
    const { container } = render(<BasicTable columns={columns} data={data} />);
    const cell = container.querySelector('[data-tucu="table-cell"]');
    expect(cell?.className).toContain('text-sm');
    expect(cell?.className).toContain('px-3');
  });

  it('cellDividers=false removes vertical dividers but keeps the outer border', () => {
    const { container } = render(
      <BasicTable columns={columns} data={data} cellDividers={false} />
    );
    const cell = container.querySelector('[data-tucu="table-cell"]');
    expect(cell?.className).not.toContain('border-r');
    expect(container.querySelector('[data-tucu="table"]')?.className).toContain(
      'border'
    );
  });

  it('cellDividers defaults to true', () => {
    const { container } = render(<BasicTable columns={columns} data={data} />);
    expect(
      container.querySelector('[data-tucu="table-cell"]')?.className
    ).toContain('border-r');
  });

  it('uses rowHeight to compute max height', () => {
    const { container } = render(
      <BasicTable columns={columns} data={data} maxRows={3} rowHeight={50} />
    );
    const scroller = container.querySelector(
      '[data-tucu="table"] > div'
    ) as HTMLElement;
    expect(scroller.style.maxHeight).toBe('150px');
  });

  it('falls back to 40px per row before measuring', () => {
    const { container } = render(
      <BasicTable columns={columns} data={data} maxRows={5} />
    );
    const scroller = container.querySelector(
      '[data-tucu="table"] > div'
    ) as HTMLElement;
    expect(scroller.style.maxHeight).toBe('200px');
  });
});

describe('component token precedence', () => {
  const baseCss = readFileSync(
    resolve(__dirname, '../../assets/css/base.css'),
    'utf8'
  );

  it('declares only -default variables for tooltip, skeleton, table, toast and select', () => {
    const bareDeclarations = baseCss.match(
      /^\s+--tucu-(?:tooltip|skeleton|table|toast|select)-(?:(?!default)[a-z-])+:/gm
    );
    expect(bareDeclarations).toBeNull();
  });

  it('declares light and dark defaults so consumer overrides win in both modes', () => {
    expect(baseCss).toMatch(
      /html\.dark,\s*\[data-tucu-theme\]\.dark \{[^}]*--tucu-tooltip-bg-default/
    );
    expect(baseCss).toMatch(
      /html:root,[^{]*\{[^}]*--tucu-tooltip-bg-default/
    );
  });

  it('no component class reads a token without its default fallback', () => {
    const { container } = render(
      <>
        <BasicTable columns={[{ key: 'a', label: 'A' }]} data={[{ a: '1' }]} />
        <Skeleton />
      </>
    );
    const html = container.innerHTML;
    expect(html).not.toMatch(/(?<!,)var\(--tucu-(?:table|skeleton)-[a-z-]+\)/);
  });
});

describe('Tooltip maxWidth', () => {
  it('applies a number as px and a string as a CSS length', () => {
    const { rerender } = render(
      <Tooltip content="Tip" maxWidth={240}>
        <button>trigger</button>
      </Tooltip>
    );
    expect(
      screen.getByRole('tooltip', { hidden: true }).style.maxWidth
    ).toBe('240px');
    rerender(
      <Tooltip content="Tip" maxWidth="30ch">
        <button>trigger</button>
      </Tooltip>
    );
    expect(
      screen.getByRole('tooltip', { hidden: true }).style.maxWidth
    ).toBe('30ch');
  });

  it('does not set an inline max width by default', () => {
    render(
      <Tooltip content="Tip">
        <button>trigger</button>
      </Tooltip>
    );
    expect(
      screen.getByRole('tooltip', { hidden: true }).style.maxWidth
    ).toBe('');
  });
});
