import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  MacOSTahoeWidget,
  MacOSTahoeWidgetHeader,
} from '../../../components/macos/tahoe/containers/widget-tahoe';

describe('MacOSTahoeWidget', () => {
  it('renders children', () => {
    render(<MacOSTahoeWidget>Widget Content</MacOSTahoeWidget>);
    expect(screen.getByText('Widget Content')).toBeInTheDocument();
  });

  it('applies sm size by default', () => {
    const { container } = render(<MacOSTahoeWidget>Content</MacOSTahoeWidget>);
    const el = container.querySelector('[data-tucu="tahoe-widget"]');
    expect(el?.className).toContain('w-[170px]');
    expect(el?.className).toContain('h-[170px]');
  });

  it('applies xl size', () => {
    const { container } = render(
      <MacOSTahoeWidget size="xl">Content</MacOSTahoeWidget>
    );
    const el = container.querySelector('[data-tucu="tahoe-widget"]');
    expect(el?.className).toContain('w-[364px]');
    expect(el?.className).toContain('h-[364px]');
  });

  it('applies custom className', () => {
    const { container } = render(
      <MacOSTahoeWidget className="my-widget">Content</MacOSTahoeWidget>
    );
    expect(container.querySelector('.my-widget')).toBeInTheDocument();
  });

  it('has data-tucu attribute', () => {
    const { container } = render(<MacOSTahoeWidget>Content</MacOSTahoeWidget>);
    expect(
      container.querySelector('[data-tucu="tahoe-widget"]')
    ).toBeInTheDocument();
  });
});

describe('MacOSTahoeWidgetHeader', () => {
  it('renders title', () => {
    render(<MacOSTahoeWidgetHeader title="Weather" />);
    expect(screen.getByText('Weather')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<MacOSTahoeWidgetHeader title="Weather" subtitle="72°F" />);
    expect(screen.getByText('72°F')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(
      <MacOSTahoeWidgetHeader
        title="Test"
        icon={<span data-testid="icon">☀️</span>}
      />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders actions slot', () => {
    render(
      <MacOSTahoeWidgetHeader title="Test" actions={<button>More</button>} />
    );
    expect(screen.getByText('More')).toBeInTheDocument();
  });
});
