import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { ListContainer } from '../../components/list/list-container';

describe('ListContainer', () => {
  it('renders without crashing', () => {
    const items = [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
    ];
    const { container } = render(<ListContainer items={items} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with a label', () => {
    const items = [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
    ];
    const { container } = render(
      <ListContainer items={items} label="Actions" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  describe('item selection', () => {
    it('invokes the item own onClick exactly once with trigger="click"', () => {
      const onItemClick = vi.fn();
      render(
        <ListContainer
          trigger="click"
          items={[{ id: '1', label: 'Item 1', onClick: onItemClick }]}
        />
      );
      fireEvent.click(screen.getByLabelText('Options menu'));
      fireEvent.click(screen.getByRole('menuitem', { name: 'Item 1' }));
      expect(onItemClick).toHaveBeenCalledTimes(1);
    });

    it('invokes the item own onClick exactly once with trigger="hover"', () => {
      const onItemClick = vi.fn();
      const { container } = render(
        <ListContainer
          trigger="hover"
          items={[{ id: '1', label: 'Item 1', onClick: onItemClick }]}
        />
      );
      fireEvent.mouseEnter(container.firstChild as Element);
      fireEvent.click(screen.getByRole('menuitem', { name: 'Item 1' }));
      expect(onItemClick).toHaveBeenCalledTimes(1);
    });

    it('invokes onClick for items rendered via content instead of label', () => {
      const onItemClick = vi.fn();
      render(
        <ListContainer
          trigger="click"
          items={[
            {
              id: '1',
              content: <span>Custom content</span>,
              onClick: onItemClick,
            },
          ]}
        />
      );
      fireEvent.click(screen.getByLabelText('Options menu'));
      fireEvent.click(screen.getByText('Custom content'));
      expect(onItemClick).toHaveBeenCalledTimes(1);
    });

    it('does not invoke sibling items onClick', () => {
      const onFirst = vi.fn();
      const onSecond = vi.fn();
      render(
        <ListContainer
          trigger="click"
          items={[
            { id: '1', label: 'Item 1', onClick: onFirst },
            { id: '2', label: 'Item 2', onClick: onSecond },
          ]}
        />
      );
      fireEvent.click(screen.getByLabelText('Options menu'));
      fireEvent.click(screen.getByRole('menuitem', { name: 'Item 1' }));
      expect(onSecond).not.toHaveBeenCalled();
    });

    it('does not break when an item has no onClick', () => {
      render(
        <ListContainer trigger="click" items={[{ id: '1', label: 'Item 1' }]} />
      );
      fireEvent.click(screen.getByLabelText('Options menu'));
      expect(() =>
        fireEvent.click(screen.getByRole('menuitem', { name: 'Item 1' }))
      ).not.toThrow();
    });

    it('closes the dropdown after selection with trigger="click"', () => {
      const onItemClick = vi.fn();
      render(
        <ListContainer
          trigger="click"
          items={[{ id: '1', label: 'Item 1', onClick: onItemClick }]}
        />
      );
      const trigger = screen.getByLabelText('Options menu');
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      fireEvent.click(screen.getByRole('menuitem', { name: 'Item 1' }));
      expect(onItemClick).toHaveBeenCalledTimes(1);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('keeps the dropdown open after selection with trigger="click" and keepOpen', () => {
      const onItemClick = vi.fn();
      render(
        <ListContainer
          trigger="click"
          keepOpen
          items={[{ id: '1', label: 'Item 1', onClick: onItemClick }]}
        />
      );
      const trigger = screen.getByLabelText('Options menu');
      fireEvent.click(trigger);
      fireEvent.click(screen.getByRole('menuitem', { name: 'Item 1' }));
      expect(onItemClick).toHaveBeenCalledTimes(1);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('keeps the dropdown open after selection with trigger="hover"', () => {
      const onItemClick = vi.fn();
      const { container } = render(
        <ListContainer
          trigger="hover"
          items={[{ id: '1', label: 'Item 1', onClick: onItemClick }]}
        />
      );
      fireEvent.mouseEnter(container.firstChild as Element);
      const trigger = screen.getByLabelText('Options menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      fireEvent.click(screen.getByRole('menuitem', { name: 'Item 1' }));
      expect(onItemClick).toHaveBeenCalledTimes(1);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('notifies onOpenChange(false) once after selection in controlled mode', () => {
      const onItemClick = vi.fn();
      const onOpenChange = vi.fn();
      render(
        <ListContainer
          trigger="click"
          isOpen
          onOpenChange={onOpenChange}
          items={[{ id: '1', label: 'Item 1', onClick: onItemClick }]}
        />
      );
      fireEvent.click(screen.getByRole('menuitem', { name: 'Item 1' }));
      expect(onItemClick).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
