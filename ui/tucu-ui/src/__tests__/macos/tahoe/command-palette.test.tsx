import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MacOSTahoeCommandPalette } from '../../../components/macos/tahoe/feedback/command-palette-tahoe';

describe('MacOSTahoeCommandPalette', () => {
  const items = [
    { id: '1', label: 'Open File', group: 'Files', onSelect: vi.fn() },
    { id: '2', label: 'Save All', group: 'Files', onSelect: vi.fn() },
    { id: '3', label: 'Settings', group: 'System', onSelect: vi.fn() },
  ];

  it('renders nothing when closed', () => {
    const { container } = render(
      <MacOSTahoeCommandPalette
        items={items}
        open={false}
        onOpenChange={() => {}}
      />
    );
    expect(container.querySelector('input')).not.toBeInTheDocument();
  });

  it('renders items when open', () => {
    render(
      <MacOSTahoeCommandPalette
        items={items}
        open={true}
        onOpenChange={() => {}}
      />
    );
    expect(screen.getByText('Open File')).toBeInTheDocument();
    expect(screen.getByText('Save All')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('filters items by query', () => {
    render(
      <MacOSTahoeCommandPalette
        items={items}
        open={true}
        onOpenChange={() => {}}
      />
    );
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'settings' },
    });
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.queryByText('Open File')).not.toBeInTheDocument();
  });

  it('calls onOpenChange(false) on Escape', () => {
    const onOpenChange = vi.fn();
    render(
      <MacOSTahoeCommandPalette
        items={items}
        open={true}
        onOpenChange={onOpenChange}
      />
    );
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
