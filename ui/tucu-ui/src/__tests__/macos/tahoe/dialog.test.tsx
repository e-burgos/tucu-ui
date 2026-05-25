import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  MacOSTahoeDialog,
  MacOSTahoeDialogButton,
} from '../../../components/macos/tahoe/containers/dialog-tahoe';

describe('MacOSTahoeDialog', () => {
  it('renders nothing when closed', () => {
    render(
      <MacOSTahoeDialog open={false} onClose={() => {}}>
        Hidden
      </MacOSTahoeDialog>
    );
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('renders children when open', () => {
    render(
      <MacOSTahoeDialog open={true} onClose={() => {}}>
        Dialog Content
      </MacOSTahoeDialog>
    );
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <MacOSTahoeDialog open={true} title="Confirm" onClose={() => {}}>
        Content
      </MacOSTahoeDialog>
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('renders footer slot', () => {
    render(
      <MacOSTahoeDialog
        open={true}
        onClose={() => {}}
        footer={<button>Save</button>}
      >
        Content
      </MacOSTahoeDialog>
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('calls onClose on Escape key', () => {
    const onClose = vi.fn();
    render(
      <MacOSTahoeDialog open={true} onClose={onClose}>
        Content
      </MacOSTahoeDialog>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});

describe('MacOSTahoeDialogButton', () => {
  it('renders button text', () => {
    render(<MacOSTahoeDialogButton>Click Me</MacOSTahoeDialogButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick', () => {
    const onClick = vi.fn();
    render(
      <MacOSTahoeDialogButton onClick={onClick}>Btn</MacOSTahoeDialogButton>
    );
    fireEvent.click(screen.getByText('Btn'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled=true', () => {
    render(<MacOSTahoeDialogButton disabled>Btn</MacOSTahoeDialogButton>);
    expect(screen.getByText('Btn').closest('button')).toBeDisabled();
  });
});
