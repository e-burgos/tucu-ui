import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { TabModal } from '../../components/dialog/tab-modal';

describe('TabModal', () => {
  it('renders without crashing', () => {
    const tabs = [
      { name: 'Tab 1', content: <p>Content 1</p> },
      { name: 'Tab 2', content: <p>Content 2</p> },
    ];
    render(<TabModal tabs={tabs} onClose={vi.fn()} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
  });

  it('renders with direct content', () => {
    render(<TabModal content={<p>Direct content</p>} onClose={vi.fn()} />);
    expect(screen.getByText('Direct content')).toBeInTheDocument();
  });
});
