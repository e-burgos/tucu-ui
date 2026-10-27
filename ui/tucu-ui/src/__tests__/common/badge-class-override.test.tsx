import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { Badge } from '../../components/common/badge';

describe('Badge className precedence', () => {
  it('className height and font override the tiny size classes', () => {
    const { container } = render(
      <Badge size="tiny" className="h-5 font-mono">
        v1
      </Badge>
    );
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('h-5');
    expect(badge.className).not.toMatch(/(^|\s)h-4(\s|$)/);
    expect(badge.className).toContain('font-mono');
  });

  it('className padding and text size override the size preset', () => {
    const { container } = render(
      <Badge size="tiny" className="px-3 text-sm">
        v1
      </Badge>
    );
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('px-3');
    expect(badge.className).not.toContain('px-1.5');
    expect(badge.className).toContain('text-sm');
    expect(badge.className).not.toContain('text-xs');
  });
});
