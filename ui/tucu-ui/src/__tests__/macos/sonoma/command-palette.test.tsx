import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MacOSCommandPalette } from '../../../components/macos/sonoma/feedback/command-palette';

describe('MacOSCommandPalette', () => {
  const items = [
    { id: '1', label: 'Open File', group: 'Files', onSelect: vi.fn() },
    { id: '2', label: 'Save All', group: 'Files', onSelect: vi.fn() },
    { id: '3', label: 'Toggle Theme', group: 'Settings', onSelect: vi.fn() },
  ];

  it('renders nothing when closed', () => {
    const { container } = render(
      <MacOSCommandPalette items={items} open={false} onOpenChange={() => {}} />
    );
    expect(container.querySelector('input')).not.toBeInTheDocument();
  });

  it('renders input and items when open', () => {
    render(
      <MacOSCommandPalette items={items} open={true} onOpenChange={() => {}} />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Open File')).toBeInTheDocument();
    expect(screen.getByText('Save All')).toBeInTheDocument();
    expect(screen.getByText('Toggle Theme')).toBeInTheDocument();
  });

  it('filters items based on query', () => {
    render(
      <MacOSCommandPalette items={items} open={true} onOpenChange={() => {}} />
    );
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'toggle' },
    });
    expect(screen.getByText('Toggle Theme')).toBeInTheDocument();
    expect(screen.queryByText('Open File')).not.toBeInTheDocument();
  });

  it('calls onOpenChange(false) on Escape', () => {
    const onOpenChange = vi.fn();
    render(
      <MacOSCommandPalette
        items={items}
        open={true}
        onOpenChange={onOpenChange}
      />
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
