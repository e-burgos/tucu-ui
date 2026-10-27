import { afterEach, describe, expect, it } from 'vitest';
import { cn, extendClassMergeTokens, resetClassMergeTokens } from '../../libs/cn';

describe('cn', () => {
  afterEach(() => {
    resetClassMergeTokens();
  });

  it('lets later utilities override earlier ones', () => {
    expect(cn('h-10 bg-brand text-sm', 'h-6 bg-transparent text-xs')).toBe(
      'h-6 bg-transparent text-xs'
    );
  });

  it('keeps classnames object and array syntax', () => {
    expect(cn('px-2', { 'px-4': true, hidden: false }, ['font-medium'])).toBe(
      'px-4 font-medium'
    );
  });

  it('treats library shadow and font-size tokens as their own groups', () => {
    expect(cn('shadow-large', 'shadow-none')).toBe('shadow-none');
    expect(cn('text-13px text-white')).toBe('text-13px text-white');
  });

  it('keeps a custom font-size token next to a color once registered', () => {
    expect(cn('text-white text-meta')).toBe('text-meta');
    extendClassMergeTokens({ fontSize: ['meta'] });
    expect(cn('text-white text-meta')).toBe('text-white text-meta');
    expect(cn('text-meta text-xs')).toBe('text-xs');
  });
});
