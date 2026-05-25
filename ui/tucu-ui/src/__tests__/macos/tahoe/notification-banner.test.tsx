import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MacOSTahoeNotificationBanner } from '../../../components/macos/tahoe/controls/notification-banner-tahoe';

describe('MacOSTahoeNotificationBanner', () => {
  it('renders title', () => {
    render(<MacOSTahoeNotificationBanner title="Alert" />);
    expect(screen.getByText('Alert')).toBeInTheDocument();
  });

  it('renders message', () => {
    render(
      <MacOSTahoeNotificationBanner title="Title" message="Some details" />
    );
    expect(screen.getByText('Some details')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(
      <MacOSTahoeNotificationBanner
        title="Test"
        icon={<span data-testid="ic">🔔</span>}
      />
    );
    expect(screen.getByTestId('ic')).toBeInTheDocument();
  });

  it('renders dismiss button and calls onDismiss', () => {
    const onDismiss = vi.fn();
    render(
      <MacOSTahoeNotificationBanner
        title="Test"
        dismissible
        onDismiss={onDismiss}
      />
    );
    const btn = screen.getByLabelText('Dismiss');
    fireEvent.click(btn);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <MacOSTahoeNotificationBanner title="Test" className="my-notif" />
    );
    expect(container.querySelector('.my-notif')).toBeInTheDocument();
  });
});
