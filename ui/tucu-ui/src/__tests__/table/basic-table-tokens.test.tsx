import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import React from 'react';

import { BasicTable } from '../../components/table/basic-table';

const columns = [{ key: 'a', label: 'A' }];
const data = [{ a: '1' }];

describe('BasicTable density tokens', () => {
  it('reads spacing and font size through overridable tokens', () => {
    const { container } = render(<BasicTable columns={columns} data={data} />);
    const cell = container.querySelector('[data-tucu="table-cell"]') as HTMLElement;
    const header = container.querySelector('[data-tucu="table-header-cell"]') as HTMLElement;
    expect(cell.className).toContain('var(--tucu-table-cell-py,var(--tucu-table-cell-py-default))');
    expect(cell.className).toContain('var(--tucu-table-cell-px,var(--tucu-table-cell-px-default))');
    expect(cell.className).toContain('var(--tucu-table-font-size,var(--tucu-table-font-size-default))');
    expect(header.className).toContain('var(--tucu-table-header-font-size,var(--tucu-table-header-font-size-default))');
  });

  it.each(['compact', 'snug', 'default'] as const)('exposes data-density=%s', (density) => {
    const { container } = render(<BasicTable columns={columns} data={data} density={density} />);
    expect(container.querySelector('[data-tucu="table"]')).toHaveAttribute('data-density', density);
  });

  it('declares per-density defaults in the token file', () => {
    const css = readFileSync(resolve(__dirname, '../../assets/css/tokens/table.css'), 'utf8');
    expect(css).toContain("[data-density='compact']");
    expect(css).toContain("[data-density='snug']");
    expect(css).toContain('--tucu-table-cell-px-default: 0.625rem');
    expect(css).toContain('--tucu-table-font-size-default: 13px');
  });

  it('declares a line-height default per density and cells read the token', () => {
    const css = readFileSync(resolve(__dirname, '../../assets/css/tokens/table.css'), 'utf8');
    const lineHeight = (selector: string) =>
      new RegExp(`${selector.replace(/[[\]'=]/g, '\\$&')}\\s*{[^}]*--tucu-table-line-height-default:\\s*([^;]+);`).exec(css)?.[1];
    expect(lineHeight("[data-tucu='table']")).toBe('1.25rem');
    expect(lineHeight("[data-tucu='table'][data-density='snug']")).toBe('1.5');
    expect(lineHeight("[data-tucu='table'][data-density='compact']")).toBe('1rem');
    const { container } = render(<BasicTable columns={columns} data={data} />);
    expect(container.querySelector('[data-tucu="table-cell"]')!.className).toContain(
      'leading-[var(--tucu-table-line-height,var(--tucu-table-line-height-default))]'
    );
  });
});
