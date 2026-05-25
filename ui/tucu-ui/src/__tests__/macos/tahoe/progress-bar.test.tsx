import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MacOSTahoeProgressBar } from '../../../components/macos/tahoe/controls/progress-bar-tahoe';

describe('MacOSTahoeProgressBar', () => {
  it('renders with default value 0', () => {
    const { container } = render(<MacOSTahoeProgressBar />);
    const bar = container.querySelector('[role="progressbar"]');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('aria-valuenow', '0');
  });

  it('renders with given value', () => {
    const { container } = render(<MacOSTahoeProgressBar value={75} />);
    const bar = container.querySelector('[role="progressbar"]');
    expect(bar).toHaveAttribute('aria-valuenow', '75');
  });

  it('clamps value between 0 and 100', () => {
    const { container } = render(<MacOSTahoeProgressBar value={150} />);
    const bar = container.querySelector('[role="progressbar"]');
    expect(bar).toHaveAttribute('aria-valuenow', '100');
  });

  it('renders label', () => {
    render(<MacOSTahoeProgressBar value={50} label="Loading" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('shows percentage when showValue=true', () => {
    render(<MacOSTahoeProgressBar value={42} showValue />);
    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('does not show percentage for indeterminate', () => {
    render(<MacOSTahoeProgressBar indeterminate showValue />);
    expect(screen.queryByText('%')).not.toBeInTheDocument();
  });

  it('has data-tucu attribute', () => {
    const { container } = render(<MacOSTahoeProgressBar value={10} />);
    expect(
      container.querySelector('[data-tucu="tahoe-progress-bar"]')
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MacOSTahoeProgressBar value={10} className="my-progress" />
    );
    expect(container.querySelector('.my-progress')).toBeInTheDocument();
  });
});
