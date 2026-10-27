import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Alert } from '../../components/notifications/alert';

describe('Alert density', () => {
  it('keeps the large responsive paddings by default', () => {
    render(<Alert>Heads up</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.className).toContain('py-4');
    expect(alert.className).toContain('sm:py-6');
  });

  it('compact renders a slim banner without responsive paddings', () => {
    render(<Alert density="compact">Heads up</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.className).toContain('px-3');
    expect(alert.className).toContain('py-1.5');
    expect(alert.className).toContain('text-sm');
    expect(alert.className).not.toContain('sm:py-6');
    expect(alert.className).not.toContain('py-4');
    expect(alert.className).not.toContain('ltr:pl-4');
  });

  it('compact reserves room for the dismiss button', () => {
    render(
      <Alert density="compact" dismissible>
        Heads up
      </Alert>
    );
    expect(screen.getByRole('alert').className).toContain('ltr:pr-8');
    expect(screen.getByRole('button', { name: 'Dismiss alert' })).toBeVisible();
  });
});
