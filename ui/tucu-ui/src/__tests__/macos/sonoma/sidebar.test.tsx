import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MacSidebarCard } from '../../../components/macos/sonoma/containers/sidebar';

describe('MacSidebarCard', () => {
  const sections = [
    {
      label: 'Section 1',
      items: [
        { id: 'item-1', label: 'Item 1' },
        { id: 'item-2', label: 'Item 2' },
      ],
    },
  ];

  it('renders section label', () => {
    render(<MacSidebarCard sections={sections} />);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
  });

  it('renders items', () => {
    render(<MacSidebarCard sections={sections} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders header slot', () => {
    render(<MacSidebarCard sections={sections} header={<div>Header</div>} />);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('renders footer slot', () => {
    render(<MacSidebarCard sections={sections} footer={<div>Footer</div>} />);
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('calls onSelect when item clicked', () => {
    const onSelect = vi.fn();
    render(<MacSidebarCard sections={sections} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Item 1'));
    expect(onSelect).toHaveBeenCalledWith('item-1');
  });

  it('highlights active item with distinct styling', () => {
    render(<MacSidebarCard sections={sections} activeId="item-1" />);
    const btn = screen.getByText('Item 1').closest('button');
    expect(btn?.className).toContain('bg-');
  });

  it('applies custom className', () => {
    const { container } = render(
      <MacSidebarCard sections={sections} className="my-sidebar" />
    );
    expect(container.querySelector('.my-sidebar')).toBeInTheDocument();
  });
});
