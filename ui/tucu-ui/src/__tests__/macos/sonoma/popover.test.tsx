import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MacOSPopover } from '../../../components/macos/sonoma/feedback/popover';

describe('MacOSPopover', () => {
  it('renders children (trigger)', () => {
    render(
      <MacOSPopover isOpen={false} content={<p>Popover</p>}>
        <button>Trigger</button>
      </MacOSPopover>
    );
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('does not render content when closed', () => {
    render(
      <MacOSPopover isOpen={false} content={<p>Hidden</p>}>
        <button>Trigger</button>
      </MacOSPopover>
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('renders content when open', () => {
    render(
      <MacOSPopover isOpen={true} content={<p>Visible</p>}>
        <button>Trigger</button>
      </MacOSPopover>
    );
    expect(screen.getByText('Visible')).toBeInTheDocument();
  });

  it('renders with role=dialog when open', () => {
    render(
      <MacOSPopover isOpen={true} content={<p>Content</p>}>
        <button>Trigger</button>
      </MacOSPopover>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MacOSPopover isOpen={true} content={<p>Content</p>} className="my-pop">
        <button>Trigger</button>
      </MacOSPopover>
    );
    expect(container.querySelector('.my-pop')).toBeInTheDocument();
  });
});
