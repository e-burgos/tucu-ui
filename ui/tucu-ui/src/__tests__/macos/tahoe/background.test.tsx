import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  MacOSBackground,
  ThemeBackground,
} from '../../../components/macos/tahoe/foundations/background';

describe('MacOSBackground (ThemeBackground re-export)', () => {
  it('exports MacOSBackground function', () => {
    expect(typeof MacOSBackground).toBe('function');
  });

  it('exports ThemeBackground function', () => {
    expect(typeof ThemeBackground).toBe('function');
  });

  it('renders children passed through', () => {
    render(
      <MacOSBackground>
        <div data-testid="child">Hello</div>
      </MacOSBackground>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders background layer when variant is specified', () => {
    const { container } = render(<MacOSBackground variant="sonoma" />);
    expect(container.firstElementChild).toBeInTheDocument();
  });
});
