import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MacOSTahoeWindow } from '../../../components/macos/tahoe/containers/window-tahoe';

describe('MacOSTahoeWindow', () => {
  it('renders children', () => {
    render(<MacOSTahoeWindow>Hello Tahoe</MacOSTahoeWindow>);
    expect(screen.getByText('Hello Tahoe')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<MacOSTahoeWindow title="Tahoe Window">Content</MacOSTahoeWindow>);
    expect(screen.getByText('Tahoe Window')).toBeInTheDocument();
  });

  it('renders traffic lights by default', () => {
    render(<MacOSTahoeWindow>Content</MacOSTahoeWindow>);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
    expect(screen.getByLabelText('Minimize')).toBeInTheDocument();
    expect(screen.getByLabelText('Maximize')).toBeInTheDocument();
  });

  it('hides traffic lights when showTrafficLights=false', () => {
    render(
      <MacOSTahoeWindow showTrafficLights={false}>Content</MacOSTahoeWindow>
    );
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<MacOSTahoeWindow onClose={onClose}>Content</MacOSTahoeWindow>);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onMinimize when minimize button clicked', () => {
    const onMinimize = vi.fn();
    render(
      <MacOSTahoeWindow onMinimize={onMinimize}>Content</MacOSTahoeWindow>
    );
    fireEvent.click(screen.getByLabelText('Minimize'));
    expect(onMinimize).toHaveBeenCalledTimes(1);
  });

  it('calls onMaximize when maximize button clicked', () => {
    const onMaximize = vi.fn();
    render(
      <MacOSTahoeWindow onMaximize={onMaximize}>Content</MacOSTahoeWindow>
    );
    fireEvent.click(screen.getByLabelText('Maximize'));
    expect(onMaximize).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <MacOSTahoeWindow className="custom-tahoe">Content</MacOSTahoeWindow>
    );
    expect(container.querySelector('.custom-tahoe')).toBeInTheDocument();
  });

  it('disables close button when disableClose=true', () => {
    render(<MacOSTahoeWindow disableClose>Content</MacOSTahoeWindow>);
    expect(screen.getByLabelText('Close')).toBeDisabled();
  });
});
