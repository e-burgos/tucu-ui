import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Button from '../../components/buttons/button/index';
import { Badge } from '../../components/common/badge';
import { Alert } from '../../components/notifications/alert';
import { Spinner } from '../../components/loaders/spinner';

describe('Button consumer absorption', () => {
  it('renders the button directly without a wrapper and keeps className on it', () => {
    const { container } = render(<Button className="ml-auto">Go</Button>);
    const button = container.firstElementChild as HTMLElement;
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveClass('ml-auto', 'relative');
  });

  it('wraps in a div with wrapperClassName when a tooltip is set', () => {
    render(
      <Button tooltip="Hint" wrapperClassName="ml-auto" fullWidth>
        Go
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button.parentElement).toHaveClass('ml-auto', 'w-full');
    expect(button).toHaveClass('w-full');
  });

  it('defaults to type=button and allows overriding', () => {
    const { rerender } = render(<Button>Go</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    rerender(<Button type="submit">Go</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('xs size applies text-xs and h-5', () => {
    render(<Button size="xs">Go</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-xs', 'h-5');
    expect(button).not.toHaveClass('text-sm');
  });

  it('transparent variant has no permanent grey background', () => {
    render(<Button variant="transparent">Go</Button>);
    expect(screen.getByRole('button').className).not.toContain(
      'bg-gray-100/25'
    );
  });

  it('outline variant uses a 1px border and ghost keeps border-2', () => {
    const { rerender } = render(<Button variant="outline">Go</Button>);
    const outline = screen.getByRole('button');
    expect(outline).toHaveClass('border');
    expect(outline).not.toHaveClass('border-2');
    rerender(<Button variant="ghost">Go</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-2');
  });

  it('gray solid has a dark surface tone', () => {
    render(<Button color="gray">Go</Button>);
    expect(screen.getByRole('button')).toHaveClass('dark:bg-gray-700');
  });

  it('consumer className overrides size and background', () => {
    render(
      <Button className="h-14 bg-red-500" size="small">
        Go
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-14', 'bg-red-500');
    expect(button).not.toHaveClass('h-10');
    expect(button).not.toHaveClass('bg-brand');
  });

  it('passes aria and data attributes but keeps data-tucu', () => {
    render(
      <Button aria-pressed="true" data-testid="b" data-tucu="other">
        Go
      </Button>
    );
    const button = screen.getByTestId('b');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('data-tucu', 'button');
  });
});

describe('Alert consumer absorption', () => {
  it('polite renders role=status and aria-live=polite', () => {
    render(<Alert live="polite">Saved</Alert>);
    const alert = screen.getByRole('status');
    expect(alert).toHaveAttribute('aria-live', 'polite');
  });

  it('defaults to assertive role=alert', () => {
    render(<Alert>Oops</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  it('does not render undefined in className', () => {
    render(<Alert>Oops</Alert>);
    expect(screen.getByRole('alert').className).not.toContain('undefined');
  });

  it('passes aria and data attributes to the root', () => {
    render(
      <Alert data-testid="a" aria-describedby="x">
        Oops
      </Alert>
    );
    const alert = screen.getByTestId('a');
    expect(alert).toHaveAttribute('aria-describedby', 'x');
    expect(alert).toHaveAttribute('data-tucu', 'alert');
  });

  it('applies token tones', () => {
    render(
      <Alert variant="success" appearance="ink">
        Done
      </Alert>
    );
    expect(screen.getByRole('alert')).toHaveClass('bg-success', 'text-white');
  });
});

describe('Badge consumer absorption', () => {
  it('soft tone uses token colors', () => {
    render(
      <Badge tone="success" variant="soft">
        ok
      </Badge>
    );
    expect(screen.getByText('ok')).toHaveClass('bg-success/15', 'text-success');
  });

  it('ink tone uses solid token background', () => {
    render(
      <Badge tone="danger" variant="ink">
        bad
      </Badge>
    );
    expect(screen.getByText('bad')).toHaveClass('bg-error', 'text-white');
  });

  it('line tone uses a token border', () => {
    render(
      <Badge tone="warning" variant="line">
        warn
      </Badge>
    );
    expect(screen.getByText('warn')).toHaveClass(
      'border-warning',
      'text-warning'
    );
  });

  it('legacy soft variant with color maps to tokens', () => {
    render(
      <Badge color="info" variant="soft">
        i
      </Badge>
    );
    expect(screen.getByText('i')).toHaveClass('bg-info/15');
  });

  it('supports xs size', () => {
    render(<Badge size="xs">x</Badge>);
    expect(screen.getByText('x')).toHaveClass('h-3.5');
  });
});

describe('Spinner xs', () => {
  it('renders the xs size', () => {
    const { container } = render(<Spinner size="xs" />);
    expect(container.querySelector('.w-3')).toBeInTheDocument();
  });
});
