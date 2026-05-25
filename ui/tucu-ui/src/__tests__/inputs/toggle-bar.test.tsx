import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { ToggleBar } from '../../components/inputs/toggle-bar';

describe('ToggleBar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <ToggleBar title="Notifications" checked={false} onChange={vi.fn()} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<ToggleBar title="Dark Mode" checked={true} onChange={vi.fn()} />);
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('renders a subtitle when provided', () => {
    render(
      <ToggleBar
        title="Alerts"
        subTitle="Get notified"
        checked={false}
        onChange={vi.fn()}
      />
    );
    expect(screen.getByText('Get notified')).toBeInTheDocument();
  });
});
