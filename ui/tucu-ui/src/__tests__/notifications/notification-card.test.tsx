import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import { NotificationCard } from '../../components/notifications/notification-card';

describe('NotificationCard', () => {
  const defaultProps = {
    type: 'followed' as const,
    actor: { name: 'john', avatar: '/avatar.png' },
    time: '2 hours ago',
    url: '/notifications/1',
    notifier: 'your profile',
  };

  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <NotificationCard {...defaultProps} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the actor name', () => {
    render(
      <MemoryRouter>
        <NotificationCard {...defaultProps} />
      </MemoryRouter>
    );
    expect(screen.getByText('@john')).toBeInTheDocument();
  });

  it('renders the time', () => {
    render(
      <MemoryRouter>
        <NotificationCard {...defaultProps} />
      </MemoryRouter>
    );
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
  });

  it('renders with data-tucu attribute', () => {
    const { container } = render(
      <MemoryRouter>
        <NotificationCard {...defaultProps} />
      </MemoryRouter>
    );
    expect(
      container.querySelector('[data-tucu="notification-card"]')
    ).toBeInTheDocument();
  });
});
