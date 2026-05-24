import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MacOSToolbarTahoe } from '../../../components/macos/tahoe/layout/toolbar-tahoe';

describe('MacOSToolbarTahoe', () => {
  it('renders title', () => {
    render(<MacOSToolbarTahoe title="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders leading slot', () => {
    render(<MacOSToolbarTahoe leading={<span>Logo</span>} />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders trailing slot', () => {
    render(<MacOSToolbarTahoe trailing={<button>Gear</button>} />);
    expect(screen.getByText('Gear')).toBeInTheDocument();
  });

  it('renders center slot overriding title', () => {
    render(<MacOSToolbarTahoe title="Hidden" center={<span>Center</span>} />);
    expect(screen.getByText('Center')).toBeInTheDocument();
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('renders children', () => {
    render(<MacOSToolbarTahoe>Custom</MacOSToolbarTahoe>);
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('has data-tucu attribute', () => {
    const { container } = render(<MacOSToolbarTahoe title="Test" />);
    expect(
      container.querySelector('[data-tucu="toolbar-tahoe"]')
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<MacOSToolbarTahoe className="my-toolbar" />);
    expect(container.querySelector('.my-toolbar')).toBeInTheDocument();
  });
});
