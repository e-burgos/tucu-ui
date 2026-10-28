import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import React from 'react';

import { Input } from '../../components/inputs/input';
import { Textarea } from '../../components/inputs/textarea';
import { PinCode } from '../../components/inputs/pin-code';
import { FileInput } from '../../components/inputs/file-input';
import { InputSearcher } from '../../components/inputs/input-searcher';
import { Select } from '../../components/inputs/select';
import * as controlColors from '../../components/inputs/helpers/control-colors';

const colors = [
  'primary',
  'secondary',
  'danger',
  'info',
  'success',
  'warning',
] as const;
const variants = ['ghost', 'solid', 'transparent'] as const;
const cases = colors.flatMap((color) =>
  variants.map((variant) => [color, variant] as const)
);

describe('control-colors helpers', () => {
  it('exports no class map that carries dark: utilities', () => {
    const classStrings = Object.values(controlColors)
      .flatMap((value) =>
        typeof value === 'string'
          ? [value]
          : typeof value === 'object' && value
          ? Object.values(value as Record<string, string>)
          : []
      )
      .filter((value): value is string => typeof value === 'string');
    expect(classStrings.length).toBeGreaterThan(0);
    classStrings.forEach((value) => expect(value).not.toContain('dark:'));
  });

  it('builds tone attributes only when a color is set', () => {
    expect(controlColors.textControlToneAttributes('ghost')).toBeUndefined();
    expect(
      controlColors.textControlToneAttributes('solid', 'danger')
    ).toMatchObject({
      'data-tucu-control-tone': 'danger',
      'data-tucu-control-variant': 'solid',
    });
  });
});

describe('Input tone tokens', () => {
  it.each(cases)('%s %s', (color, variant) => {
    render(
      <Input
        label="Field"
        color={color}
        variant={variant}
        inputClassName="text-lg"
      />
    );
    const input = screen.getByLabelText('Field');
    expect(input.className).not.toMatch(/(^|\s)dark:(!|border-(brand|red|blue|green|orange|gray)|bg-|hover:|focus:)/);
    expect(input.className).not.toContain('!border');
    expect(input).toHaveAttribute('data-tucu-control-tone', color);
    expect(input).toHaveAttribute('data-tucu-control-variant', variant);
    expect(input).toHaveClass('text-lg');
  });

  it('emits no tone attributes without color', () => {
    render(<Input label="Field" />);
    expect(screen.getByLabelText('Field')).not.toHaveAttribute(
      'data-tucu-control-tone'
    );
  });
});

describe('Textarea tone tokens', () => {
  it.each(cases)('%s %s', (color, variant) => {
    render(
      <Textarea
        label="Notes"
        color={color}
        variant={variant}
        inputClassName="min-h-40"
      />
    );
    const textarea = screen.getByLabelText('Notes');
    expect(textarea.className).not.toMatch(/dark:(!|border-(brand|red|blue|green|orange|gray)\/|bg-(brand|red|blue|green|orange|gray)\/)/);
    expect(textarea).toHaveAttribute('data-tucu-control-tone', color);
    expect(textarea).toHaveAttribute('data-tucu-control-variant', variant);
    expect(textarea).toHaveClass('min-h-40');
  });
});

describe('PinCode tone tokens', () => {
  it.each(cases)('%s %s', (color, variant) => {
    render(
      <PinCode length={2} color={color} variant={variant} inputClassName="font-bold" />
    );
    const digit = screen.getAllByRole('textbox')[0];
    expect(digit.className).not.toMatch(/dark:(!|border-(brand|red|blue|green|orange|gray)\/|bg-(brand|red|blue|green|orange|gray)\/)/);
    expect(digit).toHaveAttribute('data-tucu-control-tone', color);
    expect(digit).toHaveClass('font-bold');
  });
});

describe('Select tone tokens', () => {
  it.each(cases)('%s %s', (color, variant) => {
    render(
      <Select
        label="Pick"
        color={color}
        variant={variant}
        buttonClassName="font-bold"
        options={[{ name: 'One', value: '1' }]}
      />
    );
    const trigger = screen.getByRole('combobox');
    expect(trigger.className).not.toMatch(/dark:(!|border-(brand|red|blue|green|orange|gray)\/|bg-(brand|red|blue|green|orange|gray)\/)/);
    expect(trigger).toHaveAttribute('data-tucu-control-tone', color);
    expect(trigger).toHaveClass('font-bold');
  });
});

describe('FileInput and InputSearcher tone tokens', () => {
  it.each(colors)('FileInput %s uses file tone attributes', (color) => {
    const { container } = render(
      <FileInput
        color={color}
        wrapperClassName="mt-4"
        containerClassName="h-60"
      />
    );
    const wrapper = container.querySelector(
      '[data-tucu-control-part="wrapper"]'
    ) as HTMLElement;
    const dropzone = container.querySelector(
      '[data-tucu-control-part="dropzone"]'
    ) as HTMLElement;
    expect(wrapper).toHaveAttribute('data-tucu-control-file-tone', color);
    expect(dropzone).toHaveAttribute('data-tucu-control-file-tone', color);
    expect(wrapper.className).not.toContain('dark:');
    expect(dropzone.className).not.toContain('dark:');
    expect(wrapper).toHaveClass('mt-4');
    expect(dropzone).toHaveClass('h-60');
  });

  it.each(colors)('InputSearcher %s renders without crashing', (color) => {
    const { container } = render(
      <InputSearcher
        color={color}
        options={[{ name: 'One', value: '1' }]}
        placeholder="Search"
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe('tones-controls.css', () => {
  const css = readFileSync(
    resolve(__dirname, '../../assets/css/tokens/tones-controls.css'),
    'utf8'
  );
  const lightBlock = css.slice(
    css.indexOf('html:root'),
    css.indexOf('html.dark,')
  );
  const darkBlock = css.slice(
    css.indexOf('html.dark,'),
    css.indexOf('@layer components')
  );
  const usedTokens = Array.from(
    new Set(
      Array.from(css.matchAll(/var\((--tucu-[a-z0-9-]+?),\s*var\(\1-default\)\)/g)).map(
        (match) => match[1]
      )
    )
  );

  it('references overridable tokens in the rules', () => {
    expect(usedTokens.length).toBeGreaterThan(50);
  });

  it.each(usedTokens)('%s has a default in light and dark', (token) => {
    expect(lightBlock).toContain(`${token}-default:`);
    expect(darkBlock).toContain(`${token}-default:`);
  });

  it('contains no dark: utilities or !important', () => {
    expect(css).not.toContain('dark:');
    expect(css).not.toContain('!important');
  });
});
