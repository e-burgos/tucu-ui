import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MacOSNotificationBanner } from '../../../components/macos/sonoma/feedback/notification-banner';

describe('MacOSNotificationBanner', () => {
  it('renders title', () => {
    render(<MacOSNotificationBanner title="Alert" />);
    expect(screen.getByText('Alert')).toBeInTheDocument();
  });

  it('renders message', () => {
    render(<MacOSNotificationBanner title="Title" message="Details here" />);
    expect(screen.getByText('Details here')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(
      <MacOSNotificationBanner
        title="Test"
        icon={<span data-testid="custom-icon">🔔</span>}
      />
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders dismissible button and calls onDismiss', () => {
    const onDismiss = vi.fn();
    render(
      <MacOSNotificationBanner title="Test" dismissible onDismiss={onDismiss} />
    );
    const dismissBtn = screen.getByLabelText('Dismiss');
    fireEvent.click(dismissBtn);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <MacOSNotificationBanner title="Test" className="my-banner" />
    );
    expect(container.querySelector('.my-banner')).toBeInTheDocument();
  });
});
