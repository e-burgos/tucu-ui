import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  MacOSWidget,
  MacOSWidgetHeader,
} from '../../../components/macos/sonoma/containers/widget';

describe('MacOSWidget', () => {
  it('renders children', () => {
    render(<MacOSWidget>Widget Content</MacOSWidget>);
    expect(screen.getByText('Widget Content')).toBeInTheDocument();
  });

  it('applies size class md by default', () => {
    const { container } = render(<MacOSWidget>Content</MacOSWidget>);
    const el = container.firstElementChild;
    expect(el?.className).toContain('w-[364px]');
    expect(el?.className).toContain('h-[170px]');
  });

  it('applies sm size', () => {
    const { container } = render(<MacOSWidget size="sm">Content</MacOSWidget>);
    const el = container.firstElementChild;
    expect(el?.className).toContain('w-[170px]');
    expect(el?.className).toContain('h-[170px]');
  });

  it('applies glass style when glass=true', () => {
    const { container } = render(<MacOSWidget glass>Content</MacOSWidget>);
    const el = container.firstElementChild;
    expect(el?.className).toContain('backdrop-blur');
  });

  it('applies custom className', () => {
    const { container } = render(
      <MacOSWidget className="custom">Content</MacOSWidget>
    );
    expect(container.querySelector('.custom')).toBeInTheDocument();
  });
});

describe('MacOSWidgetHeader', () => {
  it('renders title', () => {
    render(<MacOSWidgetHeader title="Weather" />);
    expect(screen.getByText('Weather')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<MacOSWidgetHeader title="Weather" subtitle="San Francisco" />);
    expect(screen.getByText('San Francisco')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(
      <MacOSWidgetHeader
        title="Test"
        icon={<span data-testid="icon">☀️</span>}
      />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders actions slot', () => {
    render(
      <MacOSWidgetHeader title="Test" actions={<button>Action</button>} />
    );
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});
