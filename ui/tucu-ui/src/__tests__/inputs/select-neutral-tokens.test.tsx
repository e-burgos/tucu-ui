import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Select } from '../../components/inputs/select';

describe('Select neutral tokens', () => {
  it('reads border and background through tokens with defaults', () => {
    render(<Select appearance="neutral" options={[{ name: 'One', value: '1' }]} label="L" />);
    const trigger = screen.getByRole('combobox');
    expect(trigger.className).toContain('var(--tucu-select-border,var(--tucu-select-border-default))');
    expect(trigger.className).toContain('var(--tucu-select-bg,var(--tucu-select-bg-default))');
  });
});
