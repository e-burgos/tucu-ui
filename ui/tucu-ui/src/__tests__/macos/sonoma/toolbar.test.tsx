import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MacOSToolbarSonoma } from '../../../components/macos/sonoma/layout/toolbar-sonoma';

describe('MacOSToolbarSonoma', () => {
  it('renders title', () => {
    render(<MacOSToolbarSonoma title="My App" />);
    expect(screen.getByText('My App')).toBeInTheDocument();
  });

  it('renders leading slot', () => {
    render(<MacOSToolbarSonoma leading={<span>Logo</span>} />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders trailing slot', () => {
    render(<MacOSToolbarSonoma trailing={<button>Settings</button>} />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders center slot overriding title', () => {
    render(<MacOSToolbarSonoma title="Hidden" center={<span>Center</span>} />);
    expect(screen.getByText('Center')).toBeInTheDocument();
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('renders children', () => {
    render(<MacOSToolbarSonoma>Child Content</MacOSToolbarSonoma>);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('has data-tucu=toolbar attribute', () => {
    const { container } = render(<MacOSToolbarSonoma title="Test" />);
    expect(
      container.querySelector('[data-tucu="toolbar"]')
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<MacOSToolbarSonoma className="my-toolbar" />);
    expect(container.querySelector('.my-toolbar')).toBeInTheDocument();
  });
});
