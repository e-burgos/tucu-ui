import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TabSelect } from '../../components/tabs/tab-select';

describe('TabSelect', () => {
  const tabMenu = [
    { title: 'Overview', path: 'overview' },
    { title: 'Details', path: 'details' },
    { title: 'Settings', path: 'settings' },
  ];

  it('renders with the selected tab title', () => {
    render(
      <TabSelect tabMenu={tabMenu} selectedTabIndex={0} onChange={vi.fn()} />
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('renders with a different selected index', () => {
    render(
      <TabSelect tabMenu={tabMenu} selectedTabIndex={1} onChange={vi.fn()} />
    );

    expect(screen.getByText('Details')).toBeInTheDocument();
  });
});
