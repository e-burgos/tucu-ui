import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { Collapse } from '../../components/common/collapse';

describe('Collapse', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Collapse label="Section Title">
        <p>Content here</p>
      </Collapse>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders label text', () => {
    render(
      <Collapse label="My Section">
        <p>Inner content</p>
      </Collapse>
    );
    expect(screen.getByText('My Section')).toBeInTheDocument();
  });
});

describe('Collapse a11y and modes', () => {
  it('links header and panel with aria and toggles uncontrolled', () => {
    render(
      <Collapse label={<em>Node</em>} variant="compact" data-testid="root">
        <p>Body</p>
      </Collapse>
    );
    const header = screen.getByRole('button');
    expect(header).toHaveAttribute('type', 'button');
    expect(header).toHaveAttribute('aria-expanded', 'false');
    const panel = document.getElementById(
      header.getAttribute('aria-controls') as string
    ) as HTMLElement;
    expect(panel).toHaveAttribute('role', 'region');
    expect(panel).toHaveAttribute('aria-labelledby', header.id);
    expect(panel).toHaveAttribute('hidden');
    expect(screen.getByTestId('root')).toBeInTheDocument();
    fireEvent.click(header);
    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(panel).not.toHaveAttribute('hidden');
  });

  it('supports controlled mode', () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Collapse label="C" open={false} onOpenChange={onOpenChange}>
        <p>Body</p>
      </Collapse>
    );
    const header = screen.getByRole('button');
    fireEvent.click(header);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(header).toHaveAttribute('aria-expanded', 'false');
    rerender(
      <Collapse label="C" open onOpenChange={onOpenChange}>
        <p>Body</p>
      </Collapse>
    );
    expect(header).toHaveAttribute('aria-expanded', 'true');
  });

  it('unstyled variant has no card chrome', () => {
    const { container } = render(
      <Collapse label="U" variant="unstyled" headerClassName="mine">
        <p>Body</p>
      </Collapse>
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).not.toContain('shadow-card');
    expect(screen.getByRole('button').className).toContain('mine');
  });
});
