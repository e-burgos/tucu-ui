import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Badge } from '../../components/common/badge';

describe('Badge size="micro"', () => {
  it('defines its own compact padding, height and text size without a className', () => {
    const { container } = render(<Badge size="micro">new</Badge>);
    const classes = (
      container.firstElementChild as HTMLElement
    ).className.split(' ');
    expect(classes).toEqual(
      expect.arrayContaining([
        'text-[10px]',
        'leading-tight',
        'px-1.5',
        'py-0',
        'h-auto',
      ])
    );
    expect(classes).not.toContain('h-4');
    expect(classes).not.toContain('py-0.5');
  });

  it('a consumer className still wins over the micro padding', () => {
    const { container } = render(
      <Badge size="micro" className="px-3">
        new
      </Badge>
    );
    const classes = (
      container.firstElementChild as HTMLElement
    ).className.split(' ');
    expect(classes).toContain('px-3');
    expect(classes).not.toContain('px-1.5');
  });
});
