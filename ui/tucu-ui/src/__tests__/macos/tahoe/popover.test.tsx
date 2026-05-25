import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  MacOSTahoePopover,
  MacOSTahoePopoverItem,
} from '../../../components/macos/tahoe/feedback/popover-tahoe';

describe('MacOSTahoePopover', () => {
  it('renders children (trigger)', () => {
    render(
      <MacOSTahoePopover
        isOpen={false}
        content={<p>Content</p>}
        onClose={() => {}}
      >
        <button>Trigger</button>
      </MacOSTahoePopover>
    );
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('does not render content when closed', () => {
    render(
      <MacOSTahoePopover
        isOpen={false}
        content={<p>Hidden</p>}
        onClose={() => {}}
      >
        <button>Trigger</button>
      </MacOSTahoePopover>
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('renders content when open', () => {
    render(
      <MacOSTahoePopover
        isOpen={true}
        content={<p>Visible</p>}
        onClose={() => {}}
      >
        <button>Trigger</button>
      </MacOSTahoePopover>
    );
    expect(screen.getByText('Visible')).toBeInTheDocument();
  });

  it('has data-tucu=tahoe-popover when open', () => {
    const { container } = render(
      <MacOSTahoePopover isOpen={true} content={<p>D</p>} onClose={() => {}}>
        <button>T</button>
      </MacOSTahoePopover>
    );
    expect(
      container.querySelector('[data-tucu="tahoe-popover"]')
    ).toBeInTheDocument();
  });
});

describe('MacOSTahoePopoverItem', () => {
  it('renders label', () => {
    render(<MacOSTahoePopoverItem label="Edit" />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(
      <MacOSTahoePopoverItem
        label="Delete"
        icon={<span data-testid="ic">🗑</span>}
      />
    );
    expect(screen.getByTestId('ic')).toBeInTheDocument();
  });

  it('renders shortcut', () => {
    render(<MacOSTahoePopoverItem label="Copy" shortcut="⌘C" />);
    expect(screen.getByText('⌘C')).toBeInTheDocument();
  });

  it('is disabled when disabled=true', () => {
    render(<MacOSTahoePopoverItem label="Locked" disabled />);
    expect(screen.getByText('Locked').closest('button')).toBeDisabled();
  });
});
