import { describe, it, expect } from 'vitest';
import { Controller, useFormContext } from '../../components/forms/hook-form';

describe('HookForm re-exports', () => {
  it('exports Controller', () => {
    expect(Controller).toBeDefined();
  });

  it('exports useFormContext', () => {
    expect(useFormContext).toBeDefined();
  });
});
